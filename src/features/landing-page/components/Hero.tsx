'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero (): React.JSX.Element {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      id='home'
      className='relative h-screen w-full overflow-hidden'
    >
      {/* Background with Ken Burns effect — replace with <video> when footage is ready */}
      <div className='absolute inset-0 animate-ken-burns'>
        <Image
          alt='CLIC Pilates Studio'
          title='Pilates Studio'
          src='/images/1HOME.webp'
          fill
          priority
          quality={82}
          sizes='100vw'
          className='object-cover object-top'
        />
        {/*
          VIDEO REPLACEMENT (ready for future use):
          <video
            autoPlay
            muted
            loop
            playsInline
            poster='/images/1HOME.webp'
            className='absolute inset-0 h-full w-full object-cover'
          >
            <source src='/videos/hero-loop.webm' type='video/webm' />
            <source src='/videos/hero-loop.mp4' type='video/mp4' />
          </video>
        */}
      </div>

      {/* Warm gradient overlay */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(188,172,158,0.35) 80%, rgba(237,236,231,0.85) 100%)'
        }}
      />

      {/* Content */}
      <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center px-6 sm:px-10'>
        <div className='flex flex-col items-center text-center max-w-3xl gap-8'>
          {/* Subtitle line */}
          <motion.p
            className='text-sm sm:text-base font-light tracking-[0.3em] uppercase text-white/90'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Bienvenida a tu
          </motion.p>

          {/* Main heading */}
          <motion.h1
            className='text-5xl font-semibold text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.1]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            Pilates Era
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            className='h-[1px] w-24 bg-white/50'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          />

          {/* Tagline image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
          >
            <Image
              src='/images/tu_nueva_era.webp'
              alt='Tu Nueva Era'
              width={300}
              height={50}
              quality={82}
              className='w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px]'
            />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className='mt-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className='animate-bounce-soft'>
              <Image
                src='/images/hero_arrow.webp'
                alt='Scroll down'
                width={40}
                height={40}
                quality={82}
                className='w-8 sm:w-10 opacity-80'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
