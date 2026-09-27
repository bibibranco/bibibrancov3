import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main>
      <h1>Bibi Branco</h1>
      <p>Portfolio v4 is under construction.</p>
    </main>
  )
}
