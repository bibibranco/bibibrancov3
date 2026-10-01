import { createFileRoute } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="mx-auto my-16 w-[min(42rem,calc(100%-2rem))] space-y-4">
      <h1 className="text-3xl font-semibold">Bibi Branco</h1>
      <p className="text-muted-foreground">Portfolio v4 is under construction.</p>
      <a className={buttonVariants()} href="mailto:oi@bibibran.co">
        Say hi
      </a>
    </main>
  )
}
