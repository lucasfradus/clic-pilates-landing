import type { Center } from '@/lib/grilla'

interface Props {
  center: Pick<Center, 'name' | 'address'>
}

export function GrillaHeader ({ center }: Props): React.ReactElement {
  return (
    <header
      className='px-5 pt-6 pb-5 md:px-8 md:pt-10 md:pb-7'
      style={{ borderBottom: '1px solid var(--grilla-border)' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='/icons/logo_clic.svg'
        alt='CLIC Studio Pilates'
        className='mb-4 block h-5 w-auto md:h-6'
        style={{ filter: 'brightness(0)' }}
      />
      <h1
        className='font-bold leading-[1.05] tracking-[-0.03em] text-[28px] md:text-[36px]'
        style={{ color: 'var(--grilla-text)' }}
      >
        {center.name}
      </h1>
      <p
        className='mt-1.5 text-[14px] md:text-[15px]'
        style={{ color: 'var(--grilla-muted)' }}
      >
        {center.address}
      </p>
    </header>
  )
}
