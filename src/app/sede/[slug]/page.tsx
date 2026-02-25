import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLocationBySlug, locations } from '@/lib/locations'
import { getHorarios, parseHorarios } from '@/lib/stein'
import { HorariosTable } from '@/components/HorariosTable'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams (): Array<{ slug: string }> {
  return locations.map((loc) => ({ slug: loc.location }))
}

export default async function SedePage ({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) {
    notFound()
  }

  let horariosData: Awaited<ReturnType<typeof parseHorarios>> = null
  try {
    const raw = await getHorarios(slug)
    horariosData = parseHorarios(raw)
  } catch {
    horariosData = null
  }

  return (
    <main className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-4 py-8 md:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-accent'>{location.locationName}</h1>
          <p className='mt-2 text-muted-foreground'>{location.address}</p>
        </div>

        <section>
          <h2 className='text-2xl font-semibold text-accent mb-4'>Horarios y disponibilidad</h2>
          {horariosData && horariosData.maxRows > 0 ? (
            <HorariosTable data={horariosData} variant='default' />
          ) : (
            <div className='rounded-lg border border-border bg-muted/20 p-8 text-center text-muted-foreground'>
              <p>No hay horarios cargados para esta sede en este momento.</p>
              <p className='mt-2 text-sm'>
                Si necesitás información actualizada, contactanos por{' '}
                <a
                  href={`https://wa.me/${location.phoneNumber.replace(/[\s-]+/g, '')}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-accent underline hover:no-underline'
                >
                  WhatsApp
                </a>
                .
              </p>
            </div>
          )}
        </section>

        <div className='mt-8'>
          <Link
            href='/'
            className='text-accent underline hover:no-underline text-sm'
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
