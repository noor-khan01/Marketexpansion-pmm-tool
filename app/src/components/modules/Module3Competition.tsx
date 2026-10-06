import { Pill, type PillTone } from "@/components/ui/Pill";
import type { Competition, CompetitorType } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";

export interface Module3CompetitionProps {
  data: Competition;
}

const TYPE_TONE: Record<CompetitorType, PillTone> = {
  "Local incumbent": "cond",
  "Global player": "plain",
  "Status quo": "hold",
};

/** FR-32 — Competitive landscape: competitor cards plus a status-quo callout. */
export function Module3Competition({ data }: Module3CompetitionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
        {data.competitors.map((competitor) => (
          <div
            key={competitor.name}
            className="flex flex-col gap-2 rounded-(--radius-md) border p-4"
            style={{ borderColor: "var(--rule)", backgroundColor: "var(--paper)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium" style={{ color: "var(--ink)" }}>
                {competitor.name}
              </span>
              <Pill tone={TYPE_TONE[competitor.type]}>{competitor.type}</Pill>
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              <p style={{ color: "var(--ink-muted)" }}>
                <span className="font-medium" style={{ color: "var(--ink)" }}>
                  Strength:{" "}
                </span>
                {competitor.strength}
              </p>
              <p style={{ color: "var(--ink-muted)" }}>
                <span className="font-medium" style={{ color: "var(--ink)" }}>
                  Weakness:{" "}
                </span>
                {competitor.weakness}
              </p>
              <p style={{ color: "var(--ink-muted)" }}>
                <span className="font-medium" style={{ color: "var(--accent-ink)" }}>
                  How to win:{" "}
                </span>
                {competitor.how_to_win}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col gap-1 rounded-(--radius-md) border p-4"
        style={{ borderColor: "var(--rule-strong)", backgroundColor: "var(--sunk)" }}
      >
        <SectionLabel>Status quo alternative</SectionLabel>
        <p style={{ color: "var(--ink)" }}>{data.status_quo_alternative}</p>
      </div>
    </div>
  );
}
