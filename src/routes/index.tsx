import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '@/components/home/hero'
import { Interests } from '@/components/home/interests'
import { pageHead, personJsonLd } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () => pageHead({ path: '/', jsonLd: [personJsonLd()] }),
  component: Home,
})

// Sections land as their tickets do (sitemap §1 order: hero, featured work, interests, short
// about, contact).
function Home() {
  return (
    <>
      <Hero />
      <Interests />
    </>
  )
}
