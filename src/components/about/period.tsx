import type { YearMonth } from '@/content/profile'
import { formatYearMonth, isoYearMonth } from '@/lib/format'

// "Jun 2022 – Dec 2025" with each date in a <time dateTime> (PORT-407). "now" isn't a date, so
// it stays plain text.

function Time({ value }: { value: YearMonth }) {
  return <time dateTime={isoYearMonth(value)}>{formatYearMonth(value)}</time>
}

function Period({ start, end }: { start?: YearMonth; end: YearMonth | 'present' }) {
  const to = end === 'present' ? 'now' : <Time value={end} />
  if (!start) return <>{to}</>
  return (
    <>
      <Time value={start} /> – {to}
    </>
  )
}

export { Period }
