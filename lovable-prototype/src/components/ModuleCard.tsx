import type { ReactNode } from "react";
import { AlertCircle, RefreshCw, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ModuleStatus } from "@/lib/gtm-types";

/** FR-40: skeleton placeholder shaped like module content. */
export function ModuleSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading section">
      <div className="flex gap-4">
        <Skeleton className="h-16 w-40" />
        <Skeleton className="h-16 flex-1" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <div className="grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

/** FR-42: per-module error state with Retry. */
function ModuleError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-danger/30 bg-danger-soft p-4">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <AlertCircle className="size-5 shrink-0 text-danger" aria-hidden />
        This section couldn&apos;t be generated.
      </div>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RotateCcw className="size-4" aria-hidden />
        Retry
      </Button>
    </div>
  );
}

export function ModuleCard({
  index,
  id,
  title,
  status,
  onRegenerate,
  presentation,
  children,
}: {
  index: number;
  id: string;
  title: string;
  status: ModuleStatus;
  onRegenerate: () => void;
  presentation: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className="panel scroll-mt-24 p-5 sm:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <h3 className="flex items-center gap-2.5 text-xl font-bold text-foreground">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary-soft-foreground">
            {index}
          </span>
          {title}
        </h3>
        {!presentation && (
          <Button variant="ghost" size="sm" onClick={onRegenerate}>
            <RefreshCw className="size-4" aria-hidden />
            Regenerate
          </Button>
        )}
      </header>
      {status === "loading" && <ModuleSkeleton />}
      {status === "error" && <ModuleError onRetry={onRegenerate} />}
      {status === "done" && children}
    </section>
  );
}
