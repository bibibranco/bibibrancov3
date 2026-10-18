# PORT-503 — Accessibility audit (WCAG 2.2 AA)

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | E4 complete |
| Status | review |

## User story
As a **visitor using a keyboard or screen reader**, I want the whole site to be usable so that I'm not excluded.

## Context
Legacy issues this rebuild should not repeat: images without alt, clickable divs, multiple `h1`s, content in CSS backgrounds, no focus styles, no reduced motion.

## Scope
- Automated: axe (browser extension + Playwright `@axe-core/playwright` in PORT-505) on every route.
- Manual: keyboard-only walkthrough, VoiceOver (macOS + iOS), 200% zoom, 320px width, reduced motion, Windows high contrast / forced colours.
- Fix everything found or file follow-up tickets with severity.

## Acceptance criteria
- [x] Zero axe violations (serious/critical) on all routes.
- [x] Full keyboard walkthrough of every page with visible focus throughout.
- [ ] VoiceOver can reach and understand nav, hero, cards, filters, case study content and contact. *(Bibi, checklist below)*
- [x] No horizontal scroll at 320px width or at 200% zoom.

## Audit (2026-10-18)
Run against the production build (`vite preview`) on every sitemap route plus `/404`, at 1440 and 390 wide, and for overflow at 320 and 640 (1280 at 200% zoom).

| Check | Result |
|---|---|
| axe, WCAG 2.2 A/AA | Clean on every route at both device sizes (`e2e/routes.spec.ts`), and with forced colours (`e2e/a11y.spec.ts`). |
| Keyboard | 9–27 stops per page. Every stop draws the star ring, none sits inside `aria-hidden`, and there are no traps. The skip link comes first and focuses `main`. |
| Focus order | Matches the layout. The hero copy and CTAs come before the star (it sits in the right column). The desk goes row by row from xl and down each masonry column below it, the same as the DOM and the reading order. |
| Focus ring contrast (1.4.11) | ≥ 3:1 against the surface behind every stop. |
| Accessible names | Desk links read their whole object with spaces ("WOOD TODO TOOLS TODO … shop tag · Woodworking"), and the visible text is part of the name (2.5.3). |
| 320px / 200% zoom | No horizontal scroll anywhere, including the hero tray with six tools dropped. |
| Reduced motion | Already covered by `e2e/motion.spec.ts` and `e2e/home.spec.ts`. |
| Dragging (2.5.7) | The thrown tools are decoration (`aria-hidden`), and clicking or tapping the star is the single-pointer action. Nothing needs a drag. |

### Findings
| # | Issue | WCAG | Severity | Fix |
|---|---|---|---|---|
| 1 | With forced colours the desk objects lose their paper, sticky and terminal surfaces, so their text runs together on the desk. | 1.4.11 | moderate | Fixed: `desk-object` gets a `CanvasText` border under `forced-colors: active` (`src/styles.css`). |
| 2 | The case-study back link ("← Work") was 20px tall. It passed through the spacing exception, but only just. | 2.5.8 | minor | Fixed: `py-0.5` brings it to 24px. |

No follow-up tickets. The logo's solid bar under forced colours is the wordmark itself (it covers "branco" by design), not a bug.

New tests in `e2e/a11y.spec.ts`: a Tab walk on every route (ring, size, not hidden), 320px overflow, axe with forced colours (its colour-contrast rule is off there, since the system palette decides contrast), the skip link, and the desk-object edge.

### VoiceOver checklist (Bibi, on the preview)
macOS Safari (⌘F5) and iOS Safari. Use the rotor (VO-U / two-finger twist) for landmarks, headings and links.
- [ ] Landmarks: banner, Main nav, main, contentinfo. "Skip to content" is announced first.
- [ ] Home: the h1 reads as one heading. The star button says "Drop a tool from the star", and the status line announces the count after a drop. "tidy up" is reachable.
- [ ] Desk: each object is one link and reads its contents and project name.
- [ ] Mobile menu (iOS): it opens as a dialog, focus moves in, and closing returns to "Menu".
- [ ] `/work`: the group links (Work · 6, Craft · 3) jump to their sections, and cards read their title and description.
- [ ] Case study: the back link, the Role/Timeline list, the image alt, the table caption and headers, and "More projects".
- [ ] Contact: the email link, "Copy email" (announces it was copied), and the external links say "opens in new tab".

## Out of scope
- AAA conformance.
