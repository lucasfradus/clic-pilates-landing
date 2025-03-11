'use client'
import { TypingAnimation } from '@/components/magicui/typing-animation'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Brand (): React.JSX.Element {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <section ref={sectionRef} className='min-h-[90vh] w-full flex flex-col md:flex-row border-t border-accent overflow-hidden'>
      {/* Left column with pilates equipment image */}
      <div className='relative w-full md:w-1/3 h-[30vh] md:h-auto overflow-hidden'>
        <motion.div className='absolute inset-0' style={{ y }}>
          <Image
            src='/2CLIC.jpeg'
            fill
            priority
            alt='Clic Pilates Equipment'
            className='object-cover'
          />
        </motion.div>
      </div>

      {/* Right column with brand content and second image */}
      <div className='flex flex-col w-full md:w-2/3'>
        {/* Brand content - now with fixed height to prevent content jump during typing animation */}
        <div className='flex-1 flex flex-col gap-5 justify-start p-8 md:p-12 basis-2/5 h-[250px] md:h-[300px]'>
          <h2 className='text-2xl md:text-3xl text-accent font-semibold'>CLIC</h2>
          <p className='text-2xl md:text-3xl text-accent font-semibold'>/klik/</p>

          <div className='min-h-[100px]'>
            <TypingAnimation startOnView delay={500} duration={50} className='text-md md:text-lg text-accent font-normal max-w-3xl'>
              Hacer el clic. Momento de transformación en el que decidís priorizarte,
              conectar con tu cuerpo y reencontrarte a través del movimiento.
            </TypingAnimation>
          </div>
        </div>

        {/* Bottom image - now shown on all devices with responsive layout */}
        <div className='relative w-full h-[40vh] md:h-auto md:basis-3/5 overflow-hidden'>
          <motion.div className='absolute inset-0' style={{ y }}>
            <Image
              src='/3CLIC.jpeg'
              fill
              priority
              alt='Clic Pilates Studio'
              className='object-cover object-center md:object-top'
            />
          </motion.div>
          <Image
            src='/texto_brand2.png'
            width={300}
            height={50}
            priority
            alt='Clic Pilates Studio'
            className='absolute bottom-6 right-6 transform'
          />
        </div>
      </div>
    </section>
  )
}
