# PORT-505 — Automated tests

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-105, PORT-301, E4 complete |
| Status | todo |

## User story
As the **developer**, I want a small safety net of tests so that adding a project or changing a component doesn't silently break the site.

## Context
Legacy has no tests. The site is mostly static, so tests should be few and high-value.

## Scope
- Vitest: content helpers (`getAdjacentProjects`, draft filtering, sort order), date formatting, `track()` helper.
- Playwright (against `npm run build && preview`): every route returns 200 and has an `h1`; legacy redirects; 404; mobile menu opens/closes with keyboard; `/work?tag=` filter; axe check per route (with PORT-503).
- Add `test` and `test:e2e` scripts and run both in CI (extend PORT-105).

## Acceptance criteria
- [ ] `npm test` and `npm run test:e2e` pass locally and in CI.
- [ ] Adding a new MDX project is automatically covered by the route smoke test (routes derived from content, not hardcoded).
- [ ] CI stays under 6 minutes.

## Out of scope
- Visual regression testing (P2 follow-up).
