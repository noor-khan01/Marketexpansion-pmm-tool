import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeleteLaunchDialog } from "./DeleteLaunchDialog";

describe("DeleteLaunchDialog", () => {
  it("renders nothing when closed", () => {
    render(
      <DeleteLaunchDialog
        open={false}
        productName="LedgerFlow"
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the launch name and calls onConfirm when Delete is clicked", () => {
    const onConfirm = vi.fn();
    render(
      <DeleteLaunchDialog open productName="LedgerFlow" onCancel={vi.fn()} onConfirm={onConfirm} />,
    );
    expect(screen.getByRole("dialog")).toHaveTextContent("LedgerFlow");
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when Cancel is clicked or Escape is pressed", () => {
    const onCancel = vi.fn();
    render(
      <DeleteLaunchDialog open productName="LedgerFlow" onCancel={onCancel} onConfirm={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(2);
  });
});
