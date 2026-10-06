# Project context

Written as a handover. If you are picking this up without having been in the
room, read this file and then `PRD.md`.

## The problem being solved

When a company expands an existing product into a new country, product marketing
and GTM teams rebuild the market entry plan from scratch every time. The work is
scattered across docs, spreadsheets and people's heads. The plans that come out
are usually generic, ignore what is actually *different* about the new market,
and miss the B2B essentials — buying committees, procurement, compliance,
partner routes to market.

The bet: most of that plan is reconstructable from a small number of inputs
(product, home market, target market, GTM context), and the part that matters is
not the plan template but the **delta** between the two markets.

## The one principle that governs everything

Every generated output must answer: *"We already know how to win in the home
market. What has to change to win in the target market?"*

Advice that would read the same for any country is treated as a defect. This is
why the UI has a two-track delta component as a primitive, and why the colour
rule is fixed and non-decorative: **home = neutral grey, target = accent**. If
something is indigo on screen it is the target market, a primary action, or a
filled progress segment. Nothing else.

## Three artifacts, one spec

```
PRD.md  ──┬──>  app/                 Next.js front end
          └──>  lovable-prototype/   Lovable front end
```

`PRD.md` is the single source of truth. It carries stable requirement IDs
(`FR-12`, `AI-03`, `NFR-02`) and both front ends trace back to them — several
test names in `app/` quote the requirement ID they cover, so you can go from a
failing test to the sentence in the spec that asked for it.

`DESIGN.md` is the design contract for `app/`. Where it conflicts with a default
you would otherwise reach for, it wins; where the PRD specifies behaviour, the
PRD wins.

### Why two front ends

They were built in parallel against the same PRD, on deliberately different
stacks — `app/` is Next.js 15 / App Router, `lovable-prototype/` is TanStack
Start via Lovable. This was a hackathon, and the point was to see which route
produced a better result faster, not to ship two products. Neither has been
retired. If you are choosing one to take forward, that decision is still open,
and the trade-off is roughly: `app/` has the stricter design execution and a
real test suite; the Lovable build iterates faster and has a live hosted
preview.

## Where it actually stands

The PRD defines its own milestones (§15). Measured against those:

| Milestone | Status |
|---|---|
| **M1** Shell, form and all 10 module designs on placeholder data | **Done**, twice |
| **M2** Database and backend setup | Not started |
| **M3** AI generation, modules 1–5 | Not started |
| **M4** AI generation, modules 6–10 | Not started |
| **M5** Executive summary, ticking, readiness score | UI only, no persistence |
| **M6** Polish, seed data, presentation mode | Partial |
| **M7** Stretch (compare markets, export) | Not started |

So: the product is finished as a design and unstarted as a system. That is a
normal and reasonable place for a hackathon to stop, but it does mean a demo of
either front end is showing rehearsed content, not generated content.

### What "placeholder data" means precisely

`app/src/lib/placeholder-data.ts` is hand-written and conforms to the PRD's
output schemas (§9) and seed data (§14) — two worked examples, including
LedgerFlow, a UK → Germany B2B invoicing case. It is not lorem ipsum, and it is
not model output either. It was written so the design could be built and
reviewed against realistic content before any model existed.

Consequences worth knowing:

- No part of this repository calls an AI model. There is no API key to leak,
  and no cost to running it.
- The Lovable project has **no database enabled**. Confirmed, not assumed.
- Launches you create in `app/` persist to `localStorage` only. Clear site data
  and they are gone. There is no server-side store anywhere.
- The readiness score and tickable tasks compute correctly in the UI but reset,
  because §10's `tasks` and `criteria` tables do not exist yet.

## The backend that still needs building

Fully specified, zero implemented. The spec is detailed enough to build from
directly:

- **§10 Data model** — three tables: `launches` (form inputs plus `modules` and
  `module_status` as jsonb), `tasks` and `criteria` (both cascade-deleted from
  `launches`). §10.4 fixes the ten module keys; use those exact strings in the
  database, function parameters and UI state.
- **§8 AI prompts** and **§9 output schemas** — the schemas are exact. Do not
  rename, add or remove fields.
- **§11 Backend functions** — `generate-module` (one module at a time, called
  for all ten in parallel from the Results page), `generate-summary`
  (precondition: all ten modules done), and `compare-markets` as a P2 stretch.
  §11.4 has the orchestration and the restart rule for modules stuck in
  `loading` for over 90 seconds.
- **NFR-01** — all model calls go through backend functions. No keys in
  frontend code, ever.

The original intent (PRD header) was Lovable Cloud / Supabase for this layer.
Nothing forces that choice now, but the PRD's column types are written in
Postgres terms.

## Design decisions you should not undo by accident

Three, from `DESIGN.md`:

1. **The delta is a primitive**, not a layout that happens to show two things.
   It is one reusable two-track component with one fixed colour rule.
2. **The verdict outranks everything.** The executive summary card gets the
   page's only serif, the only heavy shadow, and a 4px top border in its status
   colour. Every other card is deliberately quieter to pay for it. If you make
   another card louder, you are spending the verdict's budget.
3. **The wait is the first impression.** The left rail is a live instrument —
   per-module state dots and a running "N of 10 ready" count — rather than a nav
   list with spinners in it. This matters more once generation is real and the
   wait actually exists.

Theming is dual on purpose (`prefers-color-scheme` *and* `[data-theme]`) —
cheap to do now, awkward to retrofit. Colours are always tokens, never
hardcoded in a component.

## What lives outside this repository

- The **live Lovable project**, which is the editable source for
  `lovable-prototype/`. That folder is a snapshot; changes made in Lovable after
  the last commit here will not show up until someone re-exports. Edit in
  Lovable, then re-snapshot.
- Nothing else. The PRD and design doc previously lived in a Downloads folder
  and inside an unrelated monorepo; both are now committed here, which is the
  main reason this repository exists in its current form.

## If you are picking this up next

The highest-value next step is **M2** — stand up the three tables and make form
submission write a real `launches` row. Everything after it is blocked on it,
and it is the smallest piece of work that converts this from a design into a
system. M3 then becomes tractable one module at a time, and modules 1–5 are
specified well enough to build without further product input.

The thing to be careful about is the delta principle. It is easy to wire up a
model, get fluent paragraphs back, and ship something that reads well and says
nothing market-specific. §7 of the PRD (AI behaviour) exists to prevent exactly
that, and it is worth reading before writing the first prompt rather than after.
