# PORT-410 — Hero play: "carried away"

| Field | Value |
|---|---|
| Epic | E4 — Pages |
| Type | eng |
| Priority | P2 |
| Estimate | M |
| Depends on | PORT-402, PORT-204 |
| Status | review |

## User story
As a **curious visitor**, I want to play with the hero star so that the "got a little carried away" line shows instead of tells, without getting in the way of reading.

## Context
Bibi found the hero star too fast at 14s per turn (now 40s, PORT-402) and asked for a game in the hero. Four playable options were designed on the hi-fi canvas (`Play-A..D`, 2026-10-18), and Bibi picked **A, "carried away"**:
- Clicking the star drops one tool at a time, in this order: pencil, ruler, terminal, wood offcut, sticky note, rat mask, polaroid, paint chip.
- The tools fall and pile up on the right of the hero, and visitors can drag and throw them.

## Scope
- The star is a button ("Drop a tool from the star").
- **From lg:** tools pile up in a layer over the right third of the hero, clear of the copy.
- **Below lg:** a small star next to the buttons opens a tray under them. Tools are 70% size there, with at most 10 at once (16 from lg).
- The status line says how many tools are out and the latest one. "tidy up" clears them.
- Hand-rolled gravity, no library (`src/components/home/toolbox.ts`), imported on the first click.
- GA4 `hero_play` on the first drop per page view (brief §4, M6).

## Acceptance criteria
- [x] Nothing moves fast until someone clicks the star, and the copy and buttons stay clickable with a full pile (`e2e/home.spec.ts`).
- [x] Playable by mouse, touch and keyboard: the star is a real button. The tools are decoration (`aria-hidden`), and the status line is a `role="status"` region.
- [x] Reduced motion: tools land already stacked, nothing falls or can be thrown, and the star doesn't spin (`e2e/home.spec.ts`).
- [x] No cost to first load: the engine is a separate chunk (`toolbox-*.js`) that loads on click, and there's no layout shift (CLS 0).
- [x] Same rules on phones, using the tray.

## Notes
- **Canvas:** https://claude.ai/artifact/WXCCpvZpTHWEAsu535dTX5 has the boards `Play-A..D` and `Play-375`, and a note there records the pick.
- **Layering:**
  - The copy, the star and the status line sit above the tools, but only their own boxes take the pointer. A tool under an empty part of the grid can still be grabbed.
  - The status line and "tidy up" have a blue backing, so a tall pile can't make them unreadable.
- **Colours:** wood, the rat mask and the pencil's eraser use colours local to the game, not design-system tokens. Everything else uses the brand tokens.
- **Home LCP is 2.9s**, the same before and after this ticket. Lighthouse doesn't fetch the toolbox chunk on load. The < 2.5s budget is tracked in PORT-504.

## Out of scope
- Collisions between flying tools (they only stack on landing).
- Saving the pile between visits.
