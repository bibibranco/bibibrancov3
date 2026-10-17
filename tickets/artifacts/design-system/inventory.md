# Component inventory

Every component in the PORT-005 wireframes, with its variants and states. **Focus** applies the system ring (3px `ring`, 3px offset) unless the table notes otherwise. "→ E2" names the ticket that builds it.

## Shell
| Component | Variants | States | Focus / notes | → |
|---|---|---|---|---|
| SkipLink | — | hidden · visible on first Tab | Shows as a `primary` pill, top-left | 203 |
| Header | inline nav (≥ md) · menu button (< md) | static (sticky is a PORT-007 call) | Logo is a link named "Bibi Branco, home" | 203 |
| NavLink | — | default · hover (underline) · current (`aria-current`, 3px underline) · focus | Ring | 203 |
| MenuButton | Menu · Close | default · hover · focus · expanded (`aria-expanded`) | Ring; pill; 44px | 203 |
| MobileMenu | — | closed · open (full-screen sheet on `popover`) | Focus trapped, Esc closes, focus returns to MenuButton | 203 |
| Footer | — | — | Links follow TextLink | 203 |

## Primitives
| Component | Variants | States | Focus / notes | → |
|---|---|---|---|---|
| Button | primary (star) · secondary (outline, `input` edge) · ghost | default · hover · active · focus · disabled | Ring; pill; min 44px. Disabled is 50% opacity, still ≥3:1 | 202 |
| TextLink | internal · external (↗ + "opens in new tab", visually hidden) | default (underlined) · hover (thicker underline) · visited (unchanged) · focus | Ring | 202 |
| CopyButton | — | idle "Copy" · copied "Copied" (2s) · failed "Select the address" | Ring; result in a `status` live region | 202/408 |
| Tag | — | static | Not interactive | 202 |
| SectionHeading | h2 · h3 | — | — | 202 |
| Image | column · full-bleed · polaroid crop | loading (no layout shift) · loaded | Required `alt` | 202/304 |
| Container / Section | — | — | `container-max`, `fluid-gutter`, `fluid-section` | 202 |

## Home
| Component | Variants | States | Focus / notes | → |
|---|---|---|---|---|
| Hero | — | star rotating · static (reduced motion) | The h1 includes "Bibi Branco, product designer" (SEO) | 402 |
| DeskBoard | scattered (≥ lg) · masonry 2-col (< lg) | — | A `<ul>` in reading order | 403 |
| DeskObject | terminal · sticky · receipt · shop-tag · polaroid · print · clipping · index-card · notebook | rest · hover (lift) · focus (lift + ring) · reduced motion (no lift transition) | The whole object is one link; it comes to the top on focus | 403 |
| InterestRow | linked · text-only | default · hover · focus | Ring | 404 |
| AboutTeaser | — | — | — | 407 |
| ContactCta | inline (desktop) · stacked (mobile) | — | Contains Button + CopyButton; `location` param | 408 |

## Work and case study
| Component | Variants | States | Focus / notes | → |
|---|---|---|---|---|
| GroupJumpLinks | Work · Craft | default · hover · focus | Ring | 405 |
| ProjectCard | grid (desktop) · row (mobile) | default · hover · focus | The whole card is one link; ring | 405 |
| BackLink | "← Work" | default · hover · focus | Ring | 406 |
| Summary | — | — | `<dl>` on `card` | 406 |
| Figure | column · full | — | Caption in `caption` style | 301/406 |
| ImagePair | — | stacks < 360px | — | 301 |
| Quote | — | — | `<blockquote>` + `<cite>` | 301 |
| Stats | 2–4 items | — | NDA-cleared numbers only | 301 |
| Specs | — | — | `<table>` with row headers | 301 |
| ProjectLinks | live · repo · external | default · hover · focus | Buttons; `prototype_click` / `outbound_click` | 406 |
| PrevNext | — | default · hover · focus | Inside `<nav aria-label="More projects">` | 406 |

## About and 404
| Component | Variants | States | Focus / notes | → |
|---|---|---|---|---|
| TimelineList | experience · education | — | `<ol>`, h3 per entry | 407 |
| NotFound | — | — | `noindex`; star slot | 409 |
