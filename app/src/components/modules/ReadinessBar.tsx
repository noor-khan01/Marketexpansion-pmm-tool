import { SegBar, type SegBarTone } from "@/components/ui/SegBar";
import type { Criterion, Task } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ReadinessBarProps {
  tasks: Task[];
  criteria: Criterion[];
  className?: string;
}

/** FR-60: readiness % = (done tasks + done criteria) ÷ (total tasks + total criteria) × 100. */
export function computeReadiness(tasks: Task[], criteria: Criterion[]) {
  const doneTasks = tasks.filter((task) => task.done).length;
  const doneCriteria = criteria.filter((criterion) => criterion.done).length;
  const total = tasks.length + criteria.length;
  const filled = doneTasks + doneCriteria;
  const percent = total === 0 ? 0 : Math.round((filled / total) * 100);
  return { doneTasks, doneCriteria, total, filled, percent };
}

/**
 * FR-61/62: big mono percentage, "N of M done", and a segmented bar mixing
 * task segments (accent) and go/no-go criteria segments (go) in one
 * instrument (DESIGN.md "Instruments"). Recalculates instantly on tick
 * because it derives everything from `tasks`/`criteria` rather than
 * carrying its own state.
 */
export function ReadinessBar({ tasks, criteria, className }: ReadinessBarProps) {
  const { total, filled, percent } = computeReadiness(tasks, criteria);
  const tones: SegBarTone[] = [
    ...tasks.map(() => "accent" as const),
    ...criteria.map(() => "go" as const),
  ];

  return (
    <section
      className={cn("flex flex-col gap-4 rounded-(--radius-md) border p-5", className)}
      style={{
        borderColor: "var(--rule)",
        backgroundColor: "var(--surface)",
        boxShadow: "var(--shadow-sit)",
      }}
      aria-label="Readiness"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span
            className="tabular-nums font-mono text-[40px] font-semibold leading-none"
            style={{ color: "var(--ink)" }}
          >
            {percent}%
          </span>
          {filled === 0 ? (
            <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
              Tick tasks as you complete them
            </span>
          ) : (
            <span className="font-mono text-sm" style={{ color: "var(--ink-muted)" }}>
              {filled} of {total} done
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em]"
            style={{ color: "var(--ink-faint)" }}
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-[1px]"
              style={{ backgroundColor: "var(--accent)" }}
            />
            Tasks
          </span>
          <span
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em]"
            style={{ color: "var(--ink-faint)" }}
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-[1px]"
              style={{ backgroundColor: "var(--go)" }}
            />
            Go/no-go criteria
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <SegBar total={total} filled={filled} tone={tones} label={`${filled} of ${total} ready`} />
      </div>
    </section>
  );
}
