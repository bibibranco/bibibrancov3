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

## Out of scope
- Edge caching tuning beyond host defaults.
