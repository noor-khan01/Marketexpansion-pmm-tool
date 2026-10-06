import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Launch } from "@/lib/types";
import { LaunchCard } from "./LaunchCard";

const baseLaunch: Launch = {
  id: "launch-test-1",
  created_at: "2026-08-14T09:30:00.000Z",
  product_name: "LedgerFlow – cloud invoicing for SMBs",
  product_description: "Cloud invoicing for SMBs.",
  industry: "Fintech / SaaS",
  business_model: "B2B",
  home_market: "United Kingdom",
  target_market: "Germany",
  current_presence: "None",
  target_customer: "SMB finance teams",
  sales_motion: "Hybrid",
  deal_size: "£3k–£15k ACV",
  entry_goal: "Soft launch",
  timeline: "6 months",
  team_and_budget: "3 people",
  status: "complete",
  modules: {},
  module_status: {
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
  },
  executive_summary: {
    recommendation: "Go with conditions",
    headline: "Headline.",
    top_priorities: ["a", "b", "c"],
    top_risks: ["a", "b", "c"],
    first_90_days: "First 90 days.",
  },
  is_example: true,
};

describe("LaunchCard", () => {
  it("shows the recommendation badge and readiness percentage", () => {
    render(
      <LaunchCard
        launch={baseLaunch}
        readiness={{ done: 5, total: 10, percent: 50 }}
        onDeleteRequest={vi.fn()}
      />,
    );
    expect(screen.getByText("Go with conditions")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "5 of 10 ready" })).toBeInTheDocument();
  });

  it("shows product name, markets and the Example badge", () => {
    render(
      <LaunchCard
        launch={baseLaunch}
        readiness={{ done: 0, total: 0, percent: 0 }}
        onDeleteRequest={vi.fn()}
      />,
    );
    expect(screen.getByText("LedgerFlow – cloud invoicing for SMBs")).toBeInTheDocument();
    expect(screen.getByText(/United Kingdom/)).toBeInTheDocument();
    expect(screen.getByText(/Germany/)).toBeInTheDocument();
    expect(screen.getByText("Example")).toBeInTheDocument();
    expect(screen.getByText("Not started")).toBeInTheDocument();
  });

  it("links to the launch's Results page", () => {
    render(
      <LaunchCard
        launch={baseLaunch}
        readiness={{ done: 0, total: 0, percent: 0 }}
        onDeleteRequest={vi.fn()}
      />,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/launch/launch-test-1");
  });

  it("does not render a coloured 'Not yet' as a failure — it uses the hold tone, not stop", () => {
    if (!baseLaunch.executive_summary)
      throw new Error("Expected baseLaunch to have an executive_summary");
    const launch: Launch = {
      ...baseLaunch,
      executive_summary: { ...baseLaunch.executive_summary, recommendation: "Not yet" },
    };
    render(
      <LaunchCard
        launch={launch}
        readiness={{ done: 0, total: 10, percent: 0 }}
        onDeleteRequest={vi.fn()}
      />,
    );
    const badge = screen.getByText("Not yet");
    expect(badge).toHaveStyle({ color: "var(--hold)" });
  });

  it("calls onDeleteRequest when the delete button is clicked, without navigating", () => {
    const onDeleteRequest = vi.fn();
    render(
      <LaunchCard
        launch={baseLaunch}
        readiness={{ done: 0, total: 0, percent: 0 }}
        onDeleteRequest={onDeleteRequest}
      />,
    );
    screen.getByRole("button", { name: /delete/i }).click();
    expect(onDeleteRequest).toHaveBeenCalledTimes(1);
  });
});
