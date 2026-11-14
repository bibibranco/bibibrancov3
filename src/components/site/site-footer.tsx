import { useMatches } from '@tanstack/react-router'

import { Logo } from '@/components/brand/logo'
import { Container } from '@/components/ui/layout'
import { ExternalLink, textLinkClass } from '@/components/ui/text-link'
import { gunCredits } from '@/content/gun-photos'
import { contact, person, socials } from '@/content/profile'
import { track } from '@/lib/analytics'

const year = new Date().getFullYear()

// On pages without a <ContactCta> (/work, 404) the footer is the #contact target for "Say hi", so
// email and LinkedIn count as contact clicks. Medium is outbound (brief.md §4).

function trackSocial(id: (typeof socials)[number]['id']) {
  if (id === 'linkedin') track('contact_click', { method: 'linkedin', location: 'footer' })
  else track('outbound_click', { channel: id, location: 'footer' })
}

function SiteFooter() {
  const pageHasCta = useMatches({
    select: (matches) => matches.some((match) => match.staticData.contactCta),
  })
  return (
    <footer id={pageHasCta ? undefined : 'contact'} className="relative">
      {/* The hero's grainy cloud, flipped so it rises from the bottom of the page (PORT-205). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-grain h-[min(32rem,100%)] -scale-y-100"
      />
      {/* Big logo band between crop marks (PORT-205). Decoration: the header already links home. */}
      <Container aria-hidden="true" className="relative">
        <div className="crop-marks flex justify-center px-4 py-[clamp(2rem,6vw,5rem)] text-white">
          <Logo className="h-auto w-full max-w-[40rem]" />
        </div>
      </Container>
      <Container className="relative flex flex-col gap-4 py-8 text-small md:flex-row md:items-center md:justify-between">
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
        <div className="flex flex-col gap-1 md:items-end">
          <p className="m-0 font-mono text-muted-foreground">
            © {year} {person.name}
          </p>
          {/* The hero's gun photos: CC BY-SA ones need credit, and the collage versions are
              shared under the same licence (src/content/gun-photos.ts). */}
          <p className="m-0 font-mono text-[0.75rem] text-muted-foreground">
            gun photos via Wikimedia Commons:{' '}
            {gunCredits.map((photo, index) => (
              <span key={photo.slug}>
                {index > 0 && ', '}
                <ExternalLink href={photo.source}>{photo.author}</ExternalLink>
              </span>
            ))}
            , CC BY-SA 4.0, edited
          </p>
        </div>
      </Container>
    </footer>
  )
}

export { SiteFooter }
