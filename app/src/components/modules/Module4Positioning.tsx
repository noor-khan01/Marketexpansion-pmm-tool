import { DeltaPair } from "@/components/ui/DeltaPair";
import type { Positioning } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";
import { getFlag } from "./flags";

export interface Module4PositioningProps {
  data: Positioning;
  homeMarket: string;
  targetMarket: string;
}

/**
 * FR-33 — Positioning & messaging: home/target positioning as a delta pair
 * with key changes as tags, messaging pillars table, localisation notes,
 * and the target elevator pitch as a highlighted quote.
 */
export function Module4Positioning({ data, homeMarket, targetMarket }: Module4PositioningProps) {
  return (
    <div className="flex flex-col gap-6">
      <DeltaPair
        homeLabel={homeMarket}
        homeFlag={getFlag(homeMarket)}
        homeContent={data.home_positioning}
        targetLabel={targetMarket}
        targetFlag={getFlag(targetMarket)}
        targetContent={data.target_positioning}
        keyChanges={data.key_changes}
      />

      <div className="flex flex-col gap-2">
        <SectionLabel>Messaging pillars</SectionLabel>
        <div
          className="overflow-x-auto rounded-(--radius-md) border"
          style={{ borderColor: "var(--rule)" }}
        >
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--sunk)" }}>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Pillar
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Proof point needed
                </th>
              </tr>
            </thead>
            <tbody>
              {data.messaging_pillars.map((pillar) => (
                <tr key={pillar.pillar} className="border-t" style={{ borderColor: "var(--rule)" }}>
                  <td className="px-4 py-2.5 font-medium align-top" style={{ color: "var(--ink)" }}>
                    {pillar.pillar}
                  </td>
                  <td className="px-4 py-2.5 align-top" style={{ color: "var(--ink-muted)" }}>
                    {pillar.proof_point_needed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Localisation notes</SectionLabel>
        <ul className="flex flex-col gap-1.5 pl-4">
          {data.localisation_notes.map((note) => (
            <li key={note} className="list-disc leading-[1.6]" style={{ color: "var(--ink)" }}>
              {note}
            </li>
          ))}
        </ul>
      </div>

      <blockquote
        className="rounded-(--radius-md) border-l-4 p-4 italic leading-[1.6]"
        style={{
          borderColor: "var(--accent)",
          backgroundColor: "var(--accent-soft)",
          color: "var(--accent-ink)",
        }}
      >
        &ldquo;{data.elevator_pitch_target}&rdquo;
      </blockquote>
    </div>
  );
}
