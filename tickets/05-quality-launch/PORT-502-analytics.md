# PORT-502 — Analytics (GA4)

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P1 |
| Estimate | S |
| Depends on | PORT-401, PORT-002 |
| Status | review |

## User story
As **Bibi**, I want to know which projects people view and which links they click so that I can see whether the site meets its goals.

## Context
Legacy: gtag snippet in `legacy/index.html` with ID `G-KR5JD1GYC2` plus `legacy/src/components/Analytics/RouteTracker.jsx`, which sends a manual `page_view` on each route change. Because gtag's `config` also sends an initial page view, the first page is likely counted twice.

## Scope
- Load gtag with the **same** measurement ID (keeps historical data) from the root route, production only.
- `send_page_view: false` in config; send `page_view` from a TanStack Router `onResolved` subscription (one per navigation, including the first).
- `track(event, params)` helper for the PORT-002 events (`case_study_view`, `case_study_read`, `prototype_click`, `contact_click`, `outbound_click`), used by `TextLink` external links and `ContactCta`. Events and params are defined in [`brief.md` §4](../artifacts/brief.md#4-success-metrics).
- Decide on a consent banner (not legally required for everyone, but note it); document the decision.

## Acceptance criteria
- [ ] GA4 DebugView shows exactly one `page_view` per navigation, including first load. _(Checked in the `dataLayer` on the dev server with `?ga_debug=1`: one on first load, one per client navigation, none for the "Say hi" `#contact` jump. Bibi to confirm in DebugView.)_
- [ ] Each PORT-002 event appears in DebugView with the expected params. _(`contact_click` (email, LinkedIn) and `outbound_click` (Medium) fire from the footer with the right params, and the v3 credit link sends nothing. `case_study_view`, `case_study_read` and `prototype_click` are typed and ready, but wait for PORT-406. The ContactCta events wait for PORT-408.)_
- [x] No analytics requests in dev or on preview deploys. _(Without the flag, localhost loads no gtag script and creates no `dataLayer`; the same gate covers every non-production host.)_

## Notes / links
- `src/lib/analytics.ts` exports `initAnalytics()`, `trackPageView(path)` and a typed `track(event, params)`. `src/components/site/analytics.tsx` sits in the root layout and sends `page_view` from an effect after each resolved navigation, so the new `<title>` is already in place. Hits are deduped by path + query.
- **Production only = hostname gate.** gtag only loads on `bibibran.co` / `www.bibibran.co`. A `VERCEL_ENV` build check wouldn't be enough, because the v4 project's production URL goes live before the domain moves over (PORT-506) and would pollute the property.
- **Debugging:** add `?ga_debug=1` to any URL (including previews) to turn tracking on with `debug_mode` for that tab (sessionStorage). Those hits go to the real property, so turn on GA4's "Developer traffic" data filter to keep them out of reports.
- The footer is the page's `#contact` block, so footer email and LinkedIn send `contact_click` (location `footer`), and Medium sends `outbound_click`.
- **Consent banner (proposed, Bibi to confirm): none at launch.** GA4 doesn't store IP addresses. Google signals and ad personalization are off, there are no ads and no cross-site tracking, and the audience is mostly recruiters and peers. Revisit if the site adds anything beyond first-party measurement, or if EU traffic becomes significant (strict ePrivacy reading). The alternative is Consent Mode v2 with default `denied` plus a small banner.

## Out of scope
- Switching analytics providers.
