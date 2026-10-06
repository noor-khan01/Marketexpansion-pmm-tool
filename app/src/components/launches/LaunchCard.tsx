import Link from "next/link";

import { Pill, type PillTone } from "@/components/ui/Pill";
import { SegBar } from "@/components/ui/SegBar";
import type { Launch, Recommendation } from "@/lib/types";
import { findCountryCode, flagEmoji } from "./countries";
import type { Readiness } from "./launch-store";

export interface LaunchCardProps {
  launch: Launch;
  readiness: Readiness;
  onDeleteRequest: () => void;
}

const RECOMMENDATION_TONE: Record<Recommendation, PillTone> = {
  Go: "go",
  "Go with conditions": "cond",
  // "Not yet" is grey, not red — it's a timing call, not a failure (DESIGN.md).
  "Not yet": "hold",
};

// A launch can have 25+ tasks/criteria — one SegBar segment per item would
// overflow a card at 375px. The card shows a fixed-size proportional
// instrument instead; the exact counts still live in the accessible label.
const CARD_SEGMENT_COUNT = 10;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function countryFlag(name: string): string {
  const code = findCountryCode(name);
  return code ? flagEmoji(code) : "🏳️";
}

/** A single My Launches card — FR-01 through FR-03. */
export function LaunchCard({ launch, readiness, onDeleteRequest }: LaunchCardProps) {
  return (
    <div
      className="relative rounded-(--radius-md) border"
      style={{
        borderColor: "var(--rule)",
        backgroundColor: "var(--surface)",
        boxShadow: "var(--shadow-sit)",
      }}
    >
      <Link href={`/launch/${launch.id}`} className="block rounded-(--radius-md) p-5 pr-10">
        <h3 className="text-[16px] font-semibold leading-snug" style={{ color: "var(--ink)" }}>
          {launch.product_name}
        </h3>

        <div
          className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[13px]"
          style={{ color: "var(--ink-muted)" }}
        >
          <span>
            <span aria-hidden="true">{countryFlag(launch.home_market)}</span> {launch.home_market}
          </span>
          <span aria-hidden="true" style={{ color: "var(--accent)" }}>
            →
          </span>
          <span style={{ color: "var(--accent-ink)" }}>
            <span aria-hidden="true">{countryFlag(launch.target_market)}</span>{" "}
            {launch.target_market}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Pill tone="plain">{launch.business_model}</Pill>
          {launch.executive_summary ? (
            <Pill tone={RECOMMENDATION_TONE[launch.executive_summary.recommendation]}>
              {launch.executive_summary.recommendation}
            </Pill>
          ) : null}
          {launch.is_example ? <Pill tone="plain">Example</Pill> : null}
        </div>

        {readiness.total > 0 ? (
          <div className="mt-4 flex items-center gap-3">
            <span
              className="tabular-nums font-mono text-[15px] font-semibold"
              style={{ color: "var(--ink)" }}
            >
              {readiness.percent}%
            </span>
            <SegBar
              total={CARD_SEGMENT_COUNT}
              filled={Math.round((readiness.percent / 100) * CARD_SEGMENT_COUNT)}
              size="sm"
              label={`${readiness.done} of ${readiness.total} ready`}
            />
          </div>
        ) : (
          <p
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.06em]"
            style={{ color: "var(--ink-faint)" }}
          >
            Not started
          </p>
        )}

        <p
          className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em]"
          style={{ color: "var(--ink-faint)" }}
        >
          Created {dateFormatter.format(new Date(launch.created_at))}
        </p>
      </Link>

      <button
        type="button"
        onClick={onDeleteRequest}
        aria-label={`Delete ${launch.product_name}`}
        className="absolute right-3 top-3 rounded-(--radius-sm) px-1.5 py-1 text-[13px] font-medium"
        style={{ color: "var(--ink-faint)" }}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}
