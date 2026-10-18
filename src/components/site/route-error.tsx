import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router'

import { Button, buttonVariants } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'

/** Shown when a route throws (loader or render). Keeps the header and footer around it. */
function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  const retry = () => {
    reset()
    void router.invalidate()
  }

  return (
    <Section>
      <Container className="flex flex-col gap-5">
        <p className="m-0 font-mono text-meta text-muted-foreground">error</p>
        <h1 className="m-0 font-heading text-h1 text-balance">This page didn't work.</h1>
        <p className="m-0 max-w-measure text-lead">
          Something went wrong on my side. Try again, or head back to the home page.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={retry}>Try again</Button>
          <Link to="/" className={buttonVariants({ variant: 'secondary' })}>
            Go home
          </Link>
        </div>
        {import.meta.env.DEV && (
          <pre className="m-0 overflow-x-auto rounded-md bg-card p-4 font-mono text-code text-card-foreground">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        )}
      </Container>
    </Section>
  )
}

export { RouteError }
