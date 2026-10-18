import { Link } from '@tanstack/react-router'

import { Star } from '@/components/brand/star'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { experience, person, yearsOfExperience } from '@/content/profile'

// Home hero (PORT-402), copy from tickets/artifacts/copy.md "Hero (home)", layout from the PORT-007
// canvas. The name stays in the h1's small first line for name searches. The star is the page's
// only motion that runs without input, and it's hidden below lg like on the canvas.

const previousOrg = experience[1]?.org.replace(/ Unibanco$/, '')

function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-[clamp(3rem,6vw,7rem)] pb-[clamp(3.5rem,7vw,7.5rem)]"
    >
      <Container className="grid grid-cols-12 items-center gap-x-6">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
          <h1 id="hero-heading" className="m-0 font-heading text-h1 text-balance">
            <span className="mb-4 block font-mono text-caption font-normal tracking-normal text-muted-foreground">
              {person.name}, {person.role.toLowerCase()}
            </span>
            I started with design. Got a little carried away.
          </h1>
          <p className="m-0 max-w-[34em] text-lead">
            I'm a product designer with {yearsOfExperience}+ years of experience, a growing toolbox,
            and a tendency to learn things the hard way. Usually on purpose.
          </p>
          <p className="m-0 font-mono text-caption text-muted-foreground">
            at {person.company}
            {previousOrg && ` · previously ${previousOrg}`}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link to="/work" className={buttonVariants()}>
              See my work
            </Link>
            <a href="#contact" className={buttonVariants({ variant: 'secondary' })}>
              Say hi
            </a>
          </div>
        </div>
        <div className="col-span-3 col-start-10 hidden justify-center lg:flex">
          <Star spinning className="size-65 text-star" />
        </div>
      </Container>
    </section>
  )
}

export { Hero }
