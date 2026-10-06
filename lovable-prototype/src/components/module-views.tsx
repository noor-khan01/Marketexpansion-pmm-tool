import { AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Bullets,
  Clamped,
  DataTable,
  Pill,
  StatTile,
  SubHeading,
  influenceTone,
  levelTone,
  priorityTone,
} from "@/components/plan-ui";
import {
  PHASES,
  TRACKS,
  type BusinessModel,
  type Competition,
  type CustomerBuying,
  type Criterion,
  type KpisRisks,
  type LaunchTask,
  type LegalOps,
  type Localisation,
  type MarketOpportunity,
  type Positioning,
  type Pricing,
  type RoutesToMarket,
} from "@/lib/gtm-types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <SubHeading>{title}</SubHeading>
      {children}
    </section>
  );
}

/* ---------- 1. Market opportunity (FR-30) ---------- */
export function MarketOpportunityView({ data }: { data: MarketOpportunity }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-[13rem]">
          <div className="eyebrow">Attractiveness</div>
          <div className="flex items-end gap-1">
            <span className="text-5xl font-bold leading-none text-primary">
              {data.attractiveness_score}
            </span>
            <span className="pb-1 text-lg font-semibold text-muted-foreground">/10</span>
          </div>
          <Progress value={data.attractiveness_score * 10} className="mt-2 h-2.5" />
        </div>
        <div>
          <div className="eyebrow">Market maturity</div>
          <Pill tone="primary" className="mt-1">
            {data.maturity}
          </Pill>
        </div>
      </div>

      <p className="text-foreground">{data.market_summary}</p>

      <Section title="Demand signals">
        <Bullets items={data.demand_signals} />
      </Section>

      <Section title="Market size estimate">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatTile label="TAM" value={data.size_estimate.tam} hint="Total addressable" />
          <StatTile label="SAM" value={data.size_estimate.sam} hint="Serviceable addressable" />
          <StatTile label="SOM" value={data.size_estimate.som} hint="Serviceable obtainable" />
        </div>
        {/* NFR-06: assumptions always shown with estimates */}
        <div className="mt-3 rounded-lg border border-border bg-muted/50 p-3">
          <div className="eyebrow">Assumptions</div>
          <ul className="mt-1 space-y-1 text-sm text-foreground">
            {data.size_estimate.assumptions.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Rationale">
        <p className="text-foreground">{data.rationale}</p>
      </Section>
    </div>
  );
}

/* ---------- 2. Customer & buying process (FR-31) ---------- */
export function CustomerBuyingView({
  data,
  businessModel,
}: {
  data: CustomerBuying;
  businessModel: BusinessModel;
}) {
  const gridTitle = businessModel === "B2C" ? "Consumer segments" : "Buying committee";
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-primary-soft/50 p-4">
        <div className="eyebrow">Ideal customer profile</div>
        <p className="mt-1 text-foreground">{data.icp.description}</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <SubHeading>Size / segment</SubHeading>
            <p className="text-foreground">{data.icp.company_size_or_segment}</p>
          </div>
          <div>
            <SubHeading>Industries / interests</SubHeading>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {data.icp.industries_or_interests.map((i) => (
                <Pill key={i} tone="outline">
                  {i}
                </Pill>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <SubHeading>Buying triggers</SubHeading>
          <Bullets className="mt-1" items={data.icp.buying_triggers} />
        </div>
      </div>

      <Section title={gridTitle}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {data.buying_committee.map((m) => (
            <div key={m.role} className="rounded-lg border border-border bg-card p-4">
              <div className="font-bold text-foreground">{m.role}</div>
              <Pill tone={influenceTone(m.influence)} className="mt-1.5">
                {m.influence}
              </Pill>
              <p className="mt-2 text-sm text-foreground">{m.cares_about}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buying process">
        <Pill tone="primary">Typical cycle: {data.buying_process.typical_cycle}</Pill>
        <ol className="mt-3 space-y-2">
          {data.buying_process.steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <SubHeading>What&apos;s different from home market</SubHeading>
        <Bullets className="mt-1" items={data.buying_process.home_vs_target_differences} />
      </div>
    </div>
  );
}

/* ---------- 3. Competitive landscape (FR-32) ---------- */
export function CompetitionView({ data }: { data: Competition }) {
  const typeTone = (t: Competition["competitors"][number]["type"]) =>
    t === "Local incumbent" ? "primary" : t === "Global player" ? "outline" : "neutral";
  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-2">
        {data.competitors.map((c) => (
          <div key={c.name} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-foreground">{c.name}</span>
              <Pill tone={typeTone(c.type)}>{c.type}</Pill>
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="eyebrow">Strength</dt>
                <dd className="text-foreground">{c.strength}</dd>
              </div>
              <div>
                <dt className="eyebrow">Weakness</dt>
                <dd className="text-foreground">{c.weakness}</dd>
              </div>
              <div>
                <dt className="eyebrow">How to win</dt>
                <dd className="font-medium text-foreground">{c.how_to_win}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
      <div className="rounded-lg border-l-4 border-l-primary border border-border bg-primary-soft/40 p-4">
        <SubHeading>Status quo alternative</SubHeading>
        <p className="mt-1 text-foreground">{data.status_quo_alternative}</p>
      </div>
    </div>
  );
}

/* ---------- 4. Positioning & messaging (FR-33) ---------- */
export function PositioningView({ data }: { data: Positioning }) {
  return (
    <div className="space-y-6">
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-lg border border-border bg-muted/60 p-4">
          <div className="eyebrow">Home market</div>
          <p className="mt-1 text-foreground">{data.home_positioning}</p>
        </div>
        <div className="flex items-center justify-center text-2xl font-bold text-primary" aria-hidden>
          →
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary-soft p-4">
          <div className="eyebrow">Target market</div>
          <p className="mt-1 font-medium text-foreground">{data.target_positioning}</p>
        </div>
      </div>

      <Section title="Key changes">
        <div className="flex flex-wrap gap-1.5">
          {data.key_changes.map((k) => (
            <Pill key={k} tone="primary">
              {k}
            </Pill>
          ))}
        </div>
      </Section>

      <Section title="Messaging pillars">
        <DataTable
          headers={["Pillar", "Proof point needed"]}
          rows={data.messaging_pillars.map((p) => [
            <span className="font-semibold text-foreground">{p.pillar}</span>,
            <span className="text-foreground">{p.proof_point_needed}</span>,
          ])}
        />
      </Section>

      <Section title="Localisation notes">
        <Bullets items={data.localisation_notes} />
      </Section>

      <blockquote className="rounded-lg border-l-4 border-l-primary border border-border bg-primary-soft/40 p-4 text-lg font-medium text-foreground">
        “{data.elevator_pitch_target}”
        <footer className="mt-1 text-sm font-semibold text-muted-foreground">
          Target-market elevator pitch
        </footer>
      </blockquote>
    </div>
  );
}

/* ---------- 5. Pricing & packaging (FR-34) ---------- */
export function PricingView({ data }: { data: Pricing }) {
  return (
    <div className="space-y-5">
      <Section title="Pricing norms">
        <p className="text-foreground">{data.pricing_norms}</p>
      </Section>
      <Section title="Recommended approach">
        <div className="rounded-lg border border-primary/30 bg-primary-soft p-4 font-medium text-foreground">
          {data.recommended_approach}
        </div>
      </Section>
      <Section title="Currency & tax notes">
        <Bullets items={data.currency_and_tax_notes} />
      </Section>
      <Section title="Payment & contract norms">
        <Bullets items={data.payment_and_contract_norms} />
      </Section>
      <Section title="Discounting norms">
        <p className="text-foreground">{data.discounting_norms}</p>
      </Section>
      <Section title="Risks">
        <ul className="space-y-1.5">
          {data.risks.map((r) => (
            <li key={r} className="flex gap-2 text-foreground">
              <AlertTriangle className="mt-1 size-4 shrink-0 text-warning" aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* ---------- 6. Routes to market (FR-35) ---------- */
export function RoutesToMarketView({ data }: { data: RoutesToMarket }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-primary/30 bg-primary-soft p-4">
        <div className="eyebrow">Recommended entry mode</div>
        <div className="mt-1 text-3xl font-bold text-primary">{data.recommended_entry_mode}</div>
        <p className="mt-2 text-foreground">{data.rationale}</p>
      </div>

      <Section title="Channels">
        <DataTable
          headers={["Channel", "Role", "Priority"]}
          rows={data.channels.map((c) => [
            <span className="font-semibold text-foreground">{c.channel}</span>,
            <span className="text-foreground">{c.role}</span>,
            <Pill tone={priorityTone(c.priority)}>{c.priority}</Pill>,
          ])}
        />
      </Section>

      <Section title="Partner types">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {data.partner_types.map((p) => (
            <div key={p.type} className="rounded-lg border border-border bg-card p-4">
              <div className="font-bold text-foreground">{p.type}</div>
              <p className="mt-1 text-sm text-foreground">{p.why}</p>
              <div className="mt-2">
                <div className="eyebrow">Examples to research</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {p.examples_to_research.map((e) => (
                    <Pill key={e} tone="outline">
                      {e}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Events & communities">
        <Bullets items={data.events_and_communities} />
      </Section>
    </div>
  );
}

/* ---------- 7. Legal, compliance & operations (FR-36) ---------- */
export function LegalOpsView({ data }: { data: LegalOps }) {
  const rank = { High: 0, Medium: 1, Low: 2 } as const;
  const items = [...data.items].sort((a, b) => rank[a.severity] - rank[b.severity]);
  return (
    <div className="space-y-4">
      {/* NFR-06: verification banner always shown */}
      <div
        role="note"
        className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning-soft p-3 font-semibold text-foreground"
      >
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
        <span>Verify with local legal and tax experts before acting.</span>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {items.map((item) => (
          <div key={item.title} className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-foreground">{item.title}</span>
              <Pill tone="outline">{item.area}</Pill>
              <Pill tone={levelTone(item.severity)}>{item.severity} severity</Pill>
            </div>
            <Clamped className="mt-1.5" text={item.detail} />
            <div className="mt-2 text-sm font-semibold text-muted-foreground">
              Owner: {item.owner_role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 8. Localisation & readiness (FR-37) ---------- */
export function LocalisationView({ data }: { data: Localisation }) {
  const groups: { title: string; items: string[] }[] = [
    { title: "Language", items: data.language },
    { title: "Product", items: data.product },
    { title: "Support", items: data.support },
    { title: "Sales enablement", items: data.sales_enablement },
    { title: "Proof & references", items: data.proof_and_references },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {groups.map((g) => (
        <div key={g.title} className="rounded-lg border border-border bg-card p-4">
          <SubHeading>{g.title}</SubHeading>
          <ul className="mt-2 space-y-1.5">
            {g.items.map((i) => (
              <li key={i} className="flex gap-2 text-foreground">
                <span
                  aria-hidden
                  className="mt-1.5 size-3.5 shrink-0 rounded-[4px] border border-border-strong bg-muted"
                />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- 9. Launch plan (FR-38) ---------- */
export function LaunchPlanView({
  tasks,
  onToggleTask,
}: {
  tasks: LaunchTask[];
  onToggleTask: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[56rem]">
          <div className="grid grid-cols-[11rem_repeat(4,minmax(0,1fr))] gap-2">
            <div />
            {PHASES.map((p) => (
              <div key={p} className="rounded-lg bg-muted px-3 py-2 text-sm font-bold text-foreground">
                {p}
              </div>
            ))}
            {TRACKS.map((track) => {
              const trackTasks = tasks.filter((t) => t.track === track);
              const doneCount = trackTasks.filter((t) => t.done).length;
              const pct = trackTasks.length
                ? Math.round((doneCount / trackTasks.length) * 100)
                : 0;
              return (
                <div key={track} className="col-span-5 grid grid-cols-subgrid gap-2">
                  <div className="py-2">
                    <div className="font-bold text-foreground">{track}</div>
                    <div className="text-sm text-muted-foreground">
                      {doneCount}/{trackTasks.length} done
                    </div>
                    <Progress value={pct} className="mt-1.5 h-2" />
                  </div>
                  {PHASES.map((phase) => (
                    <div key={phase} className="space-y-2 py-2">
                      {trackTasks
                        .filter((t) => t.phase === phase)
                        .map((t) => (
                          <div
                            key={t.id}
                            className="rounded-lg border border-border bg-card p-3 shadow-card"
                          >
                            <div className="flex gap-2">
                              <Checkbox
                                id={t.id}
                                checked={t.done}
                                onCheckedChange={() => onToggleTask(t.id)}
                                className="mt-0.5"
                              />
                              <label
                                htmlFor={t.id}
                                className="cursor-pointer text-sm font-semibold text-foreground"
                              >
                                {t.title}
                              </label>
                            </div>
                            <Clamped className="mt-1.5 text-sm" text={t.description} />
                            <div className="mt-1.5 text-xs font-semibold text-muted-foreground">
                              {t.owner_role}
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 10. KPIs, go/no-go & risks (FR-39) ---------- */
export function KpisRisksView({
  data,
  criteria,
  onToggleCriterion,
}: {
  data: KpisRisks;
  criteria: Criterion[];
  onToggleCriterion: (id: string) => void;
}) {
  const rank = { High: 0, Medium: 1, Low: 2 } as const;
  const risks = [...data.risks].sort(
    (a, b) =>
      rank[a.likelihood] + rank[a.impact] - (rank[b.likelihood] + rank[b.impact]),
  );
  return (
    <div className="space-y-6">
      <Section title="KPIs">
        <DataTable
          headers={["Metric", "Target guidance", "Phase"]}
          rows={data.kpis.map((k) => [
            <span className="font-semibold text-foreground">{k.metric}</span>,
            <span className="text-foreground">{k.target_guidance}</span>,
            <Pill tone="outline">{k.phase}</Pill>,
          ])}
        />
      </Section>

      <Section title="Go / no-go criteria">
        <ul className="space-y-2">
          {criteria.map((c) => (
            <li
              key={c.id}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3"
            >
              <Checkbox
                id={c.id}
                checked={c.done}
                onCheckedChange={() => onToggleCriterion(c.id)}
                className="mt-0.5"
              />
              <label htmlFor={c.id} className="cursor-pointer text-foreground">
                {c.text}
              </label>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Risks">
        <DataTable
          headers={["Risk", "Likelihood", "Impact", "Mitigation"]}
          rows={risks.map((r) => [
            <span className="font-semibold text-foreground">{r.risk}</span>,
            <Pill tone={levelTone(r.likelihood)}>{r.likelihood}</Pill>,
            <Pill tone={levelTone(r.impact)}>{r.impact}</Pill>,
            <span className="text-foreground">{r.mitigation}</span>,
          ])}
        />
      </Section>
    </div>
  );
}
