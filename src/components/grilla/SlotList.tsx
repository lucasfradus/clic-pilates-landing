// src/components/grilla/SlotList.tsx
import { sortTimes, type Day, type Schedule } from '@/lib/grilla'
import { SlotCard } from './SlotCard'

interface Props {
  schedule: Schedule
  activeDay: Day
}

const DAY_FULL_LABEL: Record<Day, string> = {
  Lunes: 'Lunes',
  Martes: 'Martes',
  Miércoles: 'Miércoles',
  Jueves: 'Jueves',
  Viernes: 'Viernes',
  Sábado: 'Sábado'
}

export function SlotList ({ schedule, activeDay }: Props): React.ReactElement {
  const times = sortTimes(
    Object.keys(schedule).filter((t) => schedule[t][activeDay] != null)
  )
  return (
    <>
      <h2
        className='px-4 pb-2 pt-3.5 text-[12px] font-semibold uppercase tracking-[0.07em]'
        style={{ color: 'var(--grilla-muted)' }}
      >
        {DAY_FULL_LABEL[activeDay]}
      </h2>
      <ul className='flex flex-col gap-2 px-4 pb-10'>
        {times.map((time) => (
          <SlotCard key={time} time={time} slot={schedule[time][activeDay]} />
        ))}
      </ul>
    </>
  )
}
