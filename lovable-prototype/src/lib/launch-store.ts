// M1 only: in-memory store so a submitted form can be viewed on the Results page
// with placeholder module data. Replaced by the `launches` table in M2.

import { PLACEHOLDER_LAUNCHES, getPlaceholderLaunch } from "./placeholder-data";
import type { Launch } from "./gtm-types";

const created: Launch[] = [];

export function listLaunches(): Launch[] {
  return [...created, ...PLACEHOLDER_LAUNCHES].sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
  );
}

export function findLaunch(id: string): Launch | undefined {
  return listLaunches().find((l) => l.id === id);
}

export type LaunchFormValues = Pick<
  Launch,
  | "product_name"
  | "product_description"
  | "industry"
  | "business_model"
  | "home_market"
  | "target_market"
  | "current_presence"
  | "target_customer"
  | "sales_motion"
  | "deal_size"
  | "entry_goal"
  | "timeline"
  | "team_and_budget"
>;

/** M1 stand-in for FR-13: creates a launch carrying placeholder module content. */
export function createLaunch(values: LaunchFormValues): Launch {
  const template = getPlaceholderLaunch(
    values.business_model === "B2C" ? "example-b2c" : "example-b2b",
  );
  const id = `draft-${created.length + 1}-${Date.now().toString(36)}`;
  const launch: Launch = {
    ...template,
    ...values,
    id,
    created_at: new Date().toISOString(),
    status: "complete",
    is_example: false,
    tasks: template.tasks.map((t) => ({ ...t, id: `${id}-${t.sort_order}`, done: false })),
    criteria: template.criteria.map((c) => ({ ...c, id: `${id}-c-${c.sort_order}`, done: false })),
  };
  created.unshift(launch);
  return launch;
}

export function deleteLaunch(id: string) {
  const i = created.findIndex((l) => l.id === id);
  if (i >= 0) created.splice(i, 1);
}
