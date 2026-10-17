import { createFileRoute } from '@tanstack/react-router'

import { Container, Section } from '@/components/ui/layout'

// Stub so the nav can link here; PORT-405 builds the page.
export const Route = createFileRoute('/work/')({
  head: () => ({ meta: [{ title: 'Work · Bibi Branco' }] }),
  component: WorkIndex,
})

function WorkIndex() {
  return (
    <Section>
      <Container>
        <h1 className="m-0 font-heading text-h1">Work</h1>
      </Container>
    </Section>
  )
}
