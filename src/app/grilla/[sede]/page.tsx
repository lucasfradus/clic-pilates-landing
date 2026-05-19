import { notFound } from 'next/navigation'
import { getActiveLocationBySlug } from '@/lib/locations'
import { getGrilla } from '@/lib/grilla'

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

  return (
    <main className='min-h-screen bg-[var(--grilla-page-bg)]'>
      <pre className='p-8 text-xs'>
        {JSON.stringify({ sede, location: location.locationName, hasData: data !== null }, null, 2)}
      </pre>
    </main>
  )
}
