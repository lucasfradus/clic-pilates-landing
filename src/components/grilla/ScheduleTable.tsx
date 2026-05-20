import { buildGridRows, DAYS, formatTimeRange, WEEKDAYS, type Schedule } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  schedule: Schedule
}

export function ScheduleTable ({ schedule }: Props): React.ReactElement {
  const rows = buildGridRows(schedule)

  return (
    <div className='overflow-x-auto px-6 pb-10'>
      <table
        className='w-full border-collapse'
        style={{ minWidth: 900, color: 'var(--grilla-text)' }}
      >
        <thead>
          <tr>
            <th
              className='px-3.5 py-[11px] text-center text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderRadius: '8px 0 0 0',
                minWidth: 140
              }}
            >
              Horario
            </th>
            {DAYS.map((day) => (
              <th
                key={day}
                className='px-3.5 py-[11px] text-center text-[10px] font-semibold uppercase tracking-[0.09em]'
                style={{
                  background: 'var(--grilla-table-header-bg)',
                  color: 'var(--grilla-table-header-text)',
                  borderLeft: '1px solid var(--grilla-border)',
                  minWidth: 130
                }}
              >
                {day}
              </th>
            ))}
            <th
              className='px-3.5 py-[11px] text-center text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderLeft: '1px solid var(--grilla-border)',
                borderRadius: '0 8px 0 0',
                minWidth: 140
              }}
            >
              Horario
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const rowBg = rowIdx % 2 === 0 ? 'var(--grilla-card-bg)' : 'var(--grilla-row-alt-bg)'
            const hasWeekdayClass = WEEKDAYS.some((d) => row.weekday[d] != null)
            return (
              <tr key={`${row.rowTime}-${rowIdx}`} style={{ background: rowBg }}>
                <TimeCell time={hasWeekdayClass ? row.rowTime : null} />
                {WEEKDAYS.map((day) => (
                  <td
                    key={day}
                    className='px-3.5 py-[9px] text-center align-middle'
                    style={{
                      borderBottom: '1px solid var(--grilla-border)',
                      borderLeft: '1px solid var(--grilla-border)'
                    }}
                  >
                    <SlotContent slot={row.weekday[day]} size='desktop' />
                  </td>
                ))}
                <td
                  className='px-3.5 py-[9px] text-center align-middle'
                  style={{
                    borderBottom: '1px solid var(--grilla-border)',
                    borderLeft: '1px solid var(--grilla-border)'
                  }}
                >
                  <SlotContent slot={row.saturday} size='desktop' />
                </td>
                <TimeCell time={row.saturday != null ? (row.saturdayTime ?? null) : null} />
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function TimeCell ({ time }: { time: string | null }): React.ReactElement {
  return (
    <td
      className='px-3.5 py-[9px] text-center text-[13px] font-semibold whitespace-nowrap'
      style={{
        background: 'var(--grilla-time-bg)',
        borderBottom: '1px solid var(--grilla-border)',
        borderLeft: '1px solid var(--grilla-border)'
      }}
    >
      {time != null
        ? formatTimeRange(time)
        : <span style={{ color: 'var(--grilla-muted)', fontWeight: 400 }}>—</span>}
    </td>
  )
}
