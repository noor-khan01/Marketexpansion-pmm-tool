import { Pill, type PillTone } from "@/components/ui/Pill";
import type { ChannelPriority, RoutesToMarket } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";

export interface Module6RoutesToMarketProps {
  data: RoutesToMarket;
}

const PRIORITY_TONE: Record<ChannelPriority, PillTone> = {
  Primary: "go",
  Secondary: "cond",
  Test: "plain",
};

/**
 * FR-35 — Routes to market: entry mode as a headline badge (the module's
 * one recommended action, so it earns accent), channels table, partner
 * type cards, events & communities.
 */
export function Module6RoutesToMarket({ data }: Module6RoutesToMarketProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SectionLabel>Recommended entry mode</SectionLabel>
        <div className="flex items-center gap-3">
          <Pill tone="accent" className="px-2.5 py-1 text-[13px]">
            {data.recommended_entry_mode}
          </Pill>
        </div>
        <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
          {data.rationale}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Channels</SectionLabel>
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
                  Channel
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Role
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Priority
                </th>
              </tr>
            </thead>
            <tbody>
              {data.channels.map((channel) => (
                <tr
                  key={channel.channel}
                  className="border-t"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <td className="px-4 py-2.5 font-medium align-top" style={{ color: "var(--ink)" }}>
                    {channel.channel}
                  </td>
                  <td className="px-4 py-2.5 align-top" style={{ color: "var(--ink-muted)" }}>
                    {channel.role}
                  </td>
                  <td className="px-4 py-2.5 align-top">
                    <Pill tone={PRIORITY_TONE[channel.priority]}>{channel.priority}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Partner types</SectionLabel>
        <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
          {data.partner_types.map((partner) => (
            <div
              key={partner.type}
              className="flex flex-col gap-1.5 rounded-(--radius-md) border p-4"
              style={{ borderColor: "var(--rule)", backgroundColor: "var(--paper)" }}
            >
              <span className="font-medium" style={{ color: "var(--ink)" }}>
                {partner.type}
              </span>
              <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                {partner.why}
              </p>
              <ul className="mt-1 flex flex-col gap-0.5 pl-4">
                {partner.examples_to_research.map((example) => (
                  <li
                    key={example}
                    className="list-disc text-sm"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: "var(--rule)" }}>
        <SectionLabel>Events &amp; communities</SectionLabel>
        <ul className="flex flex-wrap gap-2">
          {data.events_and_communities.map((item) => (
            <li key={item}>
              <Pill tone="plain">{item}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
