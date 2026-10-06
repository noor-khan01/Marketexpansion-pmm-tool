import { Pill, type PillTone } from "@/components/ui/Pill";
import type { BusinessModel, CustomerBuying, Influence } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";

export interface Module2CustomerBuyingProps {
  data: CustomerBuying;
  businessModel: BusinessModel;
}

const INFLUENCE_TONE: Record<Influence, PillTone> = {
  "Decision maker": "accent",
  Influencer: "cond",
  User: "plain",
  Blocker: "stop",
};

/**
 * FR-31 — Customer & buying process: ICP block, buying committee grid
 * (retitled "Consumer segments" for B2C), buying process with the
 * home-vs-target differences list.
 */
export function Module2CustomerBuying({ data, businessModel }: Module2CustomerBuyingProps) {
  const committeeTitle = businessModel === "B2C" ? "Consumer segments" : "Buying committee";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SectionLabel>Ideal customer profile</SectionLabel>
        <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink)" }}>
          {data.icp.description}
        </p>
        <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
          {data.icp.company_size_or_segment}
        </p>
        <ul className="mt-1 flex flex-wrap gap-2" aria-label="Industries or interests">
          {data.icp.industries_or_interests.map((interest) => (
            <li key={interest}>
              <Pill tone="plain">{interest}</Pill>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col gap-1">
          <SectionLabel>Buying triggers</SectionLabel>
          <ul className="flex flex-col gap-1 pl-4">
            {data.icp.buying_triggers.map((trigger) => (
              <li key={trigger} className="list-disc text-sm" style={{ color: "var(--ink-muted)" }}>
                {trigger}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>{committeeTitle}</SectionLabel>
        <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
          {data.buying_committee.map((member) => (
            <div
              key={member.role}
              className="flex flex-col gap-2 rounded-(--radius-md) border p-4"
              style={{ borderColor: "var(--rule)", backgroundColor: "var(--paper)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium" style={{ color: "var(--ink)" }}>
                  {member.role}
                </span>
                <Pill tone={INFLUENCE_TONE[member.influence]}>{member.influence}</Pill>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                {member.cares_about}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: "var(--rule)" }}>
        <SectionLabel>Buying process · {data.buying_process.typical_cycle}</SectionLabel>
        <ol className="flex flex-col gap-1.5">
          {data.buying_process.steps.map((step, index) => (
            <li key={step} className="flex gap-2 leading-[1.6]" style={{ color: "var(--ink)" }}>
              <span
                className="tabular-nums font-mono text-sm"
                style={{ color: "var(--ink-faint)" }}
              >
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-2 flex flex-col gap-1">
          <SectionLabel>What&apos;s different from home market</SectionLabel>
          <ul className="flex flex-col gap-1 pl-4">
            {data.buying_process.home_vs_target_differences.map((difference) => (
              <li
                key={difference}
                className="list-disc text-sm"
                style={{ color: "var(--ink-muted)" }}
              >
                {difference}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
