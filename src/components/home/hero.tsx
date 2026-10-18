import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { Star } from '@/components/brand/star'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { experience, person, yearsOfExperience } from '@/content/profile'
import { track } from '@/lib/analytics'

import type { Toolbox, ToolboxStatus } from './toolbox'

// Home hero (PORT-402), copy from tickets/artifacts/copy.md "Hero (home)", layout from the PORT-007
// canvas. The name stays in the h1's small first line for name searches.
//
// Hero play (PORT-410, option A "carried away"): the star is a button that drops tools into the
// hero. From lg they pile up in a layer over the right-hand side, clear of the copy; below lg a
// small star by the buttons opens a tray under them. The engine (./toolbox) loads on first click.

const previousOrg = experience[1]?.org.replace(/ Unibanco$/, '')

type Area = 'desktop' | 'phone'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Hero() {
  const layer = useRef<HTMLDivElement>(null)
  const tray = useRef<HTMLDivElement>(null)
  const toolboxes = useRef<Partial<Record<Area, Toolbox>>>({})
  const played = useRef(false)
  const [trayOpen, setTrayOpen] = useState(false)
  const [status, setStatus] = useState<ToolboxStatus>({ count: 0 })

  useEffect(() => {
    const boxes = toolboxes.current
    return () => Object.values(boxes).forEach((box) => box?.destroy())
  }, [])

  async function drop(area: Area, star: HTMLElement) {
    if (!played.current) {
      played.current = true
      track('hero_play', {})
    }
    if (area === 'phone' && !trayOpen) flushSync(() => setTrayOpen(true))
    const element = area === 'desktop' ? layer.current : tray.current
    if (!element) return

    let box = toolboxes.current[area]
    if (!box) {
      const { createToolbox } = await import('./toolbox')
      box = createToolbox(element, {
        scale: area === 'desktop' ? 1 : 0.7,
        max: area === 'desktop' ? 16 : 10,
        reducedMotion,
        onChange: setStatus,
      })
      toolboxes.current[area] = box
    }
    box.drop(area === 'desktop' ? star.getBoundingClientRect() : undefined)
  }

  function tidy() {
    toolboxes.current.desktop?.tidy()
    toolboxes.current.phone?.destroy()
    delete toolboxes.current.phone
    setTrayOpen(false)
    setStatus({ count: 0 })
  }

  const statusText = (verb: string) =>
    status.count
      ? `${status.count} ${status.count === 1 ? 'thing' : 'things'} out · latest: ${status.latest}`
      : `${verb} the star. it has things to show you.`

  // The status line and tidy up keep a blue backing so they stay legible over a tall pile.
  const statusLine = (verb: string) => (
    <div className="flex flex-col items-start gap-1 lg:items-center">
      <p
        role="status"
        className="m-0 bg-background font-mono text-caption tracking-wide text-muted-foreground uppercase lg:px-2 lg:text-center"
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

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-[clamp(3rem,6vw,7rem)] pb-[clamp(3.5rem,7vw,7.5rem)]"
    >
      {/* The copy, star and status sit above the tools; only their own boxes take the pointer, so a
          tool under an empty part of the grid can still be grabbed. */}
      <Container className="pointer-events-none relative z-[2] grid grid-cols-12 items-center gap-x-6">
        <div className="pointer-events-auto col-span-12 flex flex-col gap-6 lg:col-span-8">
          <h1 id="hero-heading" className="m-0 font-heading text-h1 text-balance">
            <span className="mb-4 block font-mono text-caption font-normal tracking-normal text-muted-foreground">
              {person.name}, {person.role.toLowerCase()}
            </span>
            Design, and other incidents.
          </h1>
          <p className="m-0 max-w-[34em] text-lead">
            {yearsOfExperience}+ years of product design, data, code, and questionable experiments.
          </p>
          <p className="m-0 font-mono text-caption text-muted-foreground">
            at {person.company}
            {previousOrg && ` · previously ${previousOrg}`}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link to="/work" className={buttonVariants()}>
              See my work
            </Link>
            <a href="#contact" className={buttonVariants({ variant: 'secondary' })}>
              Say hi
            </a>
            <button
              type="button"
              aria-label="Drop a tool from the star"
              onClick={(event) => drop('phone', event.currentTarget)}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-transparent p-0 text-star lg:hidden"
            >
              <Star spinning className="size-11" />
            </button>
          </div>
          <div className="flex flex-col gap-2 lg:hidden">
            {trayOpen && (
              <div
                ref={tray}
                data-testid="hero-tray"
                className="hero-play-area relative h-[230px] overflow-hidden border-y border-dashed border-border bg-notebook"
              />
            )}
            {statusLine('tap')}
          </div>
        </div>
        <div className="col-span-3 col-start-10 hidden flex-col items-center gap-4 lg:flex [&>*]:pointer-events-auto">
          <button
            type="button"
            aria-label="Drop a tool from the star"
            onClick={(event) => drop('desktop', event.currentTarget)}
            className="cursor-pointer rounded-full bg-transparent p-0 text-star"
          >
            <Star spinning className="size-65" />
          </button>
          {statusLine('click')}
        </div>
      </Container>
      <div
        ref={layer}
        data-testid="hero-layer"
        className="hero-play-area pointer-events-none absolute inset-y-0 right-0 left-[66%] z-[1] hidden lg:block"
      />
    </section>
  )
}

export { Hero }
