import type { ReactNode } from 'react'

import { Picture } from '@/components/ui/image'
import { useProjectImage } from '@/lib/project-images'
import { cn } from '@/lib/utils'

// Case-study blocks from PORT-005 (wireframes.md, "Case-study content blocks"). Layout inside the
// reading column (full-bleed breakout, margin notes) is PORT-406's job; these set content and
// semantics. Figures are numbered "fig. N" by the `fig-label` utility; MdxContent resets the count.

/**
 * Highlights (PORT-205): stats, pull quotes, full-width figures and image pairs sit on a blue band
 * with the notebook grid, breaking out of the solid Deep reading panel. Plain text never sits on
 * the grid. `data-highlight` lets the case-study layout span and bleed them.
 */
// Vertical padding only: the case-study layout sets the side padding to match its bleed, so a
// band's content lines up with the text column.
const highlightClass = 'highlight-band py-10 md:py-14'

/** `src` is a file next to the project's MDX, like `./fig-1.jpg`. */
type Img = { src: string; alt: string }

// Rendered widths for `sizes`: the reading column tops out near 720px (65ch).
const COLUMN = '(min-width: 768px) 720px, 100vw'
const HALF_COLUMN = '(min-width: 768px) 360px, (min-width: 360px) 50vw, 100vw'

function ProjectImage({ src, alt, sizes }: Img & { sizes: string }) {
  const image = useProjectImage(src)
  return <Picture image={image} alt={alt} sizes={sizes} className="w-full" />
}

function Caption({ children }: { children?: ReactNode }) {
  return (
    <figcaption className="flex flex-col gap-1 text-caption text-muted-foreground">
      <span className="font-mono text-label uppercase fig-label" />
      {children}
    </figcaption>
  )
}

type FigureProps = Img & {
  caption?: ReactNode
  /** `full` breaks out of the text column to full-bleed (PORT-406). */
  size?: 'column' | 'full'
}

function Figure({ src, alt, caption, size = 'column' }: FigureProps) {
  return (
    <figure
      data-slot="figure"
      data-size={size}
      data-highlight={size === 'full' || undefined}
      className={cn(
        'm-0 flex flex-col gap-2',
        size === 'full'
          ? highlightClass
          : // From lg the caption sits in the margin column, beside the image, bottom-aligned
            // (PORT-205). Same columns and gap as the case-study grid.
            'lg:grid lg:grid-cols-[minmax(0,var(--measure))_var(--margin-width)] lg:items-end lg:gap-x-10',
      )}
    >
      <ProjectImage src={src} alt={alt} sizes={size === 'full' ? '100vw' : COLUMN} />
      <Caption>{caption}</Caption>
    </figure>
  )
}

type ImagePairProps = { images: [Img, Img]; caption?: ReactNode }

/** Before/after or a comparison. Stacks below 360px. */
function ImagePair({ images, caption }: ImagePairProps) {
  return (
    <figure
      data-slot="image-pair"
      data-highlight
      className={cn('m-0 flex flex-col gap-2', highlightClass)}
    >
      <div className="grid gap-3 min-[360px]:grid-cols-2">
        {images.map((image) => (
          <ProjectImage key={image.src} {...image} sizes={HALF_COLUMN} />
        ))}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  )
}

type QuoteProps = { children: ReactNode; cite?: string }

function Quote({ children, cite }: QuoteProps) {
  return (
    <figure
      data-slot="quote"
      data-highlight
      className={cn('m-0 flex flex-col gap-3', highlightClass)}
    >
      <blockquote className="m-0 max-w-[24ch] font-heading text-h2 text-balance md:text-h1 [&>p]:m-0">
        {children}
      </blockquote>
      {cite && <figcaption className="text-small text-muted-foreground">— {cite}</figcaption>}
    </figure>
  )
}

type StatsProps = { items: { value: string; label: string }[] }

/** 2–4 outcomes. Real, NDA-cleared numbers only. */
function Stats({ items }: StatsProps) {
  return (
    <dl
      data-slot="stats"
      data-highlight
      className={cn('m-0 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4', highlightClass)}
    >
      {/* Ruled columns: number over a mono label, thin rule on the left (PORT-205). */}
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-0 flex-col-reverse justify-end gap-2 border-l border-border pl-4"
        >
          <dt className="font-mono text-caption text-muted-foreground">{item.label}</dt>
          <dd className="m-0 font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

type SpecsProps = { rows: { label: string; value: string }[]; caption?: string }

/** Craft projects: materials, tools, time. */
function Specs({ rows, caption }: SpecsProps) {
  return (
    <table data-slot="specs" className="border-collapse text-small">
      {caption && (
        <caption className="mb-2 text-left text-caption text-muted-foreground">{caption}</caption>
      )}
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-t border-border">
            <th scope="row" className="py-2 pr-6 text-left font-mono text-label uppercase">
              {row.label}
            </th>
            <td className="py-2">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type MarginNoteProps = { children: ReactNode }

/**
 * A fact or aside for the paragraph before it: in the margin column on desktop (≥ lg), inline
 * below that. The main text must make sense without it.
 */
function MarginNote({ children }: MarginNoteProps) {
  return (
    <aside
      data-slot="margin-note"
      className="border-l border-border pl-3 text-note text-muted-foreground [&>p]:m-0"
    >
      {children}
    </aside>
  )
}

type LeadProps = { children: ReactNode }

/**
 * Emphasised passage (PORT-205): the same text at lead size, on the Deep panel (it's text, so no
 * grid). Bold inside it (**…**) turns star yellow, for the turning point of the paragraph.
 */
function Lead({ children }: LeadProps) {
  return (
    <div
      data-slot="lead"
      className="flex flex-col gap-6 font-heading text-[clamp(1.25rem,1.6vw,1.625rem)] leading-[1.4] font-medium tracking-[-0.01em] text-balance [&_strong]:font-semibold [&_strong]:text-star [&>p]:m-0 [&>p]:max-w-[36em]"
    >
      {children}
    </div>
  )
}

type RequirementsProps = { children: ReactNode }

/**
 * A numbered set of requirements or principles (PORT-205). Text, so it stays on the Deep panel, no
 * grid. Each <Requirement> is a ruled row: a big mono number, the requirement as a heading, and
 * the reasoning under it. Spans the text and margin columns on desktop.
 */
function Requirements({ children }: RequirementsProps) {
  return (
    <ol
      data-slot="requirements"
      className="m-0 flex list-none flex-col border-t border-border p-0 [counter-reset:req]"
    >
      {children}
    </ol>
  )
}

type RequirementProps = { title: string; children: ReactNode }

function Requirement({ title, children }: RequirementProps) {
  return (
    <li className="grid gap-x-8 gap-y-3 border-b border-border py-6 [counter-increment:req] md:grid-cols-[4.5rem_minmax(0,1fr)] md:py-8">
      <span
        aria-hidden="true"
        className="font-mono text-h2 leading-none text-star before:content-[counter(req,decimal-leading-zero)]"
      />
      <div className="flex flex-col gap-3">
        <h3 className="m-0 font-heading text-h3 text-balance">{title}</h3>
        <div className="flex flex-col gap-3 text-muted-foreground [&>p]:m-0 [&>p]:max-w-measure">
          {children}
        </div>
      </div>
    </li>
  )
}

export { Figure, ImagePair, Quote, Stats, Specs, MarginNote, Requirements, Requirement, Lead }
