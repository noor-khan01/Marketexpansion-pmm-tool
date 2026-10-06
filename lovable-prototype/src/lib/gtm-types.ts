// Types mirror PRD Section 9 exactly. Do not rename/add/remove fields.

export type ModuleKey =
  | "market_opportunity"
  | "customer_buying"
  | "competition"
  | "positioning"
  | "pricing"
  | "routes_to_market"
  | "legal_ops"
  | "localisation"
  | "launch_plan"
  | "kpis_risks";

export const MODULE_ORDER: { key: ModuleKey; name: string }[] = [
  { key: "market_opportunity", name: "Market opportunity" },
  { key: "customer_buying", name: "Customer & buying process" },
  { key: "competition", name: "Competitive landscape" },
  { key: "positioning", name: "Positioning & messaging" },
  { key: "pricing", name: "Pricing & packaging" },
  { key: "routes_to_market", name: "Routes to market" },
  { key: "legal_ops", name: "Legal, compliance & operations" },
  { key: "localisation", name: "Localisation & readiness" },
  { key: "launch_plan", name: "Launch plan" },
  { key: "kpis_risks", name: "KPIs, go/no-go & risks" },
];

export type ModuleStatus = "loading" | "done" | "error";

export type BusinessModel = "B2B" | "B2C" | "B2B2C";
export type CurrentPresence =
  | "None"
  | "A few customers"
  | "Existing global customers with teams there";
export type SalesMotion = "Self-serve" | "Sales-led" | "Partner-led" | "Hybrid";
export type EntryGoal = "Test demand" | "Soft launch" | "Full launch";
export type Timeline = "3 months" | "6 months" | "12 months";

export type Track =
  | "Product"
  | "Marketing"
  | "Sales"
  | "Partnerships"
  | "Customer Success"
  | "Legal & Ops";
export const TRACKS: Track[] = [
  "Product",
  "Marketing",
  "Sales",
  "Partnerships",
  "Customer Success",
  "Legal & Ops",
];

export type Phase = "Validate" | "Pre-launch" | "Launch" | "Post-launch";
export const PHASES: Phase[] = ["Validate", "Pre-launch", "Launch", "Post-launch"];

export type Level = "High" | "Medium" | "Low";

export interface MarketOpportunity {
  market_summary: string;
  maturity: "Emerging" | "Growing" | "Mature" | "Saturated";
  demand_signals: string[];
  size_estimate: {
    tam: string;
    sam: string;
    som: string;
    assumptions: string[];
  };
  attractiveness_score: number;
  rationale: string;
}

export interface CustomerBuying {
  icp: {
    description: string;
    company_size_or_segment: string;
    industries_or_interests: string[];
    buying_triggers: string[];
  };
  buying_committee: {
    role: string;
    cares_about: string;
    influence: "Decision maker" | "Influencer" | "User" | "Blocker";
  }[];
  buying_process: {
    typical_cycle: string;
    steps: string[];
    home_vs_target_differences: string[];
  };
}

export interface Competition {
  competitors: {
    name: string;
    type: "Local incumbent" | "Global player" | "Status quo";
    strength: string;
    weakness: string;
    how_to_win: string;
  }[];
  status_quo_alternative: string;
}

export interface Positioning {
  home_positioning: string;
  target_positioning: string;
  key_changes: string[];
  messaging_pillars: { pillar: string; proof_point_needed: string }[];
  localisation_notes: string[];
  elevator_pitch_target: string;
}

export interface Pricing {
  pricing_norms: string;
  recommended_approach: string;
  currency_and_tax_notes: string[];
  payment_and_contract_norms: string[];
  discounting_norms: string;
  risks: string[];
}

export interface RoutesToMarket {
  recommended_entry_mode: "Direct" | "Partner-led" | "Hybrid" | "Marketplace" | "Pilot";
  rationale: string;
  channels: { channel: string; role: string; priority: "Primary" | "Secondary" | "Test" }[];
  partner_types: { type: string; why: string; examples_to_research: string[] }[];
  events_and_communities: string[];
}

export interface LegalOps {
  items: {
    title: string;
    detail: string;
    area:
      | "Data & privacy"
      | "Industry regulation"
      | "Tax & invoicing"
      | "Contracts & procurement"
      | "Entity & employment"
      | "Certifications & security"
      | "Consumer protection"
      | "Accessibility";
    severity: Level;
    owner_role: string;
  }[];
}

export interface Localisation {
  language: string[];
  product: string[];
  support: string[];
  sales_enablement: string[];
  proof_and_references: string[];
}

export interface LaunchPlan {
  tasks: {
    track: Track;
    phase: Phase;
    title: string;
    description: string;
    owner_role: string;
  }[];
}

export interface KpisRisks {
  kpis: { metric: string; target_guidance: string; phase: Phase }[];
  go_no_go_criteria: string[];
  risks: { risk: string; likelihood: Level; impact: Level; mitigation: string }[];
}

export interface ExecutiveSummary {
  recommendation: "Go" | "Go with conditions" | "Not yet";
  headline: string;
  top_priorities: string[];
  top_risks: string[];
  first_90_days: string;
}

export interface Modules {
  market_opportunity: MarketOpportunity | null;
  customer_buying: CustomerBuying | null;
  competition: Competition | null;
  positioning: Positioning | null;
  pricing: Pricing | null;
  routes_to_market: RoutesToMarket | null;
  legal_ops: LegalOps | null;
  localisation: Localisation | null;
  launch_plan: LaunchPlan | null;
  kpis_risks: KpisRisks | null;
}

export interface LaunchTask {
  id: string;
  track: Track;
  phase: Phase;
  title: string;
  description: string;
  owner_role: string;
  done: boolean;
  sort_order: number;
}

export interface Criterion {
  id: string;
  text: string;
  done: boolean;
  sort_order: number;
}

export interface Launch {
  id: string;
  created_at: string;
  product_name: string;
  product_description: string;
  industry: string;
  business_model: BusinessModel;
  home_market: string;
  target_market: string;
  current_presence: CurrentPresence;
  target_customer: string;
  sales_motion: SalesMotion;
  deal_size: string | null;
  entry_goal: EntryGoal;
  timeline: Timeline;
  team_and_budget: string | null;
  status: "generating" | "complete" | "partial_error";
  modules: Modules;
  module_status: Record<ModuleKey, ModuleStatus>;
  executive_summary: ExecutiveSummary | null;
  is_example: boolean;
  tasks: LaunchTask[];
  criteria: Criterion[];
}
