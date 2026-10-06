import { Progress } from "@/components/ui/progress";

/** FR-60 to FR-62 */
export function readinessPercent(
  doneTasks: number,
  totalTasks: number,
  doneCriteria: number,
  totalCriteria: number,
): number {
  const total = totalTasks + totalCriteria;
  if (total === 0) return 0;
  return Math.round(((doneTasks + doneCriteria) / total) * 100);
}

export function ReadinessScore({
  percent,
  doneCount,
  totalCount,
}: {
  percent: number;
  doneCount: number;
  totalCount: number;
}) {
  return (
    <section className="panel p-5 sm:p-6" aria-label="Readiness score">
      <div className="eyebrow">Readiness score</div>
      <div className="mt-1 flex items-end gap-2">
        <span className="text-4xl font-bold leading-none text-primary">{percent}%</span>
        <span className="pb-1 text-sm font-semibold text-muted-foreground">
          {doneCount} of {totalCount} items
        </span>
      </div>
      <Progress value={percent} className="mt-3 h-3" />
      {percent === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">Tick tasks as you complete them</p>
      )}
    </section>
  );
}
