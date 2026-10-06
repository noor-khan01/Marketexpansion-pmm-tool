# About this folder

This is a **verbatim snapshot** of the Lovable project "Market Navigator",
exported so the code is reviewable in this repository and survives independently
of the Lovable account.

- Live editor: https://lovable.dev/projects/b6287e34-e0e4-4154-a113-4817b633131e
- Live preview: https://id-preview--b6287e34-e0e4-4154-a113-4817b633131e.lovable.app

**The Lovable project is the source of truth, not this folder.** Edits made in
Lovable after the snapshot date will not appear here until someone re-exports.
Do not make changes here expecting them to flow back — they will not.

Stack: TanStack Start, React, Tailwind, shadcn/ui.

## What was left out

- `bun.lock` — lockfile, omitted to keep the snapshot readable.
- `public/favicon.ico` — binary.

Everything else in the project is present, unmodified: no reformatting, no lint
fixes. `src/components/ui/` is the standard shadcn/ui primitive set; the
project-specific work is in `src/routes/`, `src/components/*.tsx` and `src/lib/`.

## State at snapshot

Front end only. No database is enabled on this Lovable project, and nothing
calls an AI model — it renders against `src/lib/placeholder-data.ts`, which
matches PRD §9 schemas. See `../docs/CONTEXT.md`.
