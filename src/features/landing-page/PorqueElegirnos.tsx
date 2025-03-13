import React from 'react'
import { motion } from 'framer-motion'

// Define interface for benefit items
interface Benefit {
  number: string
  title: string
  description: string
}

// Animation variants for benefit items
const benefitVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
}

// Animation variants for text elements
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

// Benefit item component with animation
const BenefitItem = ({ number, title, description, index }: { number: string, title: string, description: string, index: number }): React.JSX.Element => {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-50px' }}
      variants={benefitVariants}
      custom={index}
      className='flex flex-col items-center gap-2 max-w-xs text-center px-4 mb-12 md:mb-16'
    >
      <div className='flex flex-col items-center'>
        <h4 className='font-semibold text-lg sm:text-xl md:text-2xl text-center'>
          {number}
        </h4>
        <h4 className='font-semibold text-lg sm:text-xl md:text-2xl text-center'>
          {title}
        </h4>
      </div>
      <p className='text-xs sm:text-sm md:text-base' dangerouslySetInnerHTML={{ __html: description }} />
    </motion.div>
  )
}

export default function PorqueElegirnos (): React.JSX.Element {
  const benefits: Benefit[] = [
    {
      number: '01 FÁCIL',
      title: 'IMPLEMENTACIÓN',
      description: "<span class='font-semibold'>No necesitas experiencia</span>, te damos todas las herramientas para operar con éxito."
    },
    {
      number: '02 MANUAL',
      title: 'OPERATIVO',
      description: "Manual operativo completo con procesos clave para una <span class='font-semibold'>gestión eficiente y estandarizada</span>."
    },
    {
      number: '03 EXCLUSIVIDAD',
      title: 'TERRITORIAL',
      description: "Garantiza una <span class='font-semibold'>zona exclusiva</span> donde no se abrirán otros estudios de la franquicia."
    },
    {
      number: '04 MODELO',
      title: 'COMPROBADO',
      description: 'Basado en sedes exitosas, minimiza riesgos y maximiza oportunidades.'
    },
    {
      number: '05 CLIC',
      title: 'ACADEMY',
      description: 'Capacitación continua en Pilates Clásico para contar siempre con personal calificado.'
    },
    {
      number: '06 DISEÑO',
      title: 'INNOVADOR',
      description: "Espacios modernos y armoniosos para una <span class='font-semibold'>experiencia de entrenamiento placentera</span>."
    },
    {
      number: '07 MARKETING',
      title: 'ESTRATÉGICO',
      description: 'Campañas y estrategias para atraer, fidelizar y fortalecer tu presencia en el mercado.'
    }
  ]

  return (
    <section
      className='min-h-screen h-auto flex flex-col items-center py-16 md:py-24 text-accent w-full bg-neutral-50'
    >
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-50px' }}
        variants={textVariants}
        className='text-center space-y-2 mb-16'
      >
        <h3 className='font-semibold text-2xl sm:text-3xl md:text-4xl'>¿Por qué elegir CLIC Pilates?</h3>
        <p className='text-lg sm:text-xl md:text-2xl'>Beneficios para los franquiciados.</p>
      </motion.div>

      <div className='flex flex-wrap justify-center w-full max-w-7xl mx-auto'>
        {benefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            number={benefit.number}
            title={benefit.title}
            description={benefit.description}
            index={index + 2} // Start from index 2 to match Niveles.tsx pattern
          />
        ))}
      </div>
    </section>
  )
}
