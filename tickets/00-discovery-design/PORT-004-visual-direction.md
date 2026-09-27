# PORT-004 — Visual direction & moodboard

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | M |
| Depends on | PORT-002 |
| Status | todo |

## User story
As **Bibi**, I want a new visual direction that reflects who I am now so that the portfolio itself shows my design skill.

## Context
Current identity: saturated blue background `#0055D4`, light-blue text `#DCEAFF`, Syne (display) + PT Mono (mono), star icons (`src/assets/star.svg`, `star-blue.svg`), custom logo (`src/assets/logo.svg`), zig-zag timeline cards. The rebuild starts from zero, so every element is up for debate.

## Scope
- Moodboard with 2–3 distinct directions (e.g. "evolve current blue identity", "editorial/minimal", "maker/tactile").
- For each: palette, type pairing, imagery treatment, layout feel, motion feel.
- Explicit decision on legacy elements: logo, blue, fonts, star motif.
- Pick one direction.

## Acceptance criteria
- [ ] 2–3 directions presented with references.
- [ ] One direction chosen with written reasoning tied to PORT-002 goals.
- [ ] Keep/drop decision recorded for logo, `#0055D4`, Syne, PT Mono, star motif.
- [ ] Chosen fonts are available as `@fontsource-variable/*` packages or self-hostable (input for PORT-103).

## Out of scope
- Final tokens (PORT-006), page designs (PORT-007).

## Notes / links
- Check colour contrast of any candidate palette early (WCAG AA 4.5:1 for body text).
