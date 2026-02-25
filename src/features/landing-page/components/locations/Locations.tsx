import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProgressiveBlurHoverCard } from './components/ProgressiveBlurHoverCard'
import { getActiveLocations } from '@/lib/locations'

const locations = getActiveLocations()

export default function Locations (): React.ReactElement {
  return (
    <section id='contacto' className='min-h-screen flex justify-center items-center py-12 text-accent px-10 w-full'>

      <div className='flex items-center justify-evenly flex-wrap gap-18'>
        {locations.map((location) => (
          <div key={location.location} className='flex flex-col items-center gap-4 text-center'>
            <div>
              <h5 className='text-3xl font-semibold'>{location.locationName}</h5>
              <h6 className='text-2xl font-normal'>{location.address}</h6>
            </div>
            <ProgressiveBlurHoverCard
              key={location.location}
              imageSrc={location.imageSrc}
              locationName={location.locationName}
              address={location.address}
              mapUrl={location.mapUrl}
              phoneNumber={location.phoneNumber}
            />
            <a
              className='flex items-center gap-2 group relative'
              href={`https://wa.me/${location.phoneNumber.replace(/[\s-]+/g, '')}`}
              target='_blank'
              rel='noreferrer'
            >
              <Image src='/icons/whatsapp.svg' width={20} height={20} alt='WhatsApp Logo' />
              <span className='text-xl font-semibold relative'>
                {location.phoneNumber}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full' />
              </span>
            </a>
            

            <Link
              href={`/sede/${location.location}`}
              className='flex items-center gap-2 group relative'
            >
              <span className='text-xl font-semibold relative'>
                Ver horarios disponibles
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full' />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
