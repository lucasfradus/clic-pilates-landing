// src/components/grilla/ScheduleTable.tsx
import { DAYS, sortTimes, type Schedule } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  schedule: Schedule
}

function endTime (start: string): string {
  // "8.00" → "9", "10.30" → "11", etc. La clase dura ~1h.
  const hour = parseInt(start.split('.')[0], 10)
  return `${hour + 1}`
}

export function ScheduleTable ({ schedule }: Props): React.ReactElement {
  const times = sortTimes(Object.keys(schedule))

  return (
    <div className='overflow-x-auto px-6 pb-10'>
      <table
        className='w-full border-collapse'
        style={{ minWidth: 720, color: 'var(--grilla-text)' }}
      >
        <thead>
          <tr>
            <th
              className='px-3.5 py-[11px] text-left text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderRadius: '8px 0 0 0',
                minWidth: 80
              }}
            >
              Horario
            </th>
            {DAYS.map((day) => (
              <th
                key={day}
                className='px-3.5 py-[11px] text-left text-[10px] font-semibold uppercase tracking-[0.09em]'
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
              className='px-3.5 py-[11px] text-left text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderRadius: '0 8px 0 0',
                borderLeft: '1px solid var(--grilla-border)',
                minWidth: 80
              }}
            >
              Horario
            </th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, rowIdx) => {
            const rowBg = rowIdx % 2 === 0 ? 'var(--grilla-card-bg)' : 'var(--grilla-row-alt-bg)'
            const daySchedule = schedule[time]
            return (
              <tr key={time} style={{ background: rowBg }}>
                <td
                  className='px-3.5 py-[9px] text-[13px] font-semibold'
                  style={{
                    background: 'var(--grilla-time-bg)',
                    borderBottom: '1px solid var(--grilla-border)'
                  }}
                >
                  {time} hs
                </td>
                {DAYS.map((day) => (
                  <td
                    key={day}
                    className='px-3.5 py-[9px] align-middle'
                    style={{
                      borderBottom: '1px solid var(--grilla-border)',
                      borderLeft: '1px solid var(--grilla-border)'
                    }}
                  >
                    <SlotContent slot={daySchedule[day]} size='desktop' />
                  </td>
                ))}
                <td
                  className='px-3.5 py-[9px] text-[13px] font-semibold'
                  style={{
                    background: 'var(--grilla-time-bg)',
                    borderBottom: '1px solid var(--grilla-border)',
                    borderLeft: '1px solid var(--grilla-border)'
                  }}
                >
                  {endTime(time)} hs
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
