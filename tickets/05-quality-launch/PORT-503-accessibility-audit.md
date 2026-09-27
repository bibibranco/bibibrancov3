# PORT-503 — Accessibility audit (WCAG 2.2 AA)

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | E4 complete |
| Status | todo |

## User story
As a **visitor using a keyboard or screen reader**, I want the whole site to be usable so that I'm not excluded.

## Context
Legacy issues this rebuild should not repeat: images without alt, clickable divs, multiple `h1`s, content in CSS backgrounds, no focus styles, no reduced motion.

## Scope
- Automated: axe (browser extension + Playwright `@axe-core/playwright` in PORT-505) on every route.
- Manual: keyboard-only walkthrough, VoiceOver (macOS + iOS), 200% zoom, 320px width, reduced motion, Windows high contrast / forced colours.
- Fix everything found or file follow-up tickets with severity.

## Acceptance criteria
- [ ] Zero axe violations (serious/critical) on all routes.
- [ ] Full keyboard walkthrough of every page with visible focus throughout.
- [ ] VoiceOver can reach and understand nav, hero, cards, filters, case study content and contact.
- [ ] No horizontal scroll at 320px width or at 200% zoom.

## Out of scope
- AAA conformance.
