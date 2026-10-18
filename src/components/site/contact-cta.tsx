import { useRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Container, SectionHeading } from '@/components/ui/layout'
import { CopyButton } from '@/components/ui/copy-button'
import { ExternalLink } from '@/components/ui/text-link'
import { contact, socials } from '@/content/profile'
import { track } from '@/lib/analytics'

// "get in touch" block (PORT-408) on home, case studies and /about. It's the page's #contact
// target for "Say hi": routes that render it set `staticData.contactCta`, so the footer gives up
// the id (one #contact per page). Every click here is a contact_click, LinkedIn included
// (brief §4). Copying the address counts as an email contact too.

type ContactCtaProps = { location: 'home' | 'case_study' | 'about' }

const linkedin = socials.find((social) => social.id === 'linkedin')

function ContactCta({ location }: ContactCtaProps) {
  const address = useRef<HTMLSpanElement>(null)
  const trackEmail = () => track('contact_click', { method: 'email', location })

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-4 border-t border-border py-section"
    >
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-1">
          <SectionHeading id="contact-heading">get in touch</SectionHeading>
          <p className="m-0 max-w-measure text-lead">
            Say hi, pitch me a weird project, or ask how the rat costume works.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0">
          <a
            href={`mailto:${contact.email}`}
            onClick={trackEmail}
            className={buttonVariants({ className: 'sm:min-w-56' })}
          >
            {/* Buttons are select-none; the address stays selectable for the copy fallback. */}
            <span ref={address} className="select-text">
              {contact.email}
            </span>
          </a>
          <CopyButton
            value={contact.email}
            fallbackTarget={() => address.current}
            onCopy={trackEmail}
            className="sm:min-w-40"
          >
            Copy email
          </CopyButton>
          {linkedin && (
            <ExternalLink
              href={linkedin.href}
              onClick={() => track('contact_click', { method: 'linkedin', location })}
              className={buttonVariants({ variant: 'secondary' })}
            >
              {linkedin.label}
            </ExternalLink>
          )}
        </div>
      </Container>
    </section>
  )
}

export { ContactCta }
