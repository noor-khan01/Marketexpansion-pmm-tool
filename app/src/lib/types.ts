/**
 * Types mirroring PRD §9 (AI output schemas), §10 (data model) and §10.4
 * (module keys), in that exact shape. Do not rename, add or remove fields —
 * the schemas are a contract with the AI generation layer that other agents
 * build against.
 */

// ─── §10.4 Module keys ──────────────────────────────────────────────────

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

// §6.3.3 — per-module render state (loading / done / error), plus the
// pre-generation "waiting" state the left rail needs (DESIGN.md left rail).
export type ModuleStatus = "waiting" | "loading" | "done" | "error";

// ─── §9.1 Module 1: Market opportunity ─────────────────────────────────

export type Maturity = "Emerging" | "Growing" | "Mature" | "Saturated";

export interface SizeEstimate {
  tam: string; // e.g. "€4.2bn"
  sam: string;
  som: string;
  assumptions: string[]; // [2–5]
}

export interface MarketOpportunity {
  market_summary: string;
  maturity: Maturity;
  demand_signals: string[]; // [3–6]
  size_estimate: SizeEstimate;
  attractiveness_score: number; // integer 1–10
  rationale: string;
}

// ─── §9.2 Module 2: Customer & buying process ──────────────────────────

export type Influence = "Decision maker" | "Influencer" | "User" | "Blocker";

export interface Icp {
  description: string;
  company_size_or_segment: string;
  industries_or_interests: string[]; // [2–6]
  buying_triggers: string[]; // [2–5]
}

export interface BuyingCommitteeMember {
  role: string;
  cares_about: string;
  influence: Influence;
}

export interface BuyingProcess {
  typical_cycle: string; // e.g. "3–6 months"
  steps: string[]; // [3–8]
  home_vs_target_differences: string[]; // [2–5]
}

export interface CustomerBuying {
  icp: Icp;
  buying_committee: BuyingCommitteeMember[]; // [3–6]; consumer segments if B2C
  buying_process: BuyingProcess;
}

// ─── §9.3 Module 3: Competitive landscape ──────────────────────────────

export type CompetitorType = "Local incumbent" | "Global player" | "Status quo";

export interface Competitor {
  name: string;
  type: CompetitorType;
  strength: string;
  weakness: string;
  how_to_win: string;
}

export interface Competition {
  competitors: Competitor[]; // [4–6], at least one "Local incumbent"
  status_quo_alternative: string;
}

// ─── §9.4 Module 4: Positioning & messaging ────────────────────────────

export interface MessagingPillar {
  pillar: string;
  proof_point_needed: string;
}

export interface Positioning {
  home_positioning: string;
  target_positioning: string;
  key_changes: string[]; // [3–6], short tag-length phrases
  messaging_pillars: MessagingPillar[]; // [3–4]
  localisation_notes: string[]; // [2–5]
  elevator_pitch_target: string; // 1–2 sentences
}

// ─── §9.5 Module 5: Pricing & packaging ────────────────────────────────

export interface Pricing {
  pricing_norms: string;
  recommended_approach: string;
  currency_and_tax_notes: string[]; // [2–5]
  payment_and_contract_norms: string[]; // [2–5]
  discounting_norms: string;
  risks: string[]; // [2–4]
}

// ─── §9.6 Module 6: Routes to market ───────────────────────────────────

export type EntryMode = "Direct" | "Partner-led" | "Hybrid" | "Marketplace" | "Pilot";
export type ChannelPriority = "Primary" | "Secondary" | "Test";

export interface Channel {
  channel: string;
  role: string;
  priority: ChannelPriority;
}

export interface PartnerType {
  type: string;
  why: string;
  examples_to_research: string[]; // [1–4]
}

export interface RoutesToMarket {
  recommended_entry_mode: EntryMode;
  rationale: string;
  channels: Channel[]; // [4–8]
  partner_types: PartnerType[]; // [2–4]
  events_and_communities: string[]; // [2–6]
}

// ─── §9.7 Module 7: Legal, compliance & operations ─────────────────────

export type LegalArea =
  | "Data & privacy"
  | "Industry regulation"
  | "Tax & invoicing"
  | "Contracts & procurement"
  | "Entity & employment"
  | "Certifications & security"
  | "Consumer protection"
  | "Accessibility";

export type Severity = "High" | "Medium" | "Low";

export interface LegalOpsItem {
  title: string;
  detail: string;
  area: LegalArea;
  severity: Severity;
  owner_role: string;
}

export interface LegalOps {
  items: LegalOpsItem[]; // [5–10]
}

// ─── §9.8 Module 8: Localisation & readiness ───────────────────────────

export interface Localisation {
  language: string[]; // [1–5]
  product: string[]; // [1–5]
  support: string[]; // [1–5]
  sales_enablement: string[]; // [1–5]
  proof_and_references: string[]; // [1–5]
}

// ─── §9.9 Module 9: Launch plan ────────────────────────────────────────

export type Track =
  | "Product"
  | "Marketing"
  | "Sales"
  | "Partnerships"
  | "Customer Success"
  | "Legal & Ops";

export type Phase = "Validate" | "Pre-launch" | "Launch" | "Post-launch";

export interface LaunchPlanTask {
  track: Track;
  phase: Phase;
  title: string; // max ~8 words
  description: string; // 1–2 sentences
  owner_role: string;
}

export interface LaunchPlan {
  tasks: LaunchPlanTask[]; // [18–28]; every track has at least 2 tasks
}

// ─── §9.10 Module 10: KPIs, go/no-go & risks ───────────────────────────

export interface Kpi {
  metric: string;
  target_guidance: string;
  phase: Phase;
}

export type Likelihood = "High" | "Medium" | "Low";
export type Impact = "High" | "Medium" | "Low";

export interface Risk {
  risk: string;
  likelihood: Likelihood;
  impact: Impact;
  mitigation: string;
}

export interface KpisRisks {
  kpis: Kpi[]; // [5–8]
  go_no_go_criteria: string[]; // [4–6]
  risks: Risk[]; // [5–7]
}

// ─── §9.11 Executive summary ────────────────────────────────────────────

export type Recommendation = "Go" | "Go with conditions" | "Not yet";

export interface ExecutiveSummary {
  recommendation: Recommendation;
  headline: string; // 1 sentence
  top_priorities: string[]; // exactly 3
  top_risks: string[]; // exactly 3
  first_90_days: string; // 2–4 sentences
}

// ─── Modules map (keyed by ModuleKey, per §10.1 `modules` jsonb column) ──

export interface ModulesMap {
  market_opportunity: MarketOpportunity;
  customer_buying: CustomerBuying;
  competition: Competition;
  positioning: Positioning;
  pricing: Pricing;
  routes_to_market: RoutesToMarket;
  legal_ops: LegalOps;
  localisation: Localisation;
  launch_plan: LaunchPlan;
  kpis_risks: KpisRisks;
}

export type ModuleStatusMap = Record<ModuleKey, ModuleStatus>;

// ─── §6.2.1 Form field enums ────────────────────────────────────────────

export type BusinessModel = "B2B" | "B2C" | "B2B2C";
export type CurrentPresence =
  | "None"
  | "A few customers"
  | "Existing global customers with teams there";
export type SalesMotion = "Self-serve" | "Sales-led" | "Partner-led" | "Hybrid";
export type EntryGoal = "Test demand" | "Soft launch" | "Full launch";
export type Timeline = "3 months" | "6 months" | "12 months";

// ─── §10.1 Table `launches` ─────────────────────────────────────────────

export type LaunchStatus = "generating" | "complete" | "partial_error";

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
  status: LaunchStatus;
  modules: Partial<ModulesMap>;
  module_status: ModuleStatusMap;
  executive_summary: ExecutiveSummary | null;
  is_example: boolean;
}

// ─── §10.2 Table `tasks` ─────────────────────────────────────────────────

export interface Task {
  id: string;
  launch_id: string;
  track: Track;
  phase: Phase;
  title: string;
  description: string;
  owner_role: string;
  done: boolean;
  sort_order: number;
}

// ─── §10.3 Table `criteria` ──────────────────────────────────────────────

export interface Criterion {
  id: string;
  launch_id: string;
  text: string;
  done: boolean;
  sort_order: number;
}
