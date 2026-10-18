# PORT-404 — Home: "count me in for" interests

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-303, PORT-202 |
| Status | review |

## User story
As a **potential collaborator**, I want to see the range of things Bibi is into so that I know what I could invite them to work on.

## Context
Legacy `Timeline.jsx` + `TimelineCard.jsx` + `InnerCardContent.jsx`: a zig-zag timeline of 4 interests, rendering each card twice to swap sides on mobile, with "and hoping this list grows bigger everyday" at the end. "sharing knowledge" links nowhere.

## Scope
- Rebuild the section as designed in PORT-007 (it doesn't have to stay a timeline) from `profile.interests`.
- Each interest links to a filtered `/work?tag=…` or a case study, or is plain text if it has no destination.
- Single DOM render per item (responsive via CSS, no duplicated markup).

## Acceptance criteria
- [x] No duplicated content in the DOM. _(Each label appears once in the built home page.)_
- [x] Every link resolves (typed route params). _(Links are typed TanStack routes, so a wrong path or hash is a type error. `scripts/content-build.ts` fails the build if a case-study slug isn't a shipping project, which I tested.)_
- [ ] Matches PORT-007 on all breakpoints. _(Blocked: PORT-007 isn't done. Built from the PORT-005 wireframe; checked at 1440 and 375.)_

## Out of scope
- New interests content (lives in PORT-008/PORT-303).

## Notes (2026-10-18)
- **Section:** "count me in for" (h2), then a `<ul>` of rows. Each row is one link with the label (Syne h3 size), an arrow and the line, and the copy.md closing line comes at the end. It's on home under the placeholder hero until PORT-402 and PORT-403 land.
- **Links** (`profile.ts`): product design → `/work#work`, crafting → `/work/woodworking`, data viz → `/work/itp-mapping`, sharing knowledge → `/about#talks`. `link` is optional; an interest without one renders as plain text (inventory "text-only"). There's no `/work?tag=` (PORT-003 dropped filters).
- **Why the slug check is in the content build:** a check at render time only logged an error. The route's error boundary caught it and the page still prerendered.
- **Underline:** rows aren't underlined at rest (they underline on hover), like the /work cards. They're block links with an arrow and dividers rather than inline links. PORT-007 can revisit this, along with the star bullets.

