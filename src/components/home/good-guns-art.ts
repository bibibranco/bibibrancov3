// The good guns' outlines (PORT-205), for the hero's "who's that gun?" silhouette only: a photo's
// outline includes its paper border and torn edges, which doesn't read as a gun. The guns that
// come out are the collage photos (src/content/gun-photos.ts).

import { goodGuns } from '@/content/good-guns'

type Drawing = {
  w: number
  h: number
  /** The gun itself: inline SVG in the site palette, Deep outlines so it reads on blue. */
  body: string
  /** The paper label, with the gun's name. */
  label: string
}

const ink = 'stroke="#0a1f4d" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"'
const tag = (text: string, x: number, y: number) =>
  `<text x="${x}" y="${y}" font-family="JetBrains Mono Variable, JetBrains Mono, monospace" font-size="11" font-weight="500" fill="#0a1f4d">${text}</text>`
/** Wraps drawing markup in an SVG that fills its box. */
const svg = (w: number, h: number, body: string) =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" overflow="visible">${body}</svg>`

const drawings: Record<string, Drawing> = {
  'heat gun': {
    w: 156,
    h: 112,
    body: `<path d="M58 52 L82 52 L76 104 L50 104 Z" fill="#ffe45c" ${ink}/>
       <rect x="8" y="12" width="104" height="44" rx="20" fill="#ffe45c" ${ink}/>
       <rect x="110" y="20" width="40" height="28" rx="4" fill="#c7daff" ${ink}/>
       <path d="M24 26 v16 M34 26 v16 M44 26 v16" ${ink}/>`,
    label: `<rect x="80" y="60" width="64" height="18" fill="#f7f7f3" ${ink}/>${tag('heat gun', 84, 73)}`,
  },
  'tufting gun': {
    w: 180,
    h: 104,
    body: `<path d="M4 44 C 18 10, 40 70, 30 34" fill="none" stroke="#ffe45c" stroke-width="3" stroke-linecap="round"/>
       <rect x="24" y="26" width="92" height="34" rx="8" fill="#f7f7f3" ${ink}/>
       <path d="M116 40 H160" ${ink}/>
       <path d="M44 58 L64 58 L58 98 L36 98 Z" fill="#f7f7f3" ${ink}/>
       <path d="M86 58 L98 58 L94 84 L82 84 Z" fill="#c7daff" ${ink}/>`,
    label: `<rect x="96" y="70" width="82" height="18" fill="#ffe45c" ${ink}/>${tag('tufting gun', 100, 83)}`,
  },
  'nail gun': {
    w: 164,
    h: 112,
    body: `<rect x="6" y="14" width="118" height="36" rx="10" fill="#0a4cbf" ${ink}/>
       <rect x="124" y="20" width="28" height="56" rx="4" fill="#c7daff" ${ink}/>
       <path d="M30 50 L60 50 L54 100 L26 100 Z" fill="#0a4cbf" ${ink}/>
       <path d="M60 64 L122 74 L122 86 L58 76 Z" fill="#ffe45c" ${ink}/>`,
    label: `<rect x="64" y="90" width="64" height="18" fill="#f7f7f3" ${ink}/>${tag('nail gun', 70, 103)}`,
  },
  'glue gun': {
    w: 158,
    h: 108,
    body: `<rect x="4" y="26" width="34" height="12" rx="6" fill="#f7f7f3" ${ink}/>
       <rect x="34" y="14" width="80" height="38" rx="16" fill="#ffd6d0" ${ink}/>
       <path d="M114 22 L144 30 L144 36 L114 44 Z" fill="#ffd6d0" ${ink}/>
       <path d="M144 33 H154" ${ink}/>
       <path d="M56 50 L80 50 L74 102 L48 102 Z" fill="#ffd6d0" ${ink}/>`,
    label: `<rect x="84" y="62" width="66" height="18" fill="#f7f7f3" ${ink}/>${tag('glue gun', 90, 75)}`,
  },
}

/** Just the body, for a silhouette: callers fill it one colour with CSS (`.gun-silhouette`). */
export function gunSilhouetteSvg(name: string) {
  const d = drawings[name]!
  return svg(d.w, d.h, d.body)
}

export const gunNames = goodGuns.guns.map((gun) => gun.name)
