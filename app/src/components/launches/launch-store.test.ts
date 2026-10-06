import { beforeEach, describe, expect, it } from "vitest";

import {
  __resetLaunchStoreForTests,
  addLaunch,
  deleteLaunch,
  getLaunchById,
  getReadiness,
  getSnapshot,
} from "./launch-store";

const validInput = {
  product_name: "Test product",
  product_description: "A description.",
  industry: "Fintech",
  business_model: "B2B" as const,
  home_market: "United Kingdom",
  target_market: "Germany",
  current_presence: "None" as const,
  target_customer: "SMB finance teams",
  sales_motion: "Hybrid" as const,
  deal_size: null,
  entry_goal: "Soft launch" as const,
  timeline: "6 months" as const,
  team_and_budget: null,
};

describe("launch-store", () => {
  beforeEach(() => {
    __resetLaunchStoreForTests();
  });

  it("includes the seed launches by default", () => {
    const launches = getSnapshot();
    expect(launches.some((launch) => launch.id === "launch-ledgerflow-de")).toBe(true);
    expect(launches.some((launch) => launch.id === "launch-glowlab-fr")).toBe(true);
  });

  it("addLaunch creates a launch with waiting modules and no executive summary", () => {
    const launch = addLaunch(validInput);
    expect(launch.status).toBe("generating");
    expect(launch.executive_summary).toBeNull();
    expect(launch.is_example).toBe(false);
    expect(launch.module_status.market_opportunity).toBe("waiting");
    expect(getLaunchById(launch.id)).toEqual(launch);
  });

  it("addLaunch puts the new launch first (newest first)", () => {
    const launch = addLaunch(validInput);
    expect(getSnapshot()[0]?.id).toBe(launch.id);
  });

  it("deleteLaunch removes a user-created launch", () => {
    const launch = addLaunch(validInput);
    deleteLaunch(launch.id);
    expect(getLaunchById(launch.id)).toBeUndefined();
  });

  it("deleteLaunch also removes an example/seed launch", () => {
    deleteLaunch("launch-ledgerflow-de");
    expect(getLaunchById("launch-ledgerflow-de")).toBeUndefined();
    expect(getSnapshot().some((launch) => launch.id === "launch-ledgerflow-de")).toBe(false);
  });

  it("getReadiness computes the FR-60 formula and rounds to a whole number", () => {
    const readiness = getReadiness("launch-ledgerflow-de");
    expect(readiness.total).toBeGreaterThan(0);
    expect(readiness.percent).toBe(Math.round((readiness.done / readiness.total) * 100));
  });

  it("getReadiness returns 0% for a launch with no tasks or criteria yet", () => {
    const launch = addLaunch(validInput);
    expect(getReadiness(launch.id)).toEqual({ done: 0, total: 0, percent: 0 });
  });
});
