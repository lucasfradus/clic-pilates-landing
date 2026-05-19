import type { SlotData, Status } from '@/lib/grilla'

interface Props {
  slot: SlotData | null | undefined
  size: 'mobile' | 'desktop'
}

type ActiveStatus = Exclude<Status, 'p'>

const STATUS_COLORS: Record<ActiveStatus, { dot: string, text: string }> = {
  d: { dot: 'var(--grilla-status-d-dot)', text: 'var(--grilla-status-d-text)' },
  b: { dot: 'var(--grilla-status-b-dot)', text: 'var(--grilla-status-b-text)' },
  n: { dot: 'var(--grilla-status-n-dot)', text: 'var(--grilla-status-n-text)' }
}

const STATUS_LABEL: Record<ActiveStatus, string> = {
  d: 'Disponible',
  b: 'Baja disponibilidad',
  n: 'No disponible'
}

function isActiveStatus (s: Status): s is ActiveStatus {
  return s !== 'p'
}

export function SlotContent ({ slot, size }: Props): React.ReactElement {
  const isMobile = size === 'mobile'

  // Sin clase (null, undefined, o status 'p' que no se muestra)
  if (slot === null || slot === undefined || !isActiveStatus(slot.s)) {
    return (
      <span
        className={isMobile ? 'text-[14px]' : 'text-[12px]'}
        style={{ color: 'var(--grilla-muted)' }}
      >
        —
      </span>
    )
  }

  const levelBg = slot.l === 'Level Up' ? 'var(--grilla-level-levelup-bg)' : 'var(--grilla-level-inicial-bg)'
  const levelText = slot.l === 'Level Up' ? 'var(--grilla-level-levelup-text)' : 'var(--grilla-level-inicial-text)'
  const statusColor = STATUS_COLORS[slot.s]

  return (
    <div
      className={[
        'flex flex-col items-start',
        isMobile ? 'gap-1.5' : 'gap-1'
      ].join(' ')}
    >
      <span
        className={[
          'inline-block rounded-[20px] font-semibold uppercase tracking-[0.04em]',
          isMobile ? 'px-3 py-[5px] text-[12px]' : 'px-2.5 py-[4px] text-[12px]'
        ].join(' ')}
        style={{ background: levelBg, color: levelText }}
      >
        {slot.l}
      </span>
      <span
        className={[
          'inline-flex items-center gap-1.5 font-medium',
          isMobile ? 'text-[12px]' : 'text-[11px]'
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
