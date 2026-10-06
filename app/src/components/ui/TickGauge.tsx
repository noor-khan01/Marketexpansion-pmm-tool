import { cn } from "@/lib/utils";

export interface TickGaugeProps {
  /** Attractiveness score, integer 1–10 (PRD §9.1 `attractiveness_score`). */
  score: number;
  /** Optional caption under the numeral, e.g. "Attractiveness". */
  label?: string;
  className?: string;
}

/**
 * The /10 attractiveness gauge: a big mono numeral plus 10 ticks, filled
 * accent (DESIGN.md "Instruments"). Fixed-length at 10 by definition of
 * the score's scale — unlike SegBar, which is sized per use.
 */
export function TickGauge({ score, label, className }: TickGaugeProps) {
  const clamped = Math.max(0, Math.min(Math.round(score), 10));

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline gap-2">
        <span
          className="tabular-nums font-mono text-[27px] font-semibold"
          style={{ color: "var(--ink)" }}
        >
          {clamped}
        </span>
        <span className="font-mono text-sm" style={{ color: "var(--ink-faint)" }}>
          /10
        </span>
      </div>
      <div
        role="img"
        aria-label={`${label ?? "Score"}: ${clamped} out of 10`}
        className="flex items-end gap-1"
      >
        {Array.from({ length: 10 }, (_, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length, purely positional ticks with no other identity
            key={index}
            aria-hidden="true"
            className="h-[26px] w-[13px] rounded-[1px]"
            style={{ backgroundColor: index < clamped ? "var(--accent)" : "var(--sunk)" }}
          />
        ))}
      </div>
      {label && (
        <span
          className="font-mono text-[11px] uppercase tracking-[0.1em]"
          style={{ color: "var(--ink-muted)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
