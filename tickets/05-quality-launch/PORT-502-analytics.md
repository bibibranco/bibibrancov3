# PORT-502 — Analytics (GA4)

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-401, PORT-002 |
| Status | todo |

## User story
As **Bibi**, I want to know which projects people view and which links they click so that I can see whether the site meets its goals.

## Context
Legacy: gtag snippet in `legacy/index.html` with ID `G-KR5JD1GYC2` plus `legacy/src/components/Analytics/RouteTracker.jsx`, which sends a manual `page_view` on each route change. Because gtag's `config` also sends an initial page view, the first page is likely counted twice.

## Scope
- Load gtag with the **same** measurement ID (keeps historical data) from the root route, production only.
- `send_page_view: false` in config; send `page_view` from a TanStack Router `onResolved` subscription (one per navigation, including the first).
- `track(event, params)` helper for the PORT-002 events (`outbound_click`, `contact_click`, `case_study_view`, …), used by `TextLink` external links and `ContactCta`.
- Decide on a consent banner (not legally required for everyone, but note it); document the decision.

## Acceptance criteria
- [ ] GA4 DebugView shows exactly one `page_view` per navigation, including first load.
- [ ] Each PORT-002 event appears in DebugView with the expected params.
- [ ] No analytics requests in dev or on preview deploys.

## Out of scope
- Switching analytics providers.
