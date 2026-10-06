import Link from "next/link";

import type { Launch } from "@/lib/types";
import { getFlag } from "./flags";

export interface HeaderProps {
  launch: Launch;
  presentationMode: boolean;
  onTogglePresentation: () => void;
}

/**
 * FR-20: product name, home → target with flag emojis, business model
 * badge, and the three page actions. Action buttons (and, per FR-80,
 * Presentation mode itself) hide while presentation mode is active.
 */
export function Header({ launch, presentationMode, onTogglePresentation }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-2">
        <h1
          className="text-[31px] font-semibold leading-[1.1] tracking-[-0.02em]"
          style={{ color: "var(--ink)" }}
        >
          {launch.product_name}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-2 font-mono text-[13px]"
            style={{ color: "var(--ink-muted)" }}
          >
            <span aria-hidden="true">{getFlag(launch.home_market)}</span>
            <span>{launch.home_market}</span>
            <span aria-hidden="true" style={{ color: "var(--accent)" }}>
              →
            </span>
            <span aria-hidden="true">{getFlag(launch.target_market)}</span>
            <span style={{ color: "var(--ink)" }}>{launch.target_market}</span>
          </div>
          <span
            className="inline-flex items-center rounded-[2px] px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.04em]"
            style={{ color: "var(--ink-muted)", backgroundColor: "var(--sunk)" }}
          >
            {launch.business_model}
          </span>
        </div>
      </div>

      {!presentationMode && (
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/new?from=${launch.id}`}
            className="rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
            style={{ borderColor: "var(--rule-strong)", color: "var(--ink-muted)" }}
          >
            Duplicate for another market
          </Link>
          <button
            type="button"
            onClick={onTogglePresentation}
            className="rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
            style={{ borderColor: "var(--rule-strong)", color: "var(--ink-muted)" }}
          >
            Presentation mode
          </button>
          <Link
            href="/"
            className="rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
            style={{ borderColor: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Back to My Launches
          </Link>
        </div>
      )}
    </header>
  );
}
