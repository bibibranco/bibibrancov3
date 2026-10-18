import type { ReactNode } from 'react'

// Experience and education on /about (PORT-006 TimelineList): an <ol>, newest first, with an h3
// per entry under the section's h2. Dates sit in their own column from md.

type TimelineItem = {
  key: string
  period: ReactNode
  title: string
  detail?: string
}

function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {items.map((item) => (
        <li
          key={item.key}
          className="grid gap-1 border-t border-border py-5 last:border-b md:grid-cols-[13rem_minmax(0,1fr)] md:gap-6"
        >
          <p className="m-0 font-mono text-meta text-muted-foreground uppercase">{item.period}</p>
          <div className="flex flex-col gap-1">
            <h3 className="m-0 font-heading text-h3 text-balance">{item.title}</h3>
            {item.detail && <p className="m-0 max-w-measure">{item.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { TimelineList }
export type { TimelineItem }
