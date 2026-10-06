import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Pill } from "./Pill";

export interface DeltaPairProps {
  /** e.g. "Home market" */
  homeLabel: string;
  /** Flag emoji for the home market, e.g. "🇬🇧" */
  homeFlag: string;
  homeContent: ReactNode;
  /** e.g. "Target market" */
  targetLabel: string;
  /** Flag emoji for the target market, e.g. "🇩🇪" */
  targetFlag: string;
  targetContent: ReactNode;
  /** Short tag-length phrases rendered as accent pills below the pair. */
  keyChanges?: string[];
  className?: string;
}

/**
 * The home → target primitive (DESIGN.md "The delta is a primitive").
 * Home track is dashed/muted (context you already own); target track is
 * solid and accent-tinted. Stacks to one column under 760px, and the
 * gutter marker rotates 90° to keep reading top-to-bottom.
 */
export function DeltaPair({
  homeLabel,
  homeFlag,
  homeContent,
  targetLabel,
  targetFlag,
  targetContent,
  keyChanges,
  className,
}: DeltaPairProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-stretch gap-4 max-[760px]:flex-col">
        {/* Home track — dashed border, muted ink: context already owned. */}
        <div
          className="min-w-0 flex-1 rounded-(--radius-md) border border-dashed p-4"
          style={{ borderColor: "var(--rule-strong)", color: "var(--ink-muted)" }}
        >
          <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em]">
            <span aria-hidden="true">{homeFlag}</span>
            <span>{homeLabel}</span>
          </div>
          <div className="text-[15px] leading-relaxed">{homeContent}</div>
        </div>

        {/* Gutter — 34px circular accent-soft marker, rotates under 760px. */}
        <div className="flex flex-shrink-0 items-center justify-center max-[760px]:py-1">
          <div
            aria-hidden="true"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full font-mono text-base max-[760px]:rotate-90"
            style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent-ink)" }}
          >
            →
          </div>
        </div>

        {/* Target track — solid border tinted accent, faint accent ring. */}
        <div
          className="min-w-0 flex-1 rounded-(--radius-md) border p-4"
          style={{
            borderColor: "var(--accent)",
            boxShadow: "0 0 0 1px var(--accent-soft)",
            color: "var(--ink)",
          }}
        >
          <div
            className="mb-2 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
            style={{ color: "var(--accent-ink)" }}
          >
            <span aria-hidden="true">{targetFlag}</span>
            <span>{targetLabel}</span>
          </div>
          <div className="text-[15px] leading-relaxed">{targetContent}</div>
        </div>
      </div>

      {keyChanges && keyChanges.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Key changes">
          {keyChanges.map((change) => (
            <li key={change}>
              <Pill tone="accent">{change}</Pill>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
