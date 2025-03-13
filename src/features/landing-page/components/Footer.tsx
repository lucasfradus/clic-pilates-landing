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
      <div className='container mx-auto px-4 py-12 md:px-6 lg:px-8'>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4'>
          {/* Stay Connected Section */}
          <div className='relative'>
            <div className='mb-4'>
              <Image
                src='/logo_footer.svg'
                alt='CLIC studio pilates'
                width={160}
                height={50}
                className='mb-2'
              />
            </div>

            <div className='absolute -right-4 top-0 h-24 w-24 rounded-full bg-background/10 blur-2xl' />
          </div>

          {/* Explore Section */}
          <div>
            <h3 className='mb-4 text-lg font-bold'>EXPLORE</h3>
            <nav className='space-y-2 text-sm'>
              <Link href='#' className='block transition-opacity hover:opacity-80'>
                Brand
              </Link>
              <Link href='#' className='block transition-opacity hover:opacity-80'>
                Quienes Somos
              </Link>
              <Link href='#' className='block transition-opacity hover:opacity-80'>
                Niveles
              </Link>
              <Link href='#' className='block transition-opacity hover:opacity-80'>
                Pilates
              </Link>
              <Link href='#' className='block transition-opacity hover:opacity-80'>
                Franquicias
              </Link>
              <Link href='#' className='block transition-opacity hover:opacity-80'>
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className='mb-4 text-lg font-bold'>CONTACT</h3>
            <address className='space-y-2 text-sm not-italic'>
              <p className='font-medium'>Office Park Pilar</p>
              <p className='font-medium'>Escobar</p>
              <p>Av. 12 de Octubre 2961, Pilar,</p>
              <p>Buenos Aires</p>
              <p className='pt-2'>Phone: +54 9 11 2889-4398</p>
            </address>
          </div>

          {/* Follow Us Section */}
          <div className='relative'>
            <h3 className='mb-4 text-lg font-bold'>FOLLOW US</h3>
            <div className='mb-6 flex space-x-5'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='outline' size='icon' className='rounded-full bg-transparent border-background/30 hover:opacity-80'>
                      <Image src='/facebook.svg' alt='Facebook' width={16} height={16} />
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
                    <Button variant='outline' size='icon' className='rounded-full bg-transparent border-background/30 hover:opacity-80'>
                      <Image src='/tiktok.svg' alt='TikTok' width={16} height={16} />
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
                    <Button variant='outline' size='icon' className='rounded-full bg-transparent border-background/30 hover:opacity-80'>
                      <Image src='/instagram.svg' alt='Instagram' width={16} height={16} />
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
        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/20 pt-8 text-center md:flex-row'>
          <p className='text-sm'>
            ® CLIC STUDIO PILATES.
          </p>
          <div className='flex items-center gap-4 text-sm'>
            <a href='#' className='transition-opacity hover:opacity-80'>
              DESIGNED BY CS CREATIVE STUDIO
            </a>

          </div>
        </div>
      </div>
    </footer>
  )
}
