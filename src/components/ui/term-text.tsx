"use client";

import { Fragment, useMemo } from "react";
import { TermTooltip } from "@/components/ui/term-tooltip";
import { lookupTerm, getKnownTerms } from "@/lib/term-dictionary";

type TermTextProps = {
  /** Text that may contain Chinese metaphysical terms to auto-detect */
  text: string;
  /** Optional CSS class for the wrapper */
  className?: string;
};

/** Cache of known terms sorted longest-first (built once). */
let termsCache: string[] | null = null;
function getSortedTerms(): string[] {
  if (!termsCache) {
    termsCache = getKnownTerms();
  }
  return termsCache;
}

/**
 * Wraps known Chinese metaphysical terms in <TermTooltip> components.
 * Auto-detects terms using longest-match-first tokenization.
 *
 * Use this for any block of text that contains Chinese terminology —
 * section values, AI reading output, summaries, etc.
 */
export function TermText({ text, className }: TermTextProps) {
  const tokens = useMemo(() => {
    const terms = getSortedTerms();
    const result: Array<{ text: string; hasTooltip: boolean }> = [];
    let pos = 0;

    while (pos < text.length) {
      let matched = false;
      for (const term of terms) {
        if (text.startsWith(term, pos)) {
          result.push({ text: term, hasTooltip: true });
          pos += term.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        result.push({ text: text[pos], hasTooltip: false });
        pos += 1;
      }
    }

    return result;
  }, [text]);

  if (!text) {
    return null;
  }

  return (
    <span className={className}>
      {tokens.map((token, i) => {
        if (!token.hasTooltip) {
          return <Fragment key={i}>{token.text}</Fragment>;
        }
        const entry = lookupTerm(token.text);
        if (!entry) {
          return <Fragment key={i}>{token.text}</Fragment>;
        }
        return (
          <TermTooltip key={i} label={entry.label} explanation={entry.explanation}>
            {token.text}
          </TermTooltip>
        );
      })}
    </span>
  );
}
