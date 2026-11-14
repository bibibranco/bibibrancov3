# PORT-205 — Visual refresh (typesafe.ai reference)

| Field | Value |
|---|---|
| Epic | E2 — Design System |
| Type | design / eng |
| Priority | P1 (launch) |
| Estimate | L (3–5 days) |
| Depends on | PORT-201, PORT-202, PORT-504 |
| Status | review |

## User story
As **Bibi**, I want v4 to borrow the visual language of [typesafe.ai](https://typesafe.ai/) without losing the Blue identity, so that the site looks sharper and clearly new next to v3.

## Context
Reviewed typesafe.ai on 2026-11-14. Decided: **borrow the language, keep blue** (logo, `#0055D4`, star, desk objects, copy and IA unchanged), and swap the display face to a free neo-grotesk, since their Die Grotesk is commercial.

## Scope
- Display face Syne → **Inter Tight** (`@fontsource-variable/inter-tight`, upright axis only). Display/h1–h3 retuned: weight 550–600, line-height 0.9–1.05, tracking −0.02 to −0.045em. `--fluid-display` tops out at 8.5rem.
- New tokens: `--window-*`, `--dot`, `--dot-strong`, `--crop-mark`, `--shadow-hard`.
- New utilities in `src/styles.css`: `bg-dots`, `bg-dither`, `crop-marks`, `bg-grain`.
- New primitives: `Window` (`ui/window.tsx`), `Panel` and `RuledColumn` (`ui/layout.tsx`), `SectionHeading size="display"`, Button `chip` / `chip-solid` variants and `chip` size, `BigLink` / `bigLinkClass` (`ui/text-link.tsx`). All on `/_kitchen-sink`.
- Applied: chip header nav; hero (grain cloud, "now" window, display h1, big text links, decorative base64 string); desk in a `bibi.OS 4.0` dotted panel with dither and the terminal as a window; crop-mark display headings (desk, interests); ruled-column case-study summary; "get in touch ⏵⏵⏵ say hi" contact row; footer logo band.

### Follow-ups from review (2026-11-14)
- Logo bare and white on blue in header and footer (the white block is "branco"). v3 credit removed from the footer.
- "now" window pinned over the star from lg; `bibi.news` label dropped.
- Decorative base64 strings encode Geral do Grêmio song titles (`src/content/geral.ts`).
- Desk fits one screen from xl: two rows of five slots, `y` as % of a viewport-sized desk (`desk-layout.ts`).
- The star throws the **good guns** (heat, tufting, nail, glue), a project still to be built (`gun-drop.ts`, flat SVG guns). Each lands on a free spot anywhere in the hero, over the copy too, never on another gun or the star column, and can be dragged anywhere; it stays put. The status line names the latest gun and what it's for (`src/content/good-guns.ts`, draft copy).
- Hero "See my work" / "Say hi" a step smaller than the other CTA rows.
- Hero fills the screen under the header (`--header-h` token), so the desk starts at the fold; dropped guns draw above the copy.
- The grainy cloud opens every page (drawn in `__root`) and rises, flipped, behind the footer.
- **Wall of shame** inside the desk panel (a column beside the objects from xl, under them below): unfinished projects (good guns, cafuné) as windows with a progress bar (`src/content/wall-of-shame.ts`, draft copy and percentages). Desk slots are now two rows of four.
- Off the desk until they have real content: the momoGood TODO quote (sticky) and the woodworking TODO spec (shop tag).
- momoProto's terminal (`code` fragment) off the desk, so momoProto shows once. Desk slots are now a row of three over a row of four.
- Desk captions drop the object word ("print ·", "polaroid ·"); kickers trimmed (no "INDEX CARD · 2026", "ITAÚ · CARD FEES"; Busca clipping says just "MEDIUM").
- Busca Resgatados is now a full case study on the site with the Medium text as published (Sep 2024), restructured with headings, stats, a pull quote and the three screenshots. All three screens are rebuilt from the project's code (github.com/buscaresgatados/pesquisa-listas, commit `c5727e7`); sources and render notes in `tickets/artifacts/busca-resgatados/`. The home screen is also the cover.
- Case-study body: text on solid Deep, no grid. Only highlights (stats, pull quotes, full-width figures, image pairs) sit on the gridded blue `highlight-band`, bleeding to the panel edges. Stats are ruled columns with tabular figures.
- `coverSize: none` frontmatter leaves the cover out of the case-study header so the story leads (Busca Resgatados); the cover still serves cards and share images. Busca's screens are column figures cropped tight to the app.
- New `<Requirements>` / `<Requirement title>` MDX block: numbered ruled rows (star-yellow mono 01/02/03, requirement as heading, reasoning below), on Deep, spanning both columns on desktop. Busca's three product requirements use it.
- Highlight bands pad their sides by the same amount they bleed, so their content lines up with the text column; more space above, below and inside.
- New `<Lead>` MDX block: a passage at lead size in the display face on Deep, with **bold** in star yellow for the turning point. Used for Busca's "The idea".
- Column figures: from lg the caption sits in the margin column beside the image, bottom-aligned; below lg it stays underneath.
- `press` frontmatter (name + href): listed under Outcome in the case-study header as "Covered by …" links. Busca lists CNN Brasil, O Globo and Exame, also linked in its Impact section.
- **Launch prep (2026-11-14):**
  - `wip: true` frontmatter: listed on /work (dotted "work in progress" panel, WIP tag) and on the desk (WIP stamp), never linked; no page, sitemap entry or prev/next; production strips its body and unconfirmed facts from the bundle. WIP: momoProto, momoGood platform, Itaú card fees, Rato Túlio, woodworking.
  - AEDIT, Thomé, ITP Camp stay published: placeholder paragraphs became MDX comments (still listed by `pnpm content:todo`), unconfirmed timeline/outcome left out (timeline is now optional).
  - `/project/2` redirects to `/work#craft`; the "crafting" interest links to `/work#craft`.
  - About: portrait removed (page and Person JSON-LD); bio shortened to two paragraphs, leading with momoGood; ITP Camp 2023 and 2024 on one Education row (`again`).
  - Hero status area has a fixed height from lg, so the star doesn't jump when guns come out.

## Acceptance criteria
- [x] Typecheck, lint, 28 unit tests and all 125 e2e tests (axe included) pass, desktop and mobile (fewer pages since WIP projects aren't published).
- [x] Home JS within budget (135.8 KB of 150 KB). No TODO text in the production build.
- [x] Decoration is CSS-only or `aria-hidden`; crop marks fall back to a border and the grain is hidden in forced colours.
- [ ] Bibi signs off visually on the Vercel preview.
- [ ] Lighthouse ≥ 98 on the preview.

## Out of scope
- Typesafe's pink/white palette and pixel font. Interactive "OS" widgets (clock, Game of Life) are a possible follow-up.

## Notes / open items
- **Branch:** `port-205-refresh`, stacked on `port-504-perf` (PR #46). Merge #46 first, or retarget this PR to `main` after it lands.
- **Draft copy to confirm:** good guns lines (`src/content/good-guns.ts`), wall-of-shame text and progress percentages (`src/content/wall-of-shame.ts`), Geral do Grêmio titles (`src/content/geral.ts`).
- **Desk labels:** the `bibi.OS 4.0` panel tag was removed (2026-11-14); the `*.wip` window titles on the wall of shame remain.
- **Duplicate visual:** Busca's cover and fig. 1 both show the search box (the cover only shows on cards and share images now).
- **Busca Resgatados body** now carries the Medium text, so it is no longer a short page (PORT-507 scope updated).
- **Other case studies** can now use `<Lead>`, `<Requirements>`, `coverSize: none` and `press`.
