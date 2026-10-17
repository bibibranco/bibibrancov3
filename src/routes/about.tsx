import { createFileRoute } from '@tanstack/react-router'

import { Container, Section } from '@/components/ui/layout'

// Stub so the nav can link here; PORT-407 builds the page.
export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: 'About · Bibi Branco' }] }),
  component: About,
})

function About() {
  return (
    <Section>
      <Container>
        <h1 className="m-0 font-heading text-h1">About</h1>
      </Container>
    </Section>
  )
}
