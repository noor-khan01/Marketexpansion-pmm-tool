import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill, recommendationTone } from "@/components/plan-ui";
import type { ExecutiveSummary, ModuleKey, ModuleStatus } from "@/lib/gtm-types";

/** FR-50 to FR-55 */
export function ExecutiveSummaryCard({
  summary,
  moduleStatus,
  generating,
  stale,
  presentation,
  onRegenerate,
}: {
  summary: ExecutiveSummary | null;
  moduleStatus: Record<ModuleKey, ModuleStatus>;
  generating: boolean;
  stale: boolean;
  presentation: boolean;
  onRegenerate: () => void;
}) {
  const statuses = Object.values(moduleStatus);
  const hasError = statuses.includes("error");
  const stillLoading = statuses.includes("loading");

  let placeholder: string | null = null;
  if (hasError) placeholder = "Fix the sections with errors to generate the summary.";
  else if (stillLoading)
    placeholder = "Executive summary will appear when all sections are ready.";
  else if (generating) placeholder = "Generating executive summary…";
  else if (!summary) placeholder = "Executive summary will appear when all sections are ready.";

  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="exec-summary-heading">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="exec-summary-heading" className="text-xl font-bold text-foreground">
          Executive summary
        </h2>
        {!presentation && summary && (
          <Button variant="outline" size="sm" onClick={onRegenerate}>
            <RefreshCw className="size-4" aria-hidden />
            Regenerate summary
          </Button>
        )}
      </header>

      {placeholder ? (
        <p className="mt-4 text-muted-foreground">{placeholder}</p>
      ) : (
        summary && (
          <div className="mt-4 space-y-5">
            {/* FR-44 */}
            {stale && (
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-warning/40 bg-warning-soft p-3">
                <span className="font-semibold text-foreground">
                  Plan changed. Regenerate summary?
                </span>
                <Button size="sm" onClick={onRegenerate}>
                  Regenerate summary
                </Button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Pill
                tone={recommendationTone(summary.recommendation)}
                className="px-4 py-1.5 text-base"
              >
                {summary.recommendation}
              </Pill>
            </div>
            <p className="text-lg font-semibold text-foreground">{summary.headline}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/60 p-4">
                <div className="eyebrow">Top 3 priorities</div>
                <ol className="mt-2 space-y-1.5">
                  {summary.top_priorities.map((p, i) => (
                    <li key={p} className="flex gap-2 text-foreground">
                      <span className="font-bold text-primary">{i + 1}.</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-lg border border-border bg-muted/60 p-4">
                <div className="eyebrow">Top 3 risks</div>
                <ol className="mt-2 space-y-1.5">
                  {summary.top_risks.map((r, i) => (
                    <li key={r} className="flex gap-2 text-foreground">
                      <span className="font-bold text-warning">{i + 1}.</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <div className="eyebrow">First 90 days</div>
              <p className="mt-1 text-foreground">{summary.first_90_days}</p>
            </div>
          </div>
        )
      )}
    </section>
  );
}
