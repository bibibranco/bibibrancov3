# Visual direction (PORT-004)

Decided 2026-10-17. Bibi chose **Direction A, Blue, evolved**. Three directions were presented in the [moodboard](visual-direction-moodboard.html) (published at https://claude.ai/artifact/BabEiHywATyyDvXHariDAF):

| | Direction | Summary |
|---|---|---|
| **A** | **Blue, evolved** ✅ | v3's saturated blue as the whole canvas, sharper type, a yellow star as the only accent |
| B | Lab notebook | Graph paper, Newsreader + Geist, blue used as ink |
| C | Workshop | Plywood + safety orange, Bricolage Grotesque, shop-tag labels |

## Why A
Checked against the [PORT-002 brief](brief.md):
- **Professional presence (primary goal).** Recognition compounds. People who already know bibibran.co keep a strong, memorable identity, and a distinctive look gets shared and remembered more than a neutral one.
- **Personal record.** The v4 site reads as the next chapter of the same person, not a rebrand.
- **Site as a showcase.** With the identity kept, the novelty has to come from execution: sharper type, motion and the build itself. That points the effort at PORT-007 and PORT-204.
- **Peers and makers.** A loud, playful look fits the "playful but sharper" voice and the maker side better than a neutral editorial look.

**Known risks:**
- Long case studies are tiring to read on saturated blue.
- A design this close to v3 can look like a reskin.
- A loud look can read as less senior to recruiters.

How each risk is handled is below.

## Palette
WCAG ratios checked 2026-10-17. Hex values are starting points; PORT-006 turns them into OKLCH tokens.

| Role | Name | Hex | On | Contrast | Use |
|---|---|---|---|---|---|
| Background | Blue | `#0055D4` | — | — | Default page background |
| Text | Ice | `#DCEAFF` | Blue | 5.31:1 | Body and headings (AA) |
| Text, strong | White | `#FFFFFF` | Blue | 6.46:1 | Emphasis, small text that needs more contrast |
| Text, muted | Mist | `#C7DAFF` | Blue | 4.58:1 | Metadata only. Barely passes AA: don't go lighter or smaller than 14px |
| Accent | Star | `#FFE45C` | Blue | 5.08:1 | The star, highlights, active nav. One accent only |
| Deep surface | Deep | `#0A1F4D` | — | Ice on Deep 13.11:1 · Star on Deep 12.54:1 | Cards, reading surface, dark theme |

- **Links:** Ice and Star are too close in brightness to tell links apart by colour alone, so links are always underlined (WCAG 1.4.1).
- **Themes:** blue is the default. Dark mode swaps the background to Deep. A light theme is optional; decide in PORT-006.

## Type
| Role | Face | Package | Notes |
|---|---|---|---|
| Display | **Syne** | `@fontsource-variable/syne` | Variable 400–800. Headings only, at 700–800 with tight tracking. Bibi ruled it out for long body text (2026-10-17) |
| Body | **Atkinson Hyperlegible Next** | `@fontsource-variable/atkinson-hyperlegible-next` | Variable 200–800. Chosen over Instrument Sans and Hanken Grotesk (moodboard) because it's built for legibility, which matters on saturated blue and supports the WCAG goal. Body at 400, ~17px, 1.6 line height |
| Mono | **JetBrains Mono** | `@fontsource-variable/jetbrains-mono` | Labels, metadata, nav, specs, code. Replaces PT Mono, which has no variable build |

All three are self-hosted through fontsource, so there's no Google Fonts request. This is the input for PORT-103.

## Imagery, layout, motion
- **Imagery:** duotone photos (blue + ice) for thumbnails and covers, so the old low-res assets and new screenshots look like one set. Case-study body images stay in full colour.
- **Layout:** large display type and generous blue space. Rounded cards on Deep for project tiles.
- **Motion:** playful but sparing. The star rotates slowly, and the hero words rotate (rebuilt in PORT-402). Everything stops under `prefers-reduced-motion`. Full spec in PORT-007 and PORT-204.
- **References:** v3 itself, Spotify Wrapped type, risograph posters.

## Legacy elements
| Element | Decision | Notes |
|---|---|---|
| Logo (`legacy/src/assets/logo.svg`) | **keep as is** | The v3 file unchanged: "bibi" followed by the bar that covers "branco". Only fix: make it a home link with the accessible name "Bibi Branco" (H1) |
| `#0055D4` | **keep** | Full-page background |
| Syne | **keep, display only** | Self-hosted as a variable font. Body text uses a separate sans |
| PT Mono | **swap** | → JetBrains Mono |
| Star motif | **keep** | Main motif in Star yellow: section markers, favourites, the hero |

## Mitigations for PORT-006 and PORT-007
1. **Readability:** case-study body copy sits on a Deep reading column (13:1) with a ~65ch measure and 1.6 line height. Blue stays the frame around it.
2. **Reskin risk:** with the logo, blue and Syne all kept, the new type scale, body face, duotone imagery and motion need to look clearly new next to v3. Do a side-by-side check at PORT-007 sign-off.
3. **Seniority:** case-study summary blocks (role, team, timeline, outcome) stay calm. Mono metadata, no decoration.

## Open for PORT-006
- Light theme: offer one or not?
