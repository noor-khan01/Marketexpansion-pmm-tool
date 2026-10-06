"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ModuleCard } from "@/components/ui/ModuleCard";
import type {
  Criterion,
  ExecutiveSummary,
  Launch,
  ModuleKey,
  ModuleStatusMap,
  Task,
} from "@/lib/types";
import { MODULE_ORDER } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "./ConfirmDialog";
import { Header } from "./Header";
import { Module1MarketOpportunity } from "./Module1MarketOpportunity";
import { Module2CustomerBuying } from "./Module2CustomerBuying";
import { Module3Competition } from "./Module3Competition";
import { Module4Positioning } from "./Module4Positioning";
import { Module5Pricing } from "./Module5Pricing";
import { Module6RoutesToMarket } from "./Module6RoutesToMarket";
import { Module7LegalOps } from "./Module7LegalOps";
import { Module8Localisation } from "./Module8Localisation";
import { Module9LaunchPlan } from "./Module9LaunchPlan";
import { Module10KpisRisks } from "./Module10KpisRisks";
import { Rail } from "./Rail";
import { ReadinessBar } from "./ReadinessBar";
import { VerdictCard } from "./VerdictCard";

export interface ResultsShellProps {
  launch: Launch;
  tasks: Task[];
  criteria: Criterion[];
}

/** Modules whose regenerate loses ticked state and needs confirmation first (FR-43). */
const CONFIRM_BEFORE_REGENERATE: ModuleKey[] = ["launch_plan", "kpis_risks"];

const REGENERATE_DELAY_MS = 1100;
const SUMMARY_REGENERATE_DELAY_MS = 900;
const MODULE_STAGGER_S = 0.06;
const MODULE_LAND_DURATION_S = 0.2;

/**
 * Orchestrates the whole Results page: header, verdict, readiness, the
 * live rail, and all ten modules. Holds every piece of client state —
 * ticked tasks/criteria, per-module status (simulated, no backend yet),
 * the executive summary, and presentation mode — since almost all of it
 * is interactive (DESIGN.md "the wait is the first impression").
 */
export function ResultsShell({
  launch,
  tasks: initialTasks,
  criteria: initialCriteria,
}: ResultsShellProps) {
  const reduceMotion = useReducedMotion();
  const [tasks, setTasks] = useState(initialTasks);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [moduleStatus, setModuleStatus] = useState<ModuleStatusMap>(launch.module_status);
  const [summary, setSummary] = useState<ExecutiveSummary | null>(launch.executive_summary);
  const [summaryGenerating, setSummaryGenerating] = useState(false);
  const [planChanged, setPlanChanged] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [confirmModule, setConfirmModule] = useState<ModuleKey | null>(null);
  const [activeKey, setActiveKey] = useState<ModuleKey | null>(null);

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sectionRefs = useRef<Partial<Record<ModuleKey, HTMLElement | null>>>({});
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      for (const timeout of timeouts.current) clearTimeout(timeout);
    };
  }, []);

  // FR-81: Esc exits presentation mode.
  useEffect(() => {
    if (!presentationMode) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPresentationMode(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [presentationMode]);

  // Scroll-spy: keep the rail's active module in sync with what's on screen.
  useEffect(() => {
    const elements = Object.values(sectionRefs.current).filter(
      (el): el is HTMLElement => el !== null && el !== undefined,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const key = visible.target.getAttribute("data-module-key") as ModuleKey | null;
          if (key) setActiveKey(key);
        }
      },
      { rootMargin: "-10% 0px -70% 0px" },
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const runAfterDelay = useCallback((ms: number, callback: () => void) => {
    const id = setTimeout(callback, ms);
    timeouts.current.push(id);
  }, []);

  const simulateRegenerate = useCallback(
    (key: ModuleKey) => {
      if (key === "launch_plan") setTasks((prev) => prev.map((task) => ({ ...task, done: false })));
      if (key === "kpis_risks")
        setCriteria((prev) => prev.map((criterion) => ({ ...criterion, done: false })));

      setModuleStatus((prev) => ({ ...prev, [key]: "loading" }));
      runAfterDelay(REGENERATE_DELAY_MS, () => {
        setModuleStatus((prev) => ({ ...prev, [key]: "done" }));
        setPlanChanged(true);
      });
    },
    [runAfterDelay],
  );

  const handleRegenerate = useCallback(
    (key: ModuleKey) => {
      if (CONFIRM_BEFORE_REGENERATE.includes(key)) {
        setConfirmModule(key);
        return;
      }
      simulateRegenerate(key);
    },
    [simulateRegenerate],
  );

  const handleConfirmRegenerate = useCallback(() => {
    if (confirmModule) simulateRegenerate(confirmModule);
    setConfirmModule(null);
  }, [confirmModule, simulateRegenerate]);

  const handleRegenerateSummary = useCallback(() => {
    setSummaryGenerating(true);
    runAfterDelay(SUMMARY_REGENERATE_DELAY_MS, () => {
      setSummary(launch.executive_summary);
      setSummaryGenerating(false);
      setPlanChanged(false);
    });
  }, [launch.executive_summary, runAfterDelay]);

  const handleToggleTask = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    );
  }, []);

  const handleToggleCriterion = useCallback((criterionId: string) => {
    setCriteria((prev) =>
      prev.map((criterion) =>
        criterion.id === criterionId ? { ...criterion, done: !criterion.done } : criterion,
      ),
    );
  }, []);

  const handleSelectModule = useCallback(
    (key: ModuleKey) => {
      setActiveKey(key);
      sectionRefs.current[key]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduceMotion],
  );

  const railModules = useMemo(
    () => MODULE_ORDER.map(({ key, name }) => ({ key, name, status: moduleStatus[key] })),
    [moduleStatus],
  );

  const confirmCopy: Record<string, { title: string; message: string }> = {
    launch_plan: {
      title: "Regenerate launch plan?",
      message: "This replaces every task in the launch plan. Any ticked progress will be lost.",
    },
    kpis_risks: {
      title: "Regenerate KPIs, go/no-go & risks?",
      message: "This replaces the go/no-go criteria. Any ticked criteria will be lost.",
    },
  };

  return (
    <div className={cn("min-h-screen", presentationMode && "presentation-mode")}>
      {/* Presentation mode is a density change, scoped to this page only — DESIGN.md "Presentation mode".
          Implemented as scoped overrides rather than editing the shared design tokens or ui/ primitives,
          which this build must not touch. */}
      <style jsx global>{`
        .presentation-mode {
          font-size: 19px;
        }
        .presentation-mode [class*="text-[11px]"] {
          font-size: 13px !important;
        }
        .presentation-mode .p-5 {
          padding: 1.5625rem !important;
        }
        .presentation-mode .px-5 {
          padding-left: 1.5625rem !important;
          padding-right: 1.5625rem !important;
        }
        .presentation-mode .py-3 {
          padding-top: 0.9375rem !important;
          padding-bottom: 0.9375rem !important;
        }
        .presentation-mode .gap-4 {
          gap: 1.5625rem !important;
        }
        .presentation-mode .gap-6 {
          gap: 1.875rem !important;
        }
        .presentation-mode .gap-8 {
          gap: 2.5rem !important;
        }
        .presentation-mode .gap-10 {
          gap: 3.125rem !important;
        }
        .presentation-mode header button {
          display: none;
        }
        .presentation-mode [class*="max-[760px]:flex-col"] {
          flex-direction: row !important;
        }
        .presentation-mode [class*="max-[760px]:rotate-90"] {
          transform: none !important;
        }
      `}</style>

      <main className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-8 max-[500px]:px-4">
        <Header
          launch={launch}
          presentationMode={presentationMode}
          onTogglePresentation={() => setPresentationMode((value) => !value)}
        />

        {presentationMode && (
          <button
            type="button"
            onClick={() => setPresentationMode(false)}
            className="fixed right-4 top-4 z-40 rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[13px] font-medium uppercase tracking-[0.06em]"
            style={{
              borderColor: "var(--rule-strong)",
              backgroundColor: "var(--surface)",
              color: "var(--ink-muted)",
              boxShadow: "var(--shadow-sit)",
            }}
          >
            Exit presentation (Esc)
          </button>
        )}

        <VerdictCard
          summary={summary}
          moduleStatuses={moduleStatus}
          summaryGenerating={summaryGenerating}
          planChanged={planChanged}
          onRegenerateSummary={handleRegenerateSummary}
          skipEntranceDelay={mountedRef.current}
          presentationMode={presentationMode}
        />

        <ReadinessBar tasks={tasks} criteria={criteria} />

        <div className="flex flex-col gap-6 min-[900px]:flex-row min-[900px]:items-start">
          {!presentationMode && (
            <Rail modules={railModules} activeKey={activeKey} onSelect={handleSelectModule} />
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {MODULE_ORDER.map(({ key, name }, index) => {
              const status = moduleStatus[key];
              const data = launch.modules[key];

              return (
                <motion.div
                  key={key}
                  data-module-key={key}
                  id={`module-${key}`}
                  ref={(el) => {
                    sectionRefs.current[key] = el;
                  }}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : MODULE_LAND_DURATION_S,
                    delay: reduceMotion ? 0 : index * MODULE_STAGGER_S,
                    ease: "easeOut",
                  }}
                >
                  <ModuleCard
                    index={index + 1}
                    title={name}
                    status={data ? status : "waiting"}
                    onRegenerate={() => handleRegenerate(key)}
                    onRetry={() => handleRegenerate(key)}
                  >
                    {renderModuleContent(
                      key,
                      launch,
                      tasks,
                      criteria,
                      handleToggleTask,
                      handleToggleCriterion,
                    )}
                  </ModuleCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={confirmModule !== null}
        title={confirmModule ? confirmCopy[confirmModule].title : ""}
        message={confirmModule ? confirmCopy[confirmModule].message : ""}
        onConfirm={handleConfirmRegenerate}
        onCancel={() => setConfirmModule(null)}
      />
    </div>
  );
}

function renderModuleContent(
  key: ModuleKey,
  launch: Launch,
  tasks: Task[],
  criteria: Criterion[],
  onToggleTask: (taskId: string) => void,
  onToggleCriterion: (criterionId: string) => void,
) {
  const modules = launch.modules;
  switch (key) {
    case "market_opportunity":
      return (
        modules.market_opportunity && <Module1MarketOpportunity data={modules.market_opportunity} />
      );
    case "customer_buying":
      return (
        modules.customer_buying && (
          <Module2CustomerBuying
            data={modules.customer_buying}
            businessModel={launch.business_model}
          />
        )
      );
    case "competition":
      return modules.competition && <Module3Competition data={modules.competition} />;
    case "positioning":
      return (
        modules.positioning && (
          <Module4Positioning
            data={modules.positioning}
            homeMarket={launch.home_market}
            targetMarket={launch.target_market}
          />
        )
      );
    case "pricing":
      return modules.pricing && <Module5Pricing data={modules.pricing} />;
    case "routes_to_market":
      return modules.routes_to_market && <Module6RoutesToMarket data={modules.routes_to_market} />;
    case "legal_ops":
      return modules.legal_ops && <Module7LegalOps data={modules.legal_ops} />;
    case "localisation":
      return modules.localisation && <Module8Localisation data={modules.localisation} />;
    case "launch_plan":
      return <Module9LaunchPlan tasks={tasks} onToggleTask={onToggleTask} />;
    case "kpis_risks":
      return (
        modules.kpis_risks && (
          <Module10KpisRisks
            data={modules.kpis_risks}
            criteria={criteria}
            onToggleCriterion={onToggleCriterion}
          />
        )
      );
    default:
      return null;
  }
}
