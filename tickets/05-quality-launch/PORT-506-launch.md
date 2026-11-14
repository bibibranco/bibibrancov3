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
- [x] GA Realtime shows production traffic. _(Checked as hits: `g/collect` with `tid=G-KR5JD1GYC2`, `en=page_view` from the live site.)_
- [x] `legacy/` removed and README rewritten.

## Out of scope
- Post-launch content additions (new tickets).

## Launch log
- **2026-11-14:** PR #46 (PORT-504) and #47 (PORT-205) merged to `main`; `bibibranco-v4` production deploy ready. `www.bibibran.co` moved from `bibibrancov3` to `bibibranco-v4` (`vercel domains add www.bibibran.co bibibranco-v4 --force`). The apex was never a project domain: Vercel redirects it to www (307), and `http` to `https` (308).
- **Verified on production:** `/`, `/work`, `/about`, `/work/busca-resgatados` 200; WIP case studies 404; `/project/1` → `/work#work`, `/project/2` → `/work#craft`, `/project/3` → `/work/itp-mapping` (301); `sitemap.xml` 200; HSTS on. `lavanderia.bibibran.co` (another project) unaffected.
- **Rollback:** ~~`vercel domains add www.bibibran.co bibibrancov3 --force`~~ no longer available: `bibibrancov3` was deleted on 2026-11-14 at Bibi's request. The 2023 site can only be rebuilt from git history (before PR #50).
- **Email:** the `bibibran.co` zone had **no MX records** (the zone's SOA predates launch; moving a domain between projects doesn't touch DNS). Fixed 2026-11-14 for Google Workspace: `MX 1 smtp.google.com` and SPF `v=spf1 include:_spf.google.com ~all`, both resolving publicly. DKIM key added the same day as TXT `google._domainkey.bibibran.co` (resolves publicly, matches exactly); Bibi starts authentication in Workspace Admin › Apps › Gmail › Authenticate email.
- **2026-11-14, later:** `legacy/` removed and README updated. `bibibrancov3`'s Git link disconnected so it stops building a folder that no longer exists; its last production deployment stays, so the rollback above still works.
- **Search Console:** Domain property `bibibran.co` added to Bibi's account and verified by DNS TXT (`google-site-verification=…`, keep that record). Sitemap `https://www.bibibran.co/sitemap.xml` submitted 2026-11-14: accepted, 7 pages.
- **Share cards and icons (checked on production):** every page has title, description, canonical, `og:*` and `summary_large_image`; `og.jpg` and the Busca card are 1200×630 and load; Person JSON-LD on `/` and `/about` parses (no image since the portrait was removed). `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` (180×180), the manifest and its three icons, `robots.txt` and `sitemap.xml` all 200.
- **Still to do (by hand, need logins or devices):** LinkedIn Post Inspector and Google Rich Results Test on a live URL; favicon on an iOS home screen; send a test mail to oi@bibibran.co.
- **2026-11-14, end of day:** DKIM authentication started in Workspace Admin. Old Vercel project `bibibrancov3` deleted (was 40 deployments, no domains, no env vars); `bibibrancov3.vercel.app` now 404s, `www.bibibran.co`, the apex redirect and `lavanderia.bibibran.co` checked fine afterwards.
