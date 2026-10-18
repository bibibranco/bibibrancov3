import { cn } from 'cn'
import { ArrowUpRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { track } from '@/lib/analytics'
import type { Project } from '@/lib/content'

// Live prototype, code and the full story elsewhere (Medium, TikTok). Link text says where each
// one goes (brief §5), and the first link is the primary button. Events per brief §4: live and
// repo are prototype_click, Medium is outbound_click, other hosts aren't tracked.

type Link = { href: string; label: string; onClick?: () => void }

function externalLabel(href: string) {
  const host = new URL(href).hostname
  if (host.endsWith('medium.com')) return 'Read the full story on Medium'
  if (host.endsWith('tiktok.com')) return 'Watch it on TikTok'
  return 'Read more'
}

function ProjectLinks({ project }: { project: Project }) {
  const { slug, links } = project
  const items: Link[] = []
  if (links.live) {
    items.push({
      href: links.live,
      label: 'Open the live prototype',
      onClick: () => track('prototype_click', { slug, destination: 'live' }),
    })
  }
  if (links.repo) {
    items.push({
      href: links.repo,
      label: 'View the code',
      onClick: () => track('prototype_click', { slug, destination: 'repo' }),
    })
  }
  if (links.external) {
    const isMedium = new URL(links.external).hostname.endsWith('medium.com')
    items.push({
      href: links.external,
      label: externalLabel(links.external),
      onClick: isMedium
        ? () => track('outbound_click', { channel: 'medium', location: 'case_study' })
        : undefined,
    })
  }
  if (items.length === 0) return null

  return (
    <ul data-slot="project-links" className="m-0 flex list-none flex-wrap gap-3 p-0">
      {items.map((item, index) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={item.onClick}
            className={cn(buttonVariants({ variant: index === 0 ? 'primary' : 'secondary' }))}
          >
            {item.label}
            <ArrowUpRight aria-hidden />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export { ProjectLinks }
