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

const ACTIVITY_STYLES: Record<string, { bg: string, text: string }> = {
  Inicial: { bg: 'var(--grilla-level-inicial-bg)', text: 'var(--grilla-level-inicial-text)' },
  'Level Up': { bg: 'var(--grilla-level-levelup-bg)', text: 'var(--grilla-level-levelup-text)' },
  Embarazadas: { bg: '#f3dcd5', text: '#7a3f33' },
  Entrenamientos: { bg: '#dde4d7', text: '#3f5340' }
}

const DEFAULT_ACTIVITY_STYLE = { bg: '#e8e4dd', text: '#5a4f45' }

function isActiveStatus (s: Status): s is ActiveStatus {
  return s !== 'p'
}

export function SlotContent ({ slot, size }: Props): React.ReactElement {
  const isMobile = size === 'mobile'

  // Sin clase (null, undefined, o status 'p' que ya no se muestra)
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

  // Preferir `activity` (nuevo); fallback a `l` (deprecado, coexistencia).
  const activityLabel = slot.activity ?? slot.l ?? '—'
  const activityStyle = ACTIVITY_STYLES[activityLabel] ?? DEFAULT_ACTIVITY_STYLE
  const statusColor = STATUS_COLORS[slot.s]

  return (
    <div
      className={[
        'flex flex-col items-center',
        isMobile ? 'gap-1.5' : 'gap-1'
      ].join(' ')}
    >
      <span
        className={[
          'inline-block rounded-[20px] font-semibold uppercase tracking-[0.04em]',
          isMobile ? 'px-3 py-[5px] text-[12px]' : 'px-2.5 py-[4px] text-[12px]'
        ].join(' ')}
        style={{ background: activityStyle.bg, color: activityStyle.text }}
      >
        {activityLabel}
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
