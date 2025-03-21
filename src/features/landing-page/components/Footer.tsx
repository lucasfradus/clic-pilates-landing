'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ClicFooter (): React.ReactElement {
  return (
    <footer className='relative border-t bg-accent text-background transition-colors duration-300 py-10 px-10 md:px-20'>
      <div className='flex flex-col md:flex-row justify-between items-center flex-wrap gap-16 md:gap-8'>

        {/* Explore Section */}
        <div className='flex flex-col justify-center items-center md:items-start order-2 md:order-1'>
          <h3 className='mb-4 text-lg font-bold'>EXPLORE</h3>
          <div className='grid grid-cols-2 gap-x-3 gap-y-2 text-sm'>
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
          </div>
        </div>

        {/* logo */}
        <div className='relative flex flex-col gap-0 justify-center items-center order-1 md:order-2'>
          <Image
            src='/icons/logo_footer.svg'
            alt='CLIC studio pilates'
            width={200}
            height={50}
            className='mb-2'
            priority
          />

        </div>

        {/* Contact Us Section */}
        <div className='flex flex-col justify-center items-center md:items-start order-3'>
          <h3 className='mb-4 text-lg font-bold'>CONTACT</h3>
          <div className='grid grid-cols-2 gap-x-3 gap-y-2 text-sm'>
            <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
              Office Park
            </Link>
            <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
              +54 9 11 2689-4398
            </Link>
            <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
              Escobar
            </Link>
            <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
              +54 9 11 3336-6571
            </Link>
            <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
              Pilará
            </Link>
            <Link href='#' className='inline-block transition-opacity hover:opacity-80 hover:underline'>
              +54 9 11 2650-9533
            </Link>
          </div>
        </div>

        {/* social */}
        <div className='flex w-full justify-center md:justify-start flex-wrap gap-4 py-6 md:py-8 order-4'>
          <a
            href='https://www.facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className=''
          >
            <Image
              src='/icons/facebook.svg'
              alt='Facebook'
              width={18}
              height={18}
              className='invert brightness-0'
            />
            <span className='sr-only'>Facebook</span>
          </a>

          <a
            href='https://www.tiktok.com'
            target='_blank'
            rel='noopener noreferrer'
            className=''
          >
            <Image
              src='/icons/tiktok.svg'
              alt='TikTok'
              width={18}
              height={18}
              className='invert brightness-0'
            />
            <span className='sr-only'>TikTok</span>
          </a>

          <a
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className=''
          >
            <Image
              src='/icons/instagram.svg'
              alt='Instagram'
              width={18}
              height={18}
              className='invert brightness-0'
            />
            <span className='sr-only'>Instagram</span>
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className='flex flex-col items-center justify-between gap-4 border-t border-background/20 pt-6 md:flex-row md:pt-8'>
        <p className='text-xs sm:text-sm'>
          ® CLIC STUDIO PILATES.
        </p>

        <div className='flex items-center'>
          <a href='#' className='text-xs sm:text-sm transition-opacity hover:opacity-80 hover:underline'>
            DESIGNED BY CS CREATIVE STUDIO
          </a>
        </div>
      </div>
    </footer>
  )
}
