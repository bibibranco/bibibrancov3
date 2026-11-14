// Hero mystery gun (PORT-205): the button throws the good guns (src/content/good-guns.ts) into the
// hero. Each one flies from the button to a free spot anywhere in the area, over the copy too,
// without landing on another gun or on the areas passed in `avoid` (the button column). Drag a
// gun to move it; it stays where it's dropped. Plain DOM, no library, loaded on the first click.
// The guns are decoration (aria-hidden); the hero's status line says which one is out.

import { goodGuns } from '@/content/good-guns'

import { gunSize, gunSvg } from './good-guns-art'

type Kind = {
  kind: string
  label: string
  w: number
  h: number
  /** Inline SVG, drawn in the site palette with Deep outlines so it reads on blue. */
  inner: string
}

const kinds: Kind[] = goodGuns.guns.map((gun) => ({
  kind: gun.name.replace(' ', '-'),
  label: gun.name,
  ...gunSize(gun.name),
  inner: gunSvg(gun.name),
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
    /** Throws gun `index` (or the next in turn) from `from`, the hero button's box. */
    drop(from?: DOMRect, index?: number) {
      const def = kinds[(index ?? dropped) % kinds.length]!
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
