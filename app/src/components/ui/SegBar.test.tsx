import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SegBar } from "./SegBar";

describe("SegBar", () => {
  it("reports the correct filled count via its accessible label", () => {
    render(<SegBar total={10} filled={6} />);
    expect(screen.getByRole("img", { name: "6 of 10 filled" })).toBeInTheDocument();
  });

  it("uses a custom label when provided", () => {
    render(<SegBar total={12} filled={3} label="3 of 12 ready" />);
    expect(screen.getByRole("img", { name: "3 of 12 ready" })).toBeInTheDocument();
  });

  it("clamps filled to the total so it never over-reports", () => {
    render(<SegBar total={5} filled={9} />);
    expect(screen.getByRole("img", { name: "5 of 5 filled" })).toBeInTheDocument();
  });

  it("shows the visible legend text when showLabel is set", () => {
    render(<SegBar total={4} filled={2} label="2 of 4 done" showLabel />);
    expect(screen.getByText("2 of 4 done")).toBeInTheDocument();
  });
});
