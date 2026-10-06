import type { Pricing } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";

export interface Module5PricingProps {
  data: Pricing;
}

/** FR-34 — Pricing & packaging: six labelled sub-sections. */
export function Module5Pricing({ data }: Module5PricingProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <SectionLabel>Pricing norms</SectionLabel>
        <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink)" }}>
          {data.pricing_norms}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <SectionLabel>Recommended approach</SectionLabel>
        <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink)" }}>
          {data.recommended_approach}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <SectionLabel>Currency &amp; tax notes</SectionLabel>
          <ul className="flex flex-col gap-1 pl-4">
            {data.currency_and_tax_notes.map((note) => (
              <li
                key={note}
                className="list-disc text-sm leading-[1.6]"
                style={{ color: "var(--ink-muted)" }}
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1.5">
          <SectionLabel>Payment &amp; contract norms</SectionLabel>
          <ul className="flex flex-col gap-1 pl-4">
            {data.payment_and_contract_norms.map((note) => (
              <li
                key={note}
                className="list-disc text-sm leading-[1.6]"
                style={{ color: "var(--ink-muted)" }}
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <SectionLabel>Discounting norms</SectionLabel>
        <p className="max-w-[65ch] leading-[1.6]" style={{ color: "var(--ink)" }}>
          {data.discounting_norms}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 border-t pt-4" style={{ borderColor: "var(--rule)" }}>
        <SectionLabel>Risks</SectionLabel>
        <ul className="flex flex-col gap-1 pl-4">
          {data.risks.map((risk) => (
            <li
              key={risk}
              className="list-disc text-sm leading-[1.6]"
              style={{ color: "var(--ink-muted)" }}
            >
              {risk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
