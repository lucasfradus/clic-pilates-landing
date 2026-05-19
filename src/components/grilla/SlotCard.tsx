import type { SlotData } from '@/lib/grilla'
import { formatTimeRange } from '@/lib/grilla'
import { SlotContent } from './SlotContent'

interface Props {
  time: string
  slot: SlotData | null | undefined
}

export function SlotCard ({ time, slot }: Props): React.ReactElement {
  return (
    <li
      className='flex min-h-[72px] items-center gap-3 rounded-[12px] px-4 py-[13px]'
      style={{
        background: 'var(--grilla-card-bg)',
        border: '1px solid var(--grilla-border)'
      }}
    >
      <span
        className='text-[14px] font-bold tracking-[-0.02em] whitespace-nowrap'
        style={{ color: 'var(--grilla-text)' }}
      >
        {formatTimeRange(time)}
      </span>
      <span className='flex flex-1 justify-center'>
        <SlotContent slot={slot} size='mobile' />
      </span>
    </li>
  )
}
