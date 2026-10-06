import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * A single shimmering placeholder block. Shape it with className
 * (width/height/rounded) to mimic the real content it stands in for —
 * DESIGN.md: "skeleton placeholder shaped like the module content."
 */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn("skeleton-shimmer rounded-(--radius-sm)", className)}
      style={style}
    />
  );
}
