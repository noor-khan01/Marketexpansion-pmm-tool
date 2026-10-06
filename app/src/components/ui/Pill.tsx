import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type PillTone = "go" | "cond" | "stop" | "hold" | "accent" | "plain";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  children: React.ReactNode;
}

const TONE_STYLE: Record<PillTone, { color: string; background: string }> = {
  go: { color: "var(--go)", background: "var(--go-soft)" },
  cond: { color: "var(--cond)", background: "var(--cond-soft)" },
  stop: { color: "var(--stop)", background: "var(--stop-soft)" },
  hold: { color: "var(--hold)", background: "var(--hold-soft)" },
  accent: { color: "var(--accent-ink)", background: "var(--accent-soft)" },
  plain: { color: "var(--ink-muted)", background: "var(--sunk)" },
};

/**
 * A small status/label pill. Colour never carries meaning alone
 * (DESIGN.md non-negotiables) — the word is always rendered alongside it.
 */
export function Pill({ tone = "plain", className, style, children, ...props }: PillProps) {
  const toneStyle = TONE_STYLE[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.04em]",
        className,
      )}
      style={{ color: toneStyle.color, backgroundColor: toneStyle.background, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
