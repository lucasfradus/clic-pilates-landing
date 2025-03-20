'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  },
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * i,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
}

// Animation variants for text elements
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * i,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
}

export default function Niveles (): React.JSX.Element {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      ref={sectionRef}
      id='niveles'
      className='relative min-h-screen md:min-h-[120vh] w-full overflow-hidden border-t border-accent'
    >
      {/* Background image with parallax effect */}
      <motion.div className='absolute h-[110%] w-full' style={{ y }}>
        <div className='relative h-full w-full'>
          <Image
            alt='CLIC Pilates Niveles'
            src='/images/5NIVELES.jpeg'
            fill
            priority
            quality={100}
            sizes='100vw'
            className='object-cover'
          />
          {/* Dark overlay for better text visibility */}
          <div className='absolute inset-0 bg-black/50' />
        </div>
      </motion.div>

      {/* Content container */}
      <div className='relative flex min-h-screen md:min-h-[120vh] w-full flex-col items-center justify-center px-4 py-16 sm:px-8 md:px-12'>
        <div className='flex w-full max-w-5xl flex-col items-center text-center'>
          {/* Main heading - larger and more prominent */}
          <motion.h2
            className='mb-6 text-xl font-semibold text-background sm:text-2xl md:text-3xl'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={textVariants}
            custom={0}
          >
            Niveles
          </motion.h2>

          {/* Description - single line on desktop as in design */}
          <motion.p
            className='mb-20 max-w-3xl text-lg font-normal text-background sm:text-xl md:text-xl'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={textVariants}
            custom={1}
          >
            Ofrecemos clases de pilates clásico con reformers, abiertas a todos, sin importar su nivel de experiencia.
          </motion.p>

          {/* Cards container - wider on desktop to match design */}
          <div className='flex w-full flex-col items-stretch justify-center gap-6 md:flex-row md:gap-10 lg:gap-16'>
            {/* Inicial Pilates Card - lighter background with motion animation */}
            <motion.div
              className='w-full bg-background p-10 md:p-8 md:py-16 md:w-1/2'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              custom={2}
              whileHover='hover'
            >
              <motion.h3
                className='mb-8 text-center text-xl font-medium text-accent sm:text-2xl'
                variants={textVariants}
                custom={3}
              >
                INICIAL PILATES:
              </motion.h3>
              <motion.p
                className='text-center text-base leading-relaxed text-accent/90 sm:text-lg'
                variants={textVariants}
                custom={4}
              >
                Para quienes quieran introducirse
                <br />
                en el mundo de pilates o no lo
                <br />
                practican hace tiempo.
              </motion.p>
            </motion.div>

            {/* Level Up Pilates Card - lighter background with motion animation */}
            <motion.div
              className='w-full bg-background p-10 md:p-8 md:py-16 md:w-1/2'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              custom={5}
              whileHover='hover'
            >
              <motion.h3
                className='mb-8 text-center text-xl font-medium text-accent sm:text-2xl'
                variants={textVariants}
                custom={6}
              >
                LEVEL UP PILATES:
              </motion.h3>
              <motion.p
                className='text-center text-base leading-relaxed text-accent/90 sm:text-lg'
                variants={textVariants}
                custom={7}
              >
                Para quienes vienen
                <br />
                entrenando, tienen experiencia
                <br />
                y buscan desafiarse.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
