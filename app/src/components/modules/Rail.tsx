"use client";

import type { ModuleKey, ModuleStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface RailModule {
  key: ModuleKey;
  name: string;
  status: ModuleStatus;
}

export interface RailProps {
  modules: RailModule[];
  activeKey: ModuleKey | null;
  onSelect: (key: ModuleKey) => void;
  className?: string;
}

const DOT_STYLE: Record<ModuleStatus, { background: string; className?: string }> = {
  done: { background: "var(--go)" },
  loading: { background: "var(--accent)", className: "rail-dot-pulse" },
  error: { background: "var(--stop)" },
  waiting: { background: "var(--rule-strong)" },
};

function RailDot({ status }: { status: ModuleStatus }) {
  const style = DOT_STYLE[status];
  return (
    <span
      aria-hidden="true"
      className={cn("h-2 w-2 flex-shrink-0 rounded-full", style.className)}
      style={{ backgroundColor: style.background }}
    />
  );
}

function railFooter(modules: RailModule[]) {
  const ready = modules.filter((module) => module.status === "done").length;
  const failed = modules.filter((module) => module.status === "error").length;
  return { ready, failed };
}

/**
 * The live left-rail instrument (DESIGN.md "Left rail"): mono index, state
 * dot, module name, and a footer count. Renders twice — a vertical list for
 * ≥900px and a horizontal scroller below that width — since the two share
 * no layout, per FR-24.
 */
export function Rail({ modules, activeKey, onSelect, className }: RailProps) {
  const { ready, failed } = railFooter(modules);

  return (
    <>
      <nav
        aria-label="Modules"
        className={cn(
          "sticky top-6 hidden max-h-[calc(100vh-3rem)] w-[240px] flex-shrink-0 flex-col gap-0.5 overflow-y-auto rounded-(--radius-md) border p-2 min-[900px]:flex",
          className,
        )}
        style={{ borderColor: "var(--rule)", backgroundColor: "var(--surface)" }}
      >
        {modules.map((module, index) => (
          <button
            key={module.key}
            type="button"
            onClick={() => onSelect(module.key)}
            aria-current={activeKey === module.key ? "true" : undefined}
            className="flex items-center gap-2 rounded-(--radius-sm) px-2 py-2 text-left"
            style={{
              backgroundColor: activeKey === module.key ? "var(--sunk)" : "transparent",
            }}
          >
            <span
              className="tabular-nums font-mono text-[11px]"
              style={{ color: "var(--ink-faint)" }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <RailDot status={module.status} />
            <span className="truncate text-sm" style={{ color: "var(--ink)" }}>
              {module.name}
            </span>
          </button>
        ))}
        <div
          className="mt-2 border-t px-2 pt-2 font-mono text-[11px] uppercase tracking-[0.06em]"
          style={{ borderColor: "var(--rule)", color: "var(--ink-faint)" }}
        >
          {ready} of {modules.length} ready
          {failed > 0 && <span style={{ color: "var(--stop)" }}> · {failed} failed</span>}
        </div>
      </nav>

      <nav
        aria-label="Modules"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 min-[900px]:hidden"
      >
        {modules.map((module, index) => (
          <button
            key={module.key}
            type="button"
            onClick={() => onSelect(module.key)}
            aria-current={activeKey === module.key ? "true" : undefined}
            className="flex flex-shrink-0 items-center gap-2 rounded-(--radius-sm) border px-3 py-2"
            style={{
              borderColor: "var(--rule)",
              backgroundColor: activeKey === module.key ? "var(--sunk)" : "var(--surface)",
            }}
          >
            <span
              className="tabular-nums font-mono text-[11px]"
              style={{ color: "var(--ink-faint)" }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <RailDot status={module.status} />
            <span className="whitespace-nowrap text-sm" style={{ color: "var(--ink)" }}>
              {module.name}
            </span>
          </button>
        ))}
        <div
          className="flex flex-shrink-0 items-center whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.06em]"
          style={{ color: "var(--ink-faint)" }}
        >
          {ready} of {modules.length} ready
          {failed > 0 && <span style={{ color: "var(--stop)" }}> · {failed} failed</span>}
        </div>
      </nav>
    </>
  );
}
