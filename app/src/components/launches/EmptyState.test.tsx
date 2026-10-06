import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("shows the empty message and a New launch link to /new", () => {
    render(<EmptyState />);
    expect(screen.getByText("No launches yet")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "New launch" });
    expect(link).toHaveAttribute("href", "/new");
  });
});
