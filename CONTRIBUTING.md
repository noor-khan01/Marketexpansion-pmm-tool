# Contributing

Thanks for taking an interest. This project is small and early, so the process
is deliberately light.

## Ways to help

- **Open an issue** if something is broken, unclear, or missing.
- **Open a pull request** if you already have a fix or an addition.
- **Ask a question** in an issue — if you were confused, someone else was too,
  and the answer usually belongs in the README.

## Making a change

1. Fork the repository and create a branch off `main`.
2. Make your change. Keep it focused — one idea per pull request is much easier
   to review than five.
3. Write a clear description: what changed, and why.
4. Open the pull request against `main`.

## Commit messages

Plain and descriptive is enough:

```
Add market scoring weights to the config
Fix broken link in README
```

No strict format required.

## Code style

For the Next.js front end in `app/`: TypeScript strict, no `any`, functional
components, named exports, Tailwind utilities over custom CSS, and colours from
design tokens rather than hardcoded values. Run `pnpm lint` (Biome) and
`pnpm typecheck` before opening a pull request, and `pnpm test` if you touched
anything with a test beside it.

`docs/DESIGN.md` is the design contract — if a change alters spacing, colour or
hierarchy, check it against that file first.

`lovable-prototype/` is a snapshot of a Lovable project, not a place to make
edits. Change it in Lovable and re-export.

Anywhere else, match whatever is already in the file you are editing.

## Reporting something sensitive

Please do not open a public issue for a security problem. See
[SECURITY.md](SECURITY.md).

## Code of conduct

Be decent to each other. Assume good faith, keep criticism about the work
rather than the person, and accept that maintainers may say no to a change
without it being a judgement on you.
