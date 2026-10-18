# PORT-408 — Contact call-to-action

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-303, PORT-202 |
| Status | review |

## User story
As a **potential collaborator**, I want an obvious way to reach Bibi so that I can say hi without hunting for an address.

## Context
Legacy `Contact.jsx` ("get in touch"): LinkedIn link and `mailto: oi@bibibran.co` (note the stray space after `mailto:`), both with `target="_blank"` and no `rel`.

## Scope
- Reusable `ContactCta` block used on home, about and the end of case studies (per PORT-007).
- `mailto:oi@bibibran.co` (fixed), copy-email-to-clipboard button with confirmation toast/text, LinkedIn and other socials from `profile.ts`.
- Fire GA events on click with `track('contact_click', { method, location })` from `src/lib/analytics.ts` (PORT-502). A LinkedIn link here is a contact click, not an outbound click.

## Acceptance criteria
- [x] Mailto opens a correct address (no leading space). _(`mailto:oi@bibibran.co` on every built page, from `profile.ts`.)_
- [x] Copy button works and announces "copied" to screen readers (`aria-live`). _(`role="status"`, which is polite. Tested in Chrome: "Copied!" for 2s then reset. On failure it shows "Select the address" and selects the address.)_
- [x] External links have `rel="noopener noreferrer"`. _(No `target="_blank"` without it on any built page.)_

## Out of scope
- Contact form / backend.

## Notes (2026-10-18)
- **`CopyButton`** (`ui/copy-button.tsx`, the PORT-006 spec): idle → "Copied!" (2s) → idle, or "Select the address" when the clipboard is unavailable. In that case it selects the visible address (inside the email button, made `select-text`, since buttons are `select-none`). The result is repeated in a visually hidden `role="status"` region.
- **`ContactCta`** (`site/contact-cta.tsx`): "get in touch" plus the copy.md line, then email (primary), Copy email and LinkedIn. It's inline on desktop and stacked full-width on mobile. Address and LinkedIn come from `profile.ts`.
- **Where it shows:** case studies (after prev/next) and `/about` (the stub, until PORT-407). Home gets it when the home page is assembled (PORT-402–404) with `location: 'home'`. `home` was added to the analytics `Location` type and brief §4, since the home CTA isn't the hero.
- **One `#contact` per page:** routes that render the CTA set `staticData: { contactCta: true }`, and the footer drops `id="contact"` on those pages. So "Say hi" lands on the CTA where there is one, and on the footer otherwise (/work, 404).
- **Analytics:** email click, a successful copy and LinkedIn each send one `contact_click` with the page's `location`. LinkedIn is never also an `outbound_click` (brief §4). A failed copy sends nothing. Verified in the dataLayer with `?ga_debug=1`.

