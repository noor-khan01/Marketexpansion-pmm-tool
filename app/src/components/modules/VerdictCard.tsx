"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Pill, type PillTone } from "@/components/ui/Pill";
import type { ExecutiveSummary, ModuleStatusMap, Recommendation } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface VerdictCardProps {
  summary: ExecutiveSummary | null;
  moduleStatuses: ModuleStatusMap;
  summaryGenerating: boolean;
  planChanged: boolean;
  onRegenerateSummary: () => void;
  /** Skips the "settles after the last module" entrance delay — used once modules have already landed. */
  skipEntranceDelay?: boolean;
  /** FR-80: presentation mode hides every Regenerate control, including this one. */
  presentationMode?: boolean;
  className?: string;
}

const RECOMMENDATION_TONE: Record<Recommendation, PillTone> = {
  Go: "go",
  "Go with conditions": "cond",
  "Not yet": "hold",
};

const RECOMMENDATION_BORDER: Record<Recommendation, string> = {
  Go: "var(--go)",
  "Go with conditions": "var(--cond)",
  "Not yet": "var(--hold)",
};

/**
 * The executive summary — the loudest object on the page (DESIGN.md "the
 * verdict outranks everything"): 4px top border in status colour,
 * shadow-lift, the page's only serif headline, badge + two numbered
 * columns. "Not yet" reads grey, never red (FR-53 note, DESIGN.md).
 */
export function VerdictCard({
  summary,
  moduleStatuses,
  summaryGenerating,
  planChanged,
  onRegenerateSummary,
  skipEntranceDelay,
  presentationMode,
  className,
}: VerdictCardProps) {
  const reduceMotion = useReducedMotion();
  const statuses = Object.values(moduleStatuses);
  const hasError = statuses.some((status) => status === "error");
  const allDone = statuses.every((status) => status === "done");

  const shellStyle = {
    borderColor: "var(--rule)",
    backgroundColor: "var(--surface)",
    boxShadow: "var(--shadow-lift)",
  };

  // FR-55: an errored module blocks the summary outright.
  if (hasError) {
    return (
      <section
        className={cn("rounded-(--radius-md) border border-t-4 p-6", className)}
        style={{ ...shellStyle, borderTopColor: "var(--stop)" }}
      >
        <p className="font-medium" style={{ color: "var(--ink)" }}>
          Fix the sections with errors to generate the summary.
        </p>
      </section>
    );
  }

  // FR-51: still waiting on modules.
  if (!allDone) {
    return (
      <section
        className={cn("rounded-(--radius-md) border border-t-4 p-6", className)}
        style={{ ...shellStyle, borderTopColor: "var(--rule-strong)" }}
      >
        <p style={{ color: "var(--ink-muted)" }}>
          Executive summary will appear when all sections are ready.
        </p>
      </section>
    );
  }

  // Summary itself is generating (initial or after a regenerate).
  if (summaryGenerating || !summary) {
    return (
      <section
        className={cn("rounded-(--radius-md) border border-t-4 p-6", className)}
        style={{ ...shellStyle, borderTopColor: "var(--rule-strong)" }}
        aria-busy="true"
      >
        <p style={{ color: "var(--ink-muted)" }}>Generating executive summary…</p>
      </section>
    );
  }

  const tone = RECOMMENDATION_TONE[summary.recommendation];

  return (
    <motion.section
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.32,
        delay: reduceMotion || skipEntranceDelay ? 0 : 0.72,
        ease: "easeOut",
      }}
      className={cn("rounded-(--radius-md) border border-t-4 p-6", className)}
      style={{ ...shellStyle, borderTopColor: RECOMMENDATION_BORDER[summary.recommendation] }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <Pill tone={tone}>{summary.recommendation}</Pill>
          <h2
            className="max-w-[22em] font-serif text-[37px] leading-[1.16]"
            style={{ color: "var(--ink)" }}
          >
            {summary.headline}
          </h2>
        </div>
        {!presentationMode && (
          <button
            type="button"
            onClick={onRegenerateSummary}
            className="flex-shrink-0 rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
            style={{ borderColor: "var(--rule-strong)", color: "var(--ink-muted)" }}
          >
            Regenerate summary
          </button>
        )}
      </div>

      {planChanged && !presentationMode && (
        <div
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-(--radius-sm) border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--cond)",
            backgroundColor: "var(--cond-soft)",
            color: "var(--cond)",
          }}
        >
          <span>Plan changed. Regenerate summary?</span>
          <button
            type="button"
            onClick={onRegenerateSummary}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] underline underline-offset-2"
          >
            Regenerate
          </button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <h3
            className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
            style={{ color: "var(--ink-faint)" }}
          >
            Top priorities
          </h3>
          <ol className="flex flex-col gap-2">
            {summary.top_priorities.map((priority, index) => (
              <li key={priority} className="flex gap-2 text-[15px]" style={{ color: "var(--ink)" }}>
                <span className="tabular-nums font-mono" style={{ color: "var(--ink-faint)" }}>
                  {index + 1}
                </span>
                <span>{priority}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-2">
          <h3
            className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
            style={{ color: "var(--ink-faint)" }}
          >
            Top risks
          </h3>
          <ol className="flex flex-col gap-2">
            {summary.top_risks.map((risk, index) => (
              <li key={risk} className="flex gap-2 text-[15px]" style={{ color: "var(--ink)" }}>
                <span className="tabular-nums font-mono" style={{ color: "var(--ink-faint)" }}>
                  {index + 1}
                </span>
                <span>{risk}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--rule)" }}>
        <h3
          className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
          style={{ color: "var(--ink-faint)" }}
        >
          First 90 days
        </h3>
        <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
          {summary.first_90_days}
        </p>
      </div>
    </motion.section>
  );
}
