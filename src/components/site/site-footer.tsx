import { Container } from '@/components/ui/layout'
import { ExternalLink, textLinkClass } from '@/components/ui/text-link'
import { track } from '@/lib/analytics'

const year = new Date().getFullYear()

// The footer is the page's #contact block, so email and LinkedIn count as contact clicks.
// Medium is outbound. The v3 credit isn't tracked (brief.md §4).

function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-small md:flex-row md:items-center md:justify-between">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          <li>
            <a
              href="mailto:oi@bibibran.co"
              className={textLinkClass}
              onClick={() => track('contact_click', { method: 'email', location: 'footer' })}
            >
              oi@bibibran.co
            </a>
          </li>
          <li>
            <ExternalLink
              href="https://www.linkedin.com/in/bibibranco/"
              onClick={() => track('contact_click', { method: 'linkedin', location: 'footer' })}
            >
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://medium.com/@bibianabranco"
              onClick={() => track('outbound_click', { channel: 'medium', location: 'footer' })}
            >
              Medium
            </ExternalLink>
          </li>
        </ul>
        <p className="m-0 text-muted-foreground">
          v3 built with{' '}
          <ExternalLink href="https://asmdrs.vercel.app/">Amanda Medeiros</ExternalLink>
          {' · '}
          <span className="font-mono">© {year} Bibi Branco</span>
        </p>
      </Container>
    </footer>
  )
}

export { SiteFooter }
