// src/components/grilla/SlotContent.tsx
import type { SlotData } from '@/lib/grilla'

interface Props {
  slot: SlotData | null | undefined
  size: 'mobile' | 'desktop'
}

const STATUS_COLORS = {
  d: { dot: 'var(--grilla-status-d-dot)', text: 'var(--grilla-status-d-text)' },
  b: { dot: 'var(--grilla-status-b-dot)', text: 'var(--grilla-status-b-text)' },
  n: { dot: 'var(--grilla-status-n-dot)', text: 'var(--grilla-status-n-text)' },
  p: { dot: 'var(--grilla-status-p-dot)', text: 'var(--grilla-status-p-text)' }
} as const

const STATUS_LABEL = {
  d: 'Disponible',
  b: 'Baja disponibilidad',
  n: 'No disponible',
  p: 'Próximamente'
} as const

export function SlotContent ({ slot, size }: Props): React.ReactElement {
  const isMobile = size === 'mobile'

  // Sin clase
  if (slot === null || slot === undefined) {
    return (
      <span
        className={isMobile ? 'text-[14px]' : 'text-[12px]'}
        style={{ color: 'var(--grilla-muted)' }}
      >
        —
      </span>
    )
  }

  // Próximamente: solo el pill
  if (slot.s === 'p') {
    return (
      <span
        className={[
          'inline-flex items-center gap-1.5 rounded-[20px] font-medium',
          isMobile ? 'px-3 py-1 text-[12px]' : 'px-2 py-[3px] text-[10px]'
        ].join(' ')}
        style={{
          background: 'var(--grilla-status-p-bg)',
          color: 'var(--grilla-status-p-text)'
        }}
      >
        <span
          className='inline-block rounded-full'
          style={{
            width: isMobile ? 7 : 5,
            height: isMobile ? 7 : 5,
            background: 'var(--grilla-status-p-dot)'
          }}
        />
        Próximamente
      </span>
    )
  }

  // Disponible / Baja / No disponible: level badge + status row
  const levelBg = slot.l === 'Level Up' ? 'var(--grilla-level-levelup-bg)' : 'var(--grilla-level-inicial-bg)'
  const levelText = slot.l === 'Level Up' ? 'var(--grilla-level-levelup-text)' : 'var(--grilla-level-inicial-text)'
  const statusColor = STATUS_COLORS[slot.s]

  return (
    <div
      className={[
        'flex flex-col items-start',
        isMobile ? 'gap-[5px]' : 'gap-[3px]'
      ].join(' ')}
    >
      <span
        className={[
          'inline-block rounded-[20px] font-semibold uppercase tracking-[0.04em]',
          isMobile ? 'px-[11px] py-[3px] text-[10px]' : 'px-2 py-[2px] text-[10px]'
        ].join(' ')}
        style={{ background: levelBg, color: levelText }}
      >
        {slot.l}
      </span>
      <span
        className={[
          'inline-flex items-center gap-1.5 font-medium',
          isMobile ? 'text-[12px]' : 'text-[10px]'
        ].join(' ')}
        style={{ color: statusColor.text }}
      >
        <span
          className='inline-block rounded-full'
          style={{
            width: isMobile ? 7 : 6,
            height: isMobile ? 7 : 6,
            background: statusColor.dot
          }}
        />
        {STATUS_LABEL[slot.s]}
      </span>
    </div>
  )
}
