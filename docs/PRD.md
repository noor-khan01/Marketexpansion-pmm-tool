# PRD: Market Entry Copilot

| Field | Value |
|---|---|
| Product | Market Entry Copilot |
| Document type | Product Requirements Document (PRD) |
| Version | 1.0 |
| Status | Ready to build |
| Build tool | Lovable (React frontend + Lovable Cloud / Supabase backend) |
| Owner | Product Manager |

---

## 0. How to use this document (instructions for the LLM builder)

Read this section first.

1. This PRD is the **single source of truth**. If a requirement here conflicts with an assumption you would normally make, follow this PRD.
2. Requirements have IDs (e.g. `FR-12`, `AI-03`, `NFR-02`). Refer to these IDs when describing what you built.
3. Priorities:
   - **P0** = must have for the MVP. Build these first.
   - **P1** = should have. Build after all P0 items work.
   - **P2** = stretch. Only build if explicitly asked.
4. Build in the order given in **Section 15 (Build order)**. Complete and verify one milestone before starting the next.
5. All JSON schemas in **Section 9** are exact. Do not rename, add or remove fields.
6. Never place API keys or secrets in frontend code. All AI calls go through backend functions (see `NFR-01`).
7. When something is ambiguous, choose the simplest implementation that satisfies the acceptance criteria, and state the assumption.
8. Words in `code format` are exact names (tables, fields, functions, enum values). Use them exactly.

---

## 1. Overview

### 1.1 One-line summary
Market Entry Copilot turns a few inputs about a product and two countries into a complete, market-specific go-to-market (GTM) entry plan, with an executive recommendation, in under two minutes.

### 1.2 Problem
When a company expands an existing product into a new country, product marketing and GTM teams rebuild the market entry plan from scratch each time. The work is spread across docs, spreadsheets and people's heads. Plans are often generic, ignore what is actually different about the new market, and miss B2B essentials such as buying committees, procurement, compliance and partner routes to market.

### 1.3 Solution
A web app where the user describes their product, home market, target market and GTM context. The app generates ten plan modules in parallel, each focused on **what is different about the target market compared to the home market**, then produces an executive summary with a Go / Go with conditions / Not yet recommendation. Plans are saved, tasks can be tracked, and a readiness score shows progress.

### 1.4 Core product principle: think in deltas
Every AI output must answer: *"We already know how to win in the home market. What has to change to win in the target market?"* Generic advice that would apply to any country is a failure.

### 1.5 Business models supported
- **B2B** (business buyers, buying committees, sales cycles, procurement)
- **B2C** (consumer segments, consumer channels, consumer protection)
- **B2B2C** (both)

---

## 2. Goals and non-goals

### 2.1 Goals
| ID | Goal |
|---|---|
| G-1 | Generate a complete, market-specific entry plan from one form in under 2 minutes. |
| G-2 | Adapt output to business model, sales motion, deal size, current presence and entry goal. |
| G-3 | Give leadership a clear recommendation (Go / Go with conditions / Not yet) with reasons. |
| G-4 | Turn the plan into trackable tasks with a readiness score. |
| G-5 | Be demo-ready: visual, fast-feeling, reliable on a projector. |

### 2.2 Non-goals (do NOT build)
| ID | Non-goal |
|---|---|
| NG-1 | User accounts, login, teams or permissions (single-user app for MVP). |
| NG-2 | Guaranteed-accurate market data, legal or tax advice. Output is a starting point to verify. |
| NG-3 | Integrations with CRM, project management or analytics tools. |
| NG-4 | Multi-language UI. The UI is English only. |
| NG-5 | Editing AI output text inline (regenerate is supported instead). |

---

## 3. Users

### 3.1 Primary persona: Product Marketing Manager (PMM)
- Responsible for positioning, messaging and launch plans for new markets.
- Needs a structured first draft fast, focused on what is different in the new market.
- Success: can take the plan into a stakeholder meeting the same day.

### 3.2 Secondary persona: GTM / Expansion Lead
- Decides whether and how to enter a market; owns budget and headcount.
- Needs the executive summary, market opportunity, entry mode, risks and go/no-go criteria.

### 3.3 Secondary persona: Product Manager
- Needs to know which product, localisation, compliance and support changes are required.

---

## 4. User stories

| ID | As a… | I want to… | So that… | Priority |
|---|---|---|---|---|
| US-1 | PMM | enter my product and two markets in one form | I get a plan without writing prompts | P0 |
| US-2 | PMM | see each module appear as soon as it is ready | I am not waiting on one long spinner | P0 |
| US-3 | PMM | see home vs target positioning side by side | I can see exactly what must change | P0 |
| US-4 | Expansion Lead | see a Go / Go with conditions / Not yet recommendation | I can make a decision quickly | P0 |
| US-5 | B2B PMM | see the buying committee and buying process for the target market | sales and marketing target the right people | P0 |
| US-6 | PMM | regenerate a single module | I can improve one part without redoing everything | P0 |
| US-7 | PMM | save plans and reopen them later | I can keep working on them | P0 |
| US-8 | PMM | tick off launch tasks and go/no-go criteria | I can track readiness | P0 |
| US-9 | PMM | see a readiness percentage | I can report progress | P1 |
| US-10 | PMM | duplicate a plan for another target market | I can compare expansion options quickly | P1 |
| US-11 | Presenter | switch to presentation mode | the plan reads well on a projector | P1 |
| US-12 | Expansion Lead | compare two markets side by side | I can choose which to enter first | P2 |
| US-13 | Expansion Lead | export a one-page executive brief | I can share it with leadership | P2 |

---

## 5. User flow

```
[My Launches page] --"New launch"--> [New Launch form]
       ^                                   |
       |                          "Generate market entry plan"
       |                                   v
       |                       [Results page opens immediately]
       |                        - 10 module skeletons shown
       |                        - 10 AI calls run in parallel
       |                        - each module renders when ready
       |                        - when all 10 finish: executive summary call
       |                        - launch + tasks auto-saved
       |                                   |
       +-------- sidebar / nav ------------+
```

1. User lands on **My Launches** (shows saved launches, including seed examples).
2. User clicks **New launch** and completes the form.
3. User clicks **Generate market entry plan**.
4. App creates a launch record, navigates to the **Results** page and starts generation.
5. Modules fill in progressively. Failed modules show an error with **Retry**.
6. When all modules have succeeded, the **Executive summary** is generated and shown at the top.
7. User ticks tasks and go/no-go criteria; readiness score updates.
8. User can regenerate any module, duplicate the launch for another market, or return to My Launches.

---

## 6. Functional requirements: pages

### 6.1 Page: My Launches (route `/`)

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Show all saved launches as cards, newest first. | P0 |
| FR-02 | Each card shows: product name, home → target market with flag emojis, business model badge, recommendation badge (if generated), readiness %, created date. | P0 |
| FR-03 | Clicking a card opens that launch's Results page, loaded from the database with no regeneration. | P0 |
| FR-04 | A primary **New launch** button opens the New Launch form. | P0 |
| FR-05 | Each card has a delete action with a confirmation dialog. | P1 |
| FR-06 | Empty state (only if seed data is missing): message "No launches yet" and a **New launch** button. | P0 |

### 6.2 Page: New Launch form (route `/new`)

| ID | Requirement | Priority |
|---|---|---|
| FR-10 | Show the form fields in Section 6.2.1, grouped under the headings Product, Markets, Go-to-market and Goals. | P0 |
| FR-11 | Validate required fields before submission; show inline error messages. | P0 |
| FR-12 | Home market and target market must be different. Error: "Target market must be different from home market." | P0 |
| FR-13 | Submitting creates a `launches` record with status `generating`, then navigates to `/launch/:id` and starts generation. | P0 |
| FR-14 | If the form was opened via **Duplicate**, pre-fill all fields from the source launch except target market, which is empty. | P1 |

#### 6.2.1 Form fields

| Field label | DB column | Type | Required | Options / notes |
|---|---|---|---|---|
| Product name | `product_name` | text | Yes | max 100 chars |
| Product description | `product_description` | textarea | Yes | max 1,500 chars; placeholder: "What it does, who it's for, key features, how it's sold today" |
| Industry / vertical | `industry` | text | Yes | e.g. "Fintech", "Beauty", "HR software" |
| Business model | `business_model` | select | Yes | `B2B`, `B2C`, `B2B2C` |
| Home market | `home_market` | country select | Yes | full country list, searchable |
| Target market | `target_market` | country select | Yes | full country list, searchable; must differ from home |
| Current presence in target market | `current_presence` | select | Yes | `None`, `A few customers`, `Existing global customers with teams there` |
| Target customer | `target_customer` | text | Yes | e.g. "mid-market finance teams", "Gen Z online shoppers" |
| Sales motion | `sales_motion` | select | Yes | `Self-serve`, `Sales-led`, `Partner-led`, `Hybrid` |
| Typical deal size or price point | `deal_size` | text | No | e.g. "£20k ACV", "£35 per order" |
| Entry goal | `entry_goal` | select | Yes | `Test demand`, `Soft launch`, `Full launch` |
| Timeline | `timeline` | select | Yes | `3 months`, `6 months`, `12 months` |
| Team and budget | `team_and_budget` | text | No | e.g. "2 people, small budget" |

### 6.3 Page: Results (route `/launch/:id`)

#### 6.3.1 Layout

| ID | Requirement | Priority |
|---|---|---|
| FR-20 | Header shows product name, home → target market with flag emojis, business model badge, and action buttons: **Duplicate for another market** (P1), **Presentation mode** (P1), **Back to My Launches** (P0). | P0 |
| FR-21 | Below the header: **Readiness score** (Section 6.5) and the **Executive summary** card (Section 6.4). | P0 |
| FR-22 | Left sidebar lists the 10 modules with a status icon each: loading, done, error. Clicking scrolls to the module. | P0 |
| FR-23 | Main area shows all 10 modules stacked in order, each as a card with a title, a **Regenerate** button and its content. | P0 |
| FR-24 | On narrow screens (<900px), the sidebar collapses into a horizontal module menu at the top. | P1 |

#### 6.3.2 Module display requirements

Each module's data shape is defined in Section 9. Display rules:

| ID | Module | Display requirement | Priority |
|---|---|---|---|
| FR-30 | 1. Market opportunity | Attractiveness score shown as a large number /10 with a gauge or bar; maturity as a badge; market summary paragraph; demand signals as a bulleted list; TAM / SAM / SOM as three stat tiles; assumptions listed below the tiles in smaller text; rationale paragraph. | P0 |
| FR-31 | 2. Customer & buying process | ICP summary block; buying committee as a grid of cards (role, cares about, influence badge); buying process with typical cycle, numbered steps, and a "What's different from home market" list. If `business_model` is `B2C`, title the grid "Consumer segments". | P0 |
| FR-32 | 3. Competitive landscape | Competitor cards with a type badge (`Local incumbent`, `Global player`, `Status quo`), strength, weakness and "How to win". A separate callout for the status quo alternative. | P0 |
| FR-33 | 4. Positioning & messaging | Two columns: "Home market" and "Target market" positioning, with an arrow between them. Key changes as tags below. Messaging pillars as a table (pillar, proof point needed). Localisation notes list. Target-market elevator pitch in a highlighted quote block. | P0 |
| FR-34 | 5. Pricing & packaging | Sub-sections: Pricing norms, Recommended approach, Currency & tax notes, Payment & contract norms, Discounting norms, Risks. | P0 |
| FR-35 | 6. Routes to market | Recommended entry mode as a large badge with rationale; channels table (channel, role, priority badge); partner types as cards; events and communities list. | P0 |
| FR-36 | 7. Legal, compliance & operations | Banner at top: "Verify with local legal and tax experts before acting." Items as rows with title, detail, area badge, severity badge, owner role. Sort by severity High → Low. | P0 |
| FR-37 | 8. Localisation & readiness | Five grouped checklists: Language, Product, Support, Sales enablement, Proof & references. Display only (not tickable). | P0 |
| FR-38 | 9. Launch plan | Grid: rows = tracks (`Product`, `Marketing`, `Sales`, `Partnerships`, `Customer Success`, `Legal & Ops`), columns = phases (`Validate`, `Pre-launch`, `Launch`, `Post-launch`). Each task is a card with checkbox, title, description (expandable) and owner role. Progress bar per track. Tasks are read from the `tasks` table. | P0 |
| FR-39 | 10. KPIs, go/no-go & risks | KPI table (metric, target guidance, phase). Go/no-go criteria as a tickable checklist (saved). Risks table (risk, likelihood badge, impact badge, mitigation), sorted with High/High first. | P0 |

#### 6.3.3 Module states

| ID | Requirement | Priority |
|---|---|---|
| FR-40 | **Loading**: show a skeleton placeholder shaped like the module content. | P0 |
| FR-41 | **Success**: render content per Section 6.3.2. | P0 |
| FR-42 | **Error**: show "This section couldn't be generated." and a **Retry** button. Other modules are unaffected. | P0 |
| FR-43 | **Regenerate**: replaces the module's content with a skeleton, re-runs only that module's AI call, and saves the new result. For module 9, regenerating deletes and recreates that launch's tasks (ticked state is lost; show a confirmation dialog first). For module 10, regenerating resets go/no-go ticks (confirm first). | P0 |
| FR-44 | After any module is regenerated, show a small notice on the executive summary: "Plan changed. Regenerate summary?" with a button. | P1 |

### 6.4 Executive summary

| ID | Requirement | Priority |
|---|---|---|
| FR-50 | Generated automatically after all 10 modules succeed, using all module outputs plus the form inputs (see `AI-20`). | P0 |
| FR-51 | While modules are still generating, show: "Executive summary will appear when all sections are ready." While the summary itself generates, show "Generating executive summary…". | P0 |
| FR-52 | Display: recommendation badge (large), headline, top 3 priorities, top 3 risks, first 90 days paragraph. | P0 |
| FR-53 | Badge colours: `Go` = green, `Go with conditions` = amber, `Not yet` = grey. | P0 |
| FR-54 | **Regenerate summary** button. | P0 |
| FR-55 | If any module is in error state, do not generate the summary; show "Fix the sections with errors to generate the summary." | P0 |

### 6.5 Readiness score

| ID | Requirement | Priority |
|---|---|---|
| FR-60 | Readiness % = (completed tasks + ticked go/no-go criteria) ÷ (total tasks + total go/no-go criteria) × 100, rounded to the nearest whole number. | P0 |
| FR-61 | Show as a large percentage with a progress bar. Updates instantly when anything is ticked. | P0 |
| FR-62 | Show 0% with "Tick tasks as you complete them" while no items are ticked. | P0 |

### 6.6 Duplicate for another market (P1)

| ID | Requirement | Priority |
|---|---|---|
| FR-70 | **Duplicate for another market** opens `/new?from=:id` with all fields pre-filled except `target_market`. | P1 |
| FR-71 | The new launch is independent of the source launch. | P1 |

### 6.7 Presentation mode (P1)

| ID | Requirement | Priority |
|---|---|---|
| FR-80 | Toggle hides the sidebar, Regenerate buttons and header action buttons; increases base font size by ~20%; keeps checkboxes working. | P1 |
| FR-81 | Press `Esc` or click an "Exit presentation" button to leave presentation mode. | P1 |

### 6.8 Compare markets (P2)

| ID | Requirement | Priority |
|---|---|---|
| FR-90 | Page `/compare`: select two saved launches with the same product name. | P2 |
| FR-91 | Show side by side: attractiveness score, recommendation, entry mode, pricing approach, top 3 risks. | P2 |
| FR-92 | One AI call returns `{ "recommended_first_market": string, "reason": string }`, shown as a verdict banner. | P2 |

### 6.9 Export executive brief (P2)

| ID | Requirement | Priority |
|---|---|---|
| FR-95 | **Export brief** opens a clean printable one-page view: executive summary, market opportunity headline figures, entry mode, top risks, first 90 days. | P2 |
| FR-96 | Print styles hide navigation so the browser's "Save as PDF" produces a clean page. | P2 |

---

## 7. AI requirements: behaviour

| ID | Requirement | Priority |
|---|---|---|
| AI-01 | Each of the 10 modules is generated by a **separate** AI call. | P0 |
| AI-02 | All 10 module calls start **in parallel** when generation begins. | P0 |
| AI-03 | Every call receives all form inputs (Section 6.2.1) and uses the shared system prompt (Section 8.1). | P0 |
| AI-04 | Every call must return **only valid JSON** matching its schema in Section 9. | P0 |
| AI-05 | Before parsing, strip any Markdown code fences (```json … ```) and surrounding whitespace. | P0 |
| AI-06 | Validate parsed JSON against the schema: all required fields present, enum values exact, arrays within stated length ranges. | P0 |
| AI-07 | If parsing or validation fails, automatically retry **once**. If the retry also fails, set the module to error state (FR-42). | P0 |
| AI-08 | Use the model's JSON / structured output mode if the provider supports it. | P1 |
| AI-09 | Set a timeout of 60 seconds per call. A timeout counts as a failure (AI-07 applies). | P0 |
| AI-10 | Save each module's result to the database as soon as it succeeds (do not wait for all modules). | P0 |
| AI-11 | After module 9 succeeds, insert its tasks into the `tasks` table. | P0 |
| AI-12 | After module 10 succeeds, insert its go/no-go criteria into the `criteria` table. | P0 |
| AI-20 | The executive summary call receives all 10 module outputs plus form inputs and returns the schema in Section 9.11. | P0 |
| AI-21 | Adapt to `business_model`: for `B2C`, module 2 returns consumer segments in `buying_committee`; module 7 emphasises consumer protection; module 6 emphasises consumer channels. | P0 |
| AI-22 | Scale the launch plan to `entry_goal`, `timeline` and `team_and_budget` (a "Test demand, 2 people" plan is lighter than a "Full launch" plan). | P0 |
| AI-23 | Numbers (market sizes, prices, cycle lengths) are estimates with stated assumptions. Regulatory items must be flagged for local verification. | P0 |

---

## 8. AI prompts

### 8.1 Shared system prompt (use for all 10 module calls)

```
You are a senior go-to-market and product marketing leader with deep experience launching B2B and B2C products internationally. You have launched products in both the home market and the target market described below.

Your job is to help a team enter the TARGET market with a product that already exists in the HOME market.

Rules:
1. Always focus on what is DIFFERENT about the target market compared to the home market. Never give generic advice that would apply to any country.
2. Adapt everything to the business model, sales motion, deal size, current presence in the target market, entry goal, timeline, and team and budget provided.
3. If the business model is B2C, think in consumer segments, consumer channels and consumer protection. If B2B, think in buying committees, procurement, sales cycles and partner ecosystems. If B2B2C, cover both where relevant.
4. Be specific and practical. Name real types of organisations, channels, regulations and norms where you can.
5. Any numbers are estimates. Any legal, tax or regulatory point must be treated as something to verify locally.
6. Return ONLY valid JSON that matches the schema exactly. No Markdown, no code fences, no commentary before or after the JSON.
```

### 8.2 User prompt template (for each module call)

Replace `{…}` placeholders with form values and module-specific content.

```
CONTEXT
Product name: {product_name}
Product description: {product_description}
Industry / vertical: {industry}
Business model: {business_model}
Home market: {home_market}
Target market: {target_market}
Current presence in target market: {current_presence}
Target customer: {target_customer}
Sales motion: {sales_motion}
Typical deal size or price point: {deal_size or "Not provided"}
Entry goal: {entry_goal}
Timeline: {timeline}
Team and budget: {team_and_budget or "Not provided"}

TASK
{module_task}

OUTPUT SCHEMA
Return JSON exactly matching this schema:
{module_schema}
```

### 8.3 Module tasks (`{module_task}` values)

| Module | `{module_task}` |
|---|---|
| 1. Market opportunity | Assess how attractive the target market is for this product compared to the home market. Estimate TAM, SAM and SOM in the target market's currency with clear assumptions. Identify demand signals and the market's maturity. |
| 2. Customer & buying process | Define the ideal customer profile in the target market. Describe who is involved in buying (or, for B2C, the key consumer segments), what each cares about, and how the buying process in the target market differs from the home market. |
| 3. Competitive landscape | Identify 4–6 competitors in the target market, including at least one local player and the status quo alternative (doing nothing or using an existing workaround). Explain how to win against each. |
| 4. Positioning & messaging | Summarise how the product is likely positioned in the home market, then recommend how positioning should change for the target market. Define messaging pillars and the proof points the target market will need. |
| 5. Pricing & packaging | Describe pricing norms in the target market for this category and recommend a pricing and packaging approach. Cover currency, tax/VAT and invoicing, payment and contract norms, and discounting culture. |
| 6. Routes to market | Recommend the best entry mode and explain why. List channels with their role and priority, the partner types to pursue, and relevant events and communities in the target market. |
| 7. Legal, compliance & operations | List the legal, compliance, tax and operational requirements and risks for selling this product in the target market. Assign a severity and an owner role to each. |
| 8. Localisation & readiness | List what needs to change or be created for the target market across language, product, support, sales enablement, and proof and references. |
| 9. Launch plan | Create a launch plan of 18–28 tasks across six tracks and four phases, scaled to the entry goal, timeline and team size. Each task needs a clear owner role. |
| 10. KPIs, go/no-go & risks | Define KPIs for each phase, 4–6 go/no-go criteria for deciding whether to continue investing after the first phase, and the top 5–7 risks with mitigations. |

### 8.4 Executive summary prompt

System prompt: the shared system prompt (Section 8.1).

User prompt:
```
CONTEXT
{same CONTEXT block as Section 8.2}

PLAN MODULES
{JSON object containing all 10 module outputs, keyed by module name}

TASK
Review the whole plan and give a clear recommendation on whether to enter the target market now. Choose exactly one: "Go", "Go with conditions", or "Not yet". Be decisive and explain why in the headline. List the top 3 priorities and top 3 risks, and summarise what the first 90 days should look like.

OUTPUT SCHEMA
{executive summary schema from Section 9.11}
```

---

## 9. Data schemas (AI outputs)

Types are written in TypeScript notation. `string[]` means an array of strings. Numbers in brackets are required array lengths. All fields are required unless marked optional (`?`).

### 9.1 Module 1: Market opportunity (`market_opportunity`)
```ts
{
  market_summary: string;
  maturity: "Emerging" | "Growing" | "Mature" | "Saturated";
  demand_signals: string[];            // [3–6]
  size_estimate: {
    tam: string;                        // e.g. "€4.2bn"
    sam: string;
    som: string;
    assumptions: string[];              // [2–5]
  };
  attractiveness_score: number;         // integer 1–10
  rationale: string;
}
```

### 9.2 Module 2: Customer & buying process (`customer_buying`)
```ts
{
  icp: {
    description: string;
    company_size_or_segment: string;
    industries_or_interests: string[];  // [2–6]
    buying_triggers: string[];          // [2–5]
  };
  buying_committee: {                   // [3–6]; consumer segments if B2C
    role: string;
    cares_about: string;
    influence: "Decision maker" | "Influencer" | "User" | "Blocker";
  }[];
  buying_process: {
    typical_cycle: string;              // e.g. "3–6 months"
    steps: string[];                    // [3–8]
    home_vs_target_differences: string[]; // [2–5]
  };
}
```

### 9.3 Module 3: Competitive landscape (`competition`)
```ts
{
  competitors: {                        // [4–6], at least one "Local incumbent"
    name: string;
    type: "Local incumbent" | "Global player" | "Status quo";
    strength: string;
    weakness: string;
    how_to_win: string;
  }[];
  status_quo_alternative: string;
}
```

### 9.4 Module 4: Positioning & messaging (`positioning`)
```ts
{
  home_positioning: string;
  target_positioning: string;
  key_changes: string[];                // [3–6], short tag-length phrases
  messaging_pillars: {                  // [3–4]
    pillar: string;
    proof_point_needed: string;
  }[];
  localisation_notes: string[];         // [2–5]
  elevator_pitch_target: string;        // 1–2 sentences
}
```

### 9.5 Module 5: Pricing & packaging (`pricing`)
```ts
{
  pricing_norms: string;
  recommended_approach: string;
  currency_and_tax_notes: string[];     // [2–5]
  payment_and_contract_norms: string[]; // [2–5]
  discounting_norms: string;
  risks: string[];                      // [2–4]
}
```

### 9.6 Module 6: Routes to market (`routes_to_market`)
```ts
{
  recommended_entry_mode: "Direct" | "Partner-led" | "Hybrid" | "Marketplace" | "Pilot";
  rationale: string;
  channels: {                           // [4–8]
    channel: string;
    role: string;
    priority: "Primary" | "Secondary" | "Test";
  }[];
  partner_types: {                      // [2–4]
    type: string;
    why: string;
    examples_to_research: string[];     // [1–4]
  }[];
  events_and_communities: string[];     // [2–6]
}
```

### 9.7 Module 7: Legal, compliance & operations (`legal_ops`)
```ts
{
  items: {                              // [5–10]
    title: string;
    detail: string;
    area: "Data & privacy" | "Industry regulation" | "Tax & invoicing"
        | "Contracts & procurement" | "Entity & employment"
        | "Certifications & security" | "Consumer protection" | "Accessibility";
    severity: "High" | "Medium" | "Low";
    owner_role: string;
  }[];
}
```

### 9.8 Module 8: Localisation & readiness (`localisation`)
```ts
{
  language: string[];                   // [1–5]
  product: string[];                    // [1–5]
  support: string[];                    // [1–5]
  sales_enablement: string[];           // [1–5]
  proof_and_references: string[];       // [1–5]
}
```

### 9.9 Module 9: Launch plan (`launch_plan`)
```ts
{
  tasks: {                              // [18–28]; every track has at least 2 tasks
    track: "Product" | "Marketing" | "Sales" | "Partnerships"
         | "Customer Success" | "Legal & Ops";
    phase: "Validate" | "Pre-launch" | "Launch" | "Post-launch";
    title: string;                      // max ~8 words
    description: string;                // 1–2 sentences
    owner_role: string;
  }[];
}
```

### 9.10 Module 10: KPIs, go/no-go & risks (`kpis_risks`)
```ts
{
  kpis: {                               // [5–8]
    metric: string;
    target_guidance: string;
    phase: "Validate" | "Pre-launch" | "Launch" | "Post-launch";
  }[];
  go_no_go_criteria: string[];          // [4–6]
  risks: {                              // [5–7]
    risk: string;
    likelihood: "High" | "Medium" | "Low";
    impact: "High" | "Medium" | "Low";
    mitigation: string;
  }[];
}
```

### 9.11 Executive summary (`executive_summary`)
```ts
{
  recommendation: "Go" | "Go with conditions" | "Not yet";
  headline: string;                     // 1 sentence
  top_priorities: string[];             // exactly 3
  top_risks: string[];                  // exactly 3
  first_90_days: string;                // 2–4 sentences
}
```

---

## 10. Data model (database)

### 10.1 Table `launches`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key, default generated |
| `created_at` | timestamptz | default now() |
| `product_name` | text | required |
| `product_description` | text | required |
| `industry` | text | required |
| `business_model` | text | `B2B` / `B2C` / `B2B2C` |
| `home_market` | text | country name |
| `target_market` | text | country name |
| `current_presence` | text | enum per 6.2.1 |
| `target_customer` | text | required |
| `sales_motion` | text | enum per 6.2.1 |
| `deal_size` | text | nullable |
| `entry_goal` | text | enum per 6.2.1 |
| `timeline` | text | enum per 6.2.1 |
| `team_and_budget` | text | nullable |
| `status` | text | `generating` / `complete` / `partial_error` |
| `modules` | jsonb | object keyed by module key (see 10.4); each value is the module JSON or null |
| `module_status` | jsonb | object keyed by module key; values `loading` / `done` / `error` |
| `executive_summary` | jsonb | nullable |
| `is_example` | boolean | default false; true for seed data |

### 10.2 Table `tasks`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `launch_id` | uuid | foreign key → `launches.id`, on delete cascade |
| `track` | text | enum per 9.9 |
| `phase` | text | enum per 9.9 |
| `title` | text | |
| `description` | text | |
| `owner_role` | text | |
| `done` | boolean | default false |
| `sort_order` | integer | preserves AI order |

### 10.3 Table `criteria`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `launch_id` | uuid | foreign key → `launches.id`, on delete cascade |
| `text` | text | one go/no-go criterion |
| `done` | boolean | default false |
| `sort_order` | integer | |

### 10.4 Module keys
Use these exact keys everywhere (database JSON, function parameters, UI state):

| # | Module key | Display name |
|---|---|---|
| 1 | `market_opportunity` | Market opportunity |
| 2 | `customer_buying` | Customer & buying process |
| 3 | `competition` | Competitive landscape |
| 4 | `positioning` | Positioning & messaging |
| 5 | `pricing` | Pricing & packaging |
| 6 | `routes_to_market` | Routes to market |
| 7 | `legal_ops` | Legal, compliance & operations |
| 8 | `localisation` | Localisation & readiness |
| 9 | `launch_plan` | Launch plan |
| 10 | `kpis_risks` | KPIs, go/no-go & risks |

---

## 11. Backend functions

### 11.1 `generate-module`
- **Input:** `{ launch_id: string, module_key: ModuleKey }`
- **Behaviour:**
  1. Load the launch's form inputs from `launches`.
  2. Build prompts per Section 8 for `module_key`.
  3. Call the AI model; apply AI-05 to AI-09.
  4. On success: write result to `launches.modules[module_key]`, set `module_status[module_key] = "done"`. If `launch_plan`, replace this launch's rows in `tasks`. If `kpis_risks`, replace this launch's rows in `criteria`.
  5. On failure: set `module_status[module_key] = "error"`.
  6. Update `launches.status`: `complete` if all 10 are `done`, `partial_error` if any `error` and none `loading`, otherwise `generating`.
- **Output:** `{ ok: boolean, module_key, data?: object, error?: string }`

### 11.2 `generate-summary`
- **Input:** `{ launch_id: string }`
- **Precondition:** all 10 modules `done`; otherwise return `{ ok: false, error: "Modules incomplete" }`.
- **Behaviour:** build prompt per Section 8.4, call AI, validate against 9.11, save to `launches.executive_summary`.
- **Output:** `{ ok: boolean, data?: object, error?: string }`

### 11.3 `compare-markets` (P2)
- **Input:** `{ launch_id_a: string, launch_id_b: string }`
- **Output:** `{ ok: boolean, data?: { recommended_first_market: string, reason: string } }`

### 11.4 Frontend orchestration
On the Results page for a launch with status `generating`:
1. Call `generate-module` for all 10 module keys at the same time.
2. Update each module's UI as its call resolves.
3. When all 10 are `done`, call `generate-summary`.
4. If the user leaves and returns, render from the database; restart only modules still marked `loading` for more than 90 seconds.

---

## 12. UI and design requirements

| ID | Requirement | Priority |
|---|---|---|
| UX-01 | Style: modern, professional B2B SaaS. White or very light background, generous spacing, rounded cards, subtle borders. | P0 |
| UX-02 | One accent colour (e.g. deep indigo) for primary buttons and highlights. Semantic colours only for status: green (Go, done), amber (Go with conditions, Medium), red (High severity, errors), grey (Not yet, Low). | P0 |
| UX-03 | Clear typographic hierarchy: page title > module title > sub-heading > body. Body text at least 15px. | P0 |
| UX-04 | Country names always shown with flag emoji. | P1 |
| UX-05 | Badges are small pill shapes with text; never rely on colour alone to convey meaning. | P0 |
| UX-06 | Long text (task descriptions, rationales) truncates to 2 lines with "Show more". | P1 |
| UX-07 | Layout works on laptop screens from 1280px wide and is usable down to 375px. | P0 |
| UX-08 | Readable on a projector: sufficient contrast (WCAG AA), no thin grey text for content. | P0 |

---

## 13. Non-functional requirements

| ID | Requirement | Priority |
|---|---|---|
| NFR-01 | **Security:** API keys stored as backend secrets only. No keys in frontend code, network responses or logs. | P0 |
| NFR-02 | **Performance:** first module visible within 20 seconds of submission on a normal connection; all modules within 90 seconds. | P0 |
| NFR-03 | **Resilience:** one failing module never blocks others (AI-07, FR-42). | P0 |
| NFR-04 | **Persistence:** refreshing the page never loses generated content or ticked items. | P0 |
| NFR-05 | **Accessibility:** all interactive elements keyboard-reachable; checkboxes have labels; WCAG AA contrast. | P1 |
| NFR-06 | **Trust:** every AI-generated number has assumptions shown; module 7 always shows the verification banner. | P0 |
| NFR-07 | **Cost control:** no automatic regeneration on page load for completed modules. | P0 |

---

## 14. Seed data

| ID | Requirement | Priority |
|---|---|---|
| SD-01 | On first load, if no launches with `is_example = true` exist, insert two fully generated example launches (all 10 modules, executive summary, tasks, criteria). | P1 |
| SD-02 | Example A (B2B): Product "LedgerFlow – cloud invoicing for SMBs", Industry "Fintech / SaaS", B2B, UK → Germany, Current presence "None", Target customer "SMB finance teams (10–200 employees)", Sales motion "Hybrid", Deal size "£3k–£15k ACV", Entry goal "Soft launch", Timeline "6 months", Team "3 people, moderate budget". | P1 |
| SD-03 | Example B (B2C): Product "Glow Lab – DTC skincare", Industry "Beauty / e-commerce", B2C, UK → France, Current presence "A few customers", Target customer "Women 25–40 buying skincare online", Sales motion "Self-serve", Price point "£25–£45 per order", Entry goal "Test demand", Timeline "3 months", Team "2 people, small budget". | P1 |
| SD-04 | Example content may be generated once by the AI and stored, or written by hand; it must match all schemas in Section 9. Mark examples with an "Example" badge on My Launches. | P1 |

---

## 15. Build order (milestones)

Complete each milestone and pass its checks before moving on.

### M1: Shell and form (UI only, no AI)
- Build all pages and routes: `/`, `/new`, `/launch/:id`.
- Build the form with validation (FR-10 to FR-13).
- Build the Results page layout with all 10 module designs using hard-coded placeholder data matching Section 9 schemas.
- **Check:** all pages navigate; every module renders correctly with placeholder data.

### M2: Database and backend setup
- Enable the backend. Create tables per Section 10.
- Form submission creates a `launches` record and navigates to its Results page.
- **Check:** a submitted form appears as a row in `launches`.

### M3: AI generation for modules 1–5
- Build `generate-module` (Section 11.1) and frontend orchestration for modules 1–5.
- Implement loading, error, retry and regenerate states (FR-40 to FR-43).
- **Check:** a new launch fills modules 1–5 with real, market-specific content; forcing an error shows Retry.

### M4: AI generation for modules 6–10
- Extend to modules 6–10, including inserting `tasks` and `criteria`.
- **Check:** all 10 modules generate; launch plan grid is populated from the `tasks` table.

### M5: Executive summary, ticking and readiness
- Build `generate-summary` and the summary card (FR-50 to FR-55).
- Tickable tasks and criteria saved to the database; readiness score (FR-60 to FR-62).
- My Launches cards show recommendation and readiness (FR-02).
- **Check:** refreshing the page keeps all content and ticks; readiness updates live.

### M6: Polish (P1)
- Seed data (Section 14), duplicate (6.6), presentation mode (6.7), responsive sidebar (FR-24), UX-04 and UX-06.
- **Check:** demo walkthrough in Section 17 runs without errors.

### M7: Stretch (P2, only if requested)
- Compare markets (6.8) or export brief (6.9).

---

## 16. Acceptance criteria (definition of done for MVP)

The MVP is done when all of the following are true:

1. [ ] A user can complete the form and generate a plan for any two different countries.
2. [ ] All 10 modules generate in parallel and render progressively with skeletons.
3. [ ] Output for a B2B launch includes a buying committee; output for a B2C launch labels that section "Consumer segments".
4. [ ] Positioning shows home and target side by side with key changes.
5. [ ] Every module can be regenerated independently; failed modules show Retry and do not affect others.
6. [ ] The executive summary appears after all modules finish, with a correctly coloured recommendation badge.
7. [ ] Launch tasks and go/no-go criteria can be ticked; ticks persist after refresh.
8. [ ] Readiness % is calculated per FR-60 and updates instantly.
9. [ ] My Launches lists saved launches with recommendation and readiness; opening one does not regenerate it.
10. [ ] Module 7 always shows the verification banner; module 1 always shows assumptions.
11. [ ] No API key appears anywhere in frontend code or browser network responses.

---

## 17. Demo walkthrough (used to test M6)

1. Open My Launches: two example launches are visible with badges and readiness.
2. Open the B2B example; scroll through all modules; tick two tasks; readiness increases.
3. Click **Duplicate for another market**, choose a new target market, generate.
4. Watch modules load progressively, then the executive summary appear.
5. Toggle presentation mode; exit with `Esc`.
6. Return to My Launches: the new launch is listed.

---

## 18. Success metrics

| Metric | Target |
|---|---|
| Time from submit to complete plan | < 90 seconds |
| Module generation success rate (first attempt) | > 90% |
| Module generation success rate (after auto-retry) | > 98% |
| Plans where user ticks at least one task | > 50% (indicates plans are used, not just read) |
| Qualitative: user rates output as "specific to the target market" | ≥ 4 / 5 |

---

## 19. Risks and assumptions

| Risk / assumption | Mitigation |
|---|---|
| AI output may contain outdated or incorrect market, legal or competitor information. | Assumptions shown on estimates; verification banner on legal module; positioned as a first draft (NG-2). |
| AI may return invalid JSON. | Fence stripping, validation, one automatic retry, per-module error state (AI-05 to AI-07). |
| 11 AI calls per plan may be slow or costly. | Parallel calls; no auto-regeneration on load (NFR-07); regenerate per module only. |
| Output may be generic rather than market-specific. | "Think in deltas" system prompt rule; explicit home vs target fields in schemas. |
| Assumption: single user, no authentication needed for MVP. | Add auth in a later version if shared use is required. |

---

## 20. Glossary

| Term | Meaning |
|---|---|
| GTM | Go-to-market: how a product is brought to customers. |
| PMM | Product Marketing Manager. |
| ICP | Ideal Customer Profile. |
| TAM / SAM / SOM | Total Addressable Market / Serviceable Addressable Market / Serviceable Obtainable Market. |
| ACV | Annual Contract Value. |
| Buying committee | The group of people involved in a B2B purchase decision. |
| Status quo alternative | What the customer does if they buy nothing (existing tools, spreadsheets, manual work). |
| Entry mode | How the company enters the market: direct, through partners, via a marketplace, hybrid, or a pilot. |
| Go/no-go criteria | Conditions that decide whether to keep investing after the first phase. |
| Readiness score | Percentage of launch tasks and go/no-go criteria completed. |
| Delta | The difference between the home market and target market; the core focus of all output. |
