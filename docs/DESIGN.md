# Market Entry Copilot — Design Direction v1

Source: `~/Downloads/market-entry-copilot-PRD.md` (PRD v1.0).
This file is the design contract. Where it conflicts with a default you'd
otherwise reach for, this file wins. Where the PRD specifies behaviour
(requirement IDs), the PRD wins.

## The three moves

1. **The delta is a primitive.** Home → target is the shape of the whole
   product. It gets a reusable two-track component and one colour rule that
   never varies: **home = neutral grey (`--home`), target = accent
   (`--accent`)**. Accent is never decorative. If something is indigo it is
   the target market, a primary action, or a filled progress segment.
2. **The verdict outranks everything.** The executive summary gets the page's
   only serif, the only heavy shadow, and a 4px top border in its status
   colour. Every other card is quieter to pay for it.
3. **The wait is the first impression.** The left rail is a live instrument —
   per-module state dots, a running "N of 10 ready" count — not a nav list
   with spinners in it.

## Tokens

Define on `:root`, redefine under BOTH `@media (prefers-color-scheme: dark)`
and `[data-theme="dark"]`. Dual theme is intentional (cheap now, awkward to
retrofit). Never hardcode a colour in a component.

### Light
```
--paper: #F1F4F8      /* page ground — cool paper, not white */
--surface: #FFFFFF    /* cards, rails, tiles */
--sunk: #E7ECF3       /* skeletons, table headers, inset wells */
--ink: #0D1626
--ink-muted: #56637E
--ink-faint: #8593AD
--rule: #DCE3ED
--rule-strong: #C1CBDB

--home: #56637E       --home-soft: #E7EBF2
--accent: #1B3A8C     --accent-ink: #142C6B   --accent-soft: #E3E9F8

--go: #0B6E4F         --go-soft: #DEF1E8
--cond: #915600       --cond-soft: #FAEDD8
--stop: #A81F16       --stop-soft: #FAE4E2
--hold: #56637E       --hold-soft: #E7EBF2

--shadow-sit: 0 1px 2px rgb(13 22 38 / .05), 0 1px 3px rgb(13 22 38 / .04);
--shadow-lift: 0 8px 24px -8px rgb(13 22 38 / .16);
```

### Dark
```
--paper: #0A1019      --surface: #111926     --sunk: #0D1420
--ink: #E9EEF7        --ink-muted: #9AA8C0   --ink-faint: #6B7B96
--rule: #212D41       --rule-strong: #33415A
--home: #9AA8C0       --home-soft: #1C2434
--accent: #86A2F2     --accent-ink: #AFC3F8  --accent-soft: #19274A
--go: #4FBF8B         --go-soft: #0F2E1F
--cond: #DFA342       --cond-soft: #31240F
--stop: #F0897C       --stop-soft: #391814
--hold: #9AA8C0       --hold-soft: #1C2434
--shadow-sit: 0 1px 2px rgb(0 0 0 / .5);
--shadow-lift: 0 8px 24px -8px rgb(0 0 0 / .6);
```

Status colours are deliberately darkened from usual web values to clear
WCAG AA 4.5:1 on white. Do not "brighten" them.

## Type

Three faces, each with one job. Load via `next/font/google`.

- **Archivo** (400/500/600/700) — everything structural. Squarish and sturdy,
  holds up on a projector.
- **Instrument Serif** (400) — the verdict headline ONLY. Exactly one use per
  page is what makes it register. Never use it elsewhere.
- **IBM Plex Mono** (400/500/600) — all numbers, labels, eyebrows, codes,
  owner roles. Always `font-variant-numeric: tabular-nums` on figures.

Scale: verdict 37/1.16 serif · page title 31/1.1/-.02em · module title 16/1.3
600 · body 16/1.6 (max 65ch) · figure 27 mono 600 · label 11 mono 500
.1em uppercase.

Body is 16px, above the PRD's 15px floor (UX-03) — this is read on projectors.

## Radius, border, shadow

Radius 3–4px only. This is a document-like product, not a consumer app; avoid
large pill-rounded cards. Border `1px solid var(--rule)`. Use `--shadow-sit`
for ordinary cards, `--shadow-lift` for the verdict alone. Not everything is a
card — spend border/fill/shadow by role.

## Components

### Verdict (executive summary) — FR-52, FR-53
4px top border in status colour, `--shadow-lift`, serif headline (max 22em),
badge + two columns (top 3 priorities / top 3 risks) as numbered lists with
mono numerals.
- `Go` → `--go` · `Go with conditions` → `--cond` · `Not yet` → `--hold`
- **"Not yet" is grey, not red.** It's a timing call, not a failure; red
  pushes teams toward optimistic verdicts.
- Badge always carries its word — colour never means alone (UX-05).

### Delta pair — FR-33, PRD §1.4
Three columns: home track / gutter marker / target track.
- Home track: **dashed** border, `--ink-muted` text (context you already own).
- Target track: solid border tinted `--accent`, faint accent ring.
- Gutter: 34px circular `→` marker in `--accent-soft`.
- Below: key-change tags as accent pills.
- Under 760px: stacks to one column, marker rotates 90°.
Reuse anywhere the plan contrasts markets (positioning, buying process, pricing).

### Instruments — FR-30, FR-60, FR-61
Scores and progress share ONE language: discrete segments, never smooth bars.
- **Attractiveness /10**: big mono numeral + 10 ticks (13×26px), filled accent.
- **Readiness**: big mono % + `N of M done` + one segment per item
  (11×22px). Go/no-go criteria segments use `--go`; task segments use
  `--accent`; unfilled use `--sunk`. Legend names both.
- **TAM/SAM/SOM**: three tiles, mono figures, note under each. The assumptions
  block ships inside this component — it cannot render without them (NFR-06).

### Module card — FR-40/41/42/43
Header: mono index, title, Regenerate button (right). States:
- **Loading**: skeleton shaped like the real content (shimmer 1.5s linear).
- **Error**: `!` mark in `--stop-soft`, "This section couldn't be generated.",
  sub-line "The other nine sections are unaffected.", Retry button.
- **Regenerate**: cross-fade to skeleton 150ms; card must NOT collapse height.

### Left rail — FR-22, FR-24
Per module: mono index, state dot, name. Dots: `done` → `--go`, `loading` →
`--accent` pulsing 1.3s, `error` → `--stop`, `waiting` → `--rule-strong`.
Footer: "N of 10 ready" + failure count. Under 900px becomes a horizontal
scroller above the content.

### Severity rows — FR-36
4px left stripe (High `--stop` / Medium `--cond` / Low `--rule-strong`) +
title + detail + area pill + severity pill + owner role in mono on the right.
Sort High → Low. The verification banner lives INSIDE the module component so
a layout change cannot drop it (NFR-06).

### Launch plan task — FR-38
Checkbox + title + description + owner role (mono, uppercase, faint). Done
state: title struck through, `--ink-faint`. Keep legible when half are ticked.

## Motion — NFR-02

| Moment | Treatment |
|---|---|
| Module lands | fade + 8px rise, 200ms ease-out, 60ms stagger in rail order |
| Verdict appears | fade + 12px rise, 320ms, after last module settles |
| Tick a task | checkbox fill 120ms, readiness segment fill 180ms |
| Regenerate | cross-fade to skeleton 150ms, height locked |
| Skeleton | shimmer 1.5s linear loop |

Use Framer Motion. All motion behind `prefers-reduced-motion` → instant state
change, never removed feedback.

## Presentation mode — FR-80

A density change, not a zoom. Base type 19px, spacing scale ×1.25, rail and
Regenerate hidden, delta tracks forced side-by-side, mono labels up to 13px.
Checkboxes keep working. `Esc` exits.

## Non-negotiables

- Colour never carries meaning alone — every severity/influence/recommendation
  pill carries its word.
- Keyboard reachable: rail links, regenerate, every checkbox. Focus ring 2px
  accent outline, 2px offset, visible on both themes.
- Numbers always ship with assumptions.
- Module 7 always shows the verification banner.
- Works at 375px: delta stacks, tiles single column, rail scrolls horizontally.
- No horizontal page scroll at any width; wide tables get their own
  `overflow-x: auto` container.
