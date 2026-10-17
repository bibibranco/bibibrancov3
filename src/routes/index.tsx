import { createFileRoute } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="mx-auto my-16 w-[min(42rem,calc(100%-2rem))] space-y-4">
      <h1 className="font-heading text-3xl font-bold">Bibi Branco</h1>
      <p className="text-muted-foreground">Portfolio v4 is under construction.</p>
      <p className="font-mono text-sm text-muted-foreground">product designer · são paulo</p>
      <a className={buttonVariants()} href="mailto:oi@bibibran.co">
        Say hi
      </a>
    </main>
  )
}
