import type { CSSProperties } from 'react'

import { Window } from '@/components/ui/window'
import { wallOfShame, type ShameItem } from '@/content/wall-of-shame'
import { cn } from '@/lib/utils'

// "wall of shame" (PORT-205): the unfinished corner of the desk, from src/content/wall-of-shame.ts.
// It lives inside the desk panel (./desk), as a column beside the objects from xl and under them
// below that. Not case studies, so nothing here links anywhere. Each project is a small window
// with a retro progress bar; the bar is decoration and the percentage is in the text.

const tilts = ['-1.5deg', '2deg', '-2.5deg', '1deg']
const blocks = 16

function ShameWindow({ item, index }: { item: ShameItem; index: number }) {
  const filled = Math.round((item.progress / 100) * blocks)
  return (
    <li
      style={{ '--tilt': tilts[index % tilts.length] } as CSSProperties}
      className="rotate-(--tilt)"
    >
      <Window title={`${item.slug}.wip`} meta={item.status}>
        <span className="flex flex-col gap-2 p-3">
          <span className="font-heading text-[1.25rem] leading-[1.1] font-semibold tracking-[-0.02em] text-paper-foreground">
            {item.name}
          </span>
          <span className="text-caption">{item.line}</span>
          <span aria-hidden="true" className="flex h-2.5 gap-px border border-deep p-px">
            {Array.from({ length: blocks }, (_, block) => (
              <i key={block} className={block < filled ? 'flex-1 bg-deep' : 'flex-1'} />
            ))}
          </span>
          <span className="font-mono text-[0.75rem] text-paper-muted">{item.progress}% done</span>
        </span>
      </Window>
    </li>
  )
}

function WallOfShame({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="shame-heading"
      className={cn('flex flex-col gap-4 border-dashed border-border', className)}
    >
      <div className="flex flex-col gap-1">
        <h3 id="shame-heading" className="m-0 w-fit bg-background px-1 font-heading text-h3">
          wall of shame
        </h3>
        <p className="m-0 w-fit bg-background px-1 font-mono text-caption text-muted-foreground">
          started, never finished. yet.
        </p>
      </div>
      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 xl:grid-cols-1">
        {wallOfShame.map((item, index) => (
          <ShameWindow key={item.slug} item={item} index={index} />
        ))}
      </ul>
    </section>
  )
}

export { WallOfShame }
