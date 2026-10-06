/**
 * Hand-written placeholder data matching PRD §14 seed data (SD-02, SD-03)
 * and every schema in §9. This is what the design foundation renders
 * against — the two page-building agents can import `PLACEHOLDER_LAUNCHES`,
 * `PLACEHOLDER_TASKS` and `PLACEHOLDER_CRITERIA` directly, or use
 * `getLaunchBundle(id)` for a single launch plus its tasks and criteria.
 */

import type { Criterion, Launch, Task } from "./types";

/** Narrows an optional module to defined without the `!` non-null assertion operator. */
function requireModule<T>(value: T | undefined, moduleKey: string): T {
  if (value === undefined) {
    throw new Error(`Expected placeholder module "${moduleKey}" to be populated`);
  }
  return value;
}

// ─── SD-02: LedgerFlow — UK → Germany, B2B ──────────────────────────────

const LEDGERFLOW_ID = "launch-ledgerflow-de";

const ledgerFlow: Launch = {
  id: LEDGERFLOW_ID,
  created_at: "2026-08-14T09:30:00.000Z",
  product_name: "LedgerFlow – cloud invoicing for SMBs",
  product_description:
    "Cloud invoicing and accounts-receivable software for small and mid-sized businesses. Handles invoice creation, sending, payment tracking and accountant handoff, sold today as a self-serve SaaS subscription to UK SMBs with a lightweight sales-assisted tier for larger accounts.",
  industry: "Fintech / SaaS",
  business_model: "B2B",
  home_market: "United Kingdom",
  target_market: "Germany",
  current_presence: "None",
  target_customer: "SMB finance teams (10–200 employees)",
  sales_motion: "Hybrid",
  deal_size: "£3k–£15k ACV",
  entry_goal: "Soft launch",
  timeline: "6 months",
  team_and_budget: "3 people, moderate budget",
  status: "complete",
  is_example: true,
  module_status: {
    market_opportunity: "done",
    customer_buying: "done",
    competition: "done",
    positioning: "done",
    pricing: "done",
    routes_to_market: "done",
    legal_ops: "done",
    localisation: "done",
    launch_plan: "done",
    kpis_risks: "done",
  },
  modules: {
    market_opportunity: {
      market_summary:
        "Germany's B2B e-invoicing mandate (Wachstumschancengesetz) requires all businesses to be able to receive structured e-invoices from January 2025, with issuing obligations phasing in through 2027. That deadline is forcing the country's ~1.1 million Mittelstand SMBs — most still invoicing through DATEV, Lexoffice or Excel — to modernise their invoicing stack whether they want to or not.",
      maturity: "Growing",
      demand_signals: [
        "The Wachstumschancengesetz e-invoicing mandate creates a hard compliance deadline most SMBs haven't planned for yet.",
        "DATEV, the de facto standard for German Mittelstand accounting, has no modern self-serve invoicing UX, leaving an opening.",
        "Search interest in 'Rechnungsdigitalisierung' and 'E-Rechnung Pflicht' has risen steadily alongside mandate coverage.",
        "German back-office SaaS funding held up better than the broader European SaaS market through the recent slowdown.",
        "Roughly 1.1 million registered German companies fall in the 10–200 employee band this product targets.",
      ],
      size_estimate: {
        tam: "€4.2bn",
        sam: "€620m",
        som: "€18m",
        assumptions: [
          "Assumes ~1.1m German SMBs with 10–200 employees are addressable",
          "Assumes 8% adopt a modern invoicing tool within 3 years, in line with UK SaaS adoption curves",
          "SOM assumes 0.3% share captured in the first 18 months via a hybrid sales motion",
        ],
      },
      attractiveness_score: 7,
      rationale:
        "The e-invoicing mandate is a genuine forcing function rather than a nice-to-have, and DATEV's dated UX leaves real room for a modern challenger. The score isn't higher because DATEV's trust moat with Steuerberater is deep, and LedgerFlow will need a compliance-first product before it can compete on experience alone.",
    },
    customer_buying: {
      icp: {
        description:
          "Finance managers and office managers at German Mittelstand companies who currently invoice via DATEV, Lexoffice or manual Excel/Word templates and must move to structured e-invoicing ahead of the 2027 mandate.",
        company_size_or_segment: "10–200 employees, €2m–€50m revenue",
        industries_or_interests: [
          "Professional services",
          "Wholesale & distribution",
          "Manufacturing (Mittelstand)",
          "E-commerce",
        ],
        buying_triggers: [
          "Upcoming e-invoicing mandate deadline",
          "Outgrowing Excel-based invoicing",
          "Switching accountants (Steuerberater)",
          "New finance hire wanting modern tooling",
        ],
      },
      buying_committee: [
        {
          role: "Head of Finance (Kaufmännische Leitung)",
          cares_about: "Compliance with XRechnung/ZUGFeRD and a clean audit trail",
          influence: "Decision maker",
        },
        {
          role: "Steuerberater (external tax advisor)",
          cares_about: "DATEV export compatibility and GoBD compliance",
          influence: "Influencer",
        },
        {
          role: "Office manager",
          cares_about: "Day-to-day ease of creating and sending invoices",
          influence: "User",
        },
        {
          role: "IT lead (often outsourced)",
          cares_about: "EU data residency and integration effort",
          influence: "Blocker",
        },
        {
          role: "Managing director (Geschäftsführer)",
          cares_about: "Cost versus the existing DATEV bundle and switching risk",
          influence: "Decision maker",
        },
      ],
      buying_process: {
        typical_cycle: "3–5 months",
        steps: [
          "Steuerberater flags the upcoming e-invoicing requirement",
          "Office manager researches alternatives to DATEV Rechnungswesen",
          "Free trial run with a handful of real invoices",
          "Steuerberater reviews GoBD and DATEV export compatibility",
          "Managing director signs off on an annual contract",
          "Steuerberater assists with historical data migration",
          "Rollout to the full finance team",
        ],
        home_vs_target_differences: [
          "The Steuerberater has far more influence over the decision than a UK accountant typically does",
          "GoBD audit-trail requirements have no direct UK equivalent",
          "DATEV compatibility is a near-mandatory checkbox in Germany, not a nice-to-have",
          "German buyers expect data hosted in the EU, often specifically in Germany",
        ],
      },
    },
    competition: {
      competitors: [
        {
          name: "DATEV",
          type: "Local incumbent",
          strength: "Universal trust among German Steuerberater and near-default status",
          weakness: "Dated UX, steep learning curve, priced as part of a bundle",
          how_to_win:
            "Position as the modern front-end that still exports cleanly to DATEV, so the Steuerberater relationship stays intact",
        },
        {
          name: "Lexoffice (Lexware)",
          type: "Local incumbent",
          strength: "Well-known German SMB brand with German-first support",
          weakness: "Limited automation and a weak API for scaling businesses",
          how_to_win:
            "Win on automation depth and hybrid sales support that Lexoffice, a self-serve-only product, doesn't offer",
        },
        {
          name: "sevDesk",
          type: "Local incumbent",
          strength: "Strong SEO presence and self-serve funnel for micro-businesses",
          weakness: "Under-serves the 10–200 employee segment LedgerFlow targets",
          how_to_win: "Target the segment above sevDesk's sweet spot with dedicated onboarding",
        },
        {
          name: "Xero",
          type: "Global player",
          strength: "Strong brand recognition and robust third-party integrations",
          weakness: "Thin German localisation and no native GoBD/DATEV workflow",
          how_to_win: "Out-localise Xero on the specific German compliance requirements it lacks",
        },
        {
          name: "Status quo (Excel + Steuerberater)",
          type: "Status quo",
          strength: "Zero switching cost and deep familiarity",
          weakness: "No compliance path to the 2027 e-invoicing mandate",
          how_to_win: "Lead with mandate urgency and a guided, low-effort migration",
        },
      ],
      status_quo_alternative:
        "Manual invoicing in Excel or Word templates, sent as PDF, with the Steuerberater reconciling everything at month-end — still the default for most German Mittelstand companies today.",
    },
    positioning: {
      home_positioning: "The fast, modern invoicing tool for UK SMBs who've outgrown spreadsheets.",
      target_positioning:
        "The invoicing tool that gets German Mittelstand companies e-invoicing-compliant before 2027 — without giving up their Steuerberater's DATEV workflow.",
      key_changes: [
        "Compliance-led, not speed-led",
        "DATEV export as a headline feature",
        "Steuerberater treated as a co-buyer",
        "GoBD audit trail front and centre",
      ],
      messaging_pillars: [
        {
          pillar: "2027-ready e-invoicing",
          proof_point_needed:
            "Certified XRechnung/ZUGFeRD output validated against the KoSIT test suite",
        },
        {
          pillar: "Your Steuerberater keeps their workflow",
          proof_point_needed: "One-click DATEV-format export demoed live during onboarding",
        },
        {
          pillar: "GoBD-compliant audit trail",
          proof_point_needed: "Immutable invoice log with timestamped change history",
        },
        {
          pillar: "EU-hosted data",
          proof_point_needed: "Frankfurt-region hosting confirmed in security documentation",
        },
      ],
      localisation_notes: [
        "All UI and support in professionally translated German, not machine-translated",
        "Invoice templates need German legal footer fields (Kleinunternehmerregelung, Steuernummer)",
        "Pricing shown in EUR inclusive of 19% MwSt by default",
        "Support hours aligned to CET business hours",
      ],
      elevator_pitch_target:
        "LedgerFlow gets German Mittelstand teams e-invoicing-compliant ahead of the 2027 mandate, with a one-click export that keeps their Steuerberater's DATEV workflow intact.",
    },
    pricing: {
      pricing_norms:
        "German SMB software is typically sold as an annual contract with a monthly billing option, VAT-inclusive pricing displayed by default, and a strong expectation of a free trial before committing.",
      recommended_approach:
        "Lead with a 3-tier EUR-denominated plan (Starter / Team / Business), annual billing as the default with a 10–15% discount versus monthly, and a 30-day free trial rather than a freemium tier to keep support costs down during soft launch.",
      currency_and_tax_notes: [
        "Display all prices inclusive of 19% Mehrwertsteuer (MwSt), the German norm, unlike the UK's ex-VAT convention",
        "Support reverse-charge invoicing for B2B customers with a valid USt-IdNr",
        "Kleinunternehmer (small business) customers need invoices without VAT line items",
      ],
      payment_and_contract_norms: [
        "SEPA direct debit (Lastschrift) is the default payment expectation, more than card",
        "Annual contracts are commonly invoiced up front with 14–30 day payment terms",
        "German buyers expect a signed Auftragsverarbeitungsvertrag (data processing agreement) before rollout",
      ],
      discounting_norms:
        "A modest annual-versus-monthly discount (10–15%) is normal; German SMB buyers are less discount-driven than UK buyers but expect transparent, fixed list pricing rather than negotiated deals.",
      risks: [
        "EUR pricing needs to absorb FX volatility without frequent repricing, which German buyers dislike",
        "Missing SEPA direct debit at launch could stall deals from buyers used to Lastschrift",
        "Underestimating Kleinunternehmer invoice-format edge cases could create early support load",
      ],
    },
    routes_to_market: {
      recommended_entry_mode: "Hybrid",
      rationale:
        "A self-serve trial funnel captures Steuerberater-referred prospects cheaply, while a small inside-sales function is needed to handle the multi-stakeholder DATEV and GoBD conversations larger Mittelstand buyers require.",
      channels: [
        {
          channel: "Steuerberater partner referrals",
          role: "Primary trust signal and lead source",
          priority: "Primary",
        },
        {
          channel: "German SEO/content on the e-invoicing mandate",
          role: "Capture high-intent, compliance-driven search",
          priority: "Primary",
        },
        {
          channel: "LinkedIn DACH-targeted ads",
          role: "Build awareness with finance and office managers",
          priority: "Secondary",
        },
        {
          channel: "DATEV Marktplatz listing",
          role: "Discoverability among DATEV's existing user base",
          priority: "Secondary",
        },
        {
          channel: "Regional Mittelstand trade associations (IHK events)",
          role: "Credibility and warm introductions",
          priority: "Test",
        },
        {
          channel: "Outbound to Steuerberater firms",
          role: "Multiplier — one firm advises dozens of SMB clients",
          priority: "Test",
        },
      ],
      partner_types: [
        {
          type: "Steuerberater firms",
          why: "Each advises dozens of SMB clients facing the same 2027 mandate",
          examples_to_research: [
            "Regional Steuerberater networks in NRW and Bavaria",
            "DATEV-certified partner directories",
          ],
        },
        {
          type: "DATEV marketplace ecosystem",
          why: "Distribution to an installed base that already trusts DATEV exports",
          examples_to_research: ["DATEV Marktplatz partner application process"],
        },
        {
          type: "IHK (Chambers of Commerce)",
          why: "Regional trust and event access for Mittelstand outreach",
          examples_to_research: ["IHK NRW digitalisation working groups"],
        },
      ],
      events_and_communities: [
        "DATEV Marktplatz Partnertag",
        "IHK regional digitalisation events",
        "German fintech/SaaS meetups (Berlin, Munich)",
        "Steuerberater regional conferences (StB-Tag)",
      ],
    },
    legal_ops: {
      items: [
        {
          title: "E-invoicing format compliance (XRechnung/ZUGFeRD)",
          detail:
            "Invoices issued to German B2B customers must support structured, machine-readable formats ahead of the 2027 mandate; receiving capability is already required from January 2025.",
          area: "Industry regulation",
          severity: "High",
          owner_role: "Compliance lead",
        },
        {
          title: "GoBD audit-trail requirements",
          detail:
            "Financial records must be tamper-evident and retained per German GoBD principles, including a timestamped change log.",
          area: "Tax & invoicing",
          severity: "High",
          owner_role: "Engineering lead",
        },
        {
          title: "EU/German data residency expectations",
          detail:
            "German SMB buyers commonly expect data hosted within the EU, often specifically in Germany, beyond baseline GDPR compliance.",
          area: "Data & privacy",
          severity: "High",
          owner_role: "Engineering lead",
        },
        {
          title: "Auftragsverarbeitungsvertrag (DPA) template",
          detail:
            "German business customers will typically require a signed data processing agreement before go-live.",
          area: "Contracts & procurement",
          severity: "Medium",
          owner_role: "Legal counsel",
        },
        {
          title: "German VAT/USt invoice requirements",
          detail:
            "Invoices must include a Steuernummer/USt-IdNr and comply with Kleinunternehmerregelung formatting where relevant.",
          area: "Tax & invoicing",
          severity: "Medium",
          owner_role: "Finance lead",
        },
        {
          title: "Local entity versus EU VAT registration",
          detail:
            "Selling into Germany may require VAT registration even without a local entity, depending on revenue thresholds.",
          area: "Entity & employment",
          severity: "Medium",
          owner_role: "Finance lead",
        },
        {
          title: "Compliant Impressum and German legal pages",
          detail:
            "Even a B2B site serving German visitors is commonly expected to carry a compliant Impressum.",
          area: "Consumer protection",
          severity: "Low",
          owner_role: "Legal counsel",
        },
      ],
    },
    localisation: {
      language: [
        "Full German UI translation, professionally done rather than machine-translated",
        "German-language onboarding emails and in-app help",
        "Support responses in German during CET hours",
      ],
      product: [
        "XRechnung/ZUGFeRD export module",
        "DATEV-format export",
        "German invoice template with Steuernummer/USt-IdNr fields",
        "EUR as default currency with 19% MwSt shown inclusive",
      ],
      support: [
        "German-speaking support contact (email and phone)",
        "CET business-hours coverage",
        "Help centre articles translated, not just the product UI",
      ],
      sales_enablement: [
        "German-language sales deck with a mandate timeline slide",
        "Steuerberater-specific one-pager on DATEV compatibility",
        "ROI calculator referencing EUR pricing",
      ],
      proof_and_references: [
        "At least one German Mittelstand case study before broader launch",
        "Steuerberater testimonial on GoBD compliance",
        "Security page listing Frankfurt-region hosting",
      ],
    },
    launch_plan: {
      tasks: [
        {
          track: "Product",
          phase: "Validate",
          title: "Build XRechnung/ZUGFeRD export",
          description:
            "Implement structured e-invoice export and validate against the KoSIT test suite.",
          owner_role: "Engineering lead",
        },
        {
          track: "Product",
          phase: "Validate",
          title: "Add DATEV-format export",
          description:
            "Let German accountants pull invoice data directly into DATEV without reformatting.",
          owner_role: "Engineering lead",
        },
        {
          track: "Product",
          phase: "Pre-launch",
          title: "Localise UI into German",
          description: "Translate the full product UI and email flows into professional German.",
          owner_role: "Product designer",
        },
        {
          track: "Product",
          phase: "Pre-launch",
          title: "Add GoBD-compliant audit log",
          description:
            "Ship a tamper-evident, timestamped change history for every invoice record.",
          owner_role: "Engineering lead",
        },
        {
          track: "Marketing",
          phase: "Validate",
          title: "Publish e-invoicing mandate explainer",
          description:
            "Write a German-language guide to the 2027 mandate to capture search intent.",
          owner_role: "Content marketer",
        },
        {
          track: "Marketing",
          phase: "Pre-launch",
          title: "Build DACH-targeted landing page",
          description:
            "Launch a German-language landing page with mandate messaging and trial signup.",
          owner_role: "Growth marketer",
        },
        {
          track: "Marketing",
          phase: "Launch",
          title: "Run LinkedIn DACH ad campaign",
          description: "Target finance and office managers at 10–200 employee German companies.",
          owner_role: "Growth marketer",
        },
        {
          track: "Marketing",
          phase: "Post-launch",
          title: "Publish first Mittelstand case study",
          description: "Document a real customer's migration from DATEV or Excel to LedgerFlow.",
          owner_role: "Content marketer",
        },
        {
          track: "Sales",
          phase: "Validate",
          title: "Interview 10 German finance leads",
          description:
            "Validate willingness to switch ahead of the mandate and gauge pricing sensitivity.",
          owner_role: "Founder / GTM lead",
        },
        {
          track: "Sales",
          phase: "Pre-launch",
          title: "Build German-language sales deck",
          description: "Create a deck leading with the mandate deadline and DATEV compatibility.",
          owner_role: "Sales lead",
        },
        {
          track: "Sales",
          phase: "Launch",
          title: "Run first 20 trial-to-paid conversions",
          description: "Convert early German trial users with hands-on onboarding calls.",
          owner_role: "Sales lead",
        },
        {
          track: "Sales",
          phase: "Post-launch",
          title: "Set up SEPA direct debit billing",
          description: "Add Lastschrift as a payment option to match German buyer expectations.",
          owner_role: "Sales lead",
        },
        {
          track: "Partnerships",
          phase: "Validate",
          title: "Map regional Steuerberater networks",
          description:
            "Identify high-potential Steuerberater firms serving the 10–200 employee segment.",
          owner_role: "Partnerships lead",
        },
        {
          track: "Partnerships",
          phase: "Pre-launch",
          title: "Sign first 3 Steuerberater referral partners",
          description: "Agree referral terms with early Steuerberater advocates ahead of launch.",
          owner_role: "Partnerships lead",
        },
        {
          track: "Partnerships",
          phase: "Launch",
          title: "Apply to DATEV Marktplatz",
          description: "Submit LedgerFlow for listing in DATEV's partner marketplace.",
          owner_role: "Partnerships lead",
        },
        {
          track: "Customer Success",
          phase: "Pre-launch",
          title: "Write German-language onboarding guide",
          description: "Produce a self-serve onboarding flow covering DATEV and XRechnung setup.",
          owner_role: "Customer success lead",
        },
        {
          track: "Customer Success",
          phase: "Launch",
          title: "Staff CET-hours German support",
          description: "Ensure German-speaking support coverage during core business hours.",
          owner_role: "Customer success lead",
        },
        {
          track: "Customer Success",
          phase: "Post-launch",
          title: "Run 30-day customer check-in calls",
          description: "Proactively check in with early German customers to catch churn risk.",
          owner_role: "Customer success lead",
        },
        {
          track: "Legal & Ops",
          phase: "Validate",
          title: "Confirm EU/Germany data hosting",
          description:
            "Verify infrastructure can host German customer data in the Frankfurt region.",
          owner_role: "Engineering lead",
        },
        {
          track: "Legal & Ops",
          phase: "Pre-launch",
          title: "Draft German DPA template",
          description:
            "Prepare an Auftragsverarbeitungsvertrag template for German business customers.",
          owner_role: "Legal counsel",
        },
        {
          track: "Legal & Ops",
          phase: "Pre-launch",
          title: "Confirm German VAT registration needs",
          description:
            "Determine whether EU VAT registration is required before invoicing German customers.",
          owner_role: "Finance lead",
        },
        {
          track: "Legal & Ops",
          phase: "Launch",
          title: "Publish compliant German Impressum",
          description: "Add a legally compliant Impressum and German-facing legal pages.",
          owner_role: "Legal counsel",
        },
      ],
    },
    kpis_risks: {
      kpis: [
        {
          metric: "German trial signups",
          target_guidance: "40+ in first 90 days",
          phase: "Validate",
        },
        {
          metric: "Trial-to-paid conversion rate",
          target_guidance: "≥15% within 30 days of trial end",
          phase: "Pre-launch",
        },
        {
          metric: "Steuerberater referral partners signed",
          target_guidance: "3–5 active partners by launch",
          phase: "Pre-launch",
        },
        {
          metric: "Paying German customers",
          target_guidance: "20 by end of month 6",
          phase: "Launch",
        },
        {
          metric: "Monthly churn (German cohort)",
          target_guidance: "<3% monthly",
          phase: "Post-launch",
        },
        {
          metric: "Net Promoter Score (German customers)",
          target_guidance: "≥30",
          phase: "Post-launch",
        },
      ],
      go_no_go_criteria: [
        "XRechnung/ZUGFeRD export passes KoSIT validation",
        "At least 3 Steuerberater referral partners signed",
        "German-language support coverage in place for CET hours",
        "SEPA direct debit billing live",
        "First German case study published",
      ],
      risks: [
        {
          risk: "Steuerberater see LedgerFlow as bypassing their role rather than supporting it",
          likelihood: "Medium",
          impact: "High",
          mitigation:
            "Position DATEV export as strengthening, not replacing, the Steuerberater relationship in all messaging.",
        },
        {
          risk: "The 2027 mandate timeline shifts or is delayed by the German legislature",
          likelihood: "Low",
          impact: "Medium",
          mitigation:
            "Diversify demand drivers beyond the mandate, e.g. efficiency gains over Excel.",
        },
        {
          risk: "DATEV tightens marketplace access or launches a competing modern UI",
          likelihood: "Medium",
          impact: "High",
          mitigation:
            "Build direct Steuerberater relationships that don't depend solely on DATEV's marketplace.",
        },
        {
          risk: "Underestimating German data residency expectations delays enterprise-leaning deals",
          likelihood: "Medium",
          impact: "Medium",
          mitigation: "Confirm Frankfurt-region hosting before pre-launch outreach begins.",
        },
        {
          risk: "A 3-person team can't sustain CET-hours support alongside UK hours",
          likelihood: "Medium",
          impact: "Medium",
          mitigation: "Hire or contract a German-speaking support role before the launch phase.",
        },
        {
          risk: "FX volatility erodes EUR-denominated margins versus GBP costs",
          likelihood: "Low",
          impact: "Low",
          mitigation: "Review EUR pricing quarterly against a hedged cost baseline.",
        },
      ],
    },
  },
  executive_summary: {
    recommendation: "Go with conditions",
    headline:
      "Germany's 2027 e-invoicing mandate creates real urgency, but LedgerFlow needs DATEV/GoBD compliance and a Steuerberater channel in place before it can launch credibly.",
    top_priorities: [
      "Ship XRechnung/ZUGFeRD and DATEV-format export ahead of any outreach",
      "Sign 3–5 Steuerberater referral partners before launch",
      "Stand up CET-hours German-language support",
    ],
    top_risks: [
      "Steuerberater perceive LedgerFlow as a threat rather than a complement to their role",
      "DATEV could tighten access or compete directly on UX",
      "A 3-person team may struggle to sustain German-hours support alongside UK operations",
    ],
    first_90_days:
      "Validate demand with 10+ Steuerberater and finance-lead interviews, ship compliant e-invoice export, and sign the first 3 referral partners. Use search and content around the mandate deadline to build a trial pipeline before any paid spend.",
  },
};

const ledgerFlowTasks: Task[] = requireModule(
  ledgerFlow.modules.launch_plan,
  "launch_plan",
).tasks.map((task, index) => ({
  id: `task-lf-${String(index + 1).padStart(2, "0")}`,
  launch_id: LEDGERFLOW_ID,
  track: task.track,
  phase: task.phase,
  title: task.title,
  description: task.description,
  owner_role: task.owner_role,
  done: index < 5, // first few validate-phase tasks are already underway
  sort_order: index,
}));

const ledgerFlowCriteria: Criterion[] = requireModule(
  ledgerFlow.modules.kpis_risks,
  "kpis_risks",
).go_no_go_criteria.map((text, index) => ({
  id: `crit-lf-${String(index + 1).padStart(2, "0")}`,
  launch_id: LEDGERFLOW_ID,
  text,
  done: index < 2,
  sort_order: index,
}));

// ─── SD-03: Glow Lab — UK → France, B2C ─────────────────────────────────

const GLOWLAB_ID = "launch-glowlab-fr";

const glowLab: Launch = {
  id: GLOWLAB_ID,
  created_at: "2026-09-02T11:15:00.000Z",
  product_name: "Glow Lab – DTC skincare",
  product_description:
    "A direct-to-consumer skincare brand selling serums and moisturisers online, built around a UK Shopify store, email-led retention and a small but loyal Instagram following. Sold today as one-off and subscribe-and-save orders direct to consumers.",
  industry: "Beauty / e-commerce",
  business_model: "B2C",
  home_market: "United Kingdom",
  target_market: "France",
  current_presence: "A few customers",
  target_customer: "Women 25–40 buying skincare online",
  sales_motion: "Self-serve",
  deal_size: "£25–£45 per order",
  entry_goal: "Test demand",
  timeline: "3 months",
  team_and_budget: "2 people, small budget",
  status: "complete",
  is_example: true,
  module_status: {
    market_opportunity: "done",
    customer_buying: "done",
    competition: "done",
    positioning: "done",
    pricing: "done",
    routes_to_market: "done",
    legal_ops: "done",
    localisation: "done",
    launch_plan: "done",
    kpis_risks: "done",
  },
  modules: {
    market_opportunity: {
      market_summary:
        "France is Europe's largest beauty market and among its most sophisticated skincare cultures, with a strong 'dermocosmétique' tradition and high trust in pharmacy-adjacent claims. Online skincare is growing fast and is unusually social-native, with an active Instagram and TikTok beauty community well suited to a small influencer-led DTC brand — but pharmacy brands still dominate default purchase habits.",
      maturity: "Mature",
      demand_signals: [
        "France is the largest beauty and personal care retail market in Europe.",
        "Beauty is consistently one of the fastest-growing categories in French e-commerce.",
        "'Cosmétique propre' (clean/ingredient-transparent skincare) search and social interest has grown steadily.",
        "French beauty communities on Instagram and TikTok are highly active, with a strong micro-influencer culture.",
        "Several UK/US indie skincare brands have successfully entered France via small-batch, influencer-led launches.",
      ],
      size_estimate: {
        tam: "€11.8bn",
        sam: "€740m",
        som: "€2.1m",
        assumptions: [
          "TAM based on total French skincare retail market value",
          "SAM narrows to online-only, ingredient-led skincare for women 25–40",
          "SOM assumes a modest 0.3% share achievable via an influencer-led, self-serve launch within 12 months",
        ],
      },
      attractiveness_score: 6,
      rationale:
        "The market is large and genuinely social-native, which favours a small brand with an engaged Instagram following. The score is capped at 6 rather than higher because pharmacy-brand trust (La Roche-Posay, Avène) is deeply entrenched as the default purchase habit, and a 2-person team with a small budget will need to earn credibility fast in a category that rewards it slowly.",
    },
    customer_buying: {
      icp: {
        description:
          "French women aged 25–40 who buy skincare online, follow beauty content on Instagram and TikTok, and are used to pharmacy-brand skincare but are increasingly open to indie, ingredient-led brands discovered via influencers.",
        company_size_or_segment:
          "Individual consumers, mid-to-premium price sensitivity (€25–€45 per item)",
        industries_or_interests: [
          "Skincare and 'cosmétique propre'",
          "Beauty influencer content (Instagram/TikTok)",
          "Sustainable and clean beauty",
          "Wellness and self-care",
        ],
        buying_triggers: [
          "Influencer or UGC recommendation",
          "Running out of a current product and researching alternatives",
          "A seasonal skin concern (winter dryness, summer sun damage)",
        ],
      },
      buying_committee: [
        {
          role: "Early-adopter beauty enthusiast",
          cares_about: "Discovering new ingredient-led brands before they're mainstream",
          influence: "Decision maker",
        },
        {
          role: "Pharmacy-brand loyalist considering a switch",
          cares_about: "Dermatological credibility and ingredient transparency",
          influence: "Decision maker",
        },
        {
          role: "Gift buyer",
          cares_about: "Packaging and brand story suited to gifting",
          influence: "Influencer",
        },
        {
          role: "Budget-conscious student segment",
          cares_about: "Price and first-order discount codes",
          influence: "User",
        },
      ],
      buying_process: {
        typical_cycle: "1–2 weeks from discovery to first purchase",
        steps: [
          "Discovers the brand via an Instagram or TikTok influencer or ad",
          "Checks reviews and the ingredient list on the brand site",
          "Compares against a pharmacy-brand alternative such as La Roche-Posay",
          "Waits for a first-order discount code",
          "Purchases via card or PayPal at checkout",
          "Follows the brand on social for restocks and new launches",
        ],
        home_vs_target_differences: [
          "French buyers research dermocosmétique credentials more actively than UK buyers",
          "Comparing against a pharmacy-brand alternative is a near-default step in France",
          "French checkout strongly favours Carte Bancaire and PayPal over the UK's card/Apple Pay mix",
        ],
      },
    },
    competition: {
      competitors: [
        {
          name: "La Roche-Posay",
          type: "Local incumbent",
          strength: "Deep dermatological trust and pharmacy distribution across France",
          weakness: "Clinical, low-emotion brand positioning with limited DTC/social presence",
          how_to_win:
            "Win on brand story and social-first discovery La Roche-Posay doesn't compete on",
        },
        {
          name: "Avène",
          type: "Local incumbent",
          strength: "Strong pharmacy trust for sensitive skin",
          weakness: "Dated e-commerce experience and limited influencer marketing",
          how_to_win: "Out-market on Instagram and TikTok, where Avène has minimal presence",
        },
        {
          name: "Typology",
          type: "Local incumbent",
          strength:
            "French DTC skincare brand already winning on ingredient transparency and minimalist branding",
          weakness: "Premium pricing and a narrow product range",
          how_to_win: "Compete on price accessibility and a broader product range",
        },
        {
          name: "The Ordinary",
          type: "Global player",
          strength: "Strong global brand recognition for affordable, ingredient-led skincare",
          weakness: "Clinical packaging with little emotional brand connection",
          how_to_win:
            "Lead with warmer brand storytelling and UGC that The Ordinary doesn't invest in",
        },
        {
          name: "Status quo (pharmacy purchase)",
          type: "Status quo",
          strength: "Deep habitual trust in pharmacist recommendations",
          weakness: "No online-first, influencer-led discovery experience",
          how_to_win:
            "Meet customers where they already are — Instagram and TikTok, not the pharmacy counter",
        },
      ],
      status_quo_alternative:
        "Buying a pharmacy-brand product (La Roche-Posay, Avène, Bioderma) recommended in-store by a pharmacist — still the default skincare purchase path for many French consumers.",
    },
    positioning: {
      home_positioning:
        "A small-batch, ingredient-led skincare brand for UK customers who've outgrown mass-market drugstore products.",
      target_positioning:
        "An accessible alternative to premium pharmacy skincare — the same ingredient transparency French shoppers trust, discovered on Instagram instead of behind a pharmacy counter.",
      key_changes: [
        "Dermocosmétique credibility over lifestyle-only branding",
        "Influencer-led discovery, not the pharmacy counter",
        "Price framed against Typology and The Ordinary, not La Roche-Posay",
        "French-language ingredient callouts",
      ],
      messaging_pillars: [
        {
          pillar: "Ingredient transparency",
          proof_point_needed:
            "Full INCI ingredient list with plain-language explanations on every product page",
        },
        {
          pillar: "Influencer-verified, not just brand-claimed",
          proof_point_needed: "UGC and micro-influencer content embedded on product pages",
        },
        {
          pillar: "Accessible premium",
          proof_point_needed:
            "Price comparison callout against Typology and pharmacy-brand equivalents",
        },
      ],
      localisation_notes: [
        "Full French translation of site and packaging copy, not machine-translated",
        "Prices shown in EUR inclusive of 20% TVA",
        "Add Carte Bancaire and PayPal at checkout, not just card",
        "Use dermocosmétique-style, dermatologically-tested language French shoppers expect",
      ],
      elevator_pitch_target:
        "Glow Lab brings ingredient-led, dermatologically-minded skincare to France with a discovery experience — Instagram, not the pharmacy counter — that French pharmacy brands don't offer.",
    },
    pricing: {
      pricing_norms:
        "French skincare e-commerce pricing sits between mass-market drugstore and premium pharmacy brands, typically shown VAT-inclusive with frequent seasonal promotions (soldes) and first-order discount codes.",
      recommended_approach:
        "Keep UK price points but display them in EUR inclusive of 20% TVA, and lead with a 15% first-order discount code distributed via influencer partners rather than site-wide markdowns.",
      currency_and_tax_notes: [
        "Display EUR prices inclusive of 20% TVA, the French norm",
        "French consumers expect a free shipping threshold (commonly €40–€60) more than UK shoppers do",
        "Distance-selling VAT rules mean TVA is owed to France once the EU one-stop-shop threshold is passed",
      ],
      payment_and_contract_norms: [
        "Carte Bancaire (via Visa/Mastercard) and PayPal are the dominant checkout methods",
        "Klarna/BNPL is growing in France but less expected than card/PayPal at this price point",
        "Free returns within 14–30 days are a near-standard expectation for beauty DTC",
      ],
      discounting_norms:
        "First-order discount codes (10–20%) distributed via influencers are standard practice; French shoppers are also highly responsive to the twice-yearly soldes periods.",
      risks: [
        "Free shipping threshold expectations could compress margin on a modest average order value",
        "Under-pricing versus pharmacy brands may undercut the premium, dermocosmétique positioning being built",
        "Distance-selling VAT registration could be triggered faster than expected if the demand test succeeds",
      ],
    },
    routes_to_market: {
      recommended_entry_mode: "Direct",
      rationale:
        "As a self-serve DTC brand testing demand with a small team and budget, a direct Shopify-led launch backed by micro-influencer seeding is far cheaper and faster to learn from than building retail or marketplace partnerships this early.",
      channels: [
        {
          channel: "Instagram/TikTok micro-influencer seeding",
          role: "Primary discovery channel for the target segment",
          priority: "Primary",
        },
        {
          channel: "Meta ads (Instagram/Facebook) in French",
          role: "Scale paid acquisition once organic signal is validated",
          priority: "Primary",
        },
        {
          channel: "French beauty affiliate/discount sites",
          role: "Capture deal-seeking shoppers at launch",
          priority: "Secondary",
        },
        {
          channel: "Email (existing UK list plus new French signups)",
          role: "Retention and repeat purchase",
          priority: "Secondary",
        },
        {
          channel: "TikTok Shop France",
          role: "Test in-platform checkout for impulse purchase",
          priority: "Test",
        },
        {
          channel: "Amazon.fr Beauty",
          role: "Incremental reach once the brand has proof points",
          priority: "Test",
        },
      ],
      partner_types: [
        {
          type: "Micro-influencers (10k–100k followers)",
          why: "A cost-effective, high-trust discovery channel matching French beauty social culture",
          examples_to_research: [
            "French skincare and beauty micro-influencers on Instagram and TikTok",
          ],
        },
        {
          type: "French beauty affiliate publishers",
          why: "Deal-seeking shoppers convert well off a strong first-order discount",
          examples_to_research: ["French cashback and coupon sites focused on beauty"],
        },
      ],
      events_and_communities: [
        "French skincare-focused Facebook and Discord communities",
        "TikTok #skincarefrance community",
        "Indie beauty pop-up markets in Paris",
      ],
    },
    legal_ops: {
      items: [
        {
          title: "Cosmetic Product Notification (CPNP)",
          detail:
            "All cosmetic products sold in France/EU must be notified via the EU Cosmetic Products Notification Portal before sale.",
          area: "Industry regulation",
          severity: "High",
          owner_role: "Regulatory/compliance lead",
        },
        {
          title: "EU Responsible Person designation",
          detail:
            "An EU-based Responsible Person must be named for every cosmetic product under EU Regulation 1223/2009.",
          area: "Industry regulation",
          severity: "High",
          owner_role: "Regulatory/compliance lead",
        },
        {
          title: "French-language labelling requirements",
          detail:
            "Product labels and ingredient lists sold to French consumers must be in French, per EU cosmetics and French consumer law.",
          area: "Consumer protection",
          severity: "Medium",
          owner_role: "Operations lead",
        },
        {
          title: "Distance-selling VAT (TVA) registration",
          detail:
            "Selling to French consumers online may require VAT registration via the EU One-Stop-Shop once the distance-selling threshold is crossed.",
          area: "Tax & invoicing",
          severity: "Medium",
          owner_role: "Finance lead",
        },
        {
          title: "GDPR-compliant data handling for EU customers",
          detail:
            "French customer data must be handled under GDPR, including cookie consent and marketing opt-in rules per CNIL guidance.",
          area: "Data & privacy",
          severity: "Medium",
          owner_role: "Operations lead",
        },
        {
          title: "14-day right of withdrawal",
          detail:
            "French/EU consumer law guarantees a 14-day right of withdrawal on online purchases, which must be clearly stated.",
          area: "Consumer protection",
          severity: "Low",
          owner_role: "Operations lead",
        },
      ],
    },
    localisation: {
      language: [
        "Full French translation of site, checkout and packaging copy",
        "French-language customer email flows",
      ],
      product: [
        "French-compliant ingredient labelling (INCI plus French text)",
        "CPNP notification completed for each SKU sold into France",
      ],
      support: [
        "French-language email support coverage",
        "FAQ translated to address dermocosmétique-style questions",
      ],
      sales_enablement: [
        "Influencer briefing deck translated into French",
        "Price comparison one-pager versus pharmacy brands and Typology",
      ],
      proof_and_references: [
        "First 10 French customer reviews collected and displayed",
        "At least 2 French micro-influencer partnerships live at launch",
      ],
    },
    launch_plan: {
      tasks: [
        {
          track: "Product",
          phase: "Validate",
          title: "Confirm CPNP notification per SKU",
          description: "Ensure every product sold into France is registered on the EU CPNP portal.",
          owner_role: "Operations lead",
        },
        {
          track: "Product",
          phase: "Pre-launch",
          title: "Update packaging with French labelling",
          description:
            "Add compliant French-language ingredient lists and legal text to packaging.",
          owner_role: "Operations lead",
        },
        {
          track: "Product",
          phase: "Pre-launch",
          title: "Localise Shopify store to French",
          description: "Translate product pages, checkout and email flows into French.",
          owner_role: "Founder / ops",
        },
        {
          track: "Marketing",
          phase: "Validate",
          title: "Identify 15 French micro-influencers",
          description: "Shortlist skincare-focused micro-influencers for seeding outreach.",
          owner_role: "Marketing lead",
        },
        {
          track: "Marketing",
          phase: "Pre-launch",
          title: "Ship 10 influencer seeding kits",
          description:
            "Send product plus a French-language brand brief to shortlisted influencers.",
          owner_role: "Marketing lead",
        },
        {
          track: "Marketing",
          phase: "Launch",
          title: "Launch French Meta ad campaign",
          description: "Run Instagram/Facebook ads in French targeting women 25–40.",
          owner_role: "Marketing lead",
        },
        {
          track: "Marketing",
          phase: "Launch",
          title: "Publish first-order discount code",
          description: "Distribute a 15% first-order code through influencer partners.",
          owner_role: "Marketing lead",
        },
        {
          track: "Marketing",
          phase: "Post-launch",
          title: "Review French channel performance",
          description: "Analyse which channels drove French orders and reallocate budget.",
          owner_role: "Marketing lead",
        },
        {
          track: "Sales",
          phase: "Validate",
          title: "Test French pricing perception",
          description:
            "Survey target customers on price sensitivity versus Typology and pharmacy brands.",
          owner_role: "Founder / ops",
        },
        {
          track: "Sales",
          phase: "Launch",
          title: "Monitor first 100 French orders",
          description:
            "Track conversion rate and average order value for the French launch cohort.",
          owner_role: "Founder / ops",
        },
        {
          track: "Partnerships",
          phase: "Validate",
          title: "Shortlist French beauty affiliate sites",
          description:
            "Identify affiliate and coupon publishers relevant to French beauty shoppers.",
          owner_role: "Marketing lead",
        },
        {
          track: "Partnerships",
          phase: "Pre-launch",
          title: "Sign first 2 micro-influencer partnerships",
          description: "Agree paid or gifted collaboration terms with two French influencers.",
          owner_role: "Marketing lead",
        },
        {
          track: "Partnerships",
          phase: "Launch",
          title: "Activate affiliate discount listings",
          description: "Get the first-order code live on 2–3 French affiliate sites.",
          owner_role: "Marketing lead",
        },
        {
          track: "Partnerships",
          phase: "Post-launch",
          title: "Evaluate TikTok Shop France pilot",
          description: "Assess whether to test in-platform checkout based on early demand.",
          owner_role: "Marketing lead",
        },
        {
          track: "Customer Success",
          phase: "Pre-launch",
          title: "Set up French-language support inbox",
          description:
            "Prepare templated French responses for common skincare and order questions.",
          owner_role: "Founder / ops",
        },
        {
          track: "Customer Success",
          phase: "Post-launch",
          title: "Collect first French customer reviews",
          description: "Follow up with early French customers for reviews and UGC.",
          owner_role: "Founder / ops",
        },
        {
          track: "Legal & Ops",
          phase: "Validate",
          title: "Confirm EU Responsible Person status",
          description:
            "Determine who will serve as the designated EU Responsible Person for cosmetics.",
          owner_role: "Regulatory/compliance lead",
        },
        {
          track: "Legal & Ops",
          phase: "Pre-launch",
          title: "Complete CPNP notifications",
          description: "Submit all SKUs to the EU Cosmetic Products Notification Portal.",
          owner_role: "Regulatory/compliance lead",
        },
        {
          track: "Legal & Ops",
          phase: "Pre-launch",
          title: "Assess distance-selling VAT threshold",
          description: "Confirm whether French sales volume requires EU VAT/OSS registration.",
          owner_role: "Finance lead",
        },
        {
          track: "Legal & Ops",
          phase: "Launch",
          title: "Publish GDPR-compliant cookie consent",
          description: "Add CNIL-compliant cookie consent and marketing opt-in to the French site.",
          owner_role: "Operations lead",
        },
      ],
    },
    kpis_risks: {
      kpis: [
        {
          metric: "French site visitors",
          target_guidance: "5,000+ in first 6 weeks",
          phase: "Validate",
        },
        {
          metric: "Influencer partnerships live",
          target_guidance: "5+ by launch",
          phase: "Pre-launch",
        },
        { metric: "French orders", target_guidance: "150+ in first 90 days", phase: "Launch" },
        { metric: "Average order value (France)", target_guidance: "€35–€45", phase: "Launch" },
        {
          metric: "Repeat purchase rate (France)",
          target_guidance: "≥20% within 90 days",
          phase: "Post-launch",
        },
      ],
      go_no_go_criteria: [
        "CPNP notification complete for all SKUs sold into France",
        "EU Responsible Person formally designated",
        "French-language site and checkout live",
        "At least 5 micro-influencer partnerships confirmed",
        "150+ French orders achieved within the 3-month test window",
      ],
      risks: [
        {
          risk: "French shoppers default back to trusted pharmacy brands under price or credibility pressure",
          likelihood: "Medium",
          impact: "High",
          mitigation:
            "Lead marketing with dermocosmétique-style ingredient proof points, not just influencer content.",
        },
        {
          risk: "CPNP/Responsible Person compliance delays push back the launch timeline",
          likelihood: "Medium",
          impact: "High",
          mitigation:
            "Start regulatory notification in the Validate phase, well before marketing spend begins.",
        },
        {
          risk: "A 2-person team can't sustain French support alongside UK operations",
          likelihood: "Medium",
          impact: "Medium",
          mitigation:
            "Pre-write French response templates and cap initial marketing spend to match support capacity.",
        },
        {
          risk: "Free shipping and returns expectations compress margin on a modest average order value",
          likelihood: "Medium",
          impact: "Medium",
          mitigation:
            "Set a free shipping threshold above target AOV rather than matching French norms exactly.",
        },
        {
          risk: "Influencer seeding produces content but not a measurable sales lift",
          likelihood: "Medium",
          impact: "Medium",
          mitigation:
            "Require trackable discount codes or affiliate links from every influencer partnership.",
        },
        {
          risk: "The distance-selling VAT threshold is crossed faster than expected, creating compliance debt",
          likelihood: "Low",
          impact: "Medium",
          mitigation: "Track cumulative EU sales weekly against the OSS threshold from week one.",
        },
      ],
    },
  },
  executive_summary: {
    recommendation: "Go with conditions",
    headline:
      "France's beauty market is large and social-native, but Glow Lab needs cosmetic compliance (CPNP, Responsible Person) and French-language proof points in place before testing demand.",
    top_priorities: [
      "Complete CPNP notification and designate an EU Responsible Person",
      "Localise the site and secure 5+ micro-influencer partnerships",
      "Launch with a trackable first-order discount code to measure real demand",
    ],
    top_risks: [
      "French shoppers may default back to trusted pharmacy brands under price or credibility pressure",
      "Regulatory compliance (CPNP, Responsible Person) could delay the launch timeline",
      "A 2-person team may struggle to sustain French support alongside UK operations",
    ],
    first_90_days:
      "Complete cosmetic regulatory notification, localise the store and packaging into French, and launch with 5+ micro-influencer partnerships carrying trackable discount codes. Use the first 90 days purely to test demand before committing further budget or team.",
  },
};

const glowLabTasks: Task[] = requireModule(glowLab.modules.launch_plan, "launch_plan").tasks.map(
  (task, index) => ({
    id: `task-gl-${String(index + 1).padStart(2, "0")}`,
    launch_id: GLOWLAB_ID,
    track: task.track,
    phase: task.phase,
    title: task.title,
    description: task.description,
    owner_role: task.owner_role,
    done: index < 3,
    sort_order: index,
  }),
);

const glowLabCriteria: Criterion[] = requireModule(
  glowLab.modules.kpis_risks,
  "kpis_risks",
).go_no_go_criteria.map((text, index) => ({
  id: `crit-gl-${String(index + 1).padStart(2, "0")}`,
  launch_id: GLOWLAB_ID,
  text,
  done: index < 1,
  sort_order: index,
}));

// ─── Public exports ──────────────────────────────────────────────────────

export const PLACEHOLDER_LAUNCHES: Launch[] = [ledgerFlow, glowLab];

export const PLACEHOLDER_TASKS: Task[] = [...ledgerFlowTasks, ...glowLabTasks];

export const PLACEHOLDER_CRITERIA: Criterion[] = [...ledgerFlowCriteria, ...glowLabCriteria];

export interface LaunchBundle {
  launch: Launch;
  tasks: Task[];
  criteria: Criterion[];
}

/** A single launch plus its tasks and criteria, looked up by `launch.id`. */
export function getLaunchBundle(launchId: string): LaunchBundle | undefined {
  const launch = PLACEHOLDER_LAUNCHES.find((candidate) => candidate.id === launchId);
  if (!launch) return undefined;
  return {
    launch,
    tasks: PLACEHOLDER_TASKS.filter((task) => task.launch_id === launchId),
    criteria: PLACEHOLDER_CRITERIA.filter((criterion) => criterion.launch_id === launchId),
  };
}
