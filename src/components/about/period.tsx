import type { YearMonth } from '@/content/profile'
import { formatYearMonth, isoYearMonth } from '@/lib/format'

// "Jun 2022 – Dec 2025" with each date in a <time dateTime> (PORT-407). "now" isn't a date, so
// it stays plain text.

function Time({ value }: { value: YearMonth }) {
  return <time dateTime={isoYearMonth(value)}>{formatYearMonth(value)}</time>
}

function Period({
  start,
  end,
  again = [],
}: {
  start?: YearMonth
  end: YearMonth | 'present'
  /** Repeat editions on the same row: "Jun 2023, Jun 2024". */
  again?: YearMonth[]
}) {
  const to = end === 'present' ? 'now' : <Time value={end} />
  if (!start)
    return (
      <>
        {to}
        {again.map((date) => (
          <span key={isoYearMonth(date)}>
            , <Time value={date} />
          </span>
        ))}
      </>
    )
  return (
    <>
      <Time value={start} /> – {to}
    </>
  )
}

export { Period }
