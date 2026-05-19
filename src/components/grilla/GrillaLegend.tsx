// src/components/grilla/GrillaLegend.tsx
const ITEMS = [
  { dot: 'var(--grilla-status-d-dot)', label: 'Disponible' },
  { dot: 'var(--grilla-status-b-dot)', label: 'Baja disponibilidad' },
  { dot: 'var(--grilla-status-n-dot)', label: 'No disponible' }
] as const

export function GrillaLegend (): React.ReactElement {
  return (
    <div
      className='mx-4 mt-3 rounded-[10px] px-4 py-2.5 md:mx-6 md:mt-0 md:mb-3 md:px-6 md:py-3'
      style={{
        background: 'var(--grilla-legend-bg)',
        border: '1px solid var(--grilla-border)'
      }}
    >
      <ul className='flex flex-wrap gap-x-[18px] gap-y-2'>
        {ITEMS.map((item) => (
          <li key={item.label} className='flex items-center gap-2'>
            <span
              className='inline-block h-[7px] w-[7px] rounded-full'
              style={{ background: item.dot }}
            />
            <span className='text-[11px] font-medium' style={{ color: 'var(--grilla-text)' }}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
