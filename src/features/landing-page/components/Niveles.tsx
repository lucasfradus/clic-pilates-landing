'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Niveles (): React.JSX.Element {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  // Animation variants for cards
  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    initial: {
      scale: 1,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id='niveles'
      className='relative min-h-screen w-full overflow-hidden border-t border-accent'
    >
      {/* Background image with parallax effect */}
      <motion.div className='absolute h-[110%] w-full' style={{ y }}>
        <div className='relative h-full w-full'>
          <Image
            alt='CLIC Pilates Niveles'
            src='/5NIVELES.jpeg'
            fill
            priority
            quality={100}
            sizes='100vw'
            className='object-cover'
          />
          {/* Dark overlay for better text visibility */}
          <div className='absolute inset-0 bg-black/40' />
        </div>
      </motion.div>

      {/* Content container */}
      <div className='relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-8 md:px-12'>
        <div className='flex w-full max-w-5xl flex-col items-center text-center'>
          {/* Main heading - larger and more prominent */}
          <h2 className='mb-6 text-xl font-semibold text-background sm:text-2xl md:text-3xl'>
            Niveles
          </h2>

          {/* Description - single line on desktop as in design */}
          <p className='mb-20 max-w-3xl text-lg font-normal text-background sm:text-xl md:text-xl'>
            Ofrecemos clases de pilates clásico con reformers, abiertas a todos, sin importar su nivel de experiencia.
          </p>

          {/* Cards container - wider on desktop to match design */}
          <div className='flex w-full flex-col items-stretch justify-center gap-6 md:flex-row md:gap-10 lg:gap-16'>
            {/* Inicial Pilates Card - lighter background with motion animation */}
            <motion.div
              className='w-full  bg-background p-8 py-16 md:w-1/2'
              initial='initial'
              whileHover='hover'
              variants={cardVariants}
            >
              <h3 className='mb-8 text-center text-xl font-medium text-accent sm:text-2xl'>
                INICIAL PILATES:
              </h3>
              <p className='text-center text-base leading-relaxed text-accent/90 sm:text-lg'>
                Para quienes quieran introducirse
                <br />
                en el mundo de pilates o no lo
                <br />
                practican hace tiempo.
              </p>
            </motion.div>

            {/* Level Up Pilates Card - lighter background with motion animation */}
            <motion.div
              className='w-full  bg-background p-8 py-16 md:w-1/2'
              initial='initial'
              whileHover='hover'
              variants={cardVariants}
            >
              <h3 className='mb-8 text-center text-xl font-medium text-accent sm:text-2xl'>
                LEVEL UP PILATES:
              </h3>
              <p className='text-center text-base leading-relaxed text-accent/90 sm:text-lg'>
                Para quienes vienen
                <br />
                entrenando, tienen experiencia
                <br />
                y buscan desafiarse.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
