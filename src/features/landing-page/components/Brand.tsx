'use client'
import { WordFadeIn } from '@/components/magicui/word-fade-in'
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
    <section ref={sectionRef} id='brand' className='min-h-[90vh] w-full flex flex-col md:flex-row md:border-t-2 border-accent overflow-hidden'>
      {/* Left column with pilates equipment image */}
      <div className='relative w-full md:w-1/3 h-[30vh] md:h-auto overflow-hidden'>
        <motion.div className='absolute inset-0' style={{ y }}>
          <Image
            src='/images/2CLIC.webp'
            fill
            alt='Clic Pilates Equipment'
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 33vw'
            loading='lazy'
          />
        </motion.div>
      </div>

      {/* Right column with brand content and second image */}
      <div className='flex flex-col w-full md:w-2/3'>
        {/* Brand content */}
        <div className='flex-1 flex flex-col gap-5 justify-start p-8 md:p-12 basis-2/5 h-auto md:h-[300px]'>
          <h2 className='text-2xl md:text-3xl text-accent font-semibold'>CLIC</h2>
          <p className='text-2xl md:text-3xl text-accent font-semibold'>/klik/</p>

          <div className='min-h-[80px]'>
            <WordFadeIn
              text='Hacer el clic. Momento de transformación en el que decidís priorizarte, conectar con tu cuerpo y reencontrarte a través del movimiento.'
              className='text-md md:text-lg text-accent font-normal max-w-3xl leading-relaxed'
              delay={0.3}
              staggerDelay={0.04}
            />
          </div>

          {/* Decorative line */}
          <motion.div
            className='h-[1px] bg-accent/30 mt-2'
            initial={{ width: 0 }}
            whileInView={{ width: '30%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Bottom image */}
        <div className='relative w-full h-[40vh] md:h-auto md:basis-3/5 overflow-hidden'>
          <motion.div className='absolute inset-0' style={{ y }}>
            <Image
              src='/images/3CLIC.webp'
              fill
              alt='Clic Pilates Studio'
              className='object-cover object-center md:object-top'
              sizes='(max-width: 768px) 100vw, 67vw'
              loading='lazy'
            />
          </motion.div>
          <Image
            src='/images/texto_brand2.webp'
            width={300}
            height={50}
            alt='Clic Pilates Studio'
            className='absolute bottom-6 right-6 transform'
            loading='lazy'
          />
        </div>
      </div>
    </section>
  )
}
