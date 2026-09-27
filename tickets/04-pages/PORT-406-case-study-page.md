# PORT-406 — Case study page `/work/$slug`

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P0 |
| Estimate | L |
| Depends on | PORT-301, PORT-302, PORT-304 |
| Status | todo |

## User story
As a **hiring manager**, I want a readable, well-structured case study so that I understand the problem, Bibi's role and the outcome.

## Context
Legacy `Project.jsx` + `SideBar.jsx` + `ProjectContent.jsx`: sidebar with title/description and "back to homepage", then image/text blocks with images as CSS backgrounds at a fixed 600px height. Unknown ids crash the page.

## Scope
- Route `src/routes/work/$slug.tsx`; loader uses `getProjectBySlug()` and throws `notFound()` for unknown slugs.
- Header: title, summary, meta (role, year, tags), cover image, external link if present.
- MDX body rendered with the PORT-301 component map, readable measure (~65–75ch).
- Prev/next project navigation (`getAdjacentProjects()`).
- Per-page `head()` with title, description, canonical, OG (image from PORT-501).
- All slugs prerendered.

## Acceptance criteria
- [ ] Every MDX project has a prerendered page at `/work/<slug>`.
- [ ] `/work/does-not-exist` shows the 404 page with a 404 status on the host.
- [ ] Headings are in order (single `h1`, no skipped levels).
- [ ] Matches PORT-007 on all breakpoints.

## Out of scope
- Comments, likes, view counts.
