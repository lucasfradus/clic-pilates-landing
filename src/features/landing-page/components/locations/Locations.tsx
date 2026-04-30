import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProgressiveBlurHoverCard } from './components/ProgressiveBlurHoverCard'
import { getActiveLocations } from '@/lib/locations'

const locations = getActiveLocations()

export default function Locations (): React.ReactElement {
  return (
    <section id='contacto' className='min-h-screen flex flex-col justify-center items-center py-20 text-accent px-6 md:px-10 w-full'>
      <motion.h2
        className='text-3xl md:text-4xl font-semibold mb-4 text-center'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Nuestras Sedes
      </motion.h2>
      <motion.div
        className='h-[1px] bg-accent/30 mb-16'
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <div className='flex items-center justify-evenly flex-wrap gap-x-12 gap-y-10'>
        {locations.map((location) => (
          <div key={location.location} className='flex flex-col items-center gap-4 text-center'>
            <div>
              <h5 className='text-3xl font-semibold'>{location.locationName}</h5>
              <h6 className='text-2xl font-normal'>{location.address}</h6>
            </div>
            <ProgressiveBlurHoverCard
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
              <Image src='/icons/whatsapp.svg' width={20} height={20} alt='WhatsApp Logo' loading='lazy' />
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
