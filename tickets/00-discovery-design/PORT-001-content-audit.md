# PORT-001 — Content audit & inventory

| Field | Value |
|---|---|
| Epic | E0 — Discovery & Design |
| Type | content |
| Priority | P0 |
| Estimate | S |
| Depends on | — |
| Status | review |

## User story
As **Bibi (site owner)**, I want a full inventory of what the current site says and shows so that I can decide what to keep, rewrite or drop before anything is redesigned.

## Context
Content is currently hardcoded across components with no single source of truth:
- Hero rotating lines — `bibibranco/src/components/HeroSection/MainText/MainText.jsx`
- Latest projects (Busca Resgatados, Rato Túlio) — `bibibranco/src/components/Latest Projects/ProjectSection.jsx`
- "count me in for" cards (product design, crafting, data viz, sharing knowledge) — `bibibranco/src/components/Timeline/Timeline.jsx`
- Case studies (`projetos` array, ids 1–3) — `bibibranco/src/pages/Project.jsx`
- Experience & education — `bibibranco/src/components/About/About.jsx`
- Contact copy & links — `bibibranco/src/components/Contact/Contact.jsx`
- Footer credit — `bibibranco/src/components/Footer/Footer.jsx`
- Images — `bibibranco/public/*.jpg`, `bibibranco/src/assets/*`

Known issues already spotted: "Itaú Unibanco 2022 – present" and "last 5 years" are likely stale; "EAFC 24" reference is dated; typos "bachalor’s", "made piece" (→ peace), "complete= application", "responsbilities"; a leftover `Projects.jsx` component that is never used; the "sharing knowledge" card has no destination.

## Scope
- Spreadsheet/table (`tickets/artifacts/content-inventory.md` or Figma/Notion) listing every string, image and link with: location, current value, status (keep / rewrite / drop / verify), owner notes.
- Flag every image missing alt text or with placeholder alt ("Project 1").
- Flag every external link and check it still resolves.

## Acceptance criteria
- [x] Every user-visible string from the files above is in the inventory.
- [x] Every image in `public/` and `src/assets/` is listed with status and intended use (or marked unused, e.g. `react.svg`, `vite.svg`, `shape.svg`).
- [ ] Every external link is checked and marked live/dead. _(Medium and LinkedIn block automated checks; Bibi to open them manually.)_
- [x] Outdated facts and typos are flagged for PORT-008.

## Out of scope
- Rewriting copy (PORT-008).

## Notes / links
- Inventory: [`tickets/artifacts/content-inventory.md`](../artifacts/content-inventory.md)
- This inventory is the checklist used at launch (PORT-506) to confirm nothing was lost.
