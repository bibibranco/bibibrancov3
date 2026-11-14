# PORT-506 — Launch & legacy cleanup

| Field | Value |
|---|---|
| Epic | E5 — Quality & Launch |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-409, PORT-501, PORT-502, PORT-503, PORT-504, PORT-505, PORT-507 |
| Status | in progress |

## User story
As **Bibi**, I want the new site live on my domain with nothing lost so that I can start sharing it.

## Context
Production domain is `bibibran.co`, currently attached to the old Vercel project. DNS is at Namecheap. The old app sits in `legacy/` since PORT-101.

## Scope
- Pre-launch checklist: PORT-001 inventory fully accounted for; all E5 acceptance criteria met; final content pass done (PORT-507).
- In Vercel, move `bibibran.co` and `www.bibibran.co` from the old project to the new one (keep today's setup: `www.bibibran.co` is primary and the apex redirects to it); HTTPS verified.
- Namecheap: confirm the records still point at Vercel (use the values Vercel's domain panel shows). Moving a domain between Vercel projects normally needs no DNS change. Leave the email (MX) records for `oi@bibibran.co` alone.
- Post-launch: verify redirects and GA on production; submit sitemap in Google Search Console; check share cards in LinkedIn Post Inspector and opengraph.xyz (home + one case study) and the `Person` JSON-LD in Google's Rich Results Test (moved from PORT-501, which needs a public URL); check the favicon in Chrome, Safari and on an iOS home screen.
- Remove `legacy/` in a separate PR; replace the Vite template `README.md` with a real one (stack, scripts, how to add a project, budget).
- Delete the old Vercel project once the new one has been stable for a week. Until then, rollback = move the domain back to it.

## Acceptance criteria
- [x] `https://www.bibibran.co` serves the new site; the apex and `http` redirect to it.
- [x] `/project/1..3` redirect correctly on production.
- [ ] GA Realtime shows production traffic.
- [ ] `legacy/` removed and README rewritten.

## Out of scope
- Post-launch content additions (new tickets).

## Launch log
- **2026-11-14:** PR #46 (PORT-504) and #47 (PORT-205) merged to `main`; `bibibranco-v4` production deploy ready. `www.bibibran.co` moved from `bibibrancov3` to `bibibranco-v4` (`vercel domains add www.bibibran.co bibibranco-v4 --force`). The apex was never a project domain: Vercel redirects it to www (307), and `http` to `https` (308).
- **Verified on production:** `/`, `/work`, `/about`, `/work/busca-resgatados` 200; WIP case studies 404; `/project/1` → `/work#work`, `/project/2` → `/work#craft`, `/project/3` → `/work/itp-mapping` (301); `sitemap.xml` 200; HSTS on. `lavanderia.bibibran.co` (another project) unaffected.
- **Rollback:** `vercel domains add www.bibibran.co bibibrancov3 --force --scope bibibrancos-projects`.
- **Email:** the `bibibran.co` zone has **no MX records** (checked 2026-11-14; the zone's SOA predates launch, and moving a domain between projects doesn't touch DNS). Mail to `oi@bibibran.co` is likely not delivered. Add the provider's MX (and SPF/DKIM) records in Vercel DNS.
- **Still to do:** GA Realtime check; Search Console sitemap; share-card and Rich Results checks; favicon checks; remove `legacy/` and rewrite README (separate PR); delete `bibibrancov3` after a stable week (around 2026-11-21).

