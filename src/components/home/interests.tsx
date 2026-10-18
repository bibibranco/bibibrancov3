import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Container, Section, SectionHeading } from '@/components/ui/layout'
import { interests, type Interest } from '@/content/profile'

// Home "count me in for" (PORT-404), from profile.interests. One list, rendered once: the v3
// timeline duplicated every card to swap sides on mobile. Each row is one link (or plain text
// when an interest has nowhere to go). Links are typed routes; scripts/content-build.ts fails
// the build if a case-study slug isn't a project. The star bullets come with PORT-007.

const rowClass = 'flex flex-col gap-1 border-t border-border py-5'

function InterestRow({ interest }: { interest: Interest }) {
  const content = (
    <>
      <span className="flex items-center gap-2 font-heading text-h3">
        {interest.label}
        {interest.link && (
          <ArrowRight
            aria-hidden
            className="size-[0.8em] transition-transform duration-(--duration-fast) ease-out group-hover:translate-x-1 motion-reduce:transition-none"
          />
        )}
      </span>
      <span className="max-w-measure text-muted-foreground">{interest.line}</span>
    </>
  )
  if (!interest.link) return <div className={rowClass}>{content}</div>
  return (
    <Link
      {...interest.link}
      className={`group ${rowClass} text-inherit no-underline hover:[&>span:first-child]:underline`}
    >
      {content}
    </Link>
  )
}

function Interests() {
  return (
    <Section aria-labelledby="interests-heading">
      <Container className="flex flex-col gap-6">
        <SectionHeading id="interests-heading">count me in for</SectionHeading>
        <ul className="m-0 list-none border-b border-border p-0">
          {interests.map((interest) => (
            <li key={interest.label}>
              <InterestRow interest={interest} />
            </li>
          ))}
        </ul>
        <p className="m-0 text-muted-foreground">and hoping this list grows bigger every day</p>
      </Container>
    </Section>
  )
}

export { Interests }
