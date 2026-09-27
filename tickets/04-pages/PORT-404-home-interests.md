# PORT-404 — Home: "count me in for" interests

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P1 |
| Estimate | M |
| Depends on | PORT-303, PORT-202 |
| Status | todo |

## User story
As a **potential collaborator**, I want to see the range of things Bibi is into so that I know what I could invite them to work on.

## Context
Legacy `Timeline.jsx` + `TimelineCard.jsx` + `InnerCardContent.jsx`: a zig-zag timeline of 4 interests, rendering each card twice to swap sides on mobile, with "and hoping this list grows bigger everyday" at the end. "sharing knowledge" links nowhere.

## Scope
- Rebuild the section as designed in PORT-007 (it doesn't have to stay a timeline) from `profile.interests`.
- Each interest links to a filtered `/work?tag=…` or a case study, or is plain text if it has no destination.
- Single DOM render per item (responsive via CSS, no duplicated markup).

## Acceptance criteria
- [ ] No duplicated content in the DOM.
- [ ] Every link resolves (typed route params).
- [ ] Matches PORT-007 on all breakpoints.

## Out of scope
- New interests content (lives in PORT-008/PORT-303).
