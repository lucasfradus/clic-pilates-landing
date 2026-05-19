// src/components/grilla/GrillaHeader.tsx
import type { Center } from '@/lib/grilla'

interface Props {
  center: Pick<Center, 'name' | 'address'>
}

export function GrillaHeader ({ center }: Props): React.ReactElement {
  return (
    <header
      className='relative overflow-hidden px-5 pt-[22px] pb-7 md:px-7'
      style={{ background: 'linear-gradient(145deg, #c8bab0 0%, #a8998a 100%)' }}
    >
      {/* Círculos decorativos */}
      <span
        aria-hidden
        className='pointer-events-none absolute h-[200px] w-[200px] rounded-full'
        style={{ top: -60, right: -60, background: 'rgba(255,255,255,0.04)' }}
      />
      <span
        aria-hidden
        className='pointer-events-none absolute h-[120px] w-[120px] rounded-full'
        style={{ bottom: -40, right: 40, background: 'rgba(255,255,255,0.03)' }}
      />

      {/* Logo en crop 88×38 */}
      <div className='relative mb-3 h-[38px] w-[88px] overflow-hidden'>
        <img
          src='/icons/logo_clic.svg'
          alt='CLIC Studio Pilates'
          className='block h-[88px] w-[88px] -translate-y-[25px]'
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <h1
        className='font-bold leading-[1.05] tracking-[-0.03em] text-white text-[30px] md:text-[34px]'
      >
        {center.name}
      </h1>
      <p className='mt-1 text-[13px] font-light' style={{ color: 'rgba(255,255,255,0.75)' }}>
        {center.address}
      </p>
      <p
        className='mt-4 text-[11px] font-semibold uppercase tracking-[0.09em]'
        style={{ color: 'rgba(255,255,255,0.75)', opacity: 0.8 }}
      >
        Horarios y disponibilidad
      </p>
    </header>
  )
}
