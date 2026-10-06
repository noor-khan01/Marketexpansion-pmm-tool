"use client";

/**
 * ───────────────────────────────────────────────────────────────────────
 * TEMPORARY CLIENT-SIDE DATA SHIM — there is no backend yet (PRD §11).
 *
 * This file stands in for the `launches` / `tasks` / `criteria` tables
 * (PRD §10) and the `generate-module` / `generate-summary` functions'
 * write side. It keeps user-created launches in `localStorage` (best
 * effort — falls back to an in-memory-only session if unavailable) so the
 * New Launch → Results flow works end to end without a server.
 *
 * TO SWAP FOR A REAL BACKEND: replace the body of `addLaunch` with a
 * `POST` to whatever creates a `launches` row (FR-13) and `deleteLaunch`
 * with a delete call, then replace `useLaunches`/`getLaunchById`/
 * `getLaunchBundle`/`getReadiness` with data-fetching equivalents (e.g.
 * React Query hooks against the real API). Every other component in
 * `src/components/launches/` only calls the exported functions below, so
 * none of them should need to change.
 * ───────────────────────────────────────────────────────────────────────
 */

import { useSyncExternalStore } from "react";

import {
  PLACEHOLDER_CRITERIA,
  PLACEHOLDER_LAUNCHES,
  PLACEHOLDER_TASKS,
} from "@/lib/placeholder-data";
import type { Criterion, Launch, ModuleStatusMap, Task } from "@/lib/types";
import { MODULE_ORDER } from "@/lib/types";

const STORAGE_KEY = "market-entry-copilot:launches:v1";

export interface NewLaunchInput {
  product_name: string;
  product_description: string;
  industry: string;
  business_model: Launch["business_model"];
  home_market: string;
  target_market: string;
  current_presence: Launch["current_presence"];
  target_customer: string;
  sales_motion: Launch["sales_motion"];
  deal_size: string | null;
  entry_goal: Launch["entry_goal"];
  timeline: Launch["timeline"];
  team_and_budget: string | null;
}

export interface LaunchBundle {
  launch: Launch;
  tasks: Task[];
  criteria: Criterion[];
}

export interface Readiness {
  done: number;
  total: number;
  /** Rounded whole-number percentage, per FR-60. */
  percent: number;
}

interface StoredState {
  /** User-created launches only — seed data lives in PLACEHOLDER_LAUNCHES. */
  launches: Launch[];
  tasks: Task[];
  criteria: Criterion[];
  /** Seed launch ids the user has deleted (FR-05 applies to examples too). */
  deletedSeedIds: string[];
}

function emptyState(): StoredState {
  return { launches: [], tasks: [], criteria: [], deletedSeedIds: [] };
}

let cache: StoredState | null = null;
let launchesSnapshot: Launch[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): StoredState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      launches: parsed.launches ?? [],
      tasks: parsed.tasks ?? [],
      criteria: parsed.criteria ?? [],
      deletedSeedIds: parsed.deletedSeedIds ?? [],
    };
  } catch {
    return emptyState();
  }
}

function writeToStorage(state: StoredState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private browsing / quota exceeded — the in-memory cache still keeps
    // the current tab working for the rest of the session.
  }
}

function ensureLoaded(): StoredState {
  if (cache === null) cache = readFromStorage();
  return cache;
}

function persist(): void {
  if (cache) writeToStorage(cache);
  launchesSnapshot = null;
  for (const listener of listeners) listener();
}

/** Subscribes to store changes; used by `useLaunches` via useSyncExternalStore. */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const SEED_SORTED = [...PLACEHOLDER_LAUNCHES].sort(
  (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
);

/** Stable snapshot for `useSyncExternalStore`'s server/initial render. */
export function getServerSnapshot(): Launch[] {
  return SEED_SORTED;
}

/** All launches (seed + user-created), newest first — FR-01. */
export function getSnapshot(): Launch[] {
  if (launchesSnapshot === null) {
    const state = ensureLoaded();
    const seed = PLACEHOLDER_LAUNCHES.filter((launch) => !state.deletedSeedIds.includes(launch.id));
    launchesSnapshot = [...state.launches, ...seed].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }
  return launchesSnapshot;
}

export function getLaunchById(id: string): Launch | undefined {
  const state = ensureLoaded();
  return (
    state.launches.find((launch) => launch.id === id) ??
    PLACEHOLDER_LAUNCHES.find((launch) => launch.id === id && !state.deletedSeedIds.includes(id))
  );
}

export function getTasksFor(launchId: string): Task[] {
  const state = ensureLoaded();
  const userTasks = state.tasks.filter((task) => task.launch_id === launchId);
  const seedTasks = PLACEHOLDER_TASKS.filter((task) => task.launch_id === launchId);
  return userTasks.length > 0 ? userTasks : seedTasks;
}

export function getCriteriaFor(launchId: string): Criterion[] {
  const state = ensureLoaded();
  const userCriteria = state.criteria.filter((criterion) => criterion.launch_id === launchId);
  const seedCriteria = PLACEHOLDER_CRITERIA.filter((criterion) => criterion.launch_id === launchId);
  return userCriteria.length > 0 ? userCriteria : seedCriteria;
}

export function getLaunchBundle(launchId: string): LaunchBundle | undefined {
  const launch = getLaunchById(launchId);
  if (!launch) return undefined;
  return { launch, tasks: getTasksFor(launchId), criteria: getCriteriaFor(launchId) };
}

/** Readiness % per FR-60: (done tasks + done criteria) / (total) × 100, rounded. */
export function getReadiness(launchId: string): Readiness {
  const tasks = getTasksFor(launchId);
  const criteria = getCriteriaFor(launchId);
  const total = tasks.length + criteria.length;
  const done = tasks.filter((task) => task.done).length + criteria.filter((c) => c.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `launch-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function waitingModuleStatus(): ModuleStatusMap {
  return Object.fromEntries(
    MODULE_ORDER.map((module) => [module.key, "waiting"]),
  ) as ModuleStatusMap;
}

/** Creates a launch and returns it — FR-13. Status starts `generating`; the
 * Results page is responsible for actually running module generation. */
export function addLaunch(input: NewLaunchInput): Launch {
  const state = ensureLoaded();
  const launch: Launch = {
    id: generateId(),
    created_at: new Date().toISOString(),
    ...input,
    status: "generating",
    modules: {},
    module_status: waitingModuleStatus(),
    executive_summary: null,
    is_example: false,
  };
  state.launches = [launch, ...state.launches];
  persist();
  return launch;
}

/** Deletes a launch (and its tasks/criteria) — FR-05. Works for both
 * user-created and seed/example launches. */
export function deleteLaunch(id: string): void {
  const state = ensureLoaded();
  state.launches = state.launches.filter((launch) => launch.id !== id);
  state.tasks = state.tasks.filter((task) => task.launch_id !== id);
  state.criteria = state.criteria.filter((criterion) => criterion.launch_id !== id);
  if (
    PLACEHOLDER_LAUNCHES.some((launch) => launch.id === id) &&
    !state.deletedSeedIds.includes(id)
  ) {
    state.deletedSeedIds = [...state.deletedSeedIds, id];
  }
  persist();
}

/** Reactive list of all launches, newest first — re-renders on any store
 * mutation (`addLaunch`/`deleteLaunch`) made from anywhere in the app. */
export function useLaunches(): Launch[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Test-only: clears the in-memory cache so each test starts from a known
 * state. Not used by any product code path. */
export function __resetLaunchStoreForTests(): void {
  cache = null;
  launchesSnapshot = null;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
