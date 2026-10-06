import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatTiles } from "./StatTiles";

const size = {
  tam: "€4.2bn",
  sam: "€620m",
  som: "€18m",
  assumptions: ["Assumes 8% SMB digitisation rate", "Excludes enterprise segment"],
};

describe("StatTiles", () => {
  it("renders TAM, SAM and SOM values", () => {
    render(<StatTiles size={size} />);
    expect(screen.getByText("€4.2bn")).toBeInTheDocument();
    expect(screen.getByText("€620m")).toBeInTheDocument();
    expect(screen.getByText("€18m")).toBeInTheDocument();
  });

  it("always renders the assumptions that ship with the size estimate", () => {
    render(<StatTiles size={size} />);
    for (const assumption of size.assumptions) {
      expect(screen.getByText(assumption)).toBeInTheDocument();
    }
  });

  // `size.assumptions` is a required field of the `SizeEstimate` type that
  // `StatTilesProps.size` demands — there is no prop combination that
  // renders the tiles without it, which is what this component guarantees
  // per NFR-06 ("numbers always ship with assumptions").
});
