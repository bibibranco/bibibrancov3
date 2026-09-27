# PORT-105 — CI on pull requests

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-104 |
| Status | review |

## User story
As the **developer**, I want every PR checked automatically so that broken builds never reach `main`.

## Context
There is no CI today; the repo is `bibibranco/bibibrancov3` on GitHub.

## Scope
- `.github/workflows/ci.yml` on `pull_request` and push to `main`: install (`pnpm install --frozen-lockfile`, cached), `typecheck`, `lint`, `format:check`, `build`.
- Later extended with tests (PORT-505).

## Acceptance criteria
- [ ] Workflow runs on a test PR and shows all steps green.
- [ ] A deliberate type error makes the workflow fail.
- [ ] Runtime under 3 minutes with caching.

## Notes / links
- Implementation notes:
  - Workflow at `.github/workflows/ci.yml`: checkout v7, pnpm/action-setup v6, setup-node v7.
  - Node version comes from `.nvmrc`; the pnpm store is cached.
  - Steps: typecheck, lint, format check, build.
  - Superseded runs on the same ref are cancelled.

## Out of scope
- Deploys (handled by the host's Git integration, PORT-106).
