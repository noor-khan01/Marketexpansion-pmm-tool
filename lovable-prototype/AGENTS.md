<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Market Entry Copilot — architecture rules
- PRD Section 9 schemas live only in `src/lib/gtm-types.ts`; all module UI and future backend code import those types so field names cannot drift.
- Each of the 10 plan modules has one presentational component in `src/components/module-views.tsx`, keyed by the exact PRD module key; module state/status handling stays in `src/components/ModuleCard.tsx` so loading/error/regenerate behave identically everywhere.
- `src/lib/launch-store.ts` is an M1-only in-memory stand-in for the `launches` table; it is deleted when Lovable Cloud is enabled in M2.
