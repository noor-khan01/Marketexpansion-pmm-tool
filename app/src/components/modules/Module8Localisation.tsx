import type { Localisation } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";

export interface Module8LocalisationProps {
  data: Localisation;
}

const GROUPS: { key: keyof Localisation; label: string }[] = [
  { key: "language", label: "Language" },
  { key: "product", label: "Product" },
  { key: "support", label: "Support" },
  { key: "sales_enablement", label: "Sales enablement" },
  { key: "proof_and_references", label: "Proof & references" },
];

/**
 * FR-37 — Localisation & readiness: five grouped checklists, display only
 * (these describe work to scope, not tasks to tick — those live in
 * module 9's launch plan instead).
 */
export function Module8Localisation({ data }: Module8LocalisationProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 max-[560px]:grid-cols-1">
      {GROUPS.map(({ key, label }) => (
        <div key={key} className="flex flex-col gap-2">
          <SectionLabel>{label}</SectionLabel>
          <ul className="flex flex-col gap-1.5">
            {data[key].map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-[1.6]"
                style={{ color: "var(--ink)" }}
              >
                <span aria-hidden="true" style={{ color: "var(--ink-faint)" }}>
                  ▢
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
