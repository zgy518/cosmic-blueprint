"use client";

import { type ReactNode, useState } from "react";

type TermTooltipProps = {
  /** English label for the term */
  label: string;
  /** Plain-English explanation */
  explanation: string;
  /** The term text to display (Chinese characters) */
  children: ReactNode;
};

/**
 * Hover tooltip for Chinese metaphysical terms.
 *
 * On desktop: shows a refined popover on hover.
 * On mobile: toggles on tap.
 */
export function TermTooltip({ label, explanation, children }: TermTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex cursor-help"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      {/* Dotted underline to signal hoverable */}
      <span className="border-b border-dotted border-primary/50 text-inherit transition-colors hover:border-primary">
        {children}
      </span>

      {/* Tooltip popover */}
      {open && (
        <span
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-2xl border border-primary/25 bg-background/95 px-4 py-3 text-left shadow-2xl backdrop-blur-xl"
          style={{ minWidth: "260px", maxWidth: "320px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="mb-1 block text-xs font-semibold text-primary">
            {label}
          </span>
          <span className="block text-xs leading-6 text-foreground">
            {explanation}
          </span>
          {/* Arrow */}
          <span className="absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-primary/25 bg-background/95" />
        </span>
      )}
    </span>
  );
}
