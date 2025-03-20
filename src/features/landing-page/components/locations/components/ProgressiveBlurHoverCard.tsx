'use client'

import React, { useState } from 'react'
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Map } from 'lucide-react'

interface LocationProps {
  imageSrc: string
  locationName: string
  address: string
  mapUrl: string
  phoneNumber?: string
}

export function ProgressiveBlurHoverCard ({
  imageSrc,
  locationName,
  address,
  mapUrl,
  phoneNumber
}: LocationProps): React.ReactElement {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className='relative my-4 aspect-square h-[300px] overflow-hidden rounded-[4px]'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image src={imageSrc} fill alt={`${locationName} - ${address}`} className='object-cover' />
      {/* Gradient background with diffused effect using custom colors */}
      <motion.div
        className='pointer-events-none absolute bottom-0 left-0 h-[75%] w-full'
        style={{
          background: 'linear-gradient(to top, rgba(161, 146, 133, 0.85) 0%, rgba(161, 146, 133, 0.6) 50%, rgba(237, 236, 231, 0) 100%)'
        }}
        animate={isHover ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Subtle blur effect */}
      <ProgressiveBlur
        className='pointer-events-none absolute bottom-0 left-0 h-[75%] w-full'
        blurIntensity={0.9}
        animate={isHover ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.5 }
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <motion.div
        className='absolute bottom-0 left-0 w-full'
        animate={isHover ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className='flex flex-col items-start gap-1 px-5 py-4'>
          <p className='text-base font-medium text-white'>{locationName}</p>
          <span className='text-sm text-white'>{address}</span>
          {phoneNumber != null && phoneNumber !== '' && (
            <span className='flex items-center text-sm text-white'>
              {/* <Phone className='h-4 w-4 mr-1' /> */}
              {phoneNumber}
            </span>
          )}
          <Button
            asChild
            size='sm'
            variant='link'
            className='mt-2 text-background'
          >
            <Link
              href={mapUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Map className='h-4 w-4 mr-1' />
              Abrir en Google Maps
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
