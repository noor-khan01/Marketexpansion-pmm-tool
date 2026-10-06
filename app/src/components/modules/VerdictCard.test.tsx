import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { getLaunchBundle } from "@/lib/placeholder-data";
import type { ModuleStatusMap } from "@/lib/types";
import { VerdictCard } from "./VerdictCard";

const allDone: ModuleStatusMap = {
  market_opportunity: "done",
  customer_buying: "done",
  competition: "done",
  positioning: "done",
  pricing: "done",
  routes_to_market: "done",
  legal_ops: "done",
  localisation: "done",
  launch_plan: "done",
  kpis_risks: "done",
};

const summary = getLaunchBundle("launch-ledgerflow-de")?.launch.executive_summary;
if (!summary) throw new Error("Expected the LedgerFlow seed executive summary");

describe("VerdictCard", () => {
  it("blocks the summary when any module is in error state (FR-55)", () => {
    const withError: ModuleStatusMap = { ...allDone, legal_ops: "error" };
    render(
      <VerdictCard
        summary={summary}
        moduleStatuses={withError}
        summaryGenerating={false}
        planChanged={false}
        onRegenerateSummary={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Fix the sections with errors to generate the summary."),
    ).toBeInTheDocument();
    expect(screen.queryByText(summary.headline)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Regenerate summary" })).not.toBeInTheDocument();
  });

  it("shows the waiting copy while modules are still generating (FR-51)", () => {
    const stillGenerating: ModuleStatusMap = { ...allDone, kpis_risks: "loading" };
    render(
      <VerdictCard
        summary={null}
        moduleStatuses={stillGenerating}
        summaryGenerating={false}
        planChanged={false}
        onRegenerateSummary={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Executive summary will appear when all sections are ready."),
    ).toBeInTheDocument();
  });

  it("renders the full verdict once all modules are done and no module has errored", () => {
    render(
      <VerdictCard
        summary={summary}
        moduleStatuses={allDone}
        summaryGenerating={false}
        planChanged={false}
        onRegenerateSummary={vi.fn()}
      />,
    );

    expect(screen.getByText(summary.headline)).toBeInTheDocument();
    expect(screen.getByText(summary.recommendation)).toBeInTheDocument();
  });
});
