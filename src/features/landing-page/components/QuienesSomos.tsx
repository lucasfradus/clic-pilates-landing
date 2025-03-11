'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import Image from 'next/image'

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
      className='min-h-screen w-full overflow-hidden flex flex-col md:flex-row items-center border-t border-accent'
      id='quienes-somos'
    >
      {/* Left content column */}
      <div className='w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col gap-6 justify-center'>
        <h2 className='text-lg md:text-xl text-accent font-bold'>Quienes Somos</h2>

        <div className='flex flex-col gap-5 text-accent font-medium text-justify'>
          <p className='text-lg md:text-xl'>
            En <span className='font-bold'>CLIC Studio Pilates</span>, nos especializamos en
            Pilates Clásico, honrando la técnica original de
            <span className='italic'> Contrología</span> de Joseph Pilates.
          </p>

          <p className='text-lg md:text-xl'>
            Con <span className='font-bold'>movimientos precisos y controlados</span>,
            buscamos una experiencia auténtica y
            transformadora, promoviendo <span className='font-bold'>equilibrio, alineación, fuerza y flexibilidad</span>.
          </p>

          <p className='text-lg md:text-xl'>
            Nuestros estudios ofrecen un espacio seguro y
            armonioso. <span className='font-bold'>Te invitamos a hacer el "CLIC"</span>:
            priorizarte, moverte con conciencia y adoptar
            hábitos que mejoren tu vida.
          </p>
        </div>
      </div>

      {/* Right image column with parallax effect */}
      <div className='relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden'>
        <motion.div className='absolute inset-0' style={{ y }}>
          <Image
            src='/4QUIENES SOMOS.jpeg'
            fill
            priority
            alt='Clic Pilates Equipment'
            className='object-cover'
          />
        </motion.div>
      </div>
    </section>
  )
}
