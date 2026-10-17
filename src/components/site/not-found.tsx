import { Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'

/**
 * Unknown URLs. Also prerendered as `404.html`, which the host serves with a 404 status.
 * Layout follows the hi-fi design once PORT-007 lands.
 */
function NotFound() {
  return (
    <Section>
      {/* React hoists this into <head>, so it applies however the 404 is reached. */}
      <meta name="robots" content="noindex" />
      <Container className="flex flex-col gap-5">
        <p className="m-0 font-mono text-meta text-muted-foreground">404</p>
        <h1 className="m-0 font-heading text-h1 text-balance">This page doesn't exist.</h1>
        <p className="m-0 max-w-measure text-lead">
          The link might be old, or it never worked. Here are two that do.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className={buttonVariants()}>
            Go home
          </Link>
          <Link to="/work" className={buttonVariants({ variant: 'secondary' })}>
            See my work
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export { NotFound }
