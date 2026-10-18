import { createFileRoute } from '@tanstack/react-router'

import { Container, Section } from '@/components/ui/layout'
import { person } from '@/content/profile'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <Section>
      <Container className="flex flex-col gap-4">
        <h1 className="m-0 font-heading text-h1">{person.name}</h1>
        <p className="m-0 text-muted-foreground">Portfolio v4 is under construction.</p>
      </Container>
    </Section>
  )
}
