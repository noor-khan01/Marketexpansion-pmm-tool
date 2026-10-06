# Market Expansion Tool — Market Entry Copilot

> Built for the PMM Hackathon.

Market Entry Copilot turns a few inputs about a product and two countries into a
complete, market-specific go-to-market entry plan, with an executive
recommendation, in under two minutes.

**Core principle: think in deltas.** Every output has to answer one question —
*"We already know how to win in the home market. What has to change to win in
the target market?"* Generic advice that would apply to any country is a
failure, not a partial success.

---

## Status — read this before you dig in

The spec is finished. The front end exists twice. The backend does not exist at
all yet.

| Layer | State |
|---|---|
| Product spec (`docs/PRD.md`) | **Complete.** v1.0, 20 sections, marked ready to build. |
| Design contract (`docs/DESIGN.md`) | **Complete.** v1, the binding design direction. |
| Next.js front end (`app/`) | **Built.** All 10 plan modules render. Typecheck clean, 51 tests passing. |
| Lovable front end (`lovable-prototype/`) | **Built.** A parallel take on the same PRD. |
| AI generation | **Not built.** Prompts and output schemas are specified in the PRD; nothing calls a model. |
| Database | **Not built.** The data model is specified in the PRD; no database is provisioned. |
| Backend functions | **Not built.** Specified in the PRD; no endpoints exist. |

Both front ends render against **hand-written placeholder data** that matches the
PRD's output schemas and seed data. Nothing in this repository makes a network
call to a model, and the Lovable project has no database enabled. So the app
looks finished and is genuinely useful for reviewing the design and the
information architecture — but it is not yet generating anything.

---

## What is in this repository

```
docs/PRD.md              The spec. Single source of truth.
docs/DESIGN.md           The design contract — tokens, layout, component rules.
docs/CONTEXT.md          How the pieces relate, decisions taken, what to pick up next.
app/                     Next.js 15 front end (the design foundation).
lovable-prototype/       Verbatim snapshot of the Lovable build.
```

The PRD is the document to read first. It uses stable requirement IDs (`FR-12`,
`AI-03`, `NFR-02`), and both front ends and their tests refer back to those IDs,
so you can trace any piece of UI to the requirement that asked for it.

---

## The ten modules

The plan is generated as ten modules, each framed as a home-vs-target delta:

1. Market opportunity
2. Customer & buying behaviour
3. Competition
4. Positioning
5. Pricing
6. Routes to market
7. Legal & ops
8. Localisation
9. Launch plan
10. KPIs, go/no-go & risks

These are then rolled up into an executive summary carrying a **Go / Go with
conditions / Not yet** recommendation and a readiness score.

---

## Running the Next.js front end

Extracted from a pnpm monorepo, but it stands alone — no workspace packages,
no shared config.

```bash
cd app
pnpm install
pnpm dev
```

Then open http://localhost:3012.

Other scripts:

```bash
pnpm test       # vitest, 51 tests
pnpm typecheck  # tsc --noEmit
pnpm lint       # biome
pnpm build      # next build
```

Stack: Next.js 15 (App Router), React 19, Tailwind v4, Framer Motion,
TypeScript strict, Vitest + React Testing Library, Biome.

## Running the Lovable front end

`lovable-prototype/` is a snapshot, committed so the code is reviewable here and
survives independently of the Lovable account. The live project is the editable
source of truth for that build:

- Editor: https://lovable.dev/projects/b6287e34-e0e4-4154-a113-4817b633131e (needs access to the Lovable workspace)
- Preview: https://id-preview--b6287e34-e0e4-4154-a113-4817b633131e.lovable.app

Stack: TanStack Start, React, Tailwind, shadcn/ui. It is a different stack from
`app/` on purpose — see `docs/CONTEXT.md`.

Because it is a snapshot, edits made in Lovable after the last commit here will
not appear until someone re-exports it. Edit in Lovable, then re-snapshot; do
not treat this folder as the place to make changes.

---

## Configuration

Copy `.env.example` to `.env.local` and fill in the values. Neither front end
currently needs any of them — they become relevant once the backend and AI
calls land.

```bash
cp .env.example .env.local
```

Never commit `.env.local`. It is gitignored for a reason.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), and [SECURITY.md](SECURITY.md) for
anything sensitive.

## License

[MIT](LICENSE) © 2026 Sheila Esteban
