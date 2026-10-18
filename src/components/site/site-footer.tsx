import { useMatches } from '@tanstack/react-router'

import { Container } from '@/components/ui/layout'
import { ExternalLink, textLinkClass } from '@/components/ui/text-link'
import { contact, credit, person, socials } from '@/content/profile'
import { track } from '@/lib/analytics'

const year = new Date().getFullYear()

// On pages without a <ContactCta> (/work, 404) the footer is the #contact target for "Say hi", so
// email and LinkedIn count as contact clicks. Medium is outbound. The v3 credit isn't tracked
// (brief.md §4).

function trackSocial(id: (typeof socials)[number]['id']) {
  if (id === 'linkedin') track('contact_click', { method: 'linkedin', location: 'footer' })
  else track('outbound_click', { channel: id, location: 'footer' })
}

function SiteFooter() {
  const pageHasCta = useMatches({
    select: (matches) => matches.some((match) => match.staticData.contactCta),
  })
  return (
    <footer id={pageHasCta ? undefined : 'contact'} className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-small md:flex-row md:items-center md:justify-between">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          <li>
            <a
              href={`mailto:${contact.email}`}
              className={textLinkClass}
              onClick={() => track('contact_click', { method: 'email', location: 'footer' })}
            >
              {contact.email}
            </a>
          </li>
          {socials.map((social) => (
            <li key={social.id}>
              <ExternalLink href={social.href} onClick={() => trackSocial(social.id)}>
                {social.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
        <p className="m-0 text-muted-foreground">
          v3 built with <ExternalLink href={credit.href}>{credit.name}</ExternalLink>
          {' · '}
          <span className="font-mono">
            © {year} {person.name}
          </span>
        </p>
      </Container>
    </footer>
  )
}

export { SiteFooter }
