import { Pill } from "@/components/ui/Pill";
import { StatTiles } from "@/components/ui/StatTiles";
import { TickGauge } from "@/components/ui/TickGauge";
import type { MarketOpportunity } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";

export interface Module1MarketOpportunityProps {
  data: MarketOpportunity;
}

/** FR-30 — Market opportunity: gauge, maturity, summary, demand signals, TAM/SAM/SOM, rationale. */
export function Module1MarketOpportunity({ data }: Module1MarketOpportunityProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start gap-6">
        <TickGauge score={data.attractiveness_score} label="Attractiveness" />
        <div className="flex flex-col gap-2">
          <SectionLabel>Maturity</SectionLabel>
          <Pill tone="accent">{data.maturity}</Pill>
        </div>
      </div>

      <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink)" }}>
        {data.market_summary}
      </p>

      <div className="flex flex-col gap-2">
        <SectionLabel>Demand signals</SectionLabel>
        <ul className="flex flex-col gap-1.5 pl-4">
          {data.demand_signals.map((signal) => (
            <li key={signal} className="list-disc leading-[1.6]" style={{ color: "var(--ink)" }}>
              {signal}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Market size</SectionLabel>
        <StatTiles size={data.size_estimate} />
      </div>

      <div className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: "var(--rule)" }}>
        <SectionLabel>Rationale</SectionLabel>
        <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
          {data.rationale}
        </p>
      </div>
    </div>
  );
}
