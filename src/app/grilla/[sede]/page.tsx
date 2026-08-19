import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getActiveLocationBySlug } from '@/lib/locations'
import { getGrilla } from '@/lib/grilla'
import { GrillaHeader } from '@/components/grilla/GrillaHeader'
import { GrillaHoraria } from '@/components/grilla/GrillaHoraria'

interface PageProps {
  params: Promise<{ sede: string }>
}

export async function generateMetadata ({ params }: PageProps): Promise<Metadata> {
  const { sede } = await params
  const location = getActiveLocationBySlug(sede)
  if (location === undefined) {
    return {}
  }
  return {
    title: `Grilla horaria Clic Pilates ${location.locationName}`,
    alternates: { canonical: `/grilla/${sede}` }
  }
}

export default async function GrillaSedePage ({ params }: PageProps): Promise<React.ReactElement> {
  const { sede } = await params
  const location = getActiveLocationBySlug(sede)
  if (location === undefined) notFound()

  let data: Awaited<ReturnType<typeof getGrilla>> = null
  try {
    data = await getGrilla(sede)
  } catch {
    data = null
  }

  if (data === null) {
    return (
      <main className='min-h-screen' style={{ background: 'var(--grilla-page-bg)' }}>
        <GrillaHeader center={{ name: location.locationName, address: location.address }} />
        <div className='flex min-h-[40vh] items-center justify-center px-6 py-16 text-center'>
          <p className='text-[14px]' style={{ color: 'var(--grilla-muted)' }}>
            Próximamente publicamos los horarios de esta sede.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen' style={{ background: 'var(--grilla-page-bg)' }}>
      <GrillaHoraria data={data} />
    </main>
  )
}
