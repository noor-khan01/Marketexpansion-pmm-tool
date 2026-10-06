import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MarketPair, Pill, recommendationTone } from "@/components/plan-ui";
import { readinessPercent } from "@/components/ReadinessScore";
import { deleteLaunch, listLaunches } from "@/lib/launch-store";
import type { Launch } from "@/lib/gtm-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Launches · Market Entry Copilot" },
      {
        name: "description",
        content:
          "All your market entry plans in one place: product, home and target market, recommendation and readiness.",
      },
      { property: "og:title", content: "My Launches · Market Entry Copilot" },
      {
        property: "og:description",
        content:
          "All your market entry plans in one place: product, home and target market, recommendation and readiness.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyLaunchesPage,
});

function readiness(launch: Launch) {
  return readinessPercent(
    launch.tasks.filter((t) => t.done).length,
    launch.tasks.length,
    launch.criteria.filter((c) => c.done).length,
    launch.criteria.length,
  );
}

function MyLaunchesPage() {
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    setLaunches(listLaunches());
  }, []);

  return (
    <main className="page-shell">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Compass className="size-5" aria-hidden />
            <span className="eyebrow text-primary">Market Entry Copilot</span>
          </div>
          <h1 className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">My Launches</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">
            Every plan answers one question: we know how to win at home — what has to change to win
            in the target market?
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/new">
            <Plus className="size-4" aria-hidden />
            New launch
          </Link>
        </Button>
      </header>

      {launches.length === 0 ? (
        <div className="panel flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-lg font-semibold text-foreground">No launches yet</p>
          <Button asChild>
            <Link to="/new">
              <Plus className="size-4" aria-hidden />
              New launch
            </Link>
          </Button>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {launches.map((launch) => {
            const pct = readiness(launch);
            return (
              <li key={launch.id} className="panel relative flex flex-col p-5 hover:shadow-lift">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Pill tone="primary">{launch.business_model}</Pill>
                  {launch.executive_summary && (
                    <Pill tone={recommendationTone(launch.executive_summary.recommendation)}>
                      {launch.executive_summary.recommendation}
                    </Pill>
                  )}
                  {launch.is_example && <Pill tone="outline">Example</Pill>}
                </div>

                <Link
                  to="/launch/$id"
                  params={{ id: launch.id }}
                  className="mt-3 text-lg font-bold text-foreground hover:text-primary"
                >
                  {launch.product_name}
                </Link>
                <MarketPair
                  home={launch.home_market}
                  target={launch.target_market}
                  className="mt-1 text-foreground"
                />

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-bold text-foreground">{pct}% ready</span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">
                    {new Date(launch.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" aria-label={`Delete ${launch.product_name}`}>
                        <Trash2 className="size-4" aria-hidden />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this launch?</AlertDialogTitle>
                        <AlertDialogDescription>
                          {launch.product_name} ({launch.home_market} → {launch.target_market}) and
                          its tasks will be removed. This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            deleteLaunch(launch.id);
                            setLaunches((prev) => prev.filter((l) => l.id !== launch.id));
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
