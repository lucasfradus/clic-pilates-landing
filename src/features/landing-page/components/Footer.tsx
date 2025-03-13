'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import Link from 'next/link'
import Image from 'next/image'

export default function ClicFooter (): React.ReactElement {
  return (
    <footer className='relative border-t bg-accent text-background transition-colors duration-300'>
      <div className='container mx-auto px-4 py-8 sm:py-10 md:px-6 md:py-12 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Stay Connected Section */}
          <div className='relative flex flex-col'>
            <div className='mb-4 sm:mb-6'>
              <Image
                src='/logo_footer.svg'
                alt='CLIC studio pilates'
                width={190}
                height={50}
                className='mb-2'
                priority
              />
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className='mb-4 text-lg font-bold'>EXPLORE</h3>
            <nav className='grid gap-2 text-sm'>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Brand
              </Link>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Quienes Somos
              </Link>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Niveles
              </Link>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Pilates
              </Link>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Franquicias
              </Link>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className='mb-4 text-lg font-bold'>CONTACT</h3>
            <address className='grid gap-1 text-sm not-italic'>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Office Park
              </Link>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Escobar
              </Link>
              <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
                Pilará
              </Link>
            </address>
          </div>

          {/* Follow Us Section */}
          <div className='relative'>
            <h3 className='mb-4 text-lg font-bold'>FOLLOW US</h3>
            <div className='flex flex-wrap gap-4'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-10 w-10 rounded-full bg-transparent border-background/30 hover:border-background hover:bg-background/10 hover:opacity-100 transition-all'
                    >
                      <Image src='/facebook.svg' alt='Facebook' width={18} height={18} />
                      <span className='sr-only'>Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-background text-accent'>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-10 w-10 rounded-full bg-transparent border-background/30 hover:border-background hover:bg-background/10 hover:opacity-100 transition-all'
                    >
                      <Image src='/tiktok.svg' alt='TikTok' width={18} height={18} />
                      <span className='sr-only'>TikTok</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-background text-accent'>
                    <p>Follow us on TikTok</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-10 w-10 rounded-full bg-transparent border-background/30 hover:border-background hover:bg-background/10 hover:opacity-100 transition-all'
                    >
                      <Image src='/instagram.svg' alt='Instagram' width={18} height={18} />
                      <span className='sr-only'>Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-background text-accent'>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className='mt-8 sm:mt-10 md:mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/20 pt-6 md:flex-row md:pt-8'>
          <p className='text-xs sm:text-sm'>
            ® CLIC STUDIO PILATES.
          </p>
          <div className='flex items-center'>
            <a href='#' className='text-xs sm:text-sm transition-opacity hover:opacity-80 hover:underline'>
              DESIGNED BY CS CREATIVE STUDIO
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
