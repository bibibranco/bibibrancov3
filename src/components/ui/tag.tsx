import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

// Static label (not interactive): mono, uppercase, like the PORT-006 `label` style.
const tagVariants = cva(
  'inline-flex items-center rounded-sm px-2 py-1 font-mono text-label whitespace-nowrap uppercase',
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground',
        outline: 'border border-input text-foreground',
        paper: 'bg-paper text-paper-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Tag({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof tagVariants>) {
  return <span data-slot="tag" className={cn(tagVariants({ variant, className }))} {...props} />
}

export { Tag, tagVariants }
