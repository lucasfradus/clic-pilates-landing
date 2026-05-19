import { notFound } from 'next/navigation'
import { getActiveLocationBySlug } from '@/lib/locations'
import { getGrilla } from '@/lib/grilla'
import { GrillaHeader } from '@/components/grilla/GrillaHeader'

interface PageProps {
  params: Promise<{ sede: string }>
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

  const headerCenter = data?.center ?? {
    name: location.locationName,
    address: location.address
  }

  if (data === null) {
    return (
      <main className='min-h-screen' style={{ background: 'var(--grilla-page-bg)' }}>
        <GrillaHeader center={headerCenter} />
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
      <GrillaHeader center={data.center} />
      <pre className='p-8 text-xs'>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
