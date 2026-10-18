import { createLink, type LinkComponent } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

// The whole card is one real link. Put no buttons or other links inside it.
function CardAnchor({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      data-slot="card"
      className={cn('group flex flex-col gap-2 text-inherit no-underline', className)}
      {...props}
    />
  )
}

const CreatedCard = createLink(CardAnchor)

const Card: LinkComponent<typeof CardAnchor> = (props) => <CreatedCard {...props} />

function CardMedia({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="card-media" className={cn('overflow-hidden bg-muted', className)} {...props} />
  )
}

function CardMeta({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-meta"
      className={cn('m-0 font-mono text-meta text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        'm-0 font-heading text-h3 decoration-[3px] underline-offset-4 group-hover:underline',
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p data-slot="card-description" className={cn('m-0 text-small', className)} {...props} />
}

export { Card, CardMedia, CardMeta, CardTitle, CardDescription }
