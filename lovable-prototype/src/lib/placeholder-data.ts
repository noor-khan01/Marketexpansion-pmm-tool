// M1: hard-coded placeholder data matching PRD Section 9 schemas exactly.
// Replaced by real AI output + database in M2-M5.

import type { Launch, LaunchPlan, Modules } from "./gtm-types";

function tasksWithIds(launchId: string, plan: LaunchPlan) {
  return plan.tasks.map((t, i) => ({
    id: `${launchId}-task-${i}`,
    track: t.track,
    phase: t.phase,
    title: t.title,
    description: t.description,
    owner_role: t.owner_role,
    done: i < 2,
    sort_order: i,
  }));
}

const launchPlanA: LaunchPlan = {
  tasks: [
    {
      track: "Product",
      phase: "Validate",
      title: "Audit German invoicing legal requirements",
      description:
        "Map GoBD archiving and X-Rechnung/ZUGFeRD e-invoicing formats against the current product. Produce a gap list.",
      owner_role: "Product Manager",
    },
    {
      track: "Product",
      phase: "Pre-launch",
      title: "Ship German UI and DE number formats",
      description:
        "Translate the app, switch to comma decimals and DD.MM.YYYY dates, and support SEPA/DATEV export.",
      owner_role: "Engineering Lead",
    },
    {
      track: "Product",
      phase: "Launch",
      title: "Enable DATEV export in production",
      description:
        "Release the DATEV bookkeeping export behind a flag, then open it to all German accounts.",
      owner_role: "Engineering Lead",
    },
    {
      track: "Product",
      phase: "Post-launch",
      title: "Prioritise German feature requests",
      description:
        "Review the first cohort's requests and fold the top three into the next quarter's roadmap.",
      owner_role: "Product Manager",
    },
    {
      track: "Marketing",
      phase: "Validate",
      title: "Test German paid search demand",
      description:
        "Run a small Google Ads test on German invoicing keywords and measure cost per qualified signup.",
      owner_role: "Demand Gen Manager",
    },
    {
      track: "Marketing",
      phase: "Pre-launch",
      title: "Localise site and pricing page",
      description:
        "Build German pages written by a native copywriter, not machine translation, with EUR pricing and VAT shown.",
      owner_role: "Product Marketing Manager",
    },
    {
      track: "Marketing",
      phase: "Launch",
      title: "Publish Steuerberater partner campaign",
      description:
        "Launch a co-marketing campaign with tax advisers, including a webinar and a comparison guide.",
      owner_role: "Product Marketing Manager",
    },
    {
      track: "Marketing",
      phase: "Post-launch",
      title: "Collect three German case studies",
      description:
        "Interview early customers and publish named references, which German buyers weight heavily.",
      owner_role: "Product Marketing Manager",
    },
    {
      track: "Sales",
      phase: "Validate",
      title: "Run 15 German discovery calls",
      description:
        "Interview SMB finance leads to confirm pain, pricing tolerance and adviser influence.",
      owner_role: "Expansion Lead",
    },
    {
      track: "Sales",
      phase: "Pre-launch",
      title: "Hire German-speaking AE",
      description:
        "Recruit one account executive fluent in German with Mittelstand SaaS experience.",
      owner_role: "Sales Director",
    },
    {
      track: "Sales",
      phase: "Launch",
      title: "Localise demo script and objections",
      description:
        "Rework the demo around data residency, GoBD compliance and DATEV fit, with a German objection guide.",
      owner_role: "Sales Enablement",
    },
    {
      track: "Sales",
      phase: "Post-launch",
      title: "Review win/loss after 10 deals",
      description:
        "Analyse German win/loss reasons and adjust ICP and pricing bands accordingly.",
      owner_role: "Sales Director",
    },
    {
      track: "Partnerships",
      phase: "Validate",
      title: "Shortlist 20 tax adviser firms",
      description:
        "Research Steuerberater networks and DATEV-affiliated practices that serve 10-200 employee firms.",
      owner_role: "Partnerships Lead",
    },
    {
      track: "Partnerships",
      phase: "Pre-launch",
      title: "Sign two referral partners",
      description:
        "Agree commercial terms and onboarding with two adviser firms willing to refer clients.",
      owner_role: "Partnerships Lead",
    },
    {
      track: "Partnerships",
      phase: "Launch",
      title: "Apply for DATEV marketplace listing",
      description:
        "Submit the integration for listing to gain credibility with accountant-led buyers.",
      owner_role: "Partnerships Lead",
    },
    {
      track: "Customer Success",
      phase: "Pre-launch",
      title: "Staff German-language support hours",
      description:
        "Cover 09:00-18:00 CET in German by phone and email; German SMBs expect phone access.",
      owner_role: "Support Manager",
    },
    {
      track: "Customer Success",
      phase: "Launch",
      title: "Translate onboarding and help centre",
      description:
        "Publish German onboarding emails, in-app guides and the 30 most-read help articles.",
      owner_role: "Support Manager",
    },
    {
      track: "Customer Success",
      phase: "Post-launch",
      title: "Track German churn and NPS separately",
      description:
        "Report German cohort retention and NPS apart from UK numbers to spot local issues early.",
      owner_role: "Customer Success Lead",
    },
    {
      track: "Legal & Ops",
      phase: "Validate",
      title: "Confirm EU data residency approach",
      description:
        "Decide on EU/Frankfurt hosting and document the GDPR basis and processor list.",
      owner_role: "Legal Counsel",
    },
    {
      track: "Legal & Ops",
      phase: "Pre-launch",
      title: "Produce German AGB and DPA",
      description:
        "Have local counsel draft German terms, a data processing agreement and an Impressum page.",
      owner_role: "Legal Counsel",
    },
    {
      track: "Legal & Ops",
      phase: "Launch",
      title: "Set up EUR invoicing with VAT",
      description:
        "Register for German VAT handling via OSS where applicable and issue compliant EUR invoices.",
      owner_role: "Finance Manager",
    },
  ],
};

const launchPlanB: LaunchPlan = {
  tasks: [
    {
      track: "Product",
      phase: "Validate",
      title: "Check INCI labelling on hero SKUs",
      description:
        "Verify ingredient lists and claims against EU cosmetics rules for the five best-selling products.",
      owner_role: "Product Manager",
    },
    {
      track: "Product",
      phase: "Pre-launch",
      title: "Launch French storefront",
      description:
        "Publish a French-language shop with EUR pricing, French sizes and local delivery options.",
      owner_role: "Ecommerce Manager",
    },
    {
      track: "Product",
      phase: "Launch",
      title: "Add Cartes Bancaires checkout",
      description:
        "Enable CB alongside cards and wallets; French shoppers drop off without it.",
      owner_role: "Ecommerce Manager",
    },
    {
      track: "Product",
      phase: "Post-launch",
      title: "Review French returns data",
      description:
        "Analyse return reasons and adjust product pages and sizing guidance.",
      owner_role: "Product Manager",
    },
    {
      track: "Marketing",
      phase: "Validate",
      title: "Test French social ads",
      description:
        "Run a two-week Meta and TikTok test with French creative to read CPA against UK benchmarks.",
      owner_role: "Growth Marketer",
    },
    {
      track: "Marketing",
      phase: "Pre-launch",
      title: "Brief 10 French beauty creators",
      description:
        "Seed product with mid-tier French creators and agree #ad disclosure wording.",
      owner_role: "Influencer Manager",
    },
    {
      track: "Marketing",
      phase: "Launch",
      title: "Run pharmacy-credibility content",
      description:
        "Publish dermocosmetic-style content that addresses French trust in pharmacy skincare.",
      owner_role: "Brand Marketer",
    },
    {
      track: "Marketing",
      phase: "Post-launch",
      title: "Double down on winning channel",
      description:
        "Shift budget to the channel with the lowest French CPA after the first six weeks.",
      owner_role: "Growth Marketer",
    },
    {
      track: "Sales",
      phase: "Validate",
      title: "Price-test two EUR price points",
      description:
        "Compare conversion at two EUR price ladders to set the French price architecture.",
      owner_role: "Growth Marketer",
    },
    {
      track: "Sales",
      phase: "Launch",
      title: "Launch French bundle offer",
      description:
        "Introduce a routine bundle priced for French AOV expectations.",
      owner_role: "Ecommerce Manager",
    },
    {
      track: "Sales",
      phase: "Post-launch",
      title: "Pitch two Paris concept stores",
      description:
        "Approach selective retailers for a small trial listing if DTC demand proves out.",
      owner_role: "Expansion Lead",
    },
    {
      track: "Partnerships",
      phase: "Validate",
      title: "Research French marketplace fit",
      description:
        "Compare Sephora France, Nocibé and Amazon.fr terms, fees and onboarding time.",
      owner_role: "Partnerships Lead",
    },
    {
      track: "Partnerships",
      phase: "Pre-launch",
      title: "Sign French 3PL and returns",
      description:
        "Contract EU fulfilment with Colissimo/Mondial Relay returns to avoid cross-border friction.",
      owner_role: "Operations Manager",
    },
    {
      track: "Partnerships",
      phase: "Launch",
      title: "Trial one beauty marketplace",
      description:
        "List a small range on one marketplace to test discovery without full retail commitment.",
      owner_role: "Partnerships Lead",
    },
    {
      track: "Customer Success",
      phase: "Pre-launch",
      title: "Set up French customer care",
      description:
        "Provide French email and chat support with native-speaker coverage on weekdays.",
      owner_role: "Support Manager",
    },
    {
      track: "Customer Success",
      phase: "Launch",
      title: "Translate care and returns policy",
      description:
        "Publish French FAQs plus the 14-day withdrawal right in clear language.",
      owner_role: "Support Manager",
    },
    {
      track: "Legal & Ops",
      phase: "Validate",
      title: "Appoint EU responsible person",
      description:
        "Name an EU responsible person and confirm CPNP notification for each product.",
      owner_role: "Regulatory Consultant",
    },
    {
      track: "Legal & Ops",
      phase: "Pre-launch",
      title: "Register EU VAT via OSS",
      description:
        "Register for OSS and configure French VAT rates and compliant invoices.",
      owner_role: "Finance Manager",
    },
    {
      track: "Legal & Ops",
      phase: "Launch",
      title: "Publish French CGV and cookie banner",
      description:
        "Add French terms of sale and a CNIL-compliant consent banner before paid traffic starts.",
      owner_role: "Legal Counsel",
    },
  ],
};

const modulesA: Modules = {
  market_opportunity: {
    market_summary:
      "Germany has roughly 2.6 million SMBs that must move to structured e-invoicing, and the B2B e-invoicing mandate is pulling forward buying decisions. Unlike the UK, adoption is mediated by tax advisers (Steuerberater) and the DATEV ecosystem, so the route in is through advisers rather than direct self-serve search.",
    maturity: "Growing",
    demand_signals: [
      "Phased German B2B e-invoicing mandate forces software changes on a deadline",
      "High search volume for Rechnungsprogramm and GoBD-konform terms",
      "DATEV integration is a near-universal requirement in vendor shortlists",
      "Incumbent desktop tools are being replaced with cloud alternatives",
    ],
    size_estimate: {
      tam: "€1.9bn",
      sam: "€420m",
      som: "€6m",
      assumptions: [
        "2.6m German SMBs, of which ~35% fall in the 10-200 employee band",
        "Average €750 per company per year for invoicing software",
        "SAM limited to companies already using cloud accounting",
        "SOM assumes 1.4% of SAM reachable within three years with a 3-person team",
      ],
    },
    attractiveness_score: 8,
    rationale:
      "A regulatory deadline creates timing that the UK market lacks, and the product already solves the core job. The main drag is compliance work (GoBD, X-Rechnung, EU hosting) and the need to earn adviser trust before self-serve volume appears.",
  },
  customer_buying: {
    icp: {
      description:
        "German SMBs with an in-house finance function of 1-4 people that still invoice from desktop software or Excel and work closely with an external tax adviser.",
      company_size_or_segment: "10-200 employees, €2m-€40m revenue",
      industries_or_interests: [
        "Professional services",
        "Trades and Handwerk",
        "Wholesale and distribution",
        "Agencies",
      ],
      buying_triggers: [
        "E-invoicing mandate deadline for their company size",
        "Tax adviser recommends replacing a desktop tool",
        "Failed or painful annual audit / Betriebsprüfung",
      ],
    },
    buying_committee: [
      {
        role: "Managing Director (Geschäftsführer)",
        cares_about: "Legal compliance risk and total cost; signs the contract personally",
        influence: "Decision maker",
      },
      {
        role: "Head of Finance / Buchhaltung",
        cares_about: "Day-to-day workflow, DATEV export, correct VAT handling",
        influence: "User",
      },
      {
        role: "External tax adviser (Steuerberater)",
        cares_about: "Clean bookkeeping handover and GoBD-compliant archiving",
        influence: "Influencer",
      },
      {
        role: "IT lead or external IT partner",
        cares_about: "Data residency, GDPR documentation, single sign-on",
        influence: "Blocker",
      },
      {
        role: "Works council representative",
        cares_about: "Employee data processing where invoicing touches HR data",
        influence: "Blocker",
      },
    ],
    buying_process: {
      typical_cycle: "3-6 months",
      steps: [
        "Trigger: mandate deadline or adviser recommendation",
        "Finance lead builds a shortlist, often from adviser suggestions",
        "Detailed written requirements and reference requests",
        "Security and data protection review, DPA negotiated",
        "Paid pilot with real invoices for one month",
        "Managing Director signs, typically annual in advance",
      ],
      home_vs_target_differences: [
        "The tax adviser is an extra decision influencer with no UK equivalent",
        "Data residency and GDPR paperwork arrive far earlier in the cycle",
        "German buyers expect written specifications and named local references",
        "Cycles run 30-50% longer than comparable UK deals",
      ],
    },
  },
  competition: {
    competitors: [
      {
        name: "Lexware / Lexoffice",
        type: "Local incumbent",
        strength: "Trusted brand with deep DATEV and adviser relationships",
        weakness: "Dated UX and slow product cycles",
        how_to_win: "Lead on modern workflow and setup time while matching DATEV export exactly",
      },
      {
        name: "sevDesk",
        type: "Local incumbent",
        strength: "Strong German SEO and self-serve funnel",
        weakness: "Thin for multi-entity and multi-currency invoicing",
        how_to_win: "Target SMBs with cross-border invoicing that sevDesk handles poorly",
      },
      {
        name: "DATEV Unternehmen online",
        type: "Local incumbent",
        strength: "Default channel because advisers already live inside it",
        weakness: "Built for advisers, not for the SMB's own finance team",
        how_to_win: "Position as the SMB-facing layer that feeds DATEV cleanly rather than replacing it",
      },
      {
        name: "Xero",
        type: "Global player",
        strength: "Global brand and clean product",
        weakness: "Limited German localisation and adviser network",
        how_to_win: "Out-localise on GoBD archiving, X-Rechnung and German-language support",
      },
      {
        name: "Excel plus adviser handover",
        type: "Status quo",
        strength: "Free, familiar, and the adviser tolerates it",
        weakness: "Breaks under the e-invoicing mandate and audit requests",
        how_to_win: "Quantify the audit and mandate risk, and offer a migration done in under a day",
      },
    ],
    status_quo_alternative:
      "Most target SMBs invoice from Word or Excel templates and hand a shoebox of documents to their Steuerberater each month. It costs nothing visible, so the sales case must be built on mandate compliance and adviser endorsement rather than efficiency alone.",
  },
  positioning: {
    home_positioning:
      "In the UK, LedgerFlow is positioned as the fastest way for a small finance team to get paid: quick setup, Open Banking reconciliation and self-serve signup.",
    target_positioning:
      "In Germany, position LedgerFlow as the compliance-safe cloud invoicing layer that your Steuerberater will approve of: GoBD-conform archiving, X-Rechnung output and clean DATEV handover, hosted in the EU.",
    key_changes: [
      "Compliance before speed",
      "Adviser-endorsed",
      "EU data residency",
      "DATEV-ready",
      "Proof over promise",
    ],
    messaging_pillars: [
      {
        pillar: "Mandate-ready invoicing",
        proof_point_needed: "Documented X-Rechnung and ZUGFeRD output validated by a German adviser",
      },
      {
        pillar: "Your adviser stays happy",
        proof_point_needed: "Named Steuerberater partners and a DATEV export walkthrough",
      },
      {
        pillar: "German data, German rules",
        proof_point_needed: "EU hosting statement, DPA and ISO 27001 or equivalent certificate",
      },
      {
        pillar: "Switch in a day",
        proof_point_needed: "Migration case study from a German SMB with before/after timings",
      },
    ],
    localisation_notes: [
      "Use Sie throughout; copy written by a native speaker, never machine-translated",
      "Show prices in EUR net with VAT stated separately, as German B2B buyers expect",
      "Add an Impressum and clear legal pages; their absence signals an untrustworthy vendor",
      "Use German date and number formats everywhere in product and invoices",
    ],
    elevator_pitch_target:
      "LedgerFlow is cloud invoicing built for German SMBs and their tax advisers: GoBD-conform, mandate-ready and hosted in the EU. Your team invoices in minutes and your Steuerberater gets a clean DATEV handover.",
  },
  pricing: {
    pricing_norms:
      "German SMB invoicing tools are priced per user or per company band, typically €15-€60 per month, with annual prepayment common and net prices quoted excluding 19% VAT. Free trials are expected; aggressive freemium is less common than in the UK.",
    recommended_approach:
      "Offer three EUR-denominated tiers anchored on company size rather than direct GBP conversion, with the DATEV export and GoBD archiving in the middle tier to make it the obvious choice. Offer monthly and annual, with ~15% off annual.",
    currency_and_tax_notes: [
      "Quote net prices in EUR and display 19% VAT separately on all B2B pages",
      "Collect and validate VAT IDs to apply reverse charge correctly",
      "Invoices must meet German content requirements and be archived GoBD-conform",
      "Register appropriately for German VAT handling before the first paid customer",
    ],
    payment_and_contract_norms: [
      "SEPA direct debit and bank transfer dominate; card-only checkout loses deals",
      "Annual contracts with 12-month terms and automatic renewal are standard",
      "Expect requests for payment on invoice with 14-30 day terms",
      "German AGB rather than translated UK terms are expected for signature",
    ],
    discounting_norms:
      "Discounting culture is moderate and evidence-based: buyers ask for 10-15% for annual prepay or multi-year and expect it to be justified, not haggled. Deep ad-hoc discounts damage credibility.",
    risks: [
      "Direct GBP-to-EUR conversion leaves prices looking arbitrary and misaligned to local ladders",
      "VAT and reverse-charge errors create audit exposure for customers",
      "No SEPA option suppresses conversion at checkout",
    ],
  },
  routes_to_market: {
    recommended_entry_mode: "Partner-led",
    rationale:
      "German SMB software buying is mediated by tax advisers and the DATEV ecosystem, so adviser referrals shorten trust-building that a 3-person team cannot buy with paid media alone. A soft launch through 2-3 adviser partners plus localised inbound gives credible references quickly.",
    channels: [
      {
        channel: "Steuerberater referral partnerships",
        role: "Primary source of qualified, pre-trusted pipeline",
        priority: "Primary",
      },
      {
        channel: "German-language SEO and content",
        role: "Capture mandate-driven search demand",
        priority: "Primary",
      },
      {
        channel: "DATEV marketplace listing",
        role: "Credibility and passive discovery among adviser-led buyers",
        priority: "Primary",
      },
      {
        channel: "Google Ads on German invoicing terms",
        role: "Test demand and read cost per qualified signup",
        priority: "Secondary",
      },
      {
        channel: "Outbound to Handwerk and agency segments",
        role: "Fill pipeline while partnerships ramp",
        priority: "Secondary",
      },
      {
        channel: "LinkedIn thought leadership in German",
        role: "Reach finance leads and advisers",
        priority: "Test",
      },
      {
        channel: "Industry association newsletters (IHK, Handwerkskammer)",
        role: "Reach clustered SMB audiences with local authority",
        priority: "Test",
      },
    ],
    partner_types: [
      {
        type: "Tax advisory firms (Steuerberater)",
        why: "They shape shortlists and can migrate whole client books",
        examples_to_research: [
          "Mid-size regional Steuerberater practices",
          "DATEV-affiliated digital-first advisers",
          "Adviser networks serving Handwerk clients",
        ],
      },
      {
        type: "Accounting software integrators",
        why: "They handle migrations and DATEV configuration for SMBs",
        examples_to_research: ["Regional IT service providers", "DATEV implementation consultancies"],
      },
      {
        type: "Industry associations",
        why: "Endorsement carries weight with Mittelstand buyers",
        examples_to_research: ["Local IHK chapters", "Handwerkskammer digital initiatives"],
      },
    ],
    events_and_communities: [
      "DATEV-hosted adviser events and webinars",
      "Steuerberatertag regional meetups",
      "IHK digitalisation workshops",
      "German finance and accounting LinkedIn groups",
      "Chamber of commerce Mittelstand digital forums",
    ],
  },
  legal_ops: {
    items: [
      {
        title: "GoBD-conform archiving of invoices",
        detail:
          "Invoices and related records must be stored unalterably for ten years with a documented procedure. This is stricter than UK record-keeping and affects product architecture.",
        area: "Industry regulation",
        severity: "High",
        owner_role: "Product Manager",
      },
      {
        title: "X-Rechnung and ZUGFeRD support",
        detail:
          "German B2B e-invoicing rules require structured formats on a phased timetable. Missing formats blocks deals outright.",
        area: "Industry regulation",
        severity: "High",
        owner_role: "Engineering Lead",
      },
      {
        title: "EU data residency and GDPR documentation",
        detail:
          "Buyers routinely require EU hosting, a German-language DPA, a processor list and TOMs documentation before signature.",
        area: "Data & privacy",
        severity: "High",
        owner_role: "Legal Counsel",
      },
      {
        title: "German VAT registration and reverse charge",
        detail:
          "Handle 19% VAT, VAT ID validation and reverse charge correctly, and issue invoices with all legally required content.",
        area: "Tax & invoicing",
        severity: "High",
        owner_role: "Finance Manager",
      },
      {
        title: "German AGB and contract language",
        detail:
          "Translated UK terms are frequently rejected. Have German counsel draft AGB, including liability and term clauses that survive German law review.",
        area: "Contracts & procurement",
        severity: "Medium",
        owner_role: "Legal Counsel",
      },
      {
        title: "Impressum and website legal disclosures",
        detail:
          "German sites must carry an Impressum with company details; absence is both a compliance issue and a trust signal.",
        area: "Consumer protection",
        severity: "Medium",
        owner_role: "Marketing Operations",
      },
      {
        title: "Security certification expectations",
        detail:
          "ISO 27001 or a TISAX-style attestation is often requested in vendor questionnaires; without it expect long security reviews.",
        area: "Certifications & security",
        severity: "Medium",
        owner_role: "Security Lead",
      },
      {
        title: "Local entity and employment decision",
        detail:
          "Hiring a German AE via an employer of record avoids setting up a GmbH at soft-launch stage, but affects contracts and payroll tax.",
        area: "Entity & employment",
        severity: "Low",
        owner_role: "People Operations",
      },
      {
        title: "BITV / accessibility expectations",
        detail:
          "Public-sector-adjacent buyers may ask for accessibility conformance; plan a WCAG AA audit before those deals.",
        area: "Accessibility",
        severity: "Low",
        owner_role: "Engineering Lead",
      },
    ],
  },
  localisation: {
    language: [
      "Full German UI, emails and invoice templates written by a native speaker",
      "Formal Sie register across all customer communication",
      "German number, date and currency formatting throughout",
    ],
    product: [
      "X-Rechnung and ZUGFeRD invoice output",
      "GoBD-conform immutable archiving with an audit trail",
      "DATEV export and SEPA direct debit collection",
      "EU-region hosting option",
    ],
    support: [
      "German-language support 09:00-18:00 CET, including phone",
      "German help centre covering the 30 most-read articles",
      "Escalation path for audit and compliance questions",
    ],
    sales_enablement: [
      "German demo script centred on compliance and DATEV",
      "Objection handling guide for data residency questions",
      "Security and DPA pack ready to send before the first call",
    ],
    proof_and_references: [
      "Three named German customer case studies",
      "Two Steuerberater endorsements",
      "Validated compliance statement for e-invoicing formats",
    ],
  },
  launch_plan: launchPlanA,
  kpis_risks: {
    kpis: [
      {
        metric: "Qualified German discovery calls completed",
        target_guidance: "15 in the first 6 weeks",
        phase: "Validate",
      },
      {
        metric: "Cost per qualified German signup from paid search",
        target_guidance: "Within 1.5x of UK benchmark",
        phase: "Validate",
      },
      {
        metric: "Signed adviser referral partners",
        target_guidance: "2 before launch",
        phase: "Pre-launch",
      },
      {
        metric: "German-language site conversion rate",
        target_guidance: "At least 70% of UK site rate",
        phase: "Pre-launch",
      },
      {
        metric: "Paying German customers",
        target_guidance: "12 in the first 90 days after launch",
        phase: "Launch",
      },
      {
        metric: "Average sales cycle length",
        target_guidance: "Under 90 days",
        phase: "Launch",
      },
      {
        metric: "German cohort 90-day retention",
        target_guidance: "At or above UK cohort",
        phase: "Post-launch",
      },
    ],
    go_no_go_criteria: [
      "At least 12 of 15 discovery calls confirm the mandate as an active buying trigger",
      "Two adviser referral partners signed and sending introductions",
      "X-Rechnung and GoBD gaps closable within the 6-month timeline and budget",
      "Cost per qualified signup within 1.5x the UK benchmark",
      "At least three German prospects agree to a paid pilot",
    ],
    risks: [
      {
        risk: "Compliance build (GoBD, X-Rechnung) overruns the 6-month window",
        likelihood: "High",
        impact: "High",
        mitigation: "Scope the gap list in Validate and cut non-compliance features first",
      },
      {
        risk: "Adviser partnerships take longer to convert than planned",
        likelihood: "Medium",
        impact: "High",
        mitigation: "Run paid search and outbound in parallel so pipeline is not partner-dependent",
      },
      {
        risk: "Incumbents bundle DATEV integration and undercut on price",
        likelihood: "Medium",
        impact: "Medium",
        mitigation: "Compete on migration speed and workflow, not on price",
      },
      {
        risk: "Security reviews stall deals without a recognised certification",
        likelihood: "Medium",
        impact: "Medium",
        mitigation: "Prepare a full security pack now and start ISO 27001 scoping",
      },
      {
        risk: "Machine-translated content damages credibility",
        likelihood: "Low",
        impact: "High",
        mitigation: "Use a native German copywriter for every customer-facing asset",
      },
      {
        risk: "3-person team is stretched across build, marketing and partnerships",
        likelihood: "High",
        impact: "Medium",
        mitigation: "Limit the soft launch to one segment and one region initially",
      },
    ],
  },
};

const modulesB: Modules = {
  market_opportunity: {
    market_summary:
      "France is Europe's second-largest beauty market and its consumers are unusually loyal to pharmacy and parapharmacy skincare. Unlike the UK, where DTC brands can win on Instagram alone, French shoppers expect dermatological credibility and often validate a brand through pharmacy or Sephora France presence.",
    maturity: "Mature",
    demand_signals: [
      "High per-capita skincare spend with strong routine-based buying",
      "Growing French DTC and marketplace beauty sales",
      "Active French beauty creator and review ecosystem",
      "Rising demand for clean and minimal-ingredient formulations",
    ],
    size_estimate: {
      tam: "€6.8bn",
      sam: "€1.1bn",
      som: "€1.2m",
      assumptions: [
        "French skincare retail around €6.8bn annually across all channels",
        "SAM limited to online skincare purchases by women aged 25-40",
        "Average order value of €38 and two orders per customer per year",
        "SOM assumes roughly 0.1% of SAM within 12 months on a small budget",
      ],
    },
    attractiveness_score: 7,
    rationale:
      "Large, adjacent and reachable with a 3-month demand test, but competition is intense and credibility is earned differently than in the UK. Regulatory work (CPNP, EU responsible person) is mandatory before any sale.",
  },
  customer_buying: {
    icp: {
      description:
        "French women aged 25-40 in urban areas who buy skincare online, research ingredients, and already mix pharmacy brands with DTC discoveries.",
      company_size_or_segment: "Consumer segment: urban women 25-40, mid-to-upper income",
      industries_or_interests: [
        "Dermocosmetics and ingredient-led skincare",
        "Clean beauty",
        "Beauty creators on TikTok and Instagram",
        "Sustainability and refillable packaging",
      ],
      buying_triggers: [
        "A creator or friend recommendation",
        "A specific skin concern flare-up",
        "Seasonal routine change or a promotional moment",
      ],
    },
    buying_committee: [
      {
        role: "Routine builder (25-34, ingredient-led)",
        cares_about: "Proven actives, INCI transparency and visible results",
        influence: "Decision maker",
      },
      {
        role: "Pharmacy loyalist (30-40)",
        cares_about: "Dermatological credibility and recommendation from a pharmacist",
        influence: "Decision maker",
      },
      {
        role: "Value-conscious discoverer",
        cares_about: "Trial size, bundle price and free returns",
        influence: "User",
      },
      {
        role: "French beauty creators",
        cares_about: "Authentic brand story and exclusive first access",
        influence: "Influencer",
      },
      {
        role: "Sceptical reviewer community",
        cares_about: "Greenwashing and unsupported claims",
        influence: "Blocker",
      },
    ],
    buying_process: {
      typical_cycle: "1-3 weeks from discovery to first order",
      steps: [
        "Discovery through a French creator, TikTok or marketplace search",
        "Ingredient and claim research, often on French review sites",
        "Comparison against a trusted pharmacy brand",
        "First purchase, usually a small basket or bundle",
        "Repeat purchase after seeing results in 4-6 weeks",
      ],
      home_vs_target_differences: [
        "Pharmacy credibility substitutes for the UK's influencer-first trust path",
        "French shoppers expect Colissimo or Mondial Relay delivery and easy returns",
        "Claims language is scrutinised more closely under French advertising norms",
        "Cartes Bancaires is expected at checkout alongside cards and wallets",
      ],
    },
  },
  competition: {
    competitors: [
      {
        name: "La Roche-Posay",
        type: "Local incumbent",
        strength: "Dermatologist endorsement and pharmacy ubiquity",
        weakness: "Clinical, low-emotion brand with little community feel",
        how_to_win: "Pair credible actives with a warmer brand and creator-led community",
      },
      {
        name: "Nuxe",
        type: "Local incumbent",
        strength: "Beloved French heritage brand with strong parapharmacy distribution",
        weakness: "Less convincing on modern ingredient transparency",
        how_to_win: "Lead on full INCI transparency and results-focused, minimal routines",
      },
      {
        name: "Typology",
        type: "Local incumbent",
        strength: "French-born DTC with sharp minimal positioning",
        weakness: "Narrow assortment and limited offline presence",
        how_to_win: "Differentiate on routine guidance and a clearly distinct hero product",
      },
      {
        name: "The Ordinary",
        type: "Global player",
        strength: "Price leadership and enormous awareness",
        weakness: "Confusing for shoppers who want guided routines",
        how_to_win: "Sell the curated routine, not a shelf of single actives",
      },
      {
        name: "Existing pharmacy routine",
        type: "Status quo",
        strength: "Trusted, convenient and pharmacist-endorsed",
        weakness: "Rarely personalised and slow to adopt new formats",
        how_to_win: "Offer a low-risk trial bundle with free returns and clear before/after guidance",
      },
    ],
    status_quo_alternative:
      "Most target shoppers keep buying the same two or three pharmacy products they already trust. Switching has no financial urgency, so the entry play is a low-risk trial bundle plus credible proof rather than a discount war.",
  },
  positioning: {
    home_positioning:
      "In the UK, Glow Lab is positioned as a friendly, social-first skincare brand: fun packaging, creator-led discovery and simple routines at an accessible price.",
    target_positioning:
      "In France, position Glow Lab as dermocosmetic-grade skincare with a modern voice: transparent formulations, dermatologist-reviewed claims and French-language routine guidance, sold online with pharmacy-level credibility.",
    key_changes: [
      "Credibility before playfulness",
      "Ingredient transparency",
      "French-language proof",
      "Routine, not products",
      "Local delivery norms",
    ],
    messaging_pillars: [
      {
        pillar: "Formulated with proven actives",
        proof_point_needed: "Dermatologist review and percentage disclosure for each active",
      },
      {
        pillar: "Transparent by default",
        proof_point_needed: "Full INCI list and sourcing information on every product page in French",
      },
      {
        pillar: "A routine that fits French skin concerns",
        proof_point_needed: "French consumer trial results and creator testimonials in French",
      },
    ],
    localisation_notes: [
      "French copy written by a native beauty copywriter; avoid English product names",
      "Use restrained claim language that fits French advertising norms",
      "Show EUR prices inclusive of VAT, as French consumers expect",
      "Reference Colissimo and Mondial Relay delivery explicitly",
    ],
    elevator_pitch_target:
      "Glow Lab is transparent, actives-led skincare designed as a simple routine, now available in France. Dermatologist-reviewed formulas with full ingredient disclosure, delivered to your Point Relais in two days.",
  },
  pricing: {
    pricing_norms:
      "French online skincare typically sells at €15-€45 per item with VAT included, and bundles or trial sets are common at €30-€60. Free delivery thresholds around €40-€50 are standard, and heavy discounting outside promotional windows is uncommon in the dermocosmetic space.",
    recommended_approach:
      "Set round EUR VAT-inclusive prices rather than converted GBP, anchor a €39 routine bundle above a €25 hero product, and use a free-delivery threshold at €45 to lift average order value.",
    currency_and_tax_notes: [
      "Display EUR prices including 20% French VAT on all consumer pages",
      "Register for EU OSS and apply French VAT rather than UK VAT",
      "Customs and DDP handling must be resolved by shipping from an EU 3PL",
      "Invoices and receipts should be issued in French",
    ],
    payment_and_contract_norms: [
      "Cartes Bancaires is expected alongside Visa, Mastercard and PayPal",
      "Buy-now-pay-later has meaningful adoption for baskets above €50",
      "The statutory 14-day right of withdrawal must be stated clearly",
      "Subscription cancellation must be simple and clearly explained",
    ],
    discounting_norms:
      "Discounting is concentrated in the regulated soldes periods and French Days; outside those, credibility-led brands use gifts with purchase and trial sizes rather than percentage cuts.",
    risks: [
      "Converted GBP prices create odd numbers that undermine a premium read",
      "Shipping from the UK adds cost and delay that kills conversion",
      "VAT errors on consumer-inclusive pricing erode margin unexpectedly",
    ],
  },
  routes_to_market: {
    recommended_entry_mode: "Pilot",
    rationale:
      "The entry goal is to test demand in 3 months with 2 people and a small budget, so a DTC pilot with French-language storefront, creator seeding and one marketplace test reads demand cheaply before committing to retail or pharmacy distribution.",
    channels: [
      {
        channel: "French-language DTC storefront",
        role: "Own the margin and control the brand story",
        priority: "Primary",
      },
      {
        channel: "TikTok and Instagram creator seeding",
        role: "Drive discovery with French-language proof",
        priority: "Primary",
      },
      {
        channel: "Paid social prospecting",
        role: "Read cost per acquisition against UK benchmarks",
        priority: "Primary",
      },
      {
        channel: "Beauty marketplace trial (e.g. Sephora France or Amazon.fr)",
        role: "Test incremental discovery without full retail commitment",
        priority: "Secondary",
      },
      {
        channel: "French beauty PR and press",
        role: "Build credibility with editorial coverage",
        priority: "Secondary",
      },
      {
        channel: "Parapharmacy or concept store trial",
        role: "Borrow pharmacy credibility if DTC demand proves out",
        priority: "Test",
      },
    ],
    partner_types: [
      {
        type: "French beauty creators and micro-influencers",
        why: "They are the main discovery path and provide French-language social proof",
        examples_to_research: [
          "Mid-tier French skincare creators",
          "Dermatologist creators on Instagram",
          "French beauty review accounts",
        ],
      },
      {
        type: "EU third-party logistics providers",
        why: "EU fulfilment removes customs friction and enables Point Relais returns",
        examples_to_research: ["French 3PLs with Colissimo integration", "Benelux EU fulfilment hubs"],
      },
      {
        type: "Regulatory consultants / EU responsible person",
        why: "CPNP notification and an EU responsible person are legally required before selling",
        examples_to_research: ["French cosmetics regulatory consultancies"],
      },
    ],
    events_and_communities: [
      "French beauty subreddits and skincare forums",
      "TikTok French skincare creator community",
      "Beauty press desksides in Paris",
      "Cosmetic 360 industry event",
    ],
  },
  legal_ops: {
    items: [
      {
        title: "EU responsible person appointed",
        detail:
          "EU cosmetics rules require a named responsible person established in the EU before any product is sold. Post-Brexit, a UK entity alone is not sufficient.",
        area: "Industry regulation",
        severity: "High",
        owner_role: "Regulatory Consultant",
      },
      {
        title: "CPNP notification for every SKU",
        detail:
          "Each product must be notified in the EU cosmetic products portal with a complete product information file before sale.",
        area: "Industry regulation",
        severity: "High",
        owner_role: "Regulatory Consultant",
      },
      {
        title: "French labelling and INCI requirements",
        detail:
          "Labels must carry French-language function, precautions, batch and responsible person details; English-only labels are non-compliant.",
        area: "Consumer protection",
        severity: "High",
        owner_role: "Product Manager",
      },
      {
        title: "EU VAT via OSS and customs setup",
        detail:
          "Register for OSS, apply 20% French VAT and ship DDP from an EU warehouse to avoid consumer-facing customs charges.",
        area: "Tax & invoicing",
        severity: "High",
        owner_role: "Finance Manager",
      },
      {
        title: "14-day withdrawal right and French CGV",
        detail:
          "French distance-selling rules require clear withdrawal rights, and terms of sale (CGV) should be drafted in French.",
        area: "Contracts & procurement",
        severity: "Medium",
        owner_role: "Legal Counsel",
      },
      {
        title: "CNIL-compliant cookie consent",
        detail:
          "French data protection guidance on consent banners is strictly enforced; reject must be as easy as accept before running paid traffic.",
        area: "Data & privacy",
        severity: "Medium",
        owner_role: "Marketing Operations",
      },
      {
        title: "Claims substantiation",
        detail:
          "Efficacy and environmental claims must be substantiated; unsupported clean or natural claims attract complaints and regulator attention.",
        area: "Consumer protection",
        severity: "Medium",
        owner_role: "Brand Marketer",
      },
      {
        title: "Influencer disclosure rules",
        detail:
          "French rules on influencer marketing require clear paid-partnership disclosure in French on every collaboration.",
        area: "Consumer protection",
        severity: "Medium",
        owner_role: "Influencer Manager",
      },
      {
        title: "Accessibility of the French storefront",
        detail:
          "Meeting WCAG AA reduces legal exposure and improves conversion for the French site.",
        area: "Accessibility",
        severity: "Low",
        owner_role: "Ecommerce Manager",
      },
    ],
  },
  localisation: {
    language: [
      "French storefront copy written by a native beauty copywriter",
      "French product names, ingredient lists and care instructions",
      "French customer emails and post-purchase flows",
    ],
    product: [
      "French-compliant labelling and inserts",
      "EUR VAT-inclusive pricing and a French routine bundle",
      "Cartes Bancaires at checkout",
      "Colissimo and Mondial Relay delivery and returns",
    ],
    support: [
      "French-language email and chat support on weekdays",
      "French FAQ covering delivery, returns and ingredients",
      "Clear withdrawal-right explanation in French",
    ],
    sales_enablement: [
      "French creator brief with claim guardrails",
      "Marketplace listing copy in French",
      "Press kit in French with founder story",
    ],
    proof_and_references: [
      "French consumer trial results",
      "Dermatologist review of hero formulations",
      "At least 20 French-language reviews on the storefront",
    ],
  },
  launch_plan: launchPlanB,
  kpis_risks: {
    kpis: [
      {
        metric: "French paid social cost per acquisition",
        target_guidance: "Within 1.3x of UK CPA",
        phase: "Validate",
      },
      {
        metric: "French storefront conversion rate",
        target_guidance: "At least 1.5%",
        phase: "Pre-launch",
      },
      {
        metric: "Creator collaborations live",
        target_guidance: "10 within 6 weeks",
        phase: "Pre-launch",
      },
      {
        metric: "First orders in France",
        target_guidance: "500 in the first 90 days",
        phase: "Launch",
      },
      {
        metric: "Average order value",
        target_guidance: "At least €38",
        phase: "Launch",
      },
      {
        metric: "Repeat purchase rate at 60 days",
        target_guidance: "At least 20%",
        phase: "Post-launch",
      },
      {
        metric: "Return rate",
        target_guidance: "Below 6%",
        phase: "Post-launch",
      },
    ],
    go_no_go_criteria: [
      "French CPA within 1.3x of the UK benchmark after the ad test",
      "CPNP notification and EU responsible person completed for all hero SKUs",
      "EU fulfilment delivering within 3 days at acceptable cost",
      "At least 100 orders and 20 French-language reviews in the test window",
      "Return rate below 8% during the pilot",
    ],
    risks: [
      {
        risk: "Regulatory work (CPNP, responsible person) delays launch beyond 3 months",
        likelihood: "High",
        impact: "High",
        mitigation: "Start regulatory work in week one and limit the pilot to five SKUs",
      },
      {
        risk: "Pharmacy-brand credibility keeps French CPA high",
        likelihood: "High",
        impact: "High",
        mitigation: "Lead with dermatologist review and ingredient transparency, not brand personality",
      },
      {
        risk: "Cross-border shipping cost and delay suppress conversion",
        likelihood: "Medium",
        impact: "High",
        mitigation: "Move stock to an EU 3PL before paid traffic starts",
      },
      {
        risk: "Claim wording attracts complaints",
        likelihood: "Medium",
        impact: "Medium",
        mitigation: "Have all French claims reviewed before publication and brief creators tightly",
      },
      {
        risk: "Small team cannot sustain creator programme and ops together",
        likelihood: "Medium",
        impact: "Medium",
        mitigation: "Use an agency for creator coordination during the pilot",
      },
      {
        risk: "Marketplace test cannibalises DTC margin",
        likelihood: "Low",
        impact: "Medium",
        mitigation: "List a limited range and measure incrementality before expanding",
      },
    ],
  },
};

const allDone = {
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
} as Launch["module_status"];

export const PLACEHOLDER_LAUNCHES: Launch[] = [
  {
    id: "example-b2b",
    created_at: "2026-09-24T09:12:00.000Z",
    product_name: "LedgerFlow – cloud invoicing for SMBs",
    product_description:
      "LedgerFlow is cloud invoicing and receivables software for small and mid-sized businesses. Finance teams create invoices, chase payment automatically and reconcile against their bank feed. Sold today through a mix of self-serve signup and inside sales in the UK.",
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
    modules: modulesA,
    module_status: allDone,
    executive_summary: {
      recommendation: "Go with conditions",
      headline:
        "Germany is the strongest adjacent market for LedgerFlow, but only if the e-invoicing and GoBD compliance gaps are closed before the soft launch.",
      top_priorities: [
        "Close the X-Rechnung, ZUGFeRD and GoBD archiving gaps within the first 10 weeks",
        "Sign two Steuerberater referral partners to supply pre-trusted pipeline",
        "Ship a fully German storefront, AGB and EU hosting option before paid traffic",
      ],
      top_risks: [
        "Compliance engineering overruns the 6-month timeline",
        "Adviser partnerships convert more slowly than planned, starving pipeline",
        "Security reviews stall deals without a recognised certification",
      ],
      first_90_days:
        "Spend the first month validating: 15 discovery calls with German SMB finance leads, a small paid-search test, and a firm compliance gap list. In parallel, shortlist and approach 20 tax advisory firms and sign the first two referral partners. By day 90, have the German UI, AGB and EU hosting option in build, three prospects lined up for paid pilots, and a decision made on whether the compliance work fits the timeline.",
    },
    is_example: true,
    tasks: tasksWithIds("example-b2b", launchPlanA),
    criteria: modulesA.kpis_risks!.go_no_go_criteria.map((text, i) => ({
      id: `example-b2b-crit-${i}`,
      text,
      done: i === 0,
      sort_order: i,
    })),
  },
  {
    id: "example-b2c",
    created_at: "2026-09-27T14:40:00.000Z",
    product_name: "Glow Lab – DTC skincare",
    product_description:
      "Glow Lab is a direct-to-consumer skincare brand selling a small range of actives-led serums and moisturisers online. Discovery today is creator-led on Instagram and TikTok, with all sales through its own UK storefront.",
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
    modules: modulesB,
    module_status: allDone,
    executive_summary: {
      recommendation: "Go",
      headline:
        "France is worth a 3-month demand test now, provided the cosmetics regulatory work starts in week one and stock moves to an EU warehouse.",
      top_priorities: [
        "Appoint an EU responsible person and complete CPNP notification for five hero SKUs",
        "Stand up a French storefront with EUR VAT-inclusive pricing and Cartes Bancaires",
        "Seed 10 French creators and read cost per acquisition against the UK benchmark",
      ],
      top_risks: [
        "Regulatory work delays the launch beyond the 3-month window",
        "Pharmacy-brand credibility keeps acquisition costs high",
        "Cross-border shipping cost and delay suppress conversion",
      ],
      first_90_days:
        "Begin with regulatory and logistics in parallel: appoint the EU responsible person, notify five SKUs in CPNP, and contract an EU 3PL with Colissimo returns. Then launch the French storefront with native copy, dermatologist-reviewed claims and a €39 routine bundle. Spend the final month on creator seeding and a paid social test, reading CPA, conversion rate and return rate weekly against the go/no-go criteria.",
    },
    is_example: true,
    tasks: tasksWithIds("example-b2c", launchPlanB),
    criteria: modulesB.kpis_risks!.go_no_go_criteria.map((text, i) => ({
      id: `example-b2c-crit-${i}`,
      text,
      done: false,
      sort_order: i,
    })),
  },
];

export function getPlaceholderLaunch(id: string): Launch {
  return PLACEHOLDER_LAUNCHES.find((l) => l.id === id) ?? PLACEHOLDER_LAUNCHES[0]!;
}
