# PORT-002 — Goals, audience & success metrics

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | design |
| Priority | P0 |
| Estimate | S |
| Depends on | — |
| Status | todo |

## User story
As **Bibi**, I want clearly written goals and target audiences for the site so that every design and content decision can be checked against them.

## Context
The current site mixes a personal "hey there" tone with case studies but has no explicit goal. The rebuild is a chance to decide what the site is *for* (job search? freelance? personal expression?) and to measure it. GA4 is already installed (`G-KR5JD1GYC2` in `bibibranco/index.html`) but only tracks page views.

## Scope
- 1-page brief: primary goal, secondary goals, 2–3 audience profiles (e.g. hiring manager/recruiter, design peer/collaborator, maker community), key tasks each audience should complete.
- Define 3–5 success metrics and the GA4 events needed for them (e.g. `case_study_view`, `outbound_click` to LinkedIn/Medium/TikTok, `contact_click`).
- Tone of voice principles (keep the playful lower-case voice? how casual?).

## Acceptance criteria
- [ ] Brief lists primary goal and audiences, and top tasks per audience.
- [ ] Metrics list maps each metric to a concrete GA4 event name and parameters (input for PORT-502).
- [ ] Tone of voice has 3–5 do/don't examples (input for PORT-008).

## Out of scope
- Implementing analytics (PORT-502).

## Notes / links
- Output lives in `tickets/artifacts/brief.md` or the Figma cover page.
