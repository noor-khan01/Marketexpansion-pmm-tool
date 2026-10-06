import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";

import { getLaunchBundle } from "@/lib/placeholder-data";
import { ResultsShell } from "./ResultsShell";

// JSDOM has no IntersectionObserver — ResultsShell only uses it for a
// non-essential scroll-spy, so a minimal stub is enough for these tests.
beforeAll(() => {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error — test stub, not a full IntersectionObserver implementation.
  global.IntersectionObserver = IntersectionObserverStub;
});

function renderResultsShell() {
  const bundle = getLaunchBundle("launch-ledgerflow-de");
  if (!bundle) throw new Error("Expected the LedgerFlow seed bundle to exist");
  return render(
    <ResultsShell launch={bundle.launch} tasks={bundle.tasks} criteria={bundle.criteria} />,
  );
}

function regenerateButtonFor(moduleTitle: string) {
  const heading = screen.getByRole("heading", { name: moduleTitle });
  const section = heading.closest("section");
  if (!section) throw new Error(`Expected "${moduleTitle}" heading to sit inside a <section>`);
  return within(section).getByRole("button", { name: "Regenerate" });
}

describe("ResultsShell — regenerate confirmation (FR-43)", () => {
  it("asks for confirmation before regenerating the launch plan (module 9)", () => {
    renderResultsShell();
    fireEvent.click(regenerateButtonFor("Launch plan"));

    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveTextContent("Regenerate launch plan?");
    expect(dialog).toHaveTextContent(/ticked progress will be lost/i);
  });

  it("asks for confirmation before regenerating KPIs, go/no-go & risks (module 10)", () => {
    renderResultsShell();
    fireEvent.click(regenerateButtonFor("KPIs, go/no-go & risks"));

    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveTextContent("Regenerate KPIs, go/no-go & risks?");
    expect(dialog).toHaveTextContent(/ticked criteria will be lost/i);
  });

  it("does not ask for confirmation for a module without tickable state", () => {
    renderResultsShell();
    fireEvent.click(regenerateButtonFor("Market opportunity"));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("cancelling the confirmation dialog leaves the module untouched", () => {
    renderResultsShell();
    fireEvent.click(regenerateButtonFor("Launch plan"));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("confirming closes the dialog and lets regeneration proceed", async () => {
    renderResultsShell();
    fireEvent.click(regenerateButtonFor("Launch plan"));
    const dialog = screen.getByRole("alertdialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Regenerate" }));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    // ModuleCard cross-fades to its loading skeleton (150ms) before the
    // "Generating…" label mounts — this real timeout settles quickly enough
    // for waitFor's default polling window.
    expect(await screen.findByLabelText("Generating Launch plan")).toBeInTheDocument();
  });
});
