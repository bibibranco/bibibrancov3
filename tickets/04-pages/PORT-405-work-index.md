# PORT-405 — Work index `/work`

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-301, PORT-403 |
| Status | todo |

## User story
As a **visitor**, I want to browse all projects and filter by discipline so that I find the kind of work I care about.

## Context
There is no index page today; projects are only reachable from home cards.

## Scope
- Route `src/routes/work/index.tsx` listing all non-draft projects with `ProjectCard` (reuse from PORT-403).
- Tag filter stored in the URL: `validateSearch` with zod for `?tag=` so filtered views are shareable and typed.
- Empty state for a tag with no projects.
- Page meta title/description.

## Acceptance criteria
- [ ] `/work?tag=crafting` shows only crafting projects and survives a reload.
- [ ] An unknown tag falls back to "all" without crashing.
- [ ] Filter controls are keyboard-accessible and expose the selected state (`aria-pressed` or radio group).
- [ ] Unfiltered page is prerendered.

## Out of scope
- Search.
