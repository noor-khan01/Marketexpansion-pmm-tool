import type { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Pill, type PillTone } from "./Pill";

export interface SeverityRowProps {
  title: string;
  detail: string;
  area: string;
  severity: Severity;
  ownerRole: string;
  className?: string;
}

const STRIPE_COLOR: Record<Severity, string> = {
  High: "var(--stop)",
  Medium: "var(--cond)",
  Low: "var(--rule-strong)",
};

const SEVERITY_TONE: Record<Severity, PillTone> = {
  High: "stop",
  Medium: "cond",
  Low: "hold",
};

/**
 * A single legal/ops (or risk-shaped) row: 4px left stripe encoding
 * severity, title + detail, area pill, severity pill, owner role in mono
 * on the right (DESIGN.md "Severity rows"). Sort High → Low at the call site.
 */
export function SeverityRow({
  title,
  detail,
  area,
  severity,
  ownerRole,
  className,
}: SeverityRowProps) {
  return (
    <div
      className={cn(
        "flex gap-4 border-l-4 py-3 pl-4 pr-2 max-[600px]:flex-col max-[600px]:gap-2",
        className,
      )}
      style={{ borderColor: STRIPE_COLOR[severity] }}
    >
      <div className="min-w-0 flex-1">
        <div className="font-medium" style={{ color: "var(--ink)" }}>
          {title}
        </div>
        <div className="mt-0.5 text-sm" style={{ color: "var(--ink-muted)" }}>
          {detail}
        </div>
      </div>
      <div className="flex flex-shrink-0 items-start gap-2">
        <Pill tone="plain">{area}</Pill>
        <Pill tone={SEVERITY_TONE[severity]}>{severity}</Pill>
        <span
          className="font-mono text-[11px] uppercase tracking-[0.06em]"
          style={{ color: "var(--ink-faint)" }}
        >
          {ownerRole}
        </span>
      </div>
    </div>
  );
}
