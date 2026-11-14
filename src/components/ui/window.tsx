import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

// Retro window chrome (PORT-205, typesafe.ai reference): a solid title bar with a mono label over a
// square-cornered body with a hard offset shadow. The title is decoration, so it's aria-hidden by
// default; pass `titleHidden={false}` when it carries meaning the body doesn't repeat.

const windowVariants = cva('block border-[1.5px] border-(--window-edge) shadow-(--shadow-hard)', {
  variants: {
    variant: {
      paper: 'bg-(--window-body) text-paper-foreground',
      deep: 'bg-deep text-ice',
      ice: 'bg-ice text-deep',
    },
  },
  defaultVariants: { variant: 'paper' },
})

type WindowProps = Omit<ComponentProps<'span'>, 'title'> &
  VariantProps<typeof windowVariants> & {
    title: ReactNode
    titleHidden?: boolean
    /** Right-hand side of the title bar, e.g. a version number. */
    meta?: ReactNode
  }

/** Renders spans so it can sit inside links and inline contexts; it's display:block. */
function Window({
  title,
  titleHidden = true,
  meta,
  variant,
  className,
  children,
  ...props
}: WindowProps) {
  return (
    <span data-slot="window" className={cn(windowVariants({ variant }), className)} {...props}>
      <span
        aria-hidden={titleHidden || undefined}
        className="flex items-center justify-between gap-3 bg-(--window-bar) px-2 py-0.5 font-mono text-label leading-[1.6] tracking-[0.02em] text-(--window-bar-foreground)"
      >
        <span className="truncate">{title}</span>
        {meta && <span className="shrink-0 opacity-80">{meta}</span>}
      </span>
      {children}
    </span>
  )
}

export { Window, windowVariants }
