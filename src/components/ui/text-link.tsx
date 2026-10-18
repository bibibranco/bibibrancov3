import { createLink, type LinkComponent } from '@tanstack/react-router'
import { cn } from 'cn'
import { ArrowUpRight } from 'lucide-react'
import type { ComponentProps } from 'react'

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

export { TextLink, ExternalLink, textLinkClass }
