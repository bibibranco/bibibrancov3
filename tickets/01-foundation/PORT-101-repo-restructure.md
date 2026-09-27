# PORT-101 — Repo restructure

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | — |
| Status | review (blocked on the Vercel root-directory change before merge) |

## User story
As the **developer**, I want the new app at the repo root with the old one parked in `legacy/` so that I can build fresh while still referencing the old code and content.

## Context
Current root: `bibibranco/` (the actual app), plus stray `package-lock.json` (empty packages), `node_modules/` and an empty `src/utils/` at the root that belong to nothing.

## Scope
- `git mv bibibranco legacy`
- Delete root `package-lock.json`, root `node_modules/`, root `src/`.
- Root `.gitignore` covering `node_modules`, `dist`, `.output`, `.vinxi`, `.tanstack`, `.env*`, `.DS_Store`.
- Short note at top of `legacy/README.md`: "Reference only — deleted in PORT-506."

## Acceptance criteria
- [x] `legacy/` contains the old app and still runs with `npm i && npm run dev` inside it.
- [x] Repo root has no leftover files from the old layout.
- [x] Done in its own PR/commit so history is easy to follow.

## Out of scope
- Scaffolding the new app (PORT-102).

## Notes / links
- **Production risk:** the existing Vercel project most likely has its root directory set to `bibibranco/`. Before merging, change it to `legacy/` in the Vercel dashboard (or pause its Git deploys), or the next push to `main` breaks the live site.
