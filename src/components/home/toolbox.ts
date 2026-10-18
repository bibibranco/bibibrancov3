// Hero play (PORT-410): the star drops tools that fall, pile up and can be thrown. Plain DOM and a
// hand-rolled gravity loop, no library. hero.tsx imports this on the first click, so none of it is
// in the page's first load. The tools are decoration (aria-hidden); the hero's status line says
// what's out.

type Kind = {
  kind: string
  label: string
  w: number
  h: number
  /** Inner markup: text, or empty spans that CSS draws (ears, the photo). */
  inner?: string
}

const kinds: Kind[] = [
  { kind: 'pencil', label: 'a pencil', w: 150, h: 18 },
  { kind: 'ruler', label: 'a ruler', w: 170, h: 30, inner: 'cm' },
  { kind: 'terminal', label: 'a terminal', w: 124, h: 78, inner: '$ pnpm dev' },
  { kind: 'wood', label: 'a wood offcut', w: 130, h: 40 },
  { kind: 'sticky', label: 'a sticky note', w: 84, h: 84, inner: 'todo: everything' },
  { kind: 'rat', label: 'a rat mask', w: 92, h: 72, inner: '<span></span><span></span>• •' },
  { kind: 'polaroid', label: 'a polaroid', w: 88, h: 104, inner: '<span></span>' },
  { kind: 'chip', label: 'a paint chip', w: 64, h: 96, inner: '<span></span>star' },
]

type Tool = {
  el: HTMLElement
  label: string
  /** Unscaled size (the element's CSS size) and the scaled footprint used for physics. */
  w0: number
  h0: number
  w: number
  h: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  vr: number
  tilt: number
  rest: boolean
}

export type ToolboxStatus = { count: number; latest?: string }

export type ToolboxOptions = {
  /** Phones get smaller tools and fewer of them. */
  scale: number
  max: number
  reducedMotion: () => boolean
  onChange: (status: ToolboxStatus) => void
}

const gravity = 0.55
const maxThrow = 25

export function createToolbox(area: HTMLElement, options: ToolboxOptions) {
  const tools: Tool[] = []
  let dropped = 0
  let frame = 0
  let dragged: Tool | undefined
  let grip = { ox: 0, oy: 0, lx: 0, ly: 0, vx: 0, vy: 0 }

  const size = () => ({ W: area.clientWidth, H: area.clientHeight })
  const local = (event: PointerEvent) => {
    const rect = area.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }
  const notify = () => options.onChange({ count: tools.length, latest: tools.at(-1)?.label })

  function render(tool: Tool) {
    const k = tool.w / tool.w0
    const tx = tool.x - (tool.w0 - tool.w) / 2
    const ty = tool.y - (tool.h0 - tool.h) / 2
    tool.el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) rotate(${tool.r.toFixed(1)}deg) scale(${k})`
  }

  /** The highest resting tool under `tool`, or the floor. */
  function surface(tool: Tool, H: number) {
    let top = H - 4
    for (const other of tools) {
      if (other === tool || !other.rest) continue
      const overlaps = other.x < tool.x + tool.w - 6 && other.x + other.w > tool.x + 6
      if (overlaps && other.y > tool.y) top = Math.min(top, other.y)
    }
    return top
  }

  // Reduced motion: no falling or throwing. The pile is laid out in rows from the floor up.
  function stack() {
    const { W, H } = size()
    let x = 4
    let base = H - 4
    let rowH = 0
    for (const tool of tools) {
      if (x + tool.w > W - 4) {
        x = 4
        base -= rowH + 6
        rowH = 0
      }
      Object.assign(tool, { x, y: base - tool.h, r: tool.tilt, vx: 0, vy: 0, vr: 0, rest: true })
      render(tool)
      x += tool.w + 8
      rowH = Math.max(rowH, tool.h)
    }
  }

  function step() {
    frame = 0
    const { W, H } = size()
    let moving = Boolean(dragged)
    for (const tool of tools) {
      if (tool === dragged) continue
      if (tool.rest) {
        if (tool.y + tool.h >= surface(tool, H) - 2) continue
        tool.rest = false
      }
      tool.vy = Math.min(tool.vy + gravity, 24)
      tool.x += tool.vx
      tool.y += tool.vy
      tool.r += tool.vr
      if (tool.x < 0) {
        tool.x = 0
        tool.vx = -tool.vx * 0.5
      }
      if (tool.x + tool.w > W) {
        tool.x = W - tool.w
        tool.vx = -tool.vx * 0.5
      }
      const floor = surface(tool, H)
      if (tool.y + tool.h >= floor) {
        tool.y = floor - tool.h
        if (Math.abs(tool.vy) < 3) {
          // Settle upright, at the tool's own small tilt.
          tool.vy = 0
          tool.vx *= 0.75
          tool.vr = 0
          const target = tool.tilt + 360 * Math.round((tool.r - tool.tilt) / 360)
          tool.r += (target - tool.r) * 0.3
          if (Math.abs(tool.vx) < 0.2 && Math.abs(target - tool.r) < 0.6) {
            Object.assign(tool, { r: tool.tilt, vx: 0, rest: true })
          }
        } else {
          tool.vy = -tool.vy * 0.35
          tool.vr *= 0.6
        }
      }
      render(tool)
      if (!tool.rest) moving = true
    }
    if (moving) start()
  }

  function start() {
    if (!frame) frame = requestAnimationFrame(step)
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragged) return
    const { W, H } = size()
    const p = local(event)
    dragged.x = Math.max(0, Math.min(W - dragged.w, p.x - grip.ox))
    dragged.y = Math.min(H - dragged.h - 4, p.y - grip.oy)
    grip.vx = grip.vx * 0.5 + (p.x - grip.lx) * 0.5
    grip.vy = grip.vy * 0.5 + (p.y - grip.ly) * 0.5
    grip.lx = p.x
    grip.ly = p.y
    render(dragged)
  }

  function onPointerUp() {
    if (!dragged) return
    const clamp = (v: number) => Math.max(-maxThrow, Math.min(maxThrow, v))
    Object.assign(dragged, { vx: clamp(grip.vx), vy: clamp(grip.vy), vr: clamp(grip.vx) * 0.8 })
    dragged.el.removeAttribute('data-dragging')
    dragged = undefined
    start()
  }

  function grab(tool: Tool, event: PointerEvent) {
    if (options.reducedMotion()) return
    event.preventDefault()
    const p = local(event)
    dragged = tool
    tool.rest = false
    tool.el.setAttribute('data-dragging', '')
    grip = { ox: p.x - tool.x, oy: p.y - tool.y, lx: p.x, ly: p.y, vx: 0, vy: 0 }
    start()
  }

  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)

  return {
    /** Drops the next tool from `from` (the star's box), or from the area's top-right corner. */
    drop(from?: DOMRect) {
      const def = kinds[dropped % kinds.length]!
      dropped += 1
      const w = Math.round(def.w * options.scale)
      const h = Math.round(def.h * options.scale)
      const { W } = size()
      let x = W - w - 12
      let y = 4
      if (from) {
        const rect = area.getBoundingClientRect()
        x = from.left + from.width / 2 - rect.left - w / 2
        y = from.top + from.height / 2 - rect.top - h / 2
      }

      const el = document.createElement('div')
      el.className = `hero-tool hero-tool-${def.kind}`
      el.setAttribute('aria-hidden', 'true')
      el.style.width = `${def.w}px`
      el.style.height = `${def.h}px`
      el.innerHTML = def.inner ?? ''
      area.append(el)

      const tool: Tool = {
        el,
        label: def.label,
        w0: def.w,
        h0: def.h,
        w,
        h,
        x,
        y,
        // Mostly leftward, some to the right, so the pile spreads instead of stacking up.
        vx: Math.random() * 8 - 6,
        vy: -(3 + Math.random() * 6),
        r: 0,
        vr: (Math.random() - 0.5) * 14,
        tilt: Math.round(Math.random() * 10 - 5),
        rest: false,
      }
      el.addEventListener('pointerdown', (event) => grab(tool, event))
      tools.push(tool)
      if (tools.length > options.max) tools.shift()?.el.remove()

      if (options.reducedMotion()) stack()
      else {
        render(tool)
        start()
      }
      notify()
    },
    tidy() {
      for (const tool of tools) tool.el.remove()
      tools.length = 0
      dragged = undefined
      notify()
    },
    destroy() {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      for (const tool of tools) tool.el.remove()
    },
  }
}

export type Toolbox = ReturnType<typeof createToolbox>
