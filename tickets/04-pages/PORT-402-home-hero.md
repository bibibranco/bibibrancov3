# PORT-402 — Home: hero

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-401, PORT-204, PORT-007 |
| Status | review |

## User story
As a **first-time visitor**, I want to understand in 5 seconds who Bibi is and what they do so that I decide to keep scrolling.

## Context
Legacy hero (`legacy/src/components/HeroSection/MainText/MainText.jsx`): "Hey there! I'm Bibi Branco and I …" with a word cycling every 2s through "create stuff / build interfaces / build furniture / love spreadsheets". Issues: the array is recreated every render and is the effect dependency (interval reset each render), no pause control, not announced sensibly to screen readers.

## Scope
- Build the hero per PORT-007 design using the PORT-008 copy.
- ~~`RotatingText`~~: dropped, PORT-007 has no rotating words. The only hero motion is the spinning star (PORT-204).
- Primary CTA(s) per design (e.g. "see work", "get in touch").

## Acceptance criteria
- [x] Matches PORT-007 at 375 / 768 / 1440.
- [x] Headline text is present in the prerendered HTML.
- [x] ~~Rotation~~ The star is static with reduced motion and hidden from screen readers (no rotating text to announce).
- [x] LCP element on the home page loads in < 2.5s on a mid-tier mobile profile (Lighthouse).

## Notes / links
- **Hero copy (final, 2026-10-18)** from [`copy.md`](../artifacts/copy.md#hero-home): "I started with design. Got a little carried away." The h1's small first line carries the name ("Bibi Branco, product designer").
- Built in `src/components/home/hero.tsx`:
  - "8+" comes from `yearsOfExperience`.
  - "at momoGood · previously Itaú" comes from `person.company` and the previous `experience` entry.
  - The star (`<Star spinning />`) shows from lg, as on the canvas.
- **Checked against the canvas:** the h1 is 329px tall at 1440 on both the build and `Main.dc.html`. Screenshots at 375, 768 and 1440 match the canvas layout.
- **LCP (Lighthouse 12.8 mobile, local `vite preview`, 3 runs):**
  - The LCP element is the h1.
  - Before: 2.9s, waiting on the Syne webfont.
  - After preloading the latin Syne and Atkinson files in `__root.tsx`: 2.1s, performance score 0.98.
- `e2e/home.spec.ts` checks:
  - With JS off: the headline, the name and both CTAs are present.
  - The star is `aria-hidden` and spins only without reduced motion.

## Out of scope
- Other home sections.
- **Star speed:** Bibi found 14s per turn too fast, so `--duration-star` is now 40s (`styles.css`, `design-system/tokens.json`, canvas). A hero game is being designed as options first (PORT-410, pending).
