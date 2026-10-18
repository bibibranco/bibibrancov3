# PORT-504 — Performance budget

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | E4 complete, PORT-304 |
| Status | todo |

## User story
As a **visitor on mobile data**, I want pages to load almost instantly so that I don't give up.

## Context
The legacy site loads Google Fonts, the Phosphor icon script from unpkg (render-blocking, unused alongside the React package) and full-size JPGs.

## Scope
- Lighthouse (mobile) on home, /work, one case study, /about.
- Budget: Performance, Accessibility, Best Practices, SEO ≥ 95; LCP < 2.5s; CLS < 0.1; INP < 200ms; JS shipped on home ≤ 150 KB gzipped.
- Fix regressions: code-split heavy components, trim motion usage, check font subsets.
- Optional: Lighthouse CI in GitHub Actions on PRs.

## Acceptance criteria
- [ ] All four audited pages meet the budget (report screenshots in the PR).
- [ ] No third-party requests other than GA in production.
- [ ] Budget written in `README.md` so future changes can be checked against it.

## Notes
- **Home LCP baseline (2026-10-18, PORT-402):** 2.9s on Lighthouse 12.8 mobile, against local `vite preview`.
  - The LCP element is the hero h1.
  - Almost all of it is render delay (about 2.4s) behind the 114 KB main bundle. Fonts are already preloaded.
  - Start here. When measuring, make sure the run is cold: a cached bundle once showed 2.1s.

## Out of scope
- Edge caching tuning beyond host defaults.
