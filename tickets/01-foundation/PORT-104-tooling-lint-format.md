# PORT-104 — Linting, formatting & scripts

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-102 |
| Status | review |

## User story
As the **developer**, I want automatic linting and formatting so that the codebase stays consistent without thinking about it.

## Context
Legacy uses ESLint 8 legacy config (`.eslintrc.cjs`) and disables `react/prop-types` per file with comments.

## Scope
- ESLint flat config: `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, TanStack Router ESLint plugin.
- Prettier + `prettier-plugin-tailwindcss` (class sorting).
- Scripts: `dev`, `build`, `preview`, `typecheck` (`tsc --noEmit`), `lint`, `format`, `format:check`.
- Editor settings (`.vscode/settings.json` format on save, recommended extensions).

## Acceptance criteria
- [x] `pnpm lint`, `pnpm typecheck` and `pnpm format:check` pass on a clean checkout.
- [x] Generated files (route tree, content-collections output) are ignored by lint/format. _(Route tree done; add `.content-collections` in PORT-301.)_
- [ ] Tailwind classes are auto-sorted on save. _(Moved to PORT-103: `prettier-plugin-tailwindcss` needs Tailwind installed.)_

## Notes / links
- Implementation notes:
  - ESLint 10 flat config: `@eslint/js`, `typescript-eslint`, react-hooks, react-refresh, the TanStack Router plugin, and `eslint-config-prettier` last.
  - `lint` runs with `--max-warnings 0`.
  - The react-refresh rule is off for `src/routes/**`, since route files export `Route` next to their components.
  - Prettier style matches the scaffold: no semicolons, single quotes, trailing commas, width 100. `legacy/` and `tickets/` are ignored.

## Out of scope
- Git hooks (optional follow-up; CI enforces instead — PORT-105).
