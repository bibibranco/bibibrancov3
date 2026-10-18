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
- [ ] LCP element on the home page loads in < 2.5s on a mid-tier mobile profile (Lighthouse). _Not met: 2.9s, see Notes. Moved to PORT-504._

## Notes / links
- **Hero copy (final, 2026-10-18)** from [`copy.md`](../artifacts/copy.md#hero-home): "Design, and other incidents." with the subline "8+ years of product design, data, code, and questionable experiments." (replaces "I started with design. Got a little carried away.") The h1's small first line carries the name ("Bibi Branco, product designer").
- Built in `src/components/home/hero.tsx`:
  - "8+" comes from `yearsOfExperience`.
  - "at momoGood · previously Itaú" comes from `person.company` and the previous `experience` entry.
  - The star (`<Star spinning />`) shows from lg, as on the canvas.
- **Checked against the canvas:** the h1 is 329px tall at 1440 on both the build and `Main.dc.html`. Screenshots at 375, 768 and 1440 match the canvas layout.
- **LCP (Lighthouse 12.8 mobile, local `vite preview`, 3 runs):**
  - The LCP element is the h1. LCP is **2.9s** (score 0.95), so the < 2.5s criterion is not met.
  - Correction (2026-10-18): an earlier note said 2.1s after the font preloads. That run got the main JS bundle (114 KB) from the browser cache (318 bytes transferred), so it skipped most of the script work. Re-measured cold, the same commit gives 2.9s, with or without the preloads.
  - Where the time goes: TTFB about 0.45s, then about 2.4s of render delay. The fonts arrive early (preloaded), and preloading JetBrains Mono as well changes nothing, so the delay is main-thread JS before the h1's final paint. Fixing it (code-splitting, trimming the main bundle) belongs to PORT-504.
  - The latin Syne and Atkinson preloads in `__root.tsx` stay: they're cheap and fetch the hero fonts with the CSS.
- `e2e/home.spec.ts` checks:
  - With JS off: the headline, the name and both CTAs are present.
  - The star is `aria-hidden` and spins only without reduced motion.
- **Star speed:** Bibi found 14s per turn too fast, so `--duration-star` is now 40s (`styles.css`, `design-system/tokens.json`, canvas). A hero game is being designed as options first (PORT-410, pending).

## Out of scope
- Other home sections.
