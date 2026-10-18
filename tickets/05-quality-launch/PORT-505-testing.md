# PORT-505 — Automated tests

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-105, PORT-301, E4 complete |
| Status | review |

## User story
As the **developer**, I want a small safety net of tests so that adding a project or changing a component doesn't silently break the site.

## Context
Legacy has no tests. The site is mostly static, so tests should be few and high-value.

## Scope
- Vitest: content helpers (`getAdjacentProjects`, draft filtering, sort order), date formatting, `track()` helper.
- Playwright (against `pnpm build && pnpm preview`): every route returns 200 and has an `h1`; legacy redirects; 404; mobile menu opens/closes with keyboard; `/work?tag=` filter; axe check per route (with PORT-503).
- Add `test` and `test:e2e` scripts and run both in CI (extend PORT-105).

## Acceptance criteria
- [x] `pnpm test` and `pnpm test:e2e` pass locally and in CI. _(24 unit tests; 36 browser tests across desktop and mobile Chromium.)_
- [x] Adding a new MDX project is automatically covered by the route smoke test (routes derived from content, not hardcoded). _(Routes come from the built `sitemap.xml`; draft slugs from the MDX frontmatter.)_
- [ ] CI stays under 6 minutes.

## Out of scope
- Visual regression testing (P2 follow-up).

## Notes (2026-10-18)
- **Unit (Vitest, `vitest.config.ts`, `src/**/*.test.ts`, `scripts/**/*.test.ts`):**
  - Content helpers: group and order, featured order, prev/next, featured fragments. They run against fixture projects through `vi.mock('content-collections')`, so content edits don't break them.
  - Date formatting and `<time>` values.
  - `track()`, `trackPageView()` and `initAnalytics()` (off by default, `?ga_debug=1`, debug persists for the tab, one gtag script, one page_view per path), in jsdom.
  - A `cn` regression test for the dropped font sizes (PORT-405). I checked it fails on the old `cn`.
  - `vercel.json` redirects: the mapping, 301, and targets that exist. `vite preview` doesn't apply host redirects, so they're tested as config.
- **Browser (Playwright, `e2e/`, against `vite preview` of the build):**
  - Every public route returns 200, has one h1, no horizontal scroll and no axe violations for the WCAG 2.0–2.2 A/AA tags. All pages pass today, and I checked axe does report an injected `image-alt` failure.
  - `/nope`, an unknown slug and every draft return 404 with the noindex page.
  - Mobile menu by keyboard (Enter opens, Esc closes, focus returns), menu navigation, "Say hi" landing on the CTA, and prev/next.
  - Runs on desktop Chrome and a Pixel 7 viewport, both Chromium.
- **Dropped:** the `/work?tag=` filter test, since PORT-003 removed filters.
- **CI:** `pnpm test` before the build, then a Chromium install and `pnpm test:e2e` after it. Traces are uploaded on failure.
- **Locally:** `pnpm build && pnpm test:e2e`. As with builds, stop `pnpm dev` first, because it rewrites the shared content output with drafts.

