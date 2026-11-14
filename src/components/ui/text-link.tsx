import { createLink, type LinkComponent } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

// Always underlined: ice and star are too close in lightness to tell links apart by colour (PORT-006).
const textLinkClass =
  'text-inherit underline decoration-1 underline-offset-[3px] transition-[text-decoration-thickness] duration-(--duration-fast) ease-out hover:decoration-[3px]'

function TextLinkAnchor({ className, ...props }: ComponentProps<'a'>) {
  return <a data-slot="text-link" className={cn(textLinkClass, className)} {...props} />
}

const CreatedTextLink = createLink(TextLinkAnchor)

/** Internal link with a type-checked `to`. */
const TextLink: LinkComponent<typeof TextLinkAnchor> = (props) => <CreatedTextLink {...props} />

type ExternalLinkProps = Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel'> & { href: string }

/** Opens in a new tab and says so to screen readers. */
function ExternalLink({ className, children, ...props }: ExternalLinkProps) {
  return (
    <a
      data-slot="external-link"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(textLinkClass, className)}
      {...props}
    >
      {children}
      <ArrowUpRight aria-hidden className="ml-0.5 inline size-[0.9em] align-[-0.1em]" />
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  )
}

/** Display-size underlined link for CTA rows (PORT-205). Use with `<a>` or a router Link. */
const bigLinkClass =
  'inline-flex min-h-tap items-end font-heading text-h2 text-foreground underline decoration-[3px] underline-offset-[0.12em] transition-[text-decoration-color,color] duration-(--duration-fast) ease-out hover:text-white hover:decoration-star md:text-h1'

function BigLinkAnchor({ className, ...props }: ComponentProps<'a'>) {
  return <a data-slot="big-link" className={cn(bigLinkClass, className)} {...props} />
}

const CreatedBigLink = createLink(BigLinkAnchor)

const BigLink: LinkComponent<typeof BigLinkAnchor> = (props) => <CreatedBigLink {...props} />

export { TextLink, ExternalLink, BigLink, textLinkClass, bigLinkClass }
