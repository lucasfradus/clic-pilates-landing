'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import Image from 'next/image'
import FranquiciasForm from './components/FranquiciasForm'

// Animation variants for text elements - modified for horizontal slide-in
const textVariants = {
  hidden: { opacity: 0, x: -100 }, // Start from left
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

export default function Franquicias (): React.JSX.Element {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      ref={sectionRef}
      className='min-h-screen h-auto w-full overflow-hidden flex flex-col md:flex-row border-y border-accent'
    >
      {/* Left image column with parallax effect */}
      <div className='relative w-full md:basis-2/5 lg:basis-1/2 h-[40vh] md:min-h-screen md:h-auto overflow-hidden'>
        <motion.div className='absolute inset-0' style={{ y }}>
          <Image
            src='/images/15FRANQUICIAS.jpeg'
            fill
            priority
            alt='Clic Pilates Equipment'
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
          {/* Dark overlay for better text visibility */}
          <div className='absolute inset-0 bg-black/50' />
        </motion.div>
        <motion.h4
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
          className='absolute bottom-[15%] left-5 md:left-10 text-white text-start font-normal text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-[90%]'
        >
          Abrí tu propio <br />
          CLIC Studio Pilates
        </motion.h4>
      </div>

      {/* Right form column */}
      <div className='w-full md:basis-3/5 lg:basis-1/2 flex flex-col justify-center py-8 md:py-12'>
        <FranquiciasForm />
      </div>
    </section>
  )
}
