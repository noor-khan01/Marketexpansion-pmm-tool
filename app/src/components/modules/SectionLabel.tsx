import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

/** The small mono uppercase eyebrow used above every sub-section in a module view. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <h4
      className={cn("font-mono text-[11px] font-medium uppercase tracking-[0.1em]", className)}
      style={{ color: "var(--ink-faint)" }}
    >
      {children}
    </h4>
  );
}
