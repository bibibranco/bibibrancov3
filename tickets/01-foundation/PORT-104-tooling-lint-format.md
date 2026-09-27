# PORT-104 — Linting, formatting & scripts

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-102 |
| Status | todo |

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
- [ ] `npm run lint`, `npm run typecheck` and `npm run format:check` pass on a clean checkout.
- [ ] Generated files (route tree, content-collections output) are ignored by lint/format.
- [ ] Tailwind classes are auto-sorted on save.

## Out of scope
- Git hooks (optional follow-up; CI enforces instead — PORT-105).
