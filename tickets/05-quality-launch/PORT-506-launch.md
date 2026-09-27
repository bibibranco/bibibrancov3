# PORT-506 — Launch & legacy cleanup

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-409, PORT-501, PORT-502, PORT-503, PORT-504, PORT-505 |
| Status | todo |

## User story
As **Bibi**, I want the new site live on my domain with nothing lost so that I can start sharing it.

## Context
Production domain is `bibibran.co`, currently attached to the old Vercel project. DNS is at Namecheap. The old app sits in `legacy/` since PORT-101.

## Scope
- Pre-launch checklist: PORT-001 inventory fully accounted for; all E5 acceptance criteria met; final content proofread.
- In Vercel, move `bibibran.co` and `www.bibibran.co` from the old project to the new one (apex primary, `www` redirects to apex); HTTPS verified.
- Namecheap: confirm the records still point at Vercel (use the values Vercel's domain panel shows). Moving a domain between Vercel projects normally needs no DNS change. Leave the email (MX) records for `oi@bibibran.co` alone.
- Post-launch: verify redirects and GA on production; submit sitemap in Google Search Console.
- Remove `legacy/` in a separate PR; replace the Vite template `README.md` with a real one (stack, scripts, how to add a project, budget).
- Delete the old Vercel project once the new one has been stable for a week. Until then, rollback = move the domain back to it.

## Acceptance criteria
- [ ] `https://bibibran.co` serves the new site; `www` and `http` redirect to it.
- [ ] `/project/1..3` redirect correctly on production.
- [ ] GA Realtime shows production traffic.
- [ ] `legacy/` removed and README rewritten.

## Out of scope
- Post-launch content additions (new tickets).
