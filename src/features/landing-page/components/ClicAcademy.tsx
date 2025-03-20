// components/ClicAcademy.tsx
import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Download } from 'lucide-react'

interface ClicAcademyProps {
  title?: string
  description?: string
  pdfPath?: string
  previewImagePath?: string
  fileDetails?: string
}

const ClicAcademy: React.FC<ClicAcademyProps> = ({
  title = 'CLIC ACADEMY',
  description = 'Capacítate en el método auténtico de pilates y forma parte de nuestro staff de instructores.',
  pdfPath = '/files/clic-academy.pdf',
  previewImagePath = '/pdf-preview.png',
  fileDetails = 'Formato PDF - 2.5MB - Actualizado Marzo 2025'
}) => {
  return (
    <section id='academy' className='w-full bg-accent text-cream py-20'>
      <div className='container mx-auto px-4 md:px-6 max-w-6xl'>
        <div className='flex flex-col items-center mb-10'>
          <h2 className='text-4xl font-bold text-light-text mb-3'>{title}</h2>
          <p className='text-lg text-light-text text-center max-w-2xl'>
            {description}
          </p>
        </div>

        {/* Clickable Card with PDF Preview */}
        <a
          href={pdfPath}
          target='_blank'
          rel='noopener noreferrer'
          className='block max-w-md mx-auto'
        >
          <Card className='relative overflow-hidden aspect-[3/4] w-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer'>
            {/* PDF Preview Image */}
            <Image
              src={previewImagePath}
              alt='PDF Preview'
              fill
              objectFit='cover'
              className='rounded-lg'
            />

            {/* Hover Overlay */}
            <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
              <Download className='w-16 h-16 text-white' />
            </div>
          </Card>
        </a>

        {/* File details */}
        {/* <div className='text-center mt-4 text-light-text text-sm'>
          <p>{fileDetails}</p>
        </div> */}
      </div>
    </section>
  )
}

export default ClicAcademy
