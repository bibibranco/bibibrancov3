import { Container } from '@/components/ui/layout'
import { ExternalLink, textLinkClass } from '@/components/ui/text-link'

const year = new Date().getFullYear()

function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-small md:flex-row md:items-center md:justify-between">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          <li>
            <a href="mailto:oi@bibibran.co" className={textLinkClass}>
              oi@bibibran.co
            </a>
          </li>
          <li>
            <ExternalLink href="https://www.linkedin.com/in/bibibranco/">LinkedIn</ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://medium.com/@bibianabranco">Medium</ExternalLink>
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
