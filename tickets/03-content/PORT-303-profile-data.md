# PORT-303 — Typed profile data (experience, education, interests)

| Field | Value |
|---|---|
| Epic | E3 — Content |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-008 |
| Status | todo |

## User story
As **Bibi**, I want experience, education and interests in one typed file so that updating my CV means changing one line.

## Context
Legacy data is inline JSX: `About.jsx` (Itaú Unibanco, Melhor Envio, Agência Ursa; UFPel Graphic Design, ITP Camp, Le Wagon) via `Experience` props `text1/text2/text3`, and `Timeline.jsx` (product design, crafting, data viz, sharing knowledge) with hardcoded links to `/project/1..3`.

## Scope
- `src/content/profile.ts` exporting typed `experience[]`, `education[]`, `interests[]`, `socials[]`, `contact` (email `oi@bibibran.co`, LinkedIn).
- Dates as structured values (`start`, `end | 'present'`) formatted in the UI, not strings.
- Interests link to `/work?tag=…` or a project slug (typed against route params).

## Acceptance criteria
- [ ] No profile data hardcoded in page components.
- [ ] Data reflects PORT-008 updated copy.
- [ ] Changing an entry updates every place it appears (home + about + footer).

## Out of scope
- Rendering (E4 pages).
