import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Loader2,
  Monitor,
  X,
} from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { MarketPair, Pill } from "@/components/plan-ui";
import { ModuleCard, ModuleSkeleton } from "@/components/ModuleCard";
import { ExecutiveSummaryCard } from "@/components/ExecutiveSummaryCard";
import { ReadinessScore, readinessPercent } from "@/components/ReadinessScore";
import {
  CompetitionView,
  CustomerBuyingView,
  KpisRisksView,
  LaunchPlanView,
  LegalOpsView,
  LocalisationView,
  MarketOpportunityView,
  PositioningView,
  PricingView,
  RoutesToMarketView,
} from "@/components/module-views";
import { MODULE_ORDER, type Launch, type ModuleKey } from "@/lib/gtm-types";
import { findLaunch } from "@/lib/launch-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/launch/$id")({
  head: () => ({
    meta: [
      { title: "Market entry plan · Market Entry Copilot" },
      {
        name: "description",
        content:
          "Ten market-specific plan modules, an executive recommendation and a trackable launch plan for entering a new market.",
      },
      { property: "og:title", content: "Market entry plan · Market Entry Copilot" },
      {
        property: "og:description",
        content:
          "Ten market-specific plan modules, an executive recommendation and a trackable launch plan.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultsPage,
});

function StatusIcon({ status }: { status: "loading" | "done" | "error" }) {
  if (status === "done") return <CheckCircle2 className="size-4 text-success" aria-hidden />;
  if (status === "error") return <AlertCircle className="size-4 text-danger" aria-hidden />;
  return <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden />;
}

function ResultsPage() {
  const { id } = Route.useParams();
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [presentation, setPresentation] = useState(false);
  const [summaryStale, setSummaryStale] = useState(false);
  const [confirmKey, setConfirmKey] = useState<ModuleKey | null>(null);

  useEffect(() => {
    const found = findLaunch(id);
    if (found) setLaunch(found);
    else setNotFound(true);
  }, [id]);

  // FR-81
  useEffect(() => {
    if (!presentation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPresentation(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presentation]);

  const toggleTask = useCallback((taskId: string) => {
    setLaunch((prev) =>
      prev
        ? {
            ...prev,
            tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
          }
        : prev,
    );
  }, []);

  const toggleCriterion = useCallback((critId: string) => {
    setLaunch((prev) =>
      prev
        ? {
            ...prev,
            criteria: prev.criteria.map((c) => (c.id === critId ? { ...c, done: !c.done } : c)),
          }
        : prev,
    );
  }, []);

  const percent = useMemo(
    () =>
      launch
        ? readinessPercent(
            launch.tasks.filter((t) => t.done).length,
            launch.tasks.length,
            launch.criteria.filter((c) => c.done).length,
            launch.criteria.length,
          )
        : 0,
    [launch],
  );

  if (notFound) {
    return (
      <main className="page-shell max-w-xl text-center">
        <h1 className="text-2xl font-bold text-foreground">Launch not found</h1>
        <p className="mt-2 text-muted-foreground">
          This plan isn&apos;t available in this session yet.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Back to My Launches</Link>
        </Button>
      </main>
    );
  }

  if (!launch) {
    return (
      <main className="page-shell max-w-3xl">
        <ModuleSkeleton />
      </main>
    );
  }

  // M1: regenerate is UI-only — sets the module back to a skeleton, no AI call yet.
  function regenerate(key: ModuleKey) {
    setLaunch((prev) =>
      prev ? { ...prev, module_status: { ...prev.module_status, [key]: "loading" } } : prev,
    );
    setSummaryStale(true);
    window.setTimeout(() => {
      setLaunch((prev) =>
        prev ? { ...prev, module_status: { ...prev.module_status, [key]: "done" } } : prev,
      );
    }, 1200);
  }

  function requestRegenerate(key: ModuleKey) {
    // FR-43: module 9 and 10 lose ticked state, so confirm first.
    if (key === "launch_plan" || key === "kpis_risks") setConfirmKey(key);
    else regenerate(key);
  }

  const modules = launch.modules;
  const doneItems =
    launch.tasks.filter((t) => t.done).length + launch.criteria.filter((c) => c.done).length;

  function renderModule(key: ModuleKey) {
    switch (key) {
      case "market_opportunity":
        return modules.market_opportunity && (
          <MarketOpportunityView data={modules.market_opportunity} />
        );
      case "customer_buying":
        return modules.customer_buying && (
          <CustomerBuyingView
            data={modules.customer_buying}
            businessModel={launch!.business_model}
          />
        );
      case "competition":
        return modules.competition && <CompetitionView data={modules.competition} />;
      case "positioning":
        return modules.positioning && <PositioningView data={modules.positioning} />;
      case "pricing":
        return modules.pricing && <PricingView data={modules.pricing} />;
      case "routes_to_market":
        return modules.routes_to_market && <RoutesToMarketView data={modules.routes_to_market} />;
      case "legal_ops":
        return modules.legal_ops && <LegalOpsView data={modules.legal_ops} />;
      case "localisation":
        return modules.localisation && <LocalisationView data={modules.localisation} />;
      case "launch_plan":
        return <LaunchPlanView tasks={launch!.tasks} onToggleTask={toggleTask} />;
      case "kpis_risks":
        return modules.kpis_risks && (
          <KpisRisksView
            data={modules.kpis_risks}
            criteria={launch!.criteria}
            onToggleCriterion={toggleCriterion}
          />
        );
    }
  }

  return (
    <div className={cn(presentation && "presentation-mode")}>
      <main className="page-shell">
        <header className="panel mb-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Pill tone="primary">{launch.business_model}</Pill>
                {launch.is_example && <Pill tone="outline">Example</Pill>}
              </div>
              <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                {launch.product_name}
              </h1>
              <MarketPair
                home={launch.home_market}
                target={launch.target_market}
                className="mt-1 text-lg text-foreground"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {presentation ? (
                <Button variant="outline" onClick={() => setPresentation(false)}>
                  <X className="size-4" aria-hidden />
                  Exit presentation
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link to="/new" search={{ from: launch.id }}>
                      <Copy className="size-4" aria-hidden />
                      Duplicate for another market
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setPresentation(true)}>
                    <Monitor className="size-4" aria-hidden />
                    Presentation mode
                  </Button>
                  <Button asChild variant="ghost">
                    <Link to="/">
                      <ArrowLeft className="size-4" aria-hidden />
                      Back to My Launches
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="mb-5 grid gap-4 lg:grid-cols-[18rem_1fr]">
          <ReadinessScore
            percent={percent}
            doneCount={doneItems}
            totalCount={launch.tasks.length + launch.criteria.length}
          />
          <ExecutiveSummaryCard
            summary={launch.executive_summary}
            moduleStatus={launch.module_status}
            generating={false}
            stale={summaryStale}
            presentation={presentation}
            onRegenerate={() => setSummaryStale(false)}
          />
        </div>

        <div
          className={cn(
            "gap-5",
            presentation ? "block" : "grid lg:grid-cols-[16rem_1fr] items-start",
          )}
        >
          {!presentation && (
            /* FR-22 / FR-24: sidebar on wide screens, horizontal menu when narrow */
            <nav
              aria-label="Plan sections"
              className="panel sticky top-4 p-3 max-lg:static max-lg:overflow-x-auto"
            >
              <ul className="flex gap-1 lg:flex-col">
                {MODULE_ORDER.map((m, i) => (
                  <li key={m.key} className="shrink-0">
                    <a
                      href={`#${m.key}`}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <StatusIcon status={launch.module_status[m.key]} />
                      <span className="whitespace-nowrap lg:whitespace-normal">
                        {i + 1}. {m.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="min-w-0 space-y-5">
            {MODULE_ORDER.map((m, i) => (
              <ModuleCard
                key={m.key}
                id={m.key}
                index={i + 1}
                title={m.name}
                status={launch.module_status[m.key]}
                presentation={presentation}
                onRegenerate={() => requestRegenerate(m.key)}
              >
                {renderModule(m.key)}
              </ModuleCard>
            ))}
          </div>
        </div>
      </main>

      <AlertDialog open={confirmKey !== null} onOpenChange={(o) => !o && setConfirmKey(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmKey === "launch_plan" ? "Regenerate the launch plan?" : "Regenerate KPIs and risks?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmKey === "launch_plan"
                ? "The tasks will be replaced and anything you have ticked off will be lost."
                : "The go/no-go criteria will be replaced and your ticks will be reset."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmKey) regenerate(confirmKey);
                setConfirmKey(null);
              }}
            >
              Regenerate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
