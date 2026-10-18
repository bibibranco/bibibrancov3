# bibibran.co

The design system for Bibi Branco's portfolio, v4: blue ground, ice text, one yellow star. Projects show up as objects on a desk. It turns the PORT-004 visual direction ("Blue, evolved") and the PORT-005 wireframes into tokens that map 1:1 to the Tailwind v4 `@theme` and the shadcn CSS variables in `src/styles.css` (PORT-201).

## Voice
Playful but sharper (brief §5). Friendly without filler, specific beats generic, jokes that age well, senior without stiffness. Lower-case is fine for playful UI ("bits and pieces on my desk", "get in touch"). Page titles and case-study body copy use sentence case. The site doesn't tone itself down for recruiters: personality first.

## Colour
**One theme, Blue.** The page ground is always `blue`. There is no light theme and no dark theme: the blue is the identity, and it is already mid-dark, so `prefers-color-scheme` doesn't change it. Long reading happens on the `card` (deep) column instead (decided in PORT-006).

| Use | Token | On | Contrast |
|---|---|---|---|
| Body and headings | `foreground` (ice) | `background` (blue) | 5.3:1 |
| Metadata, captions ≥14px | `muted-foreground` (mist) | blue | 4.6:1 |
| Accent, star, focus ring | `star` / `ring` | blue | 5.1:1 |
| Primary button text | `primary-foreground` (deep) | `primary` (star) | 12.5:1 |
| Reading column text | `card-foreground` | `card` (deep) | 13.1:1 |
| Text on paper objects | `paper-foreground` | `paper` | 14.9:1 |
| Labels on paper | `paper-muted` (pencil) | paper | 6.4:1 |
| Terminal prompt | `terminal-muted` | deep | 7.6:1 |
| Hover fill text | `accent-foreground` | `accent` | 7.5:1 |
| Error text | `destructive` | blue | 4.9:1 |
| Text over the reading-column grid | `card-foreground` / `muted-foreground` | `grid-line-card-major` on deep | 10.2:1 / 8.8:1 |
| Text over the paper grid | `paper-foreground` / `paper-muted` | `grid-line-paper` | 12.7:1 / 5.5:1 |

Rules:
- **One star per view.** `star` is the only accent: a primary button, the star, sticky notes, focus. Never yellow body text.
- **Links are always underlined.** Ice and star are too close in lightness to tell apart by colour alone (WCAG 1.4.1).
- **No raw hex in components.** Use semantic tokens (`background`, `primary`, …). Brand tokens (`blue`, `star`, …) are for the system itself.
- `border` is decorative only. Control edges use `input` (ice), which meets the 3:1 non-text minimum.

## Type
| Family | Token | Role |
|---|---|---|
| Syne | `heading` | Display and headings only, 700–800, tight tracking |
| Atkinson Hyperlegible Next | `sans` | All body text: 17px, 1.6 line height, max `measure` (65ch) |
| JetBrains Mono | `mono` | Meta lines, labels, receipts, terminals, code |

All three are self-hosted through fontsource (`@fontsource-variable/*`, installed in PORT-103); previews here load them from Google Fonts. Headings use the `fluid-*` sizes (375→1440). A handwritten face for sticky notes is still open (PORT-007).

## Layout
- 12 columns, `space-6` gutter, `container-max` 1200px, side padding `fluid-gutter` (20→120px). Mobile is one column.
- Sections are separated by `fluid-section` padding, not by rules.
- Tap targets are at least `tap-min` (44px).

## The desk
Featured work is "bits and pieces on my desk": each **fragment** of a project is drawn as an **object**, and the fragment type picks the object. Objects use `paper`, `sticky` or `terminal` surfaces, `radius-none`, `shadow-object`, and a `tilt-*` rotation set by hand per breakpoint. On hover or focus an object lifts (`shadow-object-lift`, `duration-base`, `ease-out`) and comes to the top (`z-object-focus`). See **Components → DeskObject**.

## The notebook (from direction B)
A little of direction B's squared notebook structure, kept underneath the blue identity:

- **Squared grid.** Lines one `grid-cell` (24px) apart. That equals the column gutter, so the grid lines up with the 12-column layout. It's drawn as a CSS background (two `linear-gradient`s), never as an image.
  - **Reading column** (`card`): `grid-line-card`, with every 4th line in `grid-line-card-major`. The case study reads like a notebook page.
  - **Desk section** (blue): `grid-line`, so the objects lie on squared paper. No text under 24px may sit directly on the blue grid: small text stays inside objects, and the "Everything, tidy →" link goes below the grid band.
  - **Paper:** `grid-line-paper` on the notebook-page desk object and the 404 sheet.
  - **Not** on the hero, `/work`, `/about` or the footer. They stay plain blue, so the grid stays special.
- **Margin notes.** On desktop (≥ lg), the case study gets a `margin-width` column to the right of the text column. Notes there use the `note` style in `muted-foreground`, with a 1px `border` rule on the left, and hold the facts: figure numbers, specs, dates, small asides. Below lg, a note sits inline after its paragraph. A note is an `<aside>`, so the main text never depends on it.
- **Figure labels.** Figures are numbered in order, "fig. 1", "fig. 2", in the `label` style before the caption. Margin notes can point to them.
- **Dates** use the notebook form `2026.05` in `meta`/`note` (the dated log from direction B), for example on `/work` rows and the summary timeline.

## Motion
Motion is sparing. The hero star rotates once per `duration-star`. Objects lift, and links grow their underline. Everything that moves stops under `prefers-reduced-motion`, and nothing waits at `opacity: 0`. The full spec comes in PORT-007 and PORT-204.

## Focus
Every interactive element gets the same ring: 3px `ring` (star) with a 3px offset. Because of the offset, the ring always sits on blue, even around paper objects and star buttons. The ring is never removed; `:focus-visible` only.

## Iconography
Lucide icons, at a 1.5px stroke, in `currentColor`. The only brand marks are the logo and the star (Assets).

## Tailwind / shadcn mapping (for PORT-201)
| Here | In `src/styles.css` | Utility |
|---|---|---|
| colour `background`, `primary`, … | `--background`, `--primary`, … (shadcn vars) → `@theme inline { --color-*: var(--*) }` | `bg-background`, `text-primary-foreground` |
| colour `paper`, `sticky`, `terminal`, … | `--paper` … + `--color-paper` | `bg-paper` |
| family `heading` / `sans` / `mono` | `--font-heading` / `--font-sans` / `--font-mono` | `font-heading` |
| style `display`, `h1`, `body`, … | `--text-display` (+ `--text-display--line-height`) using the `fluid-*` value | `text-display` |
| `radius-*` | `--radius-*` | `rounded-pill` |
| `shadow-*` | `--shadow-*` | `shadow-object` |
| `ease-*` | `--ease-*` | `ease-out` |
| `breakpoint-*` | `--breakpoint-*` | `md:` |
| `duration-*`, `tilt-*`, `z-*`, `size` | plain custom properties (`--tilt-2`) | `rotate-(--tilt-2)` |
| `grid-line*` + `grid-cell` / `grid-major` | `--color-grid-line*`, `--grid-cell` | `@utility bg-notebook` / `bg-notebook-card` / `bg-notebook-paper` |
| `space-N` | Tailwind default `--spacing: 0.25rem` | `p-4`, `gap-6` |

## Legacy elements
v3 logo kept as is ("bibi" + the bar covering "branco"); `#0055D4` kept; Syne kept for display only; PT Mono → JetBrains Mono; star kept as the main motif (PORT-004).
