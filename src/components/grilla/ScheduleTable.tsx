import { buildGridRows, DAYS, formatTimeRange, WEEKDAYS, type SaturdaySlot, type Schedule } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  schedule: Schedule
}

export function ScheduleTable ({ schedule }: Props): React.ReactElement {
  const rows = buildGridRows(schedule)
  const lastDayIdx = DAYS.length - 1

  return (
    <div className='overflow-x-auto px-6 pb-10'>
      <table
        className='w-full border-collapse'
        style={{ minWidth: 760, color: 'var(--grilla-text)' }}
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
            {DAYS.map((day, idx) => (
              <th
                key={day}
                className='px-3.5 py-[11px] text-center text-[10px] font-semibold uppercase tracking-[0.09em]'
                style={{
                  background: 'var(--grilla-table-header-bg)',
                  color: 'var(--grilla-table-header-text)',
                  borderLeft: '1px solid var(--grilla-border)',
                  borderRadius: idx === lastDayIdx ? '0 8px 0 0' : undefined,
                  minWidth: 130
                }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const rowBg = rowIdx % 2 === 0 ? 'var(--grilla-card-bg)' : 'var(--grilla-row-alt-bg)'
            return (
              <tr key={row.rowTime} style={{ background: rowBg }}>
                <td
                  className='px-3.5 py-[9px] text-center text-[13px] font-semibold whitespace-nowrap'
                  style={{
                    background: 'var(--grilla-time-bg)',
                    borderBottom: '1px solid var(--grilla-border)'
                  }}
                >
                  {formatTimeRange(row.rowTime)}
                </td>
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
                  <SaturdayCell slots={row.saturdaySlots} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SaturdayCell ({ slots }: { slots: SaturdaySlot[] }): React.ReactElement {
  if (slots.length === 0) {
    return <SlotContent slot={null} size='desktop' />
  }
  return (
    <div className='flex flex-col items-stretch gap-3'>
      {slots.map((s) => (
        <div key={s.time} className='flex flex-col items-center gap-1'>
          <span
            className='text-[11px] font-semibold whitespace-nowrap'
            style={{ color: 'var(--grilla-muted)' }}
          >
            {formatTimeRange(s.time)}
          </span>
          <SlotContent slot={s.slot} size='desktop' />
        </div>
      ))}
    </div>
  )
}
