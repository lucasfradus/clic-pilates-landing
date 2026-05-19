// src/components/grilla/DayTabs.tsx
'use client'

import type { Day } from '@/lib/grilla'
import { DAYS } from '@/lib/grilla'

interface Props {
  activeDay: Day
  onSelect: (day: Day) => void
}

const SHORT_LABEL: Record<Day, string> = {
  Lunes: 'Lun',
  Martes: 'Mar',
  Miércoles: 'Mié',
  Jueves: 'Jue',
  Viernes: 'Vie',
  Sábado: 'Sáb'
}

export function DayTabs ({ activeDay, onSelect }: Props): React.ReactElement {
  return (
    <div
      className='flex gap-2 overflow-x-auto px-4 pt-3.5'
      style={{ scrollbarWidth: 'none' }}
    >
      {DAYS.map((day) => {
        const isActive = day === activeDay
        return (
          <button
            key={day}
            type='button'
            onClick={() => onSelect(day)}
            className='whitespace-nowrap rounded-[22px] px-[18px] py-[9px] text-[13px] transition-all duration-200'
            style={{
              background: isActive ? 'var(--grilla-tab-active-bg)' : 'var(--grilla-tab-inactive-bg)',
              color: isActive ? 'var(--grilla-tab-active-text)' : 'var(--grilla-tab-inactive-text)',
              fontWeight: isActive ? 600 : 400,
              letterSpacing: isActive ? '-0.01em' : 'normal'
            }}
          >
            {SHORT_LABEL[day]}
          </button>
        )
      })}
    </div>
  )
}
