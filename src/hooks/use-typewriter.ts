"use client";

import { useCallback, useRef, useState } from "react";

export type StreamState =
  | "idle"
  | "connecting"
  | "streaming"
  | "done"
  | "error";

export type TypewriterController = {
  /** Current display text (accumulated tokens with typewriter delay). */
  text: string;
  /** Full raw text received from the stream so far. */
  fullText: string;
  state: StreamState;
  errorMessage: string;
  /** Start streaming from the AI reading endpoint. */
  start: () => void;
  /** Abort an in-progress stream. */
  stop: () => void;
  /** Reset to idle. */
  reset: () => void;
};

type TypewriterOptions = {
  /** POST body sent to `/api/ai-reading`. */
  requestBody: object;
  /** Milliseconds between each character reveal (default 25). */
  speed?: number;
};

/**
 * Manages SSE streaming + typewriter animation for AI readings.
 *
 * Usage:
 * ```tsx
 * const { text, state, start, stop } = useTypewriter({ requestBody: { tool, input, reading } });
 * ```
 */
export function useTypewriter({
  requestBody,
  speed = 25,
}: TypewriterOptions): TypewriterController {
  const [fullText, setFullText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [state, setState] = useState<StreamState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const abortRef = useRef<AbortController | null>(null);
  const typewriterTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const queueRef = useRef<string[]>([]);
  const processingRef = useRef(false);

  const clearTypewriter = useCallback(() => {
    if (typewriterTimerRef.current !== null) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
  }, []);

  const processQueue = useCallback(() => {
    if (processingRef.current) return;
    processingRef.current = true;

    typewriterTimerRef.current = setInterval(() => {
      if (queueRef.current.length === 0) {
        clearTypewriter();
        processingRef.current = false;
        return;
      }
      const next = queueRef.current.shift()!;
      setDisplayText((prev) => prev + next);
    }, speed);
  }, [speed, clearTypewriter]);

  const enqueue = useCallback(
    (tokens: string) => {
      queueRef.current.push(...Array.from(tokens));
      processQueue();
    },
    [processQueue],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    clearTypewriter();
    queueRef.current = [];
    processingRef.current = false;
    if (state === "connecting" || state === "streaming") {
      setState("idle");
    }
  }, [state, clearTypewriter]);

  const reset = useCallback(() => {
    stop();
    setFullText("");
    setDisplayText("");
    setErrorMessage("");
    setState("idle");
  }, [stop]);

  const start = useCallback(async () => {
    stop();
    setFullText("");
    setDisplayText("");
    setErrorMessage("");
    queueRef.current = [];
    processingRef.current = false;

    const abort = new AbortController();
    abortRef.current = abort;

    setState("connecting");

    try {
      const response = await fetch("/api/ai-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        signal: abort.signal,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({
          error: `Server returned ${response.status}`,
        }));
        setErrorMessage(errorBody.error ?? "An unknown error occurred.");
        setState("error");
        return;
      }

      setState("streaming");

      const reader = response.body?.getReader();
      if (!reader) {
        setErrorMessage("No response stream available.");
        setState("error");
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

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
          try {
            const chunk = JSON.parse(data);
            if (chunk.type === "token" && typeof chunk.text === "string") {
              setFullText((prev) => prev + chunk.text);
              enqueue(chunk.text);
            } else if (chunk.type === "done") {
              // Final flush
              if (queueRef.current.length > 0) {
                setDisplayText((prev) => prev + queueRef.current.join(""));
                queueRef.current = [];
              }
              clearTypewriter();
              processingRef.current = false;
              setState("done");
            } else if (chunk.type === "error") {
              setErrorMessage(chunk.message ?? "Stream error.");
              setState("error");
            }
          } catch {
            // skip parse errors
          }
        }
      }

      // If we exit the loop without a "done" event, mark as done anyway
      if (abortRef.current) {
        // Flush anything left in queue
        if (queueRef.current.length > 0) {
          setDisplayText((prev) => prev + queueRef.current.join(""));
          queueRef.current = [];
        }
        clearTypewriter();
        processingRef.current = false;
        setState((prev) => (prev === "streaming" ? "done" : prev));
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // User aborted — do nothing, stop() already cleaned up
        return;
      }
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setState("error");
    }
  }, [requestBody, stop, enqueue, clearTypewriter]);

  return { text: displayText, fullText, state, errorMessage, start, stop, reset };
}
