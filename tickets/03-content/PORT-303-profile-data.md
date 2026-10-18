# PORT-303 — Typed profile data (experience, education, interests)

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-008 |
| Status | review |

## User story
As **Bibi**, I want experience, education and interests in one typed file so that updating my CV means changing one line.

## Context
Legacy data is inline JSX: `About.jsx` (Itaú Unibanco, Melhor Envio, Agência Ursa; UFPel Graphic Design, ITP Camp, Le Wagon) via `Experience` props `text1/text2/text3`, and `Timeline.jsx` (product design, crafting, data viz, sharing knowledge) with hardcoded links to `/project/1..3`.

## Scope
- `src/content/profile.ts` exporting typed `experience[]`, `education[]`, `interests[]`, `socials[]`, `contact` (email `oi@bibibran.co`, LinkedIn).
- Dates as structured values (`start`, `end | 'present'`) formatted in the UI, not strings.
- Interests link to `/work?tag=…` or a project slug (typed against route params).

## Acceptance criteria
- [x] No profile data hardcoded in page components. _(Footer, header logo label, `seo()` site name and the home placeholder now read `src/content/profile.ts`.)_
- [x] Data reflects PORT-008 updated copy. _(Owed facts are left out, not guessed. See Notes.)_
- [x] Changing an entry updates every place it appears (home + about + footer). _(Home and about render from it in PORT-404/407/408.)_

## Out of scope
- Rendering (E4 pages).

## Notes
- **Exports:** `person`, `contact`, `socials`, `experience`, `education`, `interests`, `credit` and `yearsOfExperience`. The last one is computed from the earliest role (2018), so the "8+ years" line updates itself.
- **Dates** are `{ year, month? }` with `end: 'present'`. `formatPeriod()` in `src/lib/format.ts` renders them as "Dec 2025 – now", "2020 – 2022" or "Jun 2023".
- **Interest links:** `/work#work` and `/about#talks` are typed against the existing routes. Crafting and data viz point to project slugs (`woodworking`, `itp-mapping`) and become typed `/work/$slug` links once PORT-406 adds the route. There's no `/work?tag=` (PORT-003 dropped filters).
- **Still owed:** summaries for Melhor Envio and Agência Ursa, whether to keep "junior/mid-level", and the talks list (not modelled until it exists). Bios stay as page copy in PORT-407 and PORT-404.
- `socials[].id` matches the analytics names, and the footer maps LinkedIn to `contact_click` and Medium to `outbound_click` as before.

