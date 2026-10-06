import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { flagFor } from "@/lib/countries";

export type Tone = "primary" | "success" | "warning" | "danger" | "neutral" | "outline";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary-soft-foreground border-primary/20",
  success: "bg-success-soft text-success border-success/25",
  warning: "bg-warning-soft text-warning border-warning/30",
  danger: "bg-danger-soft text-danger border-danger/25",
  neutral: "bg-neutral-soft text-neutral border-border-strong",
  outline: "bg-card text-muted-foreground border-border-strong",
};

/** UX-05: pill badge, always with text — never colour alone. */
export function Pill({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return <span className={cn("pill", toneClass[tone], className)}>{children}</span>;
}

export function levelTone(level: "High" | "Medium" | "Low"): Tone {
  return level === "High" ? "danger" : level === "Medium" ? "warning" : "neutral";
}

export function priorityTone(p: "Primary" | "Secondary" | "Test"): Tone {
  return p === "Primary" ? "primary" : p === "Secondary" ? "outline" : "neutral";
}

export function influenceTone(
  i: "Decision maker" | "Influencer" | "User" | "Blocker",
): Tone {
  if (i === "Decision maker") return "primary";
  if (i === "Blocker") return "danger";
  if (i === "Influencer") return "warning";
  return "neutral";
}

export function recommendationTone(r: "Go" | "Go with conditions" | "Not yet"): Tone {
  return r === "Go" ? "success" : r === "Go with conditions" ? "warning" : "neutral";
}

/** UX-04: country always shown with flag emoji. */
export function MarketPair({
  home,
  target,
  className,
}: {
  home: string;
  target: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 flex-wrap", className)}>
      <span aria-hidden>{flagFor(home)}</span>
      <span>{home}</span>
      <span className="text-muted-foreground" aria-label="to">
        →
      </span>
      <span aria-hidden>{flagFor(target)}</span>
      <span className="font-semibold">{target}</span>
    </span>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h4 className="text-sm font-bold tracking-wide text-foreground">{children}</h4>;
}

export function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-foreground">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** UX-06: truncate long text to 2 lines with Show more. */
export function Clamped({ text, className }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <p className={cn("text-foreground", !open && "line-clamp-2")}>{text}</p>
      {text.length > 120 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-1 text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          {open ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/60 p-4">
      <div className="eyebrow">{label}</div>
      <div className="mt-1 text-2xl font-bold text-foreground">{value}</div>
      {hint && <div className="text-sm text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-muted">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 text-sm font-bold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border align-top">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
