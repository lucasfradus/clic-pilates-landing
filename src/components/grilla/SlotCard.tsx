// src/components/grilla/SlotCard.tsx
import type { SlotData } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  time: string
  slot: SlotData | null | undefined
}

export function SlotCard ({ time, slot }: Props): React.ReactElement {
  return (
    <li
      className='flex items-center gap-3 rounded-[12px] px-4 py-[13px]'
      style={{
        background: 'var(--grilla-card-bg)',
        border: '1px solid var(--grilla-border)'
      }}
    >
      <span
        className='text-[15px] font-bold tracking-[-0.02em]'
        style={{ color: 'var(--grilla-text)' }}
      >
        {time}
        <span className='ml-1 text-[11px] font-normal'>hs</span>
      </span>
      <span className='ml-auto'>
        <SlotContent slot={slot} size='mobile' />
      </span>
    </li>
  )
}
