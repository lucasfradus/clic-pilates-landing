import { DAYS, formatTimeRange, sortTimes, type Schedule } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  schedule: Schedule
}

export function ScheduleTable ({ schedule }: Props): React.ReactElement {
  const times = sortTimes(Object.keys(schedule))
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
          {times.map((time, rowIdx) => {
            const rowBg = rowIdx % 2 === 0 ? 'var(--grilla-card-bg)' : 'var(--grilla-row-alt-bg)'
            const daySchedule = schedule[time]
            return (
              <tr key={time} style={{ background: rowBg }}>
                <td
                  className='px-3.5 py-[9px] text-center text-[13px] font-semibold whitespace-nowrap'
                  style={{
                    background: 'var(--grilla-time-bg)',
                    borderBottom: '1px solid var(--grilla-border)'
                  }}
                >
                  {formatTimeRange(time)}
                </td>
                {DAYS.map((day) => (
                  <td
                    key={day}
                    className='px-3.5 py-[9px] text-center align-middle'
                    style={{
                      borderBottom: '1px solid var(--grilla-border)',
                      borderLeft: '1px solid var(--grilla-border)'
                    }}
                  >
                    <SlotContent slot={daySchedule[day]} size='desktop' />
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
