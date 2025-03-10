'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function MobileNav ({ scrolled }: { scrolled: boolean }): React.ReactElement {
  const [open, setOpen] = useState(false)

  // Add useEffect to control body overflow
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden' // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = '' // Restore default overflow when menu is closed
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav className={cn(
        'flex items-center justify-between px-10 py-6 xl:hidden fixed top-0 left-0 right-0 z-50 duration-500 border-b-2 border-background font-thin text-background transition-all duration-300 ease-in-out',
        scrolled
          ? 'backdrop-blur-md bg-accent/80 shadow-lg'
          : 'bg-transparent'
      )}
      >
        <Link href='/#home' className='z-50' onClick={() => setOpen(false)}>
          <Image src='/logo_nav.png' width={100} height={100} alt='Clic Pilates Logo' className='animate-fade ease-in-out animate-normal animate-duration-[3000ms] animate-fill-both animate-once' />
        </Link>

        {/* Botón para abrir o cerrar menú */}
        {!open
          ? (
            <button
              type='button'
              className='pointer-events-auto duration-500 hover:brightness-200 focus-visible:outline-0 z-50 transition duration-[3s]'
              onClick={() => setOpen(true)}
            >
              <span className='sr-only'>Open menu</span>
              <span className='flex h-[36px] w-[36px] flex-col justify-center space-y-[11px]'>
                <span className='h-[2px] w-full bg-background transition duration-150 ease-in-out' />
                <span className='h-[2px] w-full bg-background transition duration-150 ease-in-out' />
              </span>
            </button>
            )
          : (
            <button
              type='button'
              className='pointer-events-auto duration-500 hover:brightness-200 focus-visible:outline-0 z-50 transition duration-[3s]'
              onClick={() => setOpen(false)}
            >
              <span className='sr-only'>Dismiss main menu dialog</span>
              <span className='flex h-[36px] w-[36px] flex-col justify-center space-y-[11px]'>
                <span className='h-[2px] w-full translate-y-[7px] rotate-45 bg-background transition duration-150 ease-in-out' />
                <span className='h-[2px] w-full translate-y-[-6px] -rotate-45 bg-background transition duration-150 ease-in-out' />
              </span>
            </button>
            )}
      </nav>

      {/* Mobile menu - moved outside of nav element to be fixed to viewport */}
      {open && (
        <div className='pointer-events-auto fixed inset-0 z-40 flex animate-fade flex-col justify-center overflow-auto px-10 transition duration-500 animate-duration-1000 animate-once animate-ease-in-out backdrop-blur-md bg-accent/80 shadow-lg'>
          <ul className='flex flex-col gap-6 text-3xl text-background sm:text-4xl'>
            <li
              onClick={() => setOpen(false)}
              className='pointer-events-auto cursor-pointer transition duration-500 hover:brightness-200 focus-visible:outline-0'
            >
              <Link href='/#brand' className='flex items-center gap-2'>
                <span>Brand</span>
                <span className='mb-1'>{'>'}</span>
              </Link>
            </li>
            <li
              onClick={() => setOpen(false)}
              className='pointer-events-auto cursor-pointer transition duration-500 hover:brightness-200 focus-visible:outline-0'
            >
              <Link
                href='/#quienesSomosMobile'
                className='flex items-center gap-2'
              >
                <span>Quiénes Somos</span>
                <span className='mb-1'>{'>'}</span>
              </Link>
            </li>
            <li
              onClick={() => setOpen(false)}
              className='pointer-events-auto cursor-pointer transition duration-500 hover:brightness-200 focus-visible:outline-0'
            >
              <Link href='/#servicios' className='flex items-center gap-2'>
                <span>Niveles</span>
                <span className='mb-1'>{'>'}</span>
              </Link>
            </li>
            <li
              onClick={() => setOpen(false)}
              className='pointer-events-auto cursor-pointer transition duration-500 hover:brightness-200 focus-visible:outline-0'
            >
              <Link href='/#paquetes' className='flex items-center gap-2'>
                <span>Pilates</span>
                <span className='mb-1'>{'>'}</span>
              </Link>
            </li>
            <li
              onClick={() => setOpen(false)}
              className='pointer-events-auto cursor-pointer transition duration-500 hover:brightness-200 focus-visible:outline-0'
            >
              <Link href='/#contacto' className='flex items-center gap-2'>
                <span>Franquicias</span>
                <span className='mb-1'>{'>'}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
