# PORT-408 — Contact call-to-action

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-303, PORT-202 |
| Status | todo |

## User story
As a **potential collaborator**, I want an obvious way to reach Bibi so that I can say hi without hunting for an address.

## Context
Legacy `Contact.jsx` ("get in touch"): LinkedIn link and `mailto: oi@bibibran.co` (note the stray space after `mailto:`), both with `target="_blank"` and no `rel`.

## Scope
- Reusable `ContactCta` block used on home, about and the end of case studies (per PORT-007).
- `mailto:oi@bibibran.co` (fixed), copy-email-to-clipboard button with confirmation toast/text, LinkedIn and other socials from `profile.ts`.
- Fire GA events on click (hook from PORT-502).

## Acceptance criteria
- [ ] Mailto opens a correct address (no leading space).
- [ ] Copy button works and announces "copied" to screen readers (`aria-live`).
- [ ] External links have `rel="noopener noreferrer"`.

## Out of scope
- Contact form / backend.
