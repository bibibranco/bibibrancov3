import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Content width (max-w-content) with the fluid side gutter. */
function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="container"
      className={cn(
        'mx-auto w-full max-w-[calc(var(--container-max)+2*var(--fluid-gutter))] px-gutter',
        className,
      )}
      {...props}
    />
  )
}

type SectionProps = ComponentProps<'section'> & {
  /** Squared notebook grid on blue. For the desk section only: no small text directly on it. */
  notebook?: boolean
}

/** Vertical rhythm between page sections (py-section). */
function Section({ className, notebook = false, ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn('py-section', notebook && 'bg-notebook', className)}
      {...props}
    />
  )
}

type SectionHeadingProps = ComponentProps<'h2'> & {
  level?: 2 | 3
  /** `display` sets the heading big, centred inside crop marks (PORT-205). */
  size?: 'default' | 'display'
}

/** Section title in the display face. Lower-case copy is fine here (PORT-002 tone). */
function SectionHeading({ className, level = 2, size = 'default', ...props }: SectionHeadingProps) {
  const Heading = level === 2 ? 'h2' : 'h3'
  return (
    <Heading
      data-slot="section-heading"
      className={cn(
        'm-0 font-heading text-balance',
        size === 'display'
          ? 'crop-marks px-4 py-[clamp(1.25rem,3vw,2.5rem)] text-center text-h1'
          : level === 2
            ? 'text-h2'
            : 'text-h3',
        className,
      )}
      {...props}
    />
  )
}

type PanelProps = ComponentProps<'div'> & {
  /** Mono tag in the top-left corner, e.g. "bibi.OS 4.0". Decoration, hidden from AT. */
  tag?: string
  /** Halftone blobs behind the content. */
  dither?: boolean
}

/** Dotted-grid "desktop" with a thin frame and a corner tag (PORT-205). No small text on the dots. */
function Panel({ tag, dither = false, className, children, ...props }: PanelProps) {
  return (
    <div
      data-slot="panel"
      className={cn('relative border border-border bg-dots', className)}
      {...props}
    >
      {dither && <div aria-hidden="true" className="absolute inset-0 bg-dither" />}
      {tag && (
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 z-[1] bg-deep px-1.5 font-mono text-label leading-[1.6] text-ice"
        >
          {tag}
        </span>
      )}
      <div className="relative">{children}</div>
    </div>
  )
}

type RuledColumnProps = ComponentProps<'div'> & { label: ReactNode; labelAs?: 'p' | 'h3' | 'dt' }

/** Mono label over a body column with a thin left rule ("Not Chat | paragraph", PORT-205). */
function RuledColumn({ label, labelAs = 'p', className, children, ...props }: RuledColumnProps) {
  const Label = labelAs
  return (
    <div
      data-slot="ruled-column"
      className={cn('flex flex-col gap-3 border-l border-border pl-3', className)}
      {...props}
    >
      <Label className="m-0 font-mono text-label tracking-[0.04em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}

export { Container, Section, SectionHeading, Panel, RuledColumn }
