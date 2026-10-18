import type { ReactNode } from 'react'

import { Image } from '@/components/ui/image'

// Case-study blocks from PORT-005 (wireframes.md, "Case-study content blocks"). Layout inside the
// reading column (full-bleed breakout, margin notes) is PORT-406's job; these set content and
// semantics. Figures are numbered "fig. N" by the `fig-label` utility; MdxContent resets the count.

type Img = { src: string; alt: string }

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
    <figure data-slot="figure" data-size={size} className="m-0 flex flex-col gap-2">
      <Image src={src} alt={alt} className="w-full" />
      <Caption>{caption}</Caption>
    </figure>
  )
}

type ImagePairProps = { images: [Img, Img]; caption?: ReactNode }

/** Before/after or a comparison. Stacks below 360px. */
function ImagePair({ images, caption }: ImagePairProps) {
  return (
    <figure data-slot="image-pair" className="m-0 flex flex-col gap-2">
      <div className="grid gap-3 min-[360px]:grid-cols-2">
        {images.map((image) => (
          <Image key={image.src} src={image.src} alt={image.alt} className="w-full" />
        ))}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  )
}

type QuoteProps = { children: ReactNode; cite?: string }

function Quote({ children, cite }: QuoteProps) {
  return (
    <figure data-slot="quote" className="m-0 flex flex-col gap-3">
      <blockquote className="m-0 font-heading text-h3 text-balance [&>p]:m-0">
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
    <dl data-slot="stats" className="m-0 grid grid-cols-2 gap-6 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col-reverse gap-1">
          <dt className="text-small text-muted-foreground">{item.label}</dt>
          <dd className="m-0 font-heading text-h2">{item.value}</dd>
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

export { Figure, ImagePair, Quote, Stats, Specs }
