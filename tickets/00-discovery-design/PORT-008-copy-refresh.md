# PORT-008 — Copy refresh

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | content |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-001, PORT-002, PORT-003 |
| Status | todo |

## User story
As a **visitor**, I want up-to-date, well-written copy so that I trust the information and understand what Bibi does today.

## Context
Flagged in PORT-001: stale dates/roles (Itaú "2022 – present", "mid-level product designer", "last 5 years"), dated jokes ("EAFC 24"), typos ("bachalor’s", "made piece", "complete= application", "responsbilities"), and case studies that are one paragraph each.

## Scope
- Hero headline + rotating lines.
- Short bio (home) and long bio (about).
- Experience & education list, updated to today.
- Interests section copy.
- Each case study: summary, role, timeline, problem, process, outcome (to the depth PORT-005's template allows).
- Contact CTA, 404 copy, meta titles/descriptions per page.

## Acceptance criteria
- [ ] Every string flagged "rewrite" in PORT-001 has new copy.
- [ ] All typos from PORT-001 fixed.
- [ ] Every page has a meta title (≤ 60 chars) and description (≤ 155 chars).
- [ ] Copy follows the tone of voice from PORT-002.

## Out of scope
- Translation (Portuguese version) — log as a P2 follow-up if wanted.

## Notes / links
- Copy is delivered in a doc, then moved into MDX/TS data in PORT-302/PORT-303.
