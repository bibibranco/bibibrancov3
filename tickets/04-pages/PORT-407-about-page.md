# PORT-407 — About page `/about`

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-303, PORT-202 |
| Status | review |

## User story
As a **recruiter**, I want Bibi's background, experience and education in one place so that I can check fit quickly.

## Context
Legacy `About.jsx` puts a photo (`me.png`, no alt) next to experience and education lists, using `h1` for section headings inside the page (multiple `h1`s).

## Scope
- Long bio (PORT-008), portrait with alt text.
- Experience and education timelines from `profile.ts` using semantic lists (`<ol>`/`<dl>` with `<time>`).
- Link to LinkedIn; optional CV PDF download if Bibi provides one.
- Page meta.

## Acceptance criteria
- [x] One `h1` on the page; section headings are `h2`. _(Entries are `h3`s; checked on the built page.)_
- [x] Dates rendered from structured data with `<time datetime>`. _(All 11 dates, e.g. `2022-06` → "Jun 2022"; "now" stays text.)_
- [ ] Matches PORT-007 on all breakpoints. _(Blocked: PORT-007 isn't done. Built from the PORT-005 wireframe; checked at 1440 and 375 with no horizontal scroll.)_

## Out of scope
- Downloadable CV generation.

## Notes (2026-10-18)
- **Layout (wireframe):** bio (7 cols) beside the portrait (4 cols) on desktop, stacked on mobile. Then Experience, Education and Talks & teaching, each with the h2 in the left 3 columns and an `<ol>` of entries (`TimelineList`, date column from md). The ContactCta (`location: 'about'`) comes last.
- **Data:** the bio, talks, experience and education come from `profile.ts`. The bio's "8+ years" and the meta line use `yearsOfExperience`. The "other projects" line (copy.md) sits under Experience. Melhor Envio and Agência Ursa have no summary yet, so none is shown.
- **Talks:** `talks` is empty, with a TODO (PORT-507). Until it's filled, the section shows the intro line and the Medium link (`outbound_click`, location `about`), with no empty list. `#talks` is the target for home's "sharing knowledge".
- **Portrait:** v3's `me.png` is now `content/profile/portrait/` with `portrait.yaml` (src and alt), a content-collections singleton that goes through the PORT-304 pipeline (AVIF/WebP at 480 and 734w), loaded eagerly. The pipeline now skips the dominant-colour placeholder for images with an alpha channel, so the starburst cut-out doesn't get a coloured square. Whether to keep this photo (inventory A2) is a TODO for PORT-507. `pnpm content:todo` now scans all of `content/`.
- **LinkedIn** is in the ContactCta. There's no CV download (none provided; the ticket marks it optional).

