"use client";

import { useEffect, useMemo, useReducer } from "react";

import { getCriteriaFor, getTasksFor, useLaunches } from "@/components/launches/launch-store";
import type { Criterion, Launch, Task } from "@/lib/types";

export interface LaunchBundle {
  launch: Launch;
  tasks: Task[];
  criteria: Criterion[];
}

/**
 * Reactive single-launch bundle, backed by the shared `launch-store` shim
 * (`src/components/launches/launch-store.ts`) so a launch created via the
 * New Launch form — which only exists in `localStorage`, not in the seed
 * data this app was scaffolded against — resolves correctly on
 * `/launch/:id` instead of 404ing.
 *
 * Built on top of `useLaunches()` rather than wrapping `useSyncExternalStore`
 * directly: `launch-store`'s own list hook already does the hydration-safe
 * server/client snapshot handling (and its `getSnapshot` is properly
 * memoized), so reusing it avoids re-deriving that logic against
 * `getLaunchBundle`/`getTasksFor`, which allocate a fresh object on every
 * call and aren't safe to hand to `useSyncExternalStore` directly.
 *
 * `useSyncExternalStore`'s `getServerSnapshot` (seed data only, no
 * `localStorage`) is what renders on hydration, and nothing forces a
 * re-check afterwards unless `launch-store`'s own `subscribe` fires — which
 * only happens on a mutation (`addLaunch`/`deleteLaunch`), not merely on
 * mount. That leaves a real gap: opening `/launch/:id` in a fresh tab, or a
 * hard refresh, would show "not found" for a launch that only exists in
 * `localStorage` until *something* else mutates the store. The `useEffect`
 * below forces one extra render right after mount specifically to close
 * that gap (NFR-04 — refreshing must never lose a launch), without needing
 * a change to the shared, otherwise-untouched `launch-store.ts`.
 */
export function useLaunchBundle(id: string): LaunchBundle | undefined {
  const launches = useLaunches();
  const [, forceRecheck] = useReducer((count: number) => count + 1, 0);

  useEffect(() => {
    forceRecheck();
  }, []);

  const launch = useMemo<Launch | undefined>(
    () => launches.find((candidate) => candidate.id === id),
    [launches, id],
  );

  if (!launch) return undefined;
  return { launch, tasks: getTasksFor(id), criteria: getCriteriaFor(id) };
}
