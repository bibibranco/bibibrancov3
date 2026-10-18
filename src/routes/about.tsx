import { createFileRoute } from '@tanstack/react-router'

import { ContactCta } from '@/components/site/contact-cta'
import { Container, Section } from '@/components/ui/layout'
import { seo } from '@/lib/seo'

// Stub so the nav can link here; PORT-407 builds the page.
export const Route = createFileRoute('/about')({
  staticData: { contactCta: true },
  head: () => ({ meta: seo({ title: 'About' }) }),
  component: About,
})

function About() {
  return (
    <>
      <Section>
        <Container>
          <h1 className="m-0 font-heading text-h1">About</h1>
        </Container>
      </Section>
      <ContactCta location="about" />
    </>
  )
}
