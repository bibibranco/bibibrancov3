# PORT-106 — Hosting & preview deploys

| Field | Value |
|---|---|
| Epic | E1 — Foundation |
| Type | eng |
| Priority | P0 |
| Estimate | S |
| Depends on | PORT-102 |
| Status | in progress (new Vercel project to be created in the dashboard) |

## User story
As **Bibi**, I want every branch deployed to a preview URL so that I can review work on real devices and share it for feedback.

## Context
Production `bibibran.co` is live on **Vercel** today, served by an existing Vercel project that builds the legacy app. DNS is managed at **Namecheap**. The repo has no `vercel.json`, so the old project's settings (root directory, framework preset) live in the Vercel dashboard only.

## Scope
- Write down the existing Vercel project's name and settings (root directory, build command) in the Notes below.
- Create a **new** Vercel project on the same repo, root directory = repo root, TanStack Start preset / static output. Keeping the old project separate means production stays on the old site until PORT-506.
- Preview deploys per PR; production branch = `main` but **do not attach the production domain yet** (PORT-506).
- Staging URL recorded in `tickets/README.md`.

## Acceptance criteria
- [ ] Opening a PR produces a preview URL.
- [ ] The preview serves prerendered HTML (view-source shows content).
- [ ] The live site on `bibibran.co` is untouched until launch (still served by the old Vercel project).
- [ ] The new project's `*.vercel.app` URL is recorded in `tickets/README.md`.

## Out of scope
- Domain cutover (PORT-506).

## Notes / links
- Current host: Vercel. Existing project **`bibibrancov3`** (team `bibibrancos-projects`), root directory `legacy`, as shown by the Vercel bot on PR #7. It also builds a preview of the *legacy* app for every PR, so those preview links do not show the new app.
- DNS provider: Namecheap. No DNS changes are needed in this ticket.
- `vercel.json` at the repo root sets the new project's build: `pnpm build`, output `dist/client` (the prerendered static HTML), no framework preset, clean URLs. The old project reads its config from `legacy/`, so this file does not affect it.
- Dashboard steps (needs Bibi's account): Add New → Project → import `bibibranco/bibibrancov3` → name e.g. `bibibranco-v4` → Root Directory `./` → Framework Preset "Other" (`vercel.json` overrides build settings) → Deploy. Do **not** add a domain.
