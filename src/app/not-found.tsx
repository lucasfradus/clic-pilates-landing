'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { JSX } from 'react'

export default function NotFound (): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cream p-4 text-center bg-background text-accent'>
      <div className='max-w-md'>
        <h1 className='text-6xl font-bold mb-4'>404</h1>
        <h2 className='text-2xl font-semibold mb-6'>Página no encontrada</h2>
        <p className='mb-8 text-muted-foreground'>
          La página que estás buscando no existe o ha sido eliminada.
        </p>
        <Link
          href='/'
          className='inline-flex items-center px-6 py-3 bg-accent text-background rounded-md hover:opacity-90 transition-opacity'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Volver a la página principal
        </Link>
      </div>
    </div>
  )
}
