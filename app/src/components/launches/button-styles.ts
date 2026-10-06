import type { CSSProperties } from "react";

/**
 * Shared button treatments for this route group. `--surface` doubles as
 * the primary button's text colour on purpose: it's white in light mode
 * (light text on the dark-indigo accent) and near-black in dark mode
 * (dark text on the lighter accent) — one token, correct contrast in both
 * themes, no new colour introduced.
 */
export const primaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-sm) px-4 py-2 text-[14px] font-medium disabled:cursor-not-allowed disabled:opacity-50";

export const primaryButtonStyle: CSSProperties = {
  backgroundColor: "var(--accent)",
  color: "var(--surface)",
};

export const secondaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-sm) border px-4 py-2 text-[14px] font-medium disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButtonStyle: CSSProperties = {
  borderColor: "var(--rule-strong)",
  color: "var(--ink)",
  backgroundColor: "var(--surface)",
};
