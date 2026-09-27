# PORT-407 — About page `/about`

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-303, PORT-202 |
| Status | todo |

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
- [ ] One `h1` on the page; section headings are `h2`.
- [ ] Dates rendered from structured data with `<time datetime>`.
- [ ] Matches PORT-007 on all breakpoints.

## Out of scope
- Downloadable CV generation.
