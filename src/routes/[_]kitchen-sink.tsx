import { createFileRoute, notFound } from '@tanstack/react-router'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardMedia, CardMeta, CardTitle } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { Container, Section, SectionHeading } from '@/components/ui/layout'
import { Tag } from '@/components/ui/tag'
import { ExternalLink, TextLink } from '@/components/ui/text-link'

// Dev-only gallery of the PORT-202 primitives. Production builds return not-found, and nothing
// links here, so the prerender crawler never reaches it (keep it out of the sitemap in PORT-501).
export const Route = createFileRoute('/_kitchen-sink')({
  beforeLoad: () => {
    if (import.meta.env.PROD) throw notFound()
  },
  head: () => ({ meta: [{ title: 'Kitchen sink' }, { name: 'robots', content: 'noindex' }] }),
  component: KitchenSink,
})

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3Crect width='16' height='10' fill='%230a4cbf'/%3E%3C/svg%3E"

function KitchenSink() {
  return (
    <div>
      <Container className="pt-section">
        <h1 className="m-0 font-heading text-h1">Kitchen sink</h1>
        <p className="mt-3 max-w-measure text-muted-foreground">
          Every PORT-202 primitive and variant. Press Tab to walk through the focus states.
        </p>
      </Container>

      <Section aria-labelledby="ks-button">
        <Container className="flex flex-col gap-6">
          <SectionHeading id="ks-button">Button</SectionHeading>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a className={buttonVariants()} href="#ks-button">
              Link as primary button
            </a>
            <a className={buttonVariants({ variant: 'secondary' })} href="#ks-button">
              Link as secondary button
            </a>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="ks-links">
        <Container className="flex flex-col gap-4">
          <SectionHeading id="ks-links">TextLink &amp; ExternalLink</SectionHeading>
          <p className="m-0 max-w-measure">
            Back to the <TextLink to="/">home page</TextLink>, or read the{' '}
            <ExternalLink href="https://medium.com/">write-up on Medium</ExternalLink>.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="ks-tag">
        <Container className="flex flex-col gap-4">
          <SectionHeading id="ks-tag">Tag</SectionHeading>
          <div className="flex flex-wrap gap-2">
            <Tag>Work</Tag>
            <Tag variant="outline">Craft</Tag>
            <Tag variant="paper">2026.05</Tag>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="ks-card">
        <Container className="flex flex-col gap-6">
          <SectionHeading id="ks-card">Card</SectionHeading>
          <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {['momoProto', 'Itaú credit card fees', 'Rato Túlio'].map((title) => (
              <li key={title}>
                <Card to="/">
                  <CardMedia>
                    <Image src={placeholder} alt="" ratio="16/10" />
                  </CardMedia>
                  <CardMeta>2026.05 · sample</CardMeta>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>Sample summary. The whole card is one link.</CardDescription>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="ks-layout" notebook>
        <Container className="flex flex-col gap-4">
          <SectionHeading id="ks-layout">Section · notebook grid</SectionHeading>
          <p className="m-0 max-w-measure text-h3">
            The squared grid is for the desk only, so text this size is the smallest allowed on it.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="ks-image">
        <Container className="flex flex-col gap-4">
          <SectionHeading id="ks-image">Image</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-3">
            <figure className="m-0 flex flex-col gap-2">
              <Image src={placeholder} alt="Placeholder, 16 by 10" ratio="16/10" />
              <figcaption className="text-caption text-muted-foreground">
                ratio 16/10 · lazy
              </figcaption>
            </figure>
            <figure className="m-0 flex flex-col gap-2">
              <Image src={placeholder} alt="Placeholder, 2 by 1" ratio="2/1" />
              <figcaption className="text-caption text-muted-foreground">ratio 2/1</figcaption>
            </figure>
            <figure className="m-0 flex flex-col gap-2">
              <Image src={placeholder} alt="Placeholder, square" ratio="1/1" priority />
              <figcaption className="text-caption text-muted-foreground">
                ratio 1/1 · priority
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>
    </div>
  )
}
