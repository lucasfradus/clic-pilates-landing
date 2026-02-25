import { notFound } from 'next/navigation'
import { getActiveLocationBySlug } from '@/lib/locations'
import { getHorarios, parseHorarios } from '@/lib/stein'
import { HorariosTable } from '@/components/HorariosTable'

interface PageProps {
  params: Promise<{ sede: string }>
}

export default async function SedeHorariosPage ({ params }: PageProps): Promise<React.ReactElement> {
  const { sede } = await params
  const location = getActiveLocationBySlug(sede)

  if (!location) {
    notFound()
  }

  let horariosData: Awaited<ReturnType<typeof parseHorarios>> = null
  try {
    const raw = await getHorarios(sede)
    horariosData = parseHorarios(raw)
  } catch {
    horariosData = null
  }

  if (!horariosData || horariosData.maxRows === 0) {
    return (
      <main className='min-h-screen bg-background p-4 md:p-8 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4 text-accent'>Horarios {location.locationName}</h1>
          <p className='text-lg text-muted-foreground'>No hay horarios disponibles en este momento.</p>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-background p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center text-accent'>
          Horarios {location.locationName}
        </h1>
        <HorariosTable data={horariosData} variant='neutral' />
      </div>
    </main>
  )
}
