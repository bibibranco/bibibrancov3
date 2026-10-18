import type { ComponentProps } from 'react'

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

type SectionHeadingProps = ComponentProps<'h2'> & { level?: 2 | 3 }

/** Section title in Syne. Lower-case copy is fine here (PORT-002 tone). */
function SectionHeading({ className, level = 2, ...props }: SectionHeadingProps) {
  const Heading = level === 2 ? 'h2' : 'h3'
  return (
    <Heading
      data-slot="section-heading"
      className={cn(
        'm-0 font-heading text-balance',
        level === 2 ? 'text-h2' : 'text-h3',
        className,
      )}
      {...props}
    />
  )
}

export { Container, Section, SectionHeading }
