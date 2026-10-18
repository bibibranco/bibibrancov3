import { createFileRoute } from '@tanstack/react-router'

import { Interests } from '@/components/home/interests'
import { Container, Section } from '@/components/ui/layout'
import { person } from '@/content/profile'
import { pageHead, personJsonLd } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () => pageHead({ path: '/', jsonLd: [personJsonLd()] }),
  component: Home,
})

// Placeholder hero until PORT-402; sections land as their tickets do (sitemap §1 order: hero,
// featured work, interests, short about, contact).
function Home() {
  return (
    <>
      <Section>
        <Container className="flex flex-col gap-4">
          <h1 className="m-0 font-heading text-h1">{person.name}</h1>
          <p className="m-0 text-muted-foreground">Portfolio v4 is under construction.</p>
        </Container>
      </Section>
      <Interests />
    </>
  )
}
