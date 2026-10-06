"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

export interface ExpandableTextProps {
  text: string;
  /** Below this length the text never truncates — no toggle is rendered. */
  threshold?: number;
  className?: string;
}

/**
 * Long text (task descriptions, rationales) truncates to 2 lines with a
 * "Show more" toggle — UX-06. Only renders the toggle when the text is
 * actually long enough to plausibly overflow two lines.
 */
export function ExpandableText({ text, threshold = 90, className }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const canTruncate = text.length > threshold;

  return (
    <div className={className}>
      <p
        id={id}
        className={cn("text-sm", !expanded && canTruncate && "line-clamp-2")}
        style={{ color: "var(--ink-muted)" }}
      >
        {text}
      </p>
      {canTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] underline-offset-2 hover:underline"
          style={{ color: "var(--accent-ink)" }}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
