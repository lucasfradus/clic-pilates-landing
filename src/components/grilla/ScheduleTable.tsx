import { buildGridRows, DAYS, formatTimeRange, WEEKDAYS, type Schedule } from '@/lib/grilla'
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
            const saturdayTimeDiffers = row.saturday != null && row.saturdayTime != null && row.saturdayTime !== row.rowTime
            return (
              <tr key={`${row.rowTime}-${rowIdx}`} style={{ background: rowBg }}>
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
                  <div className='flex flex-col items-center gap-1'>
                    <SlotContent slot={row.saturday} size='desktop' />
                    {saturdayTimeDiffers && (
                      <span
                        className='text-[11px] font-medium whitespace-nowrap'
                        style={{ color: 'var(--grilla-muted)' }}
                      >
                        {formatTimeRange(row.saturdayTime ?? row.rowTime)}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
