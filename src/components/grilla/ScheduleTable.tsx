import { buildPositionedSlots, DAYS, formatTimeRange, type PositionedSlot, type Schedule } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  schedule: Schedule
}

const ROW_PX = 18 // 15 min
const HOUR_PX = ROW_PX * 4 // 72 px
const HEADER_HEIGHT_PX = 36
const TIME_AXIS_WIDTH_PX = 64
const DAY_MIN_WIDTH_PX = 120

export function ScheduleTable ({ schedule }: Props): React.ReactElement {
  const { slots, startMinutes, endMinutes } = buildPositionedSlots(schedule)

  if (slots.length === 0) {
    return <div className='px-6 pb-10' style={{ color: 'var(--grilla-muted)' }}>Sin clases.</div>
  }

  const totalMinutes = endMinutes - startMinutes
  const totalRows = totalMinutes / 15
  const gridHeight = totalRows * ROW_PX
  const gridMinWidth = TIME_AXIS_WIDTH_PX + DAYS.length * DAY_MIN_WIDTH_PX

  const hourLabels: number[] = []
  for (let m = startMinutes; m < endMinutes; m += 60) hourLabels.push(m)

  const lastDayIdx = DAYS.length - 1

  return (
    <div className='overflow-x-auto px-6 pb-10'>
      <div style={{ minWidth: gridMinWidth, color: 'var(--grilla-text)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `${TIME_AXIS_WIDTH_PX}px repeat(${DAYS.length}, minmax(${DAY_MIN_WIDTH_PX}px, 1fr))`,
            height: HEADER_HEIGHT_PX
          }}
        >
          <div
            style={{
              background: 'var(--grilla-table-header-bg)',
              borderRadius: '8px 0 0 0'
            }}
          />
          {DAYS.map((day, idx) => (
            <div
              key={day}
              className='flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.09em]'
              style={{
                background: 'var(--grilla-table-header-bg)',
                color: 'var(--grilla-table-header-text)',
                borderLeft: '1px solid var(--grilla-border)',
                borderRadius: idx === lastDayIdx ? '0 8px 0 0' : undefined
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `${TIME_AXIS_WIDTH_PX}px repeat(${DAYS.length}, minmax(${DAY_MIN_WIDTH_PX}px, 1fr))`,
            gridTemplateRows: `repeat(${totalRows}, ${ROW_PX}px)`,
            height: gridHeight,
            background: 'var(--grilla-card-bg)'
          }}
        >
          {DAYS.map((day, idx) => (
            <div
              key={day}
              style={{
                gridColumn: idx + 2,
                gridRow: '1 / -1',
                borderLeft: '1px solid var(--grilla-border)',
                borderBottom: '1px solid var(--grilla-border)',
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${HOUR_PX - 1}px, var(--grilla-border) ${HOUR_PX - 1}px, var(--grilla-border) ${HOUR_PX}px)`,
                backgroundSize: `100% ${HOUR_PX}px`
              }}
            />
          ))}

          {hourLabels.map((m) => {
            const rowStart = (m - startMinutes) / 15 + 1
            const hour = Math.floor(m / 60)
            return (
              <div
                key={m}
                className='flex items-start justify-end pr-2 pt-1 text-[11px] font-semibold whitespace-nowrap'
                style={{
                  gridColumn: 1,
                  gridRow: `${rowStart} / span 4`,
                  color: 'var(--grilla-muted)',
                  background: 'var(--grilla-time-bg)',
                  borderBottom: '1px solid var(--grilla-border)'
                }}
              >
                {hour.toString().padStart(2, '0')}:00
              </div>
            )
          })}

          {slots.map((s) => (
            <SlotBlock key={`${s.day}-${s.time}`} slot={s} startMinutes={startMinutes} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface SlotBlockProps {
  slot: PositionedSlot
  startMinutes: number
}

function SlotBlock ({ slot, startMinutes }: SlotBlockProps): React.ReactElement {
  const rowStart = (slot.startMinutes - startMinutes) / 15 + 1
  const rowSpan = (slot.endMinutes - slot.startMinutes) / 15
  const dayIdx = DAYS.indexOf(slot.day)

  return (
    <div
      style={{
        gridColumn: dayIdx + 2,
        gridRow: `${rowStart} / span ${rowSpan}`,
        padding: 4,
        position: 'relative',
        zIndex: 1
      }}
    >
      <div
        className='flex h-full flex-col items-center justify-center gap-1 rounded-md px-2 py-1.5'
        style={{
          background: 'var(--grilla-row-alt-bg)',
          border: '1px solid var(--grilla-border)'
        }}
      >
        <span
          className='text-[10px] font-semibold whitespace-nowrap'
          style={{ color: 'var(--grilla-muted)' }}
        >
          {formatTimeRange(slot.time)}
        </span>
        <SlotContent slot={slot.slot} size='desktop' />
      </div>
    </div>
  )
}
