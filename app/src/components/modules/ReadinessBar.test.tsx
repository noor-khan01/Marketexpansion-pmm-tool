import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Criterion, Task } from "@/lib/types";
import { ReadinessBar, computeReadiness } from "./ReadinessBar";

function makeTask(id: string, done: boolean): Task {
  return {
    id,
    launch_id: "launch-test",
    track: "Product",
    phase: "Validate",
    title: `Task ${id}`,
    description: "A task.",
    owner_role: "Engineering lead",
    done,
    sort_order: 0,
  };
}

function makeCriterion(id: string, done: boolean): Criterion {
  return { id, launch_id: "launch-test", text: `Criterion ${id}`, done, sort_order: 0 };
}

describe("computeReadiness (FR-60)", () => {
  it("is (done tasks + done criteria) ÷ (total tasks + total criteria) × 100, rounded", () => {
    const tasks = [makeTask("1", true), makeTask("2", true), makeTask("3", false)];
    const criteria = [makeCriterion("a", true), makeCriterion("b", false)];
    // (2 + 1) / (3 + 2) = 0.6 → 60%
    expect(computeReadiness(tasks, criteria).percent).toBe(60);
  });

  it("is 0 with no tasks or criteria at all", () => {
    expect(computeReadiness([], []).percent).toBe(0);
  });
});

describe("ReadinessBar", () => {
  it("recalculates instantly when a task or criterion is ticked", () => {
    const tasks = [makeTask("1", false), makeTask("2", false)];
    const criteria = [makeCriterion("a", false)];
    const { rerender } = render(<ReadinessBar tasks={tasks} criteria={criteria} />);

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("Tick tasks as you complete them")).toBeInTheDocument();

    // Simulate ticking one task — the parent owns tick state and re-renders with new props.
    const tickedTasks = [{ ...tasks[0], done: true }, tasks[1]];
    rerender(<ReadinessBar tasks={tickedTasks} criteria={criteria} />);

    // (1 + 0) / (2 + 1) = 33%
    expect(screen.getByText("33%")).toBeInTheDocument();
    expect(screen.getByText("1 of 3 done")).toBeInTheDocument();
    expect(screen.queryByText("Tick tasks as you complete them")).not.toBeInTheDocument();
  });

  it("shows the FR-62 zero state while nothing is ticked", () => {
    render(<ReadinessBar tasks={[makeTask("1", false)]} criteria={[]} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("Tick tasks as you complete them")).toBeInTheDocument();
  });
});
