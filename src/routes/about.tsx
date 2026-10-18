import { createFileRoute } from '@tanstack/react-router'
import { portrait } from 'content-collections'

import { Period } from '@/components/about/period'
import { TimelineList } from '@/components/about/timeline-list'
import { ContactCta } from '@/components/site/contact-cta'
import { Picture } from '@/components/ui/image'
import { Container, Section, SectionHeading } from '@/components/ui/layout'
import { ExternalLink } from '@/components/ui/text-link'
import {
  bio,
  education,
  experience,
  person,
  socials,
  talks,
  yearsOfExperience,
} from '@/content/profile'
import { track } from '@/lib/analytics'
import { pageHead } from '@/lib/seo'

// Background for a recruiter scan (PORT-407): bio and portrait, then experience, education and
// talks, all from src/content/profile.ts. One h1; every section is an h2 with h3 entries.
export const Route = createFileRoute('/about')({
  staticData: { contactCta: true },
  head: () =>
    pageHead({
      title: 'About',
      description: `Product designer with ${yearsOfExperience}+ years of experience, now at momoGood. Experience, education, talks and how to get in touch.`,
      path: '/about',
    }),
  component: About,
})

const medium = socials.find((social) => social.id === 'medium')

// Section heading in the left 3 of 12 columns on desktop, content in the rest. The rule sits on
// this inner grid, not the Container, so it lines up with the content instead of the gutters.
const sectionGrid = 'grid gap-6 border-t border-border pt-8 lg:grid-cols-12 lg:gap-x-6'
const headingCols = 'lg:col-span-3'
const contentCols = 'flex flex-col gap-4 lg:col-span-9'

function About() {
  return (
    <>
      <Container className="grid gap-8 pt-10 pb-section md:pt-16 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <h1 className="m-0 font-heading text-h1">About</h1>
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="m-0 max-w-measure text-lead">
              {paragraph}
            </p>
          ))}
          <p className="m-0 font-mono text-meta text-muted-foreground lowercase">
            {yearsOfExperience}+ years · {person.location} · remote
          </p>
        </div>
        <div className="max-w-sm lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <Picture
            image={portrait}
            alt={portrait.alt}
            priority
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 384px, calc(100vw - 2 * var(--fluid-gutter))"
            className="aspect-square w-full"
          />
        </div>
      </Container>

      <Section aria-labelledby="experience-heading" className="pt-0">
        <Container>
          <div className={sectionGrid}>
            <SectionHeading id="experience-heading" className={headingCols}>
              Experience
            </SectionHeading>
            <div className={contentCols}>
              <TimelineList
                items={experience.map((entry) => ({
                  key: `${entry.org}-${entry.start.year}`,
                  period: <Period start={entry.start} end={entry.end} />,
                  title: `${entry.org} · ${entry.role}`,
                  detail: entry.summary,
                }))}
              />
              <p className="m-0 text-muted-foreground">
                I've also designed real-life applications and experimental workshops. Ask me about
                them.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="education-heading" className="pt-0">
        <Container>
          <div className={sectionGrid}>
            <SectionHeading id="education-heading" className={headingCols}>
              Education
            </SectionHeading>
            <div className={contentCols}>
              <TimelineList
                items={education.map((entry) => ({
                  key: entry.what,
                  period: <Period start={entry.start} end={entry.end} />,
                  title: `${entry.what} · ${entry.where}`,
                  detail: entry.note,
                }))}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* #talks is where home's "sharing knowledge" interest links to (PORT-404). */}
      <Section id="talks" aria-labelledby="talks-heading" className="scroll-mt-4 pt-0">
        <Container>
          <div className={sectionGrid}>
            <SectionHeading id="talks-heading" className={headingCols}>
              Talks &amp; teaching
            </SectionHeading>
            <div className={contentCols}>
              <p className="m-0 max-w-measure text-lead">
                I like explaining how I work almost as much as the work itself.
              </p>
              {talks.length > 0 && (
                <ul className="m-0 flex list-disc flex-col gap-1 pl-6">
                  {talks.map((talk) => (
                    <li key={`${talk.title}-${talk.year}`}>
                      {talk.title} · {talk.where} ·{' '}
                      <time dateTime={String(talk.year)}>{talk.year}</time>
                    </li>
                  ))}
                </ul>
              )}
              {medium && (
                <p className="m-0">
                  I also write on{' '}
                  <ExternalLink
                    href={medium.href}
                    onClick={() =>
                      track('outbound_click', { channel: 'medium', location: 'about' })
                    }
                  >
                    Medium
                  </ExternalLink>{' '}
                  now and then.
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <ContactCta location="about" />
    </>
  )
}
