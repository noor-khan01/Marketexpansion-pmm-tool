"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import type { ModuleStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface ModuleCardProps {
  /** 1–10, rendered as a zero-padded mono index ("01"). */
  index: number;
  title: string;
  /** `"waiting"` renders the same skeleton as `"loading"` (module not yet started). */
  status: ModuleStatus;
  /** Called from the header Regenerate button (available whenever not loading). */
  onRegenerate?: () => void;
  /** Called from the error state's Retry button. Falls back to `onRegenerate` if omitted. */
  onRetry?: () => void;
  /** Rendered only when `status === "done"`. */
  children?: ReactNode;
  /** Keeps the card from collapsing height across state changes. */
  minHeight?: number | string;
  className?: string;
}

/**
 * The module card shell — header (mono index, title, Regenerate) plus the
 * three module states (DESIGN.md "Module card"). Height is locked via
 * `minHeight` so a regenerate never collapses the card.
 */
export function ModuleCard({
  index,
  title,
  status,
  onRegenerate,
  onRetry,
  children,
  minHeight = 220,
  className,
}: ModuleCardProps) {
  const reduceMotion = useReducedMotion();
  const isLoading = status === "loading" || status === "waiting";
  const fadeDuration = reduceMotion ? 0 : status === "loading" ? 0.15 : 0.2;

  return (
    <section
      aria-busy={isLoading}
      className={cn("rounded-(--radius-md) border", className)}
      style={{
        borderColor: "var(--rule)",
        backgroundColor: "var(--surface)",
        boxShadow: "var(--shadow-sit)",
      }}
    >
      <header
        className="flex items-center justify-between gap-4 border-b px-5 py-3"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="tabular-nums font-mono text-[13px]"
            style={{ color: "var(--ink-faint)" }}
            aria-hidden="true"
          >
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="text-[16px] font-semibold leading-tight" style={{ color: "var(--ink)" }}>
            {title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onRegenerate}
          disabled={isLoading}
          className="rounded-(--radius-sm) border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ borderColor: "var(--rule-strong)", color: "var(--ink-muted)" }}
        >
          Regenerate
        </button>
      </header>

      <div className="relative p-5" style={{ minHeight }}>
        <AnimatePresence mode="wait" initial={false}>
          {status === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fadeDuration }}
              className="flex h-full flex-col items-start gap-2"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
                style={{ backgroundColor: "var(--stop-soft)", color: "var(--stop)" }}
              >
                !
              </span>
              <p className="font-medium" style={{ color: "var(--ink)" }}>
                This section couldn&apos;t be generated.
              </p>
              <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                The other nine sections are unaffected.
              </p>
              <button
                type="button"
                onClick={onRetry ?? onRegenerate}
                className="mt-1 rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
                style={{ borderColor: "var(--stop)", color: "var(--stop)" }}
              >
                Retry
              </button>
            </motion.div>
          ) : isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fadeDuration }}
              className="flex flex-col gap-3"
              aria-label={`Generating ${title}`}
            >
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="mt-2 h-24 w-full" />
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fadeDuration, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
