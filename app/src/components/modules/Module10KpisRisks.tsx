"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Pill, type PillTone } from "@/components/ui/Pill";
import type { Criterion, Impact, KpisRisks, Likelihood } from "@/lib/types";
import { SectionLabel } from "./SectionLabel";

export interface Module10KpisRisksProps {
  data: KpisRisks;
  criteria: Criterion[];
  onToggleCriterion: (criterionId: string) => void;
}

const LEVEL_TONE: Record<Likelihood | Impact, PillTone> = {
  High: "stop",
  Medium: "cond",
  Low: "hold",
};

const LEVEL_RANK: Record<Likelihood | Impact, number> = { High: 0, Medium: 1, Low: 2 };

/**
 * FR-39 — KPIs, go/no-go & risks: KPI table, a tickable go/no-go checklist
 * (state lives with the parent so it can be saved), and a risks table
 * sorted so High-likelihood/High-impact rows surface first.
 */
export function Module10KpisRisks({ data, criteria, onToggleCriterion }: Module10KpisRisksProps) {
  const reduceMotion = useReducedMotion();
  const sortedRisks = [...data.risks].sort(
    (a, b) =>
      LEVEL_RANK[a.likelihood] +
      LEVEL_RANK[a.impact] -
      (LEVEL_RANK[b.likelihood] + LEVEL_RANK[b.impact]),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SectionLabel>KPIs</SectionLabel>
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
                  Metric
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Target guidance
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Phase
                </th>
              </tr>
            </thead>
            <tbody>
              {data.kpis.map((kpi) => (
                <tr key={kpi.metric} className="border-t" style={{ borderColor: "var(--rule)" }}>
                  <td className="px-4 py-2.5 font-medium align-top" style={{ color: "var(--ink)" }}>
                    {kpi.metric}
                  </td>
                  <td
                    className="tabular-nums px-4 py-2.5 font-mono align-top"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {kpi.target_guidance}
                  </td>
                  <td className="px-4 py-2.5 align-top" style={{ color: "var(--ink-muted)" }}>
                    {kpi.phase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Go/no-go criteria</SectionLabel>
        <ul className="flex flex-col gap-2">
          {criteria.map((criterion) => {
            const checkboxId = `criterion-${criterion.id}`;
            return (
              <li key={criterion.id} className="flex items-start gap-2">
                <motion.input
                  id={checkboxId}
                  type="checkbox"
                  checked={criterion.done}
                  onChange={() => onToggleCriterion(criterion.id)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ accentColor: "var(--go)" }}
                  animate={reduceMotion ? undefined : { scale: criterion.done ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.12 }}
                />
                <label
                  htmlFor={checkboxId}
                  className="text-sm leading-snug"
                  style={{
                    color: criterion.done ? "var(--ink-faint)" : "var(--ink)",
                    textDecoration: criterion.done ? "line-through" : "none",
                  }}
                >
                  {criterion.text}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: "var(--rule)" }}>
        <SectionLabel>Risks</SectionLabel>
        <div
          className="overflow-x-auto rounded-(--radius-md) border"
          style={{ borderColor: "var(--rule)" }}
        >
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--sunk)" }}>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Risk
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Likelihood
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Impact
                </th>
                <th
                  className="px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Mitigation
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRisks.map((risk) => (
                <tr key={risk.risk} className="border-t" style={{ borderColor: "var(--rule)" }}>
                  <td className="px-4 py-2.5 font-medium align-top" style={{ color: "var(--ink)" }}>
                    {risk.risk}
                  </td>
                  <td className="px-4 py-2.5 align-top">
                    <Pill tone={LEVEL_TONE[risk.likelihood]}>{risk.likelihood}</Pill>
                  </td>
                  <td className="px-4 py-2.5 align-top">
                    <Pill tone={LEVEL_TONE[risk.impact]}>{risk.impact}</Pill>
                  </td>
                  <td className="px-4 py-2.5 align-top" style={{ color: "var(--ink-muted)" }}>
                    {risk.mitigation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
