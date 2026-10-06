import { cn } from "@/lib/utils";

export type SegBarTone = "accent" | "go";

export interface SegBarProps {
  /** Total number of segments in the bar. */
  total: number;
  /** How many segments (left to right) are filled. */
  filled: number;
  /**
   * Tone for each filled segment, left to right. A single tone applies to
   * every filled segment; an array lets a combined bar mix task segments
   * (`"accent"`) and go/no-go criteria segments (`"go"`) — DESIGN.md
   * "Instruments": "Go/no-go criteria segments use --go; task segments use
   * --accent; unfilled use --sunk." Defaults to `"accent"`.
   */
  tone?: SegBarTone | SegBarTone[];
  /** `"sm"` = 11×22px (readiness); `"lg"` = 13×26px (attractiveness-style reuse). */
  size?: "sm" | "lg";
  /** Accessible label, e.g. "6 of 10 ready". Also used as the visible legend if `showLabel`. */
  label?: string;
  showLabel?: boolean;
  className?: string;
}

const SEGMENT_SIZE: Record<NonNullable<SegBarProps["size"]>, string> = {
  sm: "w-[11px] h-[22px]",
  lg: "w-[13px] h-[26px]",
};

const TONE_COLOR: Record<SegBarTone, string> = {
  accent: "var(--accent)",
  go: "var(--go)",
};

/**
 * The shared "discrete segments, never smooth bars" instrument language
 * (DESIGN.md "Instruments") — used for readiness (tasks + go/no-go
 * criteria) and reusable anywhere else progress needs the same shape.
 */
export function SegBar({
  total,
  filled,
  tone = "accent",
  size = "sm",
  label,
  showLabel = false,
  className,
}: SegBarProps) {
  const clampedFilled = Math.max(0, Math.min(filled, total));
  const toneAt = (index: number): SegBarTone =>
    Array.isArray(tone) ? (tone[index] ?? "accent") : tone;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        role="img"
        aria-label={label ?? `${clampedFilled} of ${total} filled`}
        className="flex items-end gap-1"
      >
        {Array.from({ length: total }, (_, index) => {
          const isFilled = index < clampedFilled;
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length, purely positional segments with no other identity
              key={index}
              aria-hidden="true"
              className={cn("rounded-[1px]", SEGMENT_SIZE[size])}
              style={{
                backgroundColor: isFilled ? TONE_COLOR[toneAt(index)] : "var(--sunk)",
              }}
            />
          );
        })}
      </div>
      {showLabel && label && (
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
