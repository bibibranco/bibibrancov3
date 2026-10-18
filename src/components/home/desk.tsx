import { Link } from '@tanstack/react-router'
import type { CSSProperties, ReactNode } from 'react'

import { Picture } from '@/components/ui/image'
import { Container, Section, SectionHeading } from '@/components/ui/layout'
import { TextLink } from '@/components/ui/text-link'
import { getFeaturedFragments, type DeskFragment } from '@/lib/content'
import { cn } from '@/lib/utils'

import { deskHeightFor, slotStyle, stickerStyle } from './desk-layout'

// "bits and pieces on my desk" (PORT-403, design PORT-007 / wireframes A + C). Every featured
// fragment is a desk object, and its type picks the object. From xl the objects are placed by
// hand (./desk-layout); below that they fall into masonry columns (three from lg, two below), in
// `order`. Hand placement starts at xl, not lg: at 1024 the objects narrow but their text
// doesn't, and neighbours overlap. Each object is
// one link to its case study. The link is named by everything on the object, caption
// included ("… terminal · momoProto"), so the project title is always real link text (copy.md)
// and the visible text is part of the name (WCAG 2.5.3).

const objectWord: Record<DeskFragment['type'], (fragment: DeskFragment) => string> = {
  code: () => 'terminal',
  quote: () => 'sticky',
  stat: () => 'receipt',
  spec: () => 'shop tag',
  image: (f) => (f.type === 'image' && f.object === 'print' ? 'print' : 'polaroid'),
  writing: (f) => (f.type === 'writing' && f.object === 'clipping' ? 'clipping' : 'index card'),
  sketch: () => 'notebook page',
}

const captionClass = 'block font-mono text-[0.75rem] leading-[1.3] tracking-[0.04em]'
const kickerClass =
  'block font-mono text-[0.6875rem] leading-[1.3] tracking-[0.04em] text-paper-muted'
const ruled = 'bg-[repeating-linear-gradient(var(--paper)_0_27px,#e1e6ef_27px_28px)]'
const imageSizes = '(min-width: 1280px) 330px, (min-width: 1024px) 30vw, 45vw'

function Caption({ word, title, className }: { word: string; title: string; className?: string }) {
  return (
    <span className={cn(captionClass, 'text-paper-muted', className)}>
      {/* The object word drops on phones, where the columns are narrow (copy.md). */}
      <span className="max-md:hidden">{word} · </span>
      {title} <span aria-hidden="true">→</span>
    </span>
  )
}

function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute -top-[11px] left-1/2 -ml-9 h-[22px] w-18 -rotate-4 bg-tape',
        className,
      )}
    />
  )
}

/** The object's surface and contents; the caption goes last, inside the same link. */
function ObjectBody({
  fragment,
  caption,
}: {
  fragment: DeskFragment
  caption: (className?: string) => ReactNode
}) {
  switch (fragment.type) {
    case 'code':
      return (
        <span className="block bg-terminal text-terminal-foreground">
          <span
            aria-hidden="true"
            className="flex gap-1.5 border-b border-terminal-foreground/20 px-3 py-2.5"
          >
            <i className="block size-2.5 rounded-full bg-terminal-muted" />
            <i className="block size-2.5 rounded-full bg-terminal-muted" />
            <i className="block size-2.5 rounded-full bg-star" />
          </span>
          <span className="block px-[18px] pt-4 pb-1.5 font-mono text-[0.9375rem] leading-[1.6] max-md:text-[0.8125rem]">
            {fragment.lines.map((line, index) => (
              <span key={index} className="block">
                {line.startsWith('$ ') ? (
                  <>
                    <span className="text-terminal-muted">$</span>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </span>
          {caption('px-[18px] pt-2 pb-4 text-terminal-muted')}
        </span>
      )
    case 'quote':
      return (
        <span className="block min-h-50 bg-sticky p-[22px] text-sticky-foreground max-md:min-h-0 max-md:p-4">
          <span className="block font-hand text-[1.625rem] leading-[1.15] font-semibold max-md:text-[1.375rem]">
            “{fragment.text}”
          </span>
          {fragment.cite && <span className={cn(captionClass, 'mt-2')}>{fragment.cite}</span>}
          {caption('mt-3.5 text-sticky-foreground')}
        </span>
      )
    case 'stat':
      return (
        <span className="block bg-paper p-[18px] font-mono text-[0.8125rem] text-paper-foreground">
          <span className={kickerClass}>{fragment.title}</span>
          <span className="mt-2 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-b border-dashed border-paper-muted pb-2">
            {fragment.rows.map((row) => (
              <span key={row.label} className="contents">
                <span>{row.label}</span>
                <span>{row.value}</span>
              </span>
            ))}
          </span>
          {fragment.total && (
            <span className="mt-2 grid grid-cols-[1fr_auto] font-medium">
              <span>{fragment.total.label}</span>
              <span>{fragment.total.value}</span>
            </span>
          )}
          {caption('mt-2.5')}
        </span>
      )
    case 'spec':
      return (
        <span className="relative block bg-paper py-4 pr-4 pl-10 text-paper-foreground [clip-path:polygon(22px_0,100%_0,100%_100%,22px_100%,0_50%)]">
          <i
            aria-hidden="true"
            className="absolute top-1/2 left-3.5 -mt-[5px] block size-2.5 rounded-full bg-blue"
          />
          <span className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1 font-mono text-[0.8125rem]">
            {fragment.rows.map((row) => (
              <span key={row.label} className="contents">
                <b className="font-medium text-paper-muted">{row.label}</b>
                <span>{row.value}</span>
              </span>
            ))}
          </span>
          {caption('mt-2.5')}
        </span>
      )
    case 'image':
      return fragment.object === 'print' ? (
        <span className="relative block bg-paper text-paper-foreground">
          <Tape className="left-[18%]" />
          <Picture
            image={fragment.image}
            alt={fragment.image.alt}
            sizes={imageSizes}
            className="w-full"
          />
          {caption('px-3 py-2.5')}
        </span>
      ) : (
        <span className="relative block bg-paper px-3 pt-3 pb-4 text-paper-foreground">
          <Tape />
          <Picture
            image={fragment.image}
            alt={fragment.image.alt}
            sizes={imageSizes}
            className="w-full"
          />
          {caption('mt-3')}
        </span>
      )
    case 'writing':
      return fragment.object === 'clipping' ? (
        <span className="block border-b-2 border-dashed border-paper-muted bg-paper p-[22px] text-paper-foreground max-md:p-4">
          {fragment.source && <span className={kickerClass}>{fragment.source}</span>}
          <strong className="mt-2 mb-2.5 block font-[Georgia,'Times_New_Roman',serif] text-[1.6875rem] leading-[1.12] max-md:text-[1.25rem]">
            {fragment.title}
          </strong>
          {caption()}
        </span>
      ) : (
        <span className={cn('block p-[18px] text-paper-foreground max-md:p-4', ruled)}>
          {fragment.source && <span className={kickerClass}>{fragment.source}</span>}
          <strong className="mt-2 mb-1.5 block font-heading text-[1.375rem] leading-[1.15] max-md:text-[1.125rem]">
            {fragment.title}
          </strong>
          {fragment.body && (
            <span className="block text-[0.9375rem] leading-[1.5] max-md:text-[0.875rem]">
              {fragment.body}
            </span>
          )}
          {caption('mt-2.5')}
        </span>
      )
    case 'sketch':
      return (
        <span className="block bg-paper bg-notebook-paper p-2.5 text-paper-foreground">
          <Picture
            image={fragment.image}
            alt={fragment.image.alt}
            sizes={imageSizes}
            className="w-full"
          />
          {caption('mt-2.5')}
        </span>
      )
  }
}

function DeskObject({ fragment, index }: { fragment: DeskFragment; index: number }) {
  const word = objectWord[fragment.type](fragment)
  return (
    <li
      style={slotStyle(index) as CSSProperties}
      className="relative mb-5 rotate-(--rm) break-inside-avoid focus-within:z-(--z-object-focus) hover:z-(--z-object-focus) max-md:mb-3 xl:absolute xl:top-(--y) xl:left-(--x) xl:z-(--z) xl:mb-0 xl:w-(--w) xl:rotate-(--r)"
    >
      <Link
        to="/work/$slug"
        params={{ slug: fragment.project.slug }}
        className="desk-object block text-inherit no-underline"
      >
        <ObjectBody
          fragment={fragment}
          caption={(className) => (
            <Caption word={word} title={fragment.project.title} className={className} />
          )}
        />
      </Link>
    </li>
  )
}

function Desk() {
  const fragments = getFeaturedFragments()
  return (
    <>
      <Section notebook aria-labelledby="desk-heading" className="pb-12">
        <Container className="flex flex-col gap-10">
          <SectionHeading id="desk-heading">bits and pieces on my desk</SectionHeading>
          <div
            className="relative"
            style={{ '--desk-h': deskHeightFor(fragments.length) } as CSSProperties}
          >
            <ul className="m-0 list-none columns-2 gap-3 p-0 md:gap-4 lg:columns-3 lg:gap-6 xl:h-(--desk-h) xl:columns-auto">
              {fragments.map((fragment, index) => (
                <DeskObject
                  key={`${fragment.project.slug}-${index}`}
                  fragment={fragment}
                  index={index}
                />
              ))}
            </ul>
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              focusable="false"
              style={stickerStyle as CSSProperties}
              className="pointer-events-none absolute top-(--y) left-(--x) z-8 hidden w-(--w) rotate-(--r) text-star xl:block"
            >
              <path
                fill="currentColor"
                stroke="var(--deep)"
                strokeWidth=".6"
                d="M16 7.25263L21.5565 0L21.2218 9.18292L30.0699 7.25263L24 14.0697L32 18.3691L23.0349 19.6263L26.4435 28.1427L18.7782 23.2559L16 32L13.2218 23.2559L5.55646 28.1427L8.96507 19.6263L0 18.3691L8 14.0697L1.93014 7.25263L10.7782 9.18292L10.4435 0L16 7.25263Z"
              />
            </svg>
          </div>
        </Container>
      </Section>
      <Container className="pt-7 pb-section">
        <TextLink to="/work" className="font-heading text-[1.375rem] font-bold">
          Everything, tidy →
        </TextLink>
      </Container>
    </>
  )
}

export { Desk }
