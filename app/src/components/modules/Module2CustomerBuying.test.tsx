import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getLaunchBundle } from "@/lib/placeholder-data";
import { Module2CustomerBuying } from "./Module2CustomerBuying";

describe("Module2CustomerBuying", () => {
  it('titles the grid "Buying committee" for a B2B launch', () => {
    const bundle = getLaunchBundle("launch-ledgerflow-de");
    if (!bundle?.launch.modules.customer_buying) throw new Error("Expected LedgerFlow seed data");

    render(
      <Module2CustomerBuying data={bundle.launch.modules.customer_buying} businessModel="B2B" />,
    );

    expect(screen.getByText("Buying committee")).toBeInTheDocument();
    expect(screen.queryByText("Consumer segments")).not.toBeInTheDocument();
  });

  it('retitles the grid "Consumer segments" for a B2C launch (FR-31)', () => {
    const bundle = getLaunchBundle("launch-glowlab-fr");
    if (!bundle?.launch.modules.customer_buying) throw new Error("Expected Glow Lab seed data");

    render(
      <Module2CustomerBuying data={bundle.launch.modules.customer_buying} businessModel="B2C" />,
    );

    expect(screen.getByText("Consumer segments")).toBeInTheDocument();
    expect(screen.queryByText("Buying committee")).not.toBeInTheDocument();
  });
});
