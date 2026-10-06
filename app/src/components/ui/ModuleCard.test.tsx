import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ModuleCard } from "./ModuleCard";

describe("ModuleCard", () => {
  it("shows a loading state with an accessible generating label", () => {
    render(<ModuleCard index={1} title="Market opportunity" status="loading" />);
    expect(screen.getByLabelText("Generating Market opportunity")).toBeInTheDocument();
  });

  it("shows the error state's exact copy and a working Retry button", () => {
    const onRetry = vi.fn();
    render(
      <ModuleCard
        index={7}
        title="Legal, compliance & operations"
        status="error"
        onRetry={onRetry}
      />,
    );
    expect(screen.getByText("This section couldn't be generated.")).toBeInTheDocument();
    expect(screen.getByText("The other nine sections are unaffected.")).toBeInTheDocument();
    screen.getByRole("button", { name: "Retry" }).click();
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("renders its children in the done state", () => {
    render(
      <ModuleCard index={1} title="Market opportunity" status="done">
        <p>Berlin is an early-adopter market for SMB fintech.</p>
      </ModuleCard>,
    );
    expect(
      screen.getByText("Berlin is an early-adopter market for SMB fintech."),
    ).toBeInTheDocument();
  });

  it("always shows the header title and a Regenerate control", () => {
    render(<ModuleCard index={3} title="Competitive landscape" status="done" />);
    expect(screen.getByRole("heading", { name: "Competitive landscape" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Regenerate" })).toBeInTheDocument();
  });
});
