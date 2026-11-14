// Hero star (PORT-205): the star throws the good guns (src/content/good-guns.ts) into the hero.
// Each one flies from the star to a free spot anywhere in the area, over the copy too, without
// landing on another gun or on the areas passed in `avoid` (the star and its status line). Drag a
// gun to move it; it stays where it's dropped. Plain DOM, no library, loaded on the first click.
// The guns are decoration (aria-hidden); the hero's status line says which one is out.

import { goodGuns } from '@/content/good-guns'

type Kind = {
  kind: string
  label: string
  w: number
  h: number
  /** Inline SVG, drawn in the site palette with Deep outlines so it reads on blue. */
  inner: string
}

const ink = 'stroke="#0a1f4d" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"'
const tag = (text: string, x: number, y: number) =>
  `<text x="${x}" y="${y}" font-family="JetBrains Mono Variable, JetBrains Mono, monospace" font-size="11" font-weight="500" fill="#0a1f4d">${text}</text>`
const svg = (w: number, h: number, body: string) =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" overflow="visible">${body}</svg>`

const drawings: Record<string, Omit<Kind, 'kind' | 'label'>> = {
  'heat gun': {
    w: 156,
    h: 112,
    inner: svg(
      156,
      112,
      `<path d="M58 52 L82 52 L76 104 L50 104 Z" fill="#ffe45c" ${ink}/>
       <rect x="8" y="12" width="104" height="44" rx="20" fill="#ffe45c" ${ink}/>
       <rect x="110" y="20" width="40" height="28" rx="4" fill="#c7daff" ${ink}/>
       <path d="M24 26 v16 M34 26 v16 M44 26 v16" ${ink}/>
       <rect x="80" y="60" width="64" height="18" fill="#f7f7f3" ${ink}/>${tag('heat gun', 84, 73)}`,
    ),
  },
  'tufting gun': {
    w: 180,
    h: 104,
    inner: svg(
      180,
      104,
      `<path d="M4 44 C 18 10, 40 70, 30 34" fill="none" stroke="#ffe45c" stroke-width="3" stroke-linecap="round"/>
       <rect x="24" y="26" width="92" height="34" rx="8" fill="#f7f7f3" ${ink}/>
       <path d="M116 40 H160" ${ink}/>
       <path d="M44 58 L64 58 L58 98 L36 98 Z" fill="#f7f7f3" ${ink}/>
       <path d="M86 58 L98 58 L94 84 L82 84 Z" fill="#c7daff" ${ink}/>
       <rect x="96" y="70" width="82" height="18" fill="#ffe45c" ${ink}/>${tag('tufting gun', 100, 83)}`,
    ),
  },
  'nail gun': {
    w: 164,
    h: 112,
    inner: svg(
      164,
      112,
      `<rect x="6" y="14" width="118" height="36" rx="10" fill="#0a4cbf" ${ink}/>
       <rect x="124" y="20" width="28" height="56" rx="4" fill="#c7daff" ${ink}/>
       <path d="M30 50 L60 50 L54 100 L26 100 Z" fill="#0a4cbf" ${ink}/>
       <path d="M60 64 L122 74 L122 86 L58 76 Z" fill="#ffe45c" ${ink}/>
       <rect x="64" y="90" width="64" height="18" fill="#f7f7f3" ${ink}/>${tag('nail gun', 70, 103)}`,
    ),
  },
  'glue gun': {
    w: 158,
    h: 108,
    inner: svg(
      158,
      108,
      `<rect x="4" y="26" width="34" height="12" rx="6" fill="#f7f7f3" ${ink}/>
       <rect x="34" y="14" width="80" height="38" rx="16" fill="#ffd6d0" ${ink}/>
       <path d="M114 22 L144 30 L144 36 L114 44 Z" fill="#ffd6d0" ${ink}/>
       <path d="M144 33 H154" ${ink}/>
       <path d="M56 50 L80 50 L74 102 L48 102 Z" fill="#ffd6d0" ${ink}/>
       <rect x="84" y="62" width="66" height="18" fill="#f7f7f3" ${ink}/>${tag('glue gun', 90, 75)}`,
    ),
  },
}

const kinds: Kind[] = goodGuns.guns.map((gun) => ({
  kind: gun.name.replace(' ', '-'),
  label: gun.name,
  ...drawings[gun.name]!,
}))

type Gun = {
  el: HTMLElement
  label: string
  w: number
  h: number
  x: number
  y: number
  r: number
}

export type ToolboxStatus = { count: number; latest?: string }

export type ToolboxOptions = {
  /** Phones get smaller guns and fewer of them. */
  scale: number
  max: number
  reducedMotion: () => boolean
  onChange: (status: ToolboxStatus) => void
  /** Boxes (viewport coordinates) a new gun must not land on. */
  avoid?: () => DOMRect[]
}

type Box = { x: number; y: number; w: number; h: number }

const gap = 12
const overlap = (a: Box, b: Box) =>
  Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + gap) *
  Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + gap)

export function createToolbox(area: HTMLElement, options: ToolboxOptions) {
  const guns: Gun[] = []
  let dropped = 0
  let dragged: { gun: Gun; ox: number; oy: number } | undefined

  const size = () => ({ W: area.clientWidth, H: area.clientHeight })
  const local = (x: number, y: number) => {
    const rect = area.getBoundingClientRect()
    return { x: x - rect.left, y: y - rect.top }
  }
  const notify = () => options.onChange({ count: guns.length, latest: guns.at(-1)?.label })

  function place(gun: Gun) {
    gun.el.style.transform = `translate(${gun.x.toFixed(1)}px, ${gun.y.toFixed(1)}px) rotate(${gun.r}deg)`
  }

  /** The free spot with the least overlap, from a batch of random tries. */
  function spot(w: number, h: number): { x: number; y: number } {
    const { W, H } = size()
    const blocked: Box[] = [
      ...guns.map((gun) => ({ x: gun.x, y: gun.y, w: gun.w, h: gun.h })),
      ...(options.avoid?.() ?? []).map((rect) => {
        const p = local(rect.left, rect.top)
        return { x: p.x, y: p.y, w: rect.width, h: rect.height }
      }),
    ]
    let best = { x: Math.max(0, W - w) / 2, y: Math.max(0, H - h) / 2 }
    let bestScore = Infinity
    for (let i = 0; i < 80; i++) {
      const candidate = {
        x: gap + Math.random() * Math.max(0, W - w - 2 * gap),
        y: gap + Math.random() * Math.max(0, H - h - 2 * gap),
      }
      const score = blocked.reduce((sum, box) => sum + overlap({ ...candidate, w, h }, box), 0)
      if (score < bestScore) {
        best = candidate
        bestScore = score
        if (score === 0) break
      }
    }
    return best
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragged) return
    const { W, H } = size()
    const p = local(event.clientX, event.clientY)
    const { gun } = dragged
    gun.x = Math.max(0, Math.min(W - gun.w, p.x - dragged.ox))
    gun.y = Math.max(0, Math.min(H - gun.h, p.y - dragged.oy))
    place(gun)
  }

  function onPointerUp() {
    if (!dragged) return
    dragged.gun.el.removeAttribute('data-dragging')
    dragged = undefined
  }

  function grab(gun: Gun, event: PointerEvent) {
    event.preventDefault()
    const p = local(event.clientX, event.clientY)
    dragged = { gun, ox: p.x - gun.x, oy: p.y - gun.y }
    gun.el.setAttribute('data-dragging', '')
    // The gun being moved comes to the front.
    area.append(gun.el)
  }

  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)

  return {
    /** Throws the next gun from `from` (the star's box) to a free spot. */
    drop(from?: DOMRect) {
      const def = kinds[dropped % kinds.length]!
      dropped += 1
      const w = Math.round(def.w * options.scale)
      const h = Math.round(def.h * options.scale)
      const target = spot(w, h)

      const el = document.createElement('div')
      el.className = `hero-tool hero-tool-${def.kind}`
      el.setAttribute('aria-hidden', 'true')
      el.style.width = `${w}px`
      el.style.height = `${h}px`
      el.innerHTML = def.inner
      area.append(el)

      const gun: Gun = {
        el,
        label: def.label,
        w,
        h,
        ...target,
        r: Math.round(Math.random() * 16 - 8),
      }
      el.addEventListener('pointerdown', (event) => grab(gun, event))
      guns.push(gun)
      if (guns.length > options.max) guns.shift()?.el.remove()
      place(gun)

      if (from && !options.reducedMotion()) {
        const start = local(from.left + from.width / 2 - w / 2, from.top + from.height / 2 - h / 2)
        el.animate(
          [
            {
              transform: `translate(${start.x}px, ${start.y}px) rotate(${gun.r - 220}deg) scale(0.3)`,
            },
            { transform: el.style.transform },
          ],
          { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        )
      }
      notify()
    },
    tidy() {
      for (const gun of guns) gun.el.remove()
      guns.length = 0
      dragged = undefined
      notify()
    },
    destroy() {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      for (const gun of guns) gun.el.remove()
    },
  }
}

export type Toolbox = ReturnType<typeof createToolbox>
