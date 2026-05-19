// src/components/grilla/GrillaHoraria.tsx
'use client'

import { useState } from 'react'
import type { Day, ScheduleResponse } from '@/lib/grilla'
import { DayTabs } from './DayTabs'
import { GrillaHeader } from './GrillaHeader'
import { GrillaLegend } from './GrillaLegend'
import { ScheduleTable } from './ScheduleTable'
import { SlotList } from './SlotList'

interface Props {
  data: ScheduleResponse
}

export function GrillaHoraria ({ data }: Props): React.ReactElement {
  const [activeDay, setActiveDay] = useState<Day>('Lunes')

  return (
    <>
      <GrillaHeader center={data.center} />

      {/* Mobile */}
      <div className='md:hidden'>
        <DayTabs activeDay={activeDay} onSelect={setActiveDay} />
        <GrillaLegend />
        <SlotList schedule={data.schedule} activeDay={activeDay} />
      </div>

      {/* Desktop */}
      <div className='hidden md:block'>
        <GrillaLegend />
        <ScheduleTable schedule={data.schedule} />
      </div>
    </>
  )
}
