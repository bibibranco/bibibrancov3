import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { Container } from '@/components/ui/layout'
import { BigLink, bigLinkClass } from '@/components/ui/text-link'
import { Window } from '@/components/ui/window'
import { geralNotes, toBase64 } from '@/content/geral'
import { goodGuns } from '@/content/good-guns'
import { experience, person, yearsOfExperience } from '@/content/profile'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

import type { Toolbox, ToolboxStatus } from './gun-drop'
import { GunIcon } from './gun-icon'

/** Muzzle tip of GunIcon, as fractions of its 120×80 drawing: the good guns fly out of here. */
const MUZZLE = { x: 4 / 120, y: 22 / 80 }

// Home hero (PORT-402), copy from tickets/artifacts/copy.md "Hero (home)", layout from the PORT-007
// canvas. The name stays in the h1's small first line for name searches.
//
// PORT-205 (typesafe.ai reference): grainy cloud behind the top (drawn in __root so it runs under
// the header), a "now" window pinned over the star from lg (above the headline below that), a
// display-size headline, and big underlined text links instead of pill buttons. The vertical
// string on the left is base64 for Geral do Grêmio songs (src/content/geral.ts); it's decoration
// and hidden from assistive tech.
//
// The star throws the good guns (src/content/good-guns.ts), a project still to be built
// (./gun-drop, loaded on first click). From lg each gun lands on a free spot anywhere in the hero,
// over the copy too, but never on the star column; below lg they land in a tray under the links.
// Guns can be dragged anywhere and stay put. The status line says which gun is out.

const previousOrg = experience[1]?.org.replace(/ Unibanco$/, '')

/** "now" window with the current role. Beside the star from lg, above the headline below that. */
function NowTag({ className }: { className?: string }) {
  return (
    <Window title="now" className={className}>
      <span className="block px-3 py-2 font-mono text-caption">
        {person.role} at {person.company}
        {previousOrg && ` · previously ${previousOrg}`}
      </span>
    </Window>
  )
}

type Area = 'desktop' | 'phone'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** "See my work" and "Say hi": big links, a step down from the CTA rows elsewhere. */
const heroLink = 'text-h3 md:text-h2'

function Hero() {
  const layer = useRef<HTMLDivElement>(null)
  const tray = useRef<HTMLDivElement>(null)
  const starColumn = useRef<HTMLDivElement>(null)
  const boxes = useRef<Partial<Record<Area, Toolbox>>>({})
  const played = useRef(false)
  const [trayOpen, setTrayOpen] = useState(false)
  const [status, setStatus] = useState<ToolboxStatus>({ count: 0 })

  useEffect(() => {
    const current = boxes.current
    return () => Object.values(current).forEach((box) => box?.destroy())
  }, [])

  /** The muzzle tip on screen, as a zero-size rect: where the good guns fly out from. */
  function muzzle(button: HTMLElement) {
    const svg = button.querySelector('svg')!.getBoundingClientRect()
    return new DOMRect(svg.left + MUZZLE.x * svg.width, svg.top + MUZZLE.y * svg.height, 0, 0)
  }

  // The silly simulation: the gun kicks back and a "pew!" puffs out of the muzzle. Reduced
  // motion skips it; the guns still land.
  function fire(button: HTMLElement) {
    if (reducedMotion()) return
    button.querySelector('[data-recoil]')?.animate(
      [
        { translate: '0 0', rotate: '0deg' },
        { translate: '12% 0', rotate: '9deg', offset: 0.18 },
        { translate: '-2% 0', rotate: '-2deg', offset: 0.6 },
        { translate: '0 0', rotate: '0deg' },
      ],
      { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    )
    const puff = document.createElement('span')
    puff.setAttribute('aria-hidden', 'true')
    puff.textContent = 'pew!'
    puff.className =
      'pointer-events-none absolute z-[4] -translate-x-full -translate-y-1/2 rounded-full bg-ice px-2 font-mono text-caption font-medium text-deep'
    puff.style.left = `${MUZZLE.x * 100}%`
    puff.style.top = `${MUZZLE.y * 100}%`
    button.append(puff)
    puff
      .animate(
        [
          { opacity: 1, scale: 0.4, translate: '0 0' },
          { opacity: 1, scale: 1.1, translate: '-18px -6px', offset: 0.35 },
          { opacity: 0, scale: 1, translate: '-34px -14px' },
        ],
        { duration: 650, easing: 'ease-out' },
      )
      .finished.finally(() => puff.remove())
  }

  async function drop(area: Area, button: HTMLElement) {
    fire(button)
    if (!played.current) {
      played.current = true
      track('hero_play', {})
    }
    if (area === 'phone' && !trayOpen) flushSync(() => setTrayOpen(true))
    const element = area === 'desktop' ? layer.current : tray.current
    if (!element) return

    let box = boxes.current[area]
    if (!box) {
      const { createToolbox } = await import('./gun-drop')
      box = createToolbox(element, {
        scale: area === 'desktop' ? 1 : 0.7,
        max: area === 'desktop' ? 5 : 4,
        reducedMotion,
        onChange: setStatus,
        // Keep the gun, the now tag and the status line clear, so the gun stays clickable.
        avoid: () =>
          area === 'desktop' && starColumn.current
            ? [starColumn.current.getBoundingClientRect()]
            : [],
      })
      boxes.current[area] = box
    }
    box.drop(area === 'desktop' ? muzzle(button) : undefined)
  }

  function tidy() {
    boxes.current.desktop?.tidy()
    boxes.current.phone?.destroy()
    delete boxes.current.phone
    setTrayOpen(false)
    setStatus({ count: 0 })
  }

  const latest = goodGuns.guns.find((gun) => gun.name === status.latest)
  const statusText = (verb: string) =>
    latest ? `${latest.name}: ${latest.line}` : `${verb} the gun. it has a project in it.`

  // Once guns are out, the status line and tidy up get a blue backing so they stay legible over the
  // pile. Before that there's nothing under them but the hero cloud.
  // The status area keeps a fixed height from lg (room for the project line, a two-line gun line
  // and "tidy up"), so the star column never grows when guns come out. Otherwise the centred
  // hero re-centres and the star jumps.
  const statusLine = (verb: string) => (
    <div className="flex flex-col items-start gap-1 lg:h-36 lg:items-center">
      {status.count > 0 && (
        <p className="m-0 bg-background font-mono text-caption text-foreground lg:px-2 lg:text-center">
          {goodGuns.title}, a project i still want to build
        </p>
      )}
      <p
        role="status"
        className={cn(
          'm-0 font-mono text-caption tracking-wide text-muted-foreground uppercase lg:px-2 lg:text-center',
          status.count > 0 && 'bg-background',
        )}
      >
        {statusText(verb)}
      </p>
      {status.count > 0 && (
        <button
          type="button"
          onClick={tidy}
          className="min-h-11 cursor-pointer bg-background px-2 font-mono text-caption text-foreground underline underline-offset-[3px] max-lg:px-0"
        >
          tidy up
        </button>
      )}
    </div>
  )

  // The toy gun (PORT-205, replaced the star): sways a little while idle, recoils on click.
  const gunButton = (size: string, area: Area) => (
    <button
      type="button"
      aria-label="Fire a good gun"
      onClick={(event) => drop(area, event.currentTarget)}
      className="relative inline-flex cursor-pointer items-center justify-center bg-transparent p-0 text-star"
    >
      <span data-recoil className="block origin-[70%_60%]">
        <GunIcon className={cn('origin-[70%_60%] motion-safe:animate-gun-idle', size)} />
      </span>
    </button>
  )

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center py-[clamp(2rem,4vw,4rem)]"
    >
      <p
        aria-hidden="true"
        className="absolute top-[45%] left-[max(0.5rem,calc((100vw-var(--container-max))/2-2rem))] m-0 hidden origin-top-left -rotate-90 font-mono text-[0.625rem] tracking-[0.08em] text-muted-foreground/70 select-none xl:block"
      >
        {toBase64(geralNotes.join(' · '))}
      </p>
      {/* The guns land on top of everything. The copy's grid ignores the pointer outside its own
          boxes, and the gun layer only takes it on the guns themselves. The hero fills the screen
          under the header, so the desk starts at the fold. */}
      <Container className="pointer-events-none relative z-[2] grid grid-cols-12 items-center gap-x-6">
        <div className="pointer-events-auto col-span-12 flex flex-col gap-6 lg:col-span-9">
          <NowTag className="w-fit max-w-full lg:hidden" />
          <h1 id="hero-heading" className="m-0 font-heading text-display text-balance">
            <span className="mb-4 block font-mono text-caption font-normal tracking-normal text-muted-foreground">
              {person.name}, {person.role.toLowerCase()}
            </span>
            Design, and other incidents.
          </h1>
          <p className="m-0 max-w-[34em] text-lead">
            {yearsOfExperience}+ years of product design, data, code, and questionable experiments.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-3">
            <BigLink to="/work" className={heroLink}>
              See my work
            </BigLink>
            <a href="#contact" className={cn(bigLinkClass, heroLink)}>
              Say hi
            </a>
            <span className="lg:hidden">{gunButton('w-14 h-auto', 'phone')}</span>
          </div>
          <div className="flex flex-col gap-2 lg:hidden">
            {trayOpen && (
              <div
                ref={tray}
                data-testid="hero-tray"
                className="hero-play-area relative h-[230px] overflow-hidden border-y border-dashed border-border bg-dots"
              />
            )}
            {statusLine('tap')}
          </div>
        </div>
        <div
          ref={starColumn}
          className="relative col-span-3 col-start-10 hidden flex-col items-center gap-4 lg:flex [&>*]:pointer-events-auto"
        >
          {/* Pinned above the gun, clear of the barrel so the "pew!" shows. */}
          <NowTag className="relative z-[1] mb-2 w-full -rotate-3" />
          {gunButton('w-60 h-auto', 'desktop')}
          {statusLine('click')}
        </div>
      </Container>
      <div
        ref={layer}
        data-testid="hero-layer"
        className="hero-play-area pointer-events-none absolute inset-0 z-[3] hidden lg:block"
      />
    </section>
  )
}

export { Hero }
