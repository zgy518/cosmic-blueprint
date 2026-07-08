"use client";

import { useEffect } from "react";
import { AlertCircle, Bot, Loader2, RefreshCw, Sparkles, StopCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { TermText } from "@/components/ui/term-text";
import { useTypewriter } from "@/hooks/use-typewriter";
import type { ToolInput, ToolReading, ToolSlug } from "@/types";

type AIReadingPanelProps = {
  tool: ToolSlug;
  input: ToolInput;
  reading: ToolReading;
};

/**
 * "AI Deep Reading" panel — a premium feature that streams a DeepSeek-powered
 * interpretation with a typewriter animation.
 *
 * Shown below the local reading result on the tool page.
 */
export function AIReadingPanel({ tool, input, reading }: AIReadingPanelProps) {
  const t = useTranslations("aiPanel");

  /** Resolve the tool-specific idle description, falling back to generic. */
  const idleDescription = (() => {
    try {
      return t(`idleDesc.${tool}`);
    } catch {
      return t("idle");
    }
  })();

  const requestBody = {
    tool,
    input: {
      name: input.name,
      birthDate: input.birthDate,
      birthTime: input.birthTime,
      question: input.question,
    },
    reading: {
      title: reading.title,
      summary: reading.summary,
      score: reading.score,
      tags: reading.tags,
      sections: reading.sections,
      chart: reading.chart,
      lines: reading.lines,
    },
  };

  const { text, state, errorMessage, start, stop } = useTypewriter({
    requestBody,
    speed: 30,
  });

  // Auto-start when the reading changes (user clicks "Generate Reading").
  // We intentionally do NOT auto-start on mount — the user must click the button.
  // This effect resets the AI panel when the local reading changes.
  useEffect(() => {
    // Reset whenever the reading changes so the panel clears
    stop();
  }, [reading.title, stop]);

  return (
    <GlassCard interactive={false} className="mt-5 p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
            <Bot className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("title")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {state === "idle" && (
          <Button onClick={start} size="sm" className="h-9 gap-1.5">
            <Sparkles className="size-3.5" />
            {t("start")}
          </Button>
        )}

        {(state === "connecting" || state === "streaming") && (
          <Button onClick={stop} variant="outline" size="sm" className="h-9 gap-1.5">
            <StopCircle className="size-3.5" />
            {t("stop")}
          </Button>
        )}

        {state === "done" && (
          <Button onClick={start} variant="outline" size="sm" className="h-9 gap-1.5">
            <RefreshCw className="size-3.5" />
            {t("regenerate")}
          </Button>
        )}

        {state === "error" && (
          <Button onClick={start} variant="outline" size="sm" className="h-9 gap-1.5">
            <RefreshCw className="size-3.5" />
            {t("retry")}
          </Button>
        )}
      </div>

      {/* States */}
      {state === "idle" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <Sparkles className="size-8 text-primary/30" />
          <p className="max-w-xs text-sm leading-7 text-muted-foreground">
            {idleDescription}
          </p>
        </div>
      )}

      {state === "connecting" && (
        <div className="flex items-center gap-3 py-6">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">
            {t("connecting")}
          </span>
        </div>
      )}

      {(state === "streaming" || state === "done") && (
        <div className="relative rounded-2xl border border-border/60 bg-background/30 p-5">
          <div className="prose prose-sm max-w-none text-sm leading-8 text-foreground whitespace-pre-wrap">
            {state === "streaming" ? (
              <>
                {text}
                <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-primary align-text-bottom" />
              </>
            ) : (
              <TermText text={text} />
            )}
          </div>

          {state === "done" && (
            <p className="mt-4 border-t border-border/40 pt-3 text-xs leading-6 text-muted-foreground">
              {t("disclaimer")}
            </p>
          )}
        </div>
      )}

      {state === "error" && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 py-6 text-center">
          <AlertCircle className="size-8 text-red-400" />
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            {errorMessage || t("errorDefault")}
          </p>
        </div>
      )}
    </GlassCard>
  );
}
