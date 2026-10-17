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
- Two groups, **Work** and **Craft** (`category` in the schema), each a section with an `id` (`#work`, `#craft`) for deep links. No filters (PORT-003, [`sitemap.md`](../artifacts/sitemap.md)).
- Page meta title/description.

## Acceptance criteria
- [ ] `/work#work` and `/work#craft` land on the right group.
- [ ] Each group is a labelled section (`<section aria-labelledby>`) with an `h2`.
- [ ] Unfiltered page is prerendered.

## Out of scope
- Search.
