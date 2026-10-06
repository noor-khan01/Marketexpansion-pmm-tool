import Link from "next/link";

import { primaryButtonClasses, primaryButtonStyle } from "./button-styles";

/** FR-06: shown on My Launches only when there are no saved launches. */
export function EmptyState() {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-(--radius-md) border border-dashed p-12 text-center"
      style={{ borderColor: "var(--rule-strong)" }}
    >
      <p className="text-[16px]" style={{ color: "var(--ink-muted)" }}>
        No launches yet
      </p>
      <Link href="/new" className={primaryButtonClasses} style={primaryButtonStyle}>
        New launch
      </Link>
    </div>
  );
}
