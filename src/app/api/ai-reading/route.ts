import type { ChartDatum } from "@/types";
import { getToolPromptConfig } from "@/lib/ai-prompts";

export const runtime = "edge";
export const maxDuration = 60;

/** Fields the client sends to the AI reading endpoint. */
export type AIReadingRequest = {
  tool: string;
  input: {
    name: string;
    birthDate: string;
    birthTime: string;
    question: string;
  };
  reading: {
    title: string;
    summary: string;
    score: number;
    tags: string[];
    sections: Array<{ label: string; value: string }>;
    chart: ChartDatum[];
    lines?: string[];
  };
};

/** POST /api/ai-reading — SSE streaming AI interpretation via DeepSeek */
export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "AI reading is not configured yet." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: AIReadingRequest;
  try {
    body = (await request.json()) as AIReadingRequest;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const config = getToolPromptConfig(body.tool);
  const systemPrompt = config.systemPrompt(body);
  const userMessage = config.userMessage(body);

  const model = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

  const aiResponse = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      temperature: 0.8,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      stream: true,
    }),
  });

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();
    console.error("DeepSeek API error:", aiResponse.status, errorText);
    return new Response(
      JSON.stringify({
        error: `AI service returned an error (${aiResponse.status}). Please try again later.`,
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = aiResponse.body?.getReader();
      if (!reader) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", message: "No response stream from AI service." })}\n\n`,
          ),
        );
        controller.close();
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      const sendChunk = (type: "token" | "done" | "error", text?: string) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type, text })}\n\n`),
        );
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") {
              sendChunk("done");
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              // OpenAI-compatible SSE format:
              // { "choices": [{ "delta": { "content": "..." } }] }
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                sendChunk("token", content);
              }
            } catch {
              // Skip malformed SSE lines
            }
          }
        }

        // Flush remaining buffer
        if (buffer.trim()) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data: ") && trimmed !== "data: [DONE]") {
            const data = trimmed.slice(6);
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                sendChunk("token", content);
              }
            } catch {
              // skip
            }
          }
        }

        sendChunk("done");
        controller.close();
      } catch (err) {
        console.error("Stream error:", err);
        sendChunk("error", "Stream interrupted. Please try again.");
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
