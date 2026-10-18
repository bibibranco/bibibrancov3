# PORT-504 — Performance budget

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | E4 complete, PORT-304 |
| Status | review |

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
- [x] All four audited pages meet the budget (results table below and in the PR).
- [x] No third-party requests other than GA in production.
- [x] Budget written in `README.md` so future changes can be checked against it.

## Notes
- **Home LCP baseline (2026-10-18, PORT-402):** 2.9s on Lighthouse 12.8 mobile, against local `vite preview`.
  - The LCP element is the hero h1.
  - Almost all of it is render delay (about 2.4s) behind the 114 KB main bundle. Fonts are already preloaded.
  - Start here. When measuring, make sure the run is cold: a cached bundle once showed 2.1s.

## Results (2026-10-18)
Lighthouse 12.8.2, default mobile settings, cold, median of 3. The server compresses responses with brotli, as Vercel does.

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.93 s | 0 | 0 ms |
| `/work` | 100 | 100 | 100 | 100 | 0.87 s | 0.015 | 0 ms |
| `/work/woodworking` | 98 | 100 | 100 | 100 | 2.48 s | 0 | 0 ms |
| `/about` | 100 | 100 | 100 | 100 | 0.94 s | 0 | 0 ms |

Every case study is at 98, with LCP from 2.29 s to 2.49 s (one run each). **Home JS is 133.4 KB gzipped**, down from 161 KB.

### What the baseline got wrong
The 2.9 s home LCP in the PORT-402 note was measured on `vite preview`, which doesn't compress. Uncompressed, the JS dominates Lighthouse's simulated LCP: the run counts every request made before the observed LCP.
- Served compressed, the same `main` build scored 100 on home with LCP at 1.0 s.
- With devtools throttling, LCP equals FCP: the h1 really does paint first.
- Blocking JS dropped the simulated LCP to 2.25 s, which confirmed the cause.

Before (`main`, compressed): home 100, /work 100, case study 97 with LCP 2.68 s, /about 100.

### Changes
- **Case study bodies leave the shared bundle.** A second collection, `projectBodies`, holds `{ slug, mdx, images }`, and only the case study route imports it (`src/lib/content-body.ts`). Home and /work no longer ship nine compiled MDX bodies and their image maps. `processProjectImages` runs once per folder, because both collections ask for it.
- **`cn` uses compiled tables.** Before, `cn/config` built the whole Tailwind table at runtime (16 KB gz).
  - The `cn` Vite plugin writes `src/lib/cn-tables.ts`, fitted to the classes in `src/` and `content/`, and reads the `@theme` scales from `styles.css`. The engine plus the tables come to about 9 KB less.
  - That also retires the hand-kept theme list in `utils.ts`.
  - A differential check of 20,000 random combinations of the project's classes matched the old `cn` exactly.
  - CI fails if the committed tables are out of date.
- **The mobile menu dialog loads on demand.** The Menu button is plain HTML. The Base UI dialog (`menu-dialog.tsx`) loads when the page goes idle (a timeout on Safari), or when the button is touched or focused. Focus still returns to Menu on close, which the existing e2e test checks.
- **Guards.**
  - `pnpm budget` (`scripts/bundle-budget.ts`) runs in CI after the build and fails above 150 KB.
  - `e2e/third-party.spec.ts` fails if any public page requests another origin. GA only loads on the live domain.
  - The budget is written in the root `README.md`.

### Notes
- **Fonts:** only the Syne and Atkinson latin subsets are preloaded. The other subsets (latin-ext, Caveat's Cyrillic) load only for characters that need them, through `unicode-range`. Nothing to trim there.
- **Case study LCP margin is thin** (≤ 2.49 s against 2.5 s, simulated slow 4G). The cover is already found early, eager and high priority. Even a 272 px cover lands at 2.3 s, so the floor is the shared cost of TTFB, CSS and fonts.
  - The next lever is JetBrains Mono: a 40 KB variable font that case studies load early for the back link and meta. A single static weight would be about half that.
  - Re-measure on the Vercel preview before launch.
- **INP:** TBT is 0 ms on every page, so INP isn't a risk. Lighthouse can't measure INP without interaction.
- **Lighthouse CI:** left out on purpose. Simulated runs vary too much on shared runners to gate PRs. The size check is deterministic.

## Out of scope
- Edge caching tuning beyond host defaults.
