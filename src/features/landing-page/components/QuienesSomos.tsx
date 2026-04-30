'use client'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import React, { useRef } from 'react'
import Image from 'next/image'

// Animation variants for text elements
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * i,
      duration: 0.6,
      ease: 'easeOut' as const
    }
  })
}

export default function QuienesSomos (): React.JSX.Element {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      ref={sectionRef}
      className='min-h-screen w-full overflow-hidden flex flex-col md:flex-row items-center border-t border-accent relative'
      id='quienes-somos'
    >
      {/* Left content column */}
      <div className='w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col gap-6 justify-center relative z-10'>
        <motion.h2
          className='text-md md:text-lg text-accent font-semibold'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          variants={textVariants}
          custom={0}
        >
          Quienes Somos
        </motion.h2>

        <div className='flex flex-col gap-5 text-accent font-normal text-justify'>
          <motion.p
            className='text-md md:text-lg'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={textVariants}
            custom={1}
          >
            En <span className='font-semibold'>CLIC Studio Pilates</span>, nos especializamos en
            Pilates Clásico, honrando la técnica original de
            <span className='italic'> Contrología</span> de Joseph Pilates.
          </motion.p>

          <motion.p
            className='text-md md:text-lg'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={textVariants}
            custom={2}
          >
            Con <span className='font-semibold'>movimientos precisos y controlados</span>,
            buscamos una experiencia auténtica y
            transformadora, promoviendo <span className='font-semibold'>equilibrio, alineación, fuerza y flexibilidad</span>.
          </motion.p>

          <motion.p
            className='text-md md:text-lg'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            variants={textVariants}
            custom={3}
          >
            Nuestros estudios ofrecen un espacio seguro y
            armonioso. <span className='font-semibold'>Te invitamos a hacer el &quot;CLIC&quot;</span>:
            priorizarte, moverte con conciencia y adoptar
            hábitos que mejoren tu vida.
          </motion.p>
        </div>
      </div>

      {/* Organic wave separator (desktop only) */}
      <div className='hidden md:block absolute left-1/2 top-0 h-full w-20 -translate-x-1/2 z-20 pointer-events-none'>
        <svg
          viewBox='0 0 100 400'
          preserveAspectRatio='none'
          className='h-full w-full'
          style={{ fill: 'var(--cream)' }}
        >
          <path d='M0,0 C60,80 40,150 70,200 C100,250 30,320 60,400 L100,400 L100,0 Z' />
        </svg>
      </div>

      {/* Right image column with parallax effect */}
      <div className='relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden'>
        <motion.div
          className='absolute inset-0 md:rounded-tl-[60px] md:rounded-bl-[40px] overflow-hidden'
          style={{ y }}
        >
          <Image
            src='/images/4QUIENES SOMOS.webp'
            fill
            alt='Clic Pilates Equipment'
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
            loading='lazy'
          />
        </motion.div>
      </div>
    </section>
  )
}
