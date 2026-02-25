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
      ease: 'easeOut' as const
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
      ease: 'easeOut' as const
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
      className='flex flex-col items-center gap-2 w-full max-w-2xs text-center mb-12 md:mb-8'
    >
      <div className='flex flex-col items-center'>
        <h4 className='font-semibold text-xl md:text-xl 2xl:text-2xl text-center leading-4'>
          {number}
        </h4>
        <h4 className='font-semibold text-xl md:text-xl 2xl:text-2xl text-center'>
          {title}
        </h4>
      </div>
      <p className='2xl:text-base leading-4' dangerouslySetInnerHTML={{ __html: description }} />
    </motion.div>
  )
}

export default function PorqueElegirnos (): React.JSX.Element {
  const benefits: Benefit[] = [
    {
      number: '01 FÁCIL',
      title: 'IMPLEMENTACIÓN',
      description: "<span class='font-semibold'>No necesitas experiencia</span>, te <br /> damos todas las herramientas <br /> para operar con éxito."
    },
    {
      number: '02 MANUAL',
      title: 'OPERATIVO',
      description: "Manual operativo completo con <br /> procesos clave para una <span class='font-semibold'>gestión <br />eficiente y estandarizada</span>."
    },
    {
      number: '03 EXCLUSIVIDAD',
      title: 'TERRITORIAL',
      description: "Garantiza una <span class='font-semibold'>zona exclusiva</span><br /> donde no se abrirán otros<br />  estudios de la franquicia."
    },
    {
      number: '04 MODELO',
      title: 'COMPROBADO',
      description: "Basado en <span class='font-semibold'>sedes exitosas</span>,<br /> minimiza riesgos y maximiza<br />  oportunidades."
    },
    {
      number: '05 CLIC',
      title: 'ACADEMY',
      description: "<span class='font-semibold'>Capacitación continua</span> en Pilates<br />  Clásico para contar siempre con<br />  personal calificado."
    },
    {
      number: '06 DISEÑO',
      title: 'INNOVADOR',
      description: "Espacios modernos y armoniosos<br />  para una <span class='font-semibold'>experiencia de<br />  entrenamiento placentera</span>."
    },
    {
      number: '07 MARKETING',
      title: 'ESTRATÉGICO',
      description: "<span class='font-semibold'>Campañas y estrategias</span> para<br />  atraer, fidelizar y fortalecer tu<br />  presencia en el mercado."
    }
  ]

  return (
    <section
      className='min-h-screen h-auto flex flex-col items-center justify-center gap-16 text-accent w-full px-10 py-16 md:py-24'
      id='franquicias'
    >
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-50px' }}
        variants={textVariants}
        className='text-center space-y-2'
      >
        <h3 className='font-semibold text-2xl sm:text-3xl lg:text-4xl'>¿Por qué elegir CLIC Pilates?</h3>
        <p className='text-lg sm:text-xl lg:text-2xl'>Beneficios para los franquiciados.</p>
      </motion.div>

      <div className='w-full flex flex-col items-center gap-4'>
        <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-1 w-full items-center md:items-start flex-wrap'>
          {/* First row - 3 items */}
          <BenefitItem
            key={0}
            number={benefits[0].number}
            title={benefits[0].title}
            description={benefits[0].description}
            index={2}
          />
          <BenefitItem
            key={1}
            number={benefits[1].number}
            title={benefits[1].title}
            description={benefits[1].description}
            index={3}
          />
          <BenefitItem
            key={2}
            number={benefits[2].number}
            title={benefits[2].title}
            description={benefits[2].description}
            index={4}
          />
        </div>

        {/* Second row - 4 items */}
        <div className='flex flex-col md:flex-row justify-center  gap-4 md:gap-1 w-full items-center md:items-start flex-wrap'>
          <BenefitItem
            key={3}
            number={benefits[3].number}
            title={benefits[3].title}
            description={benefits[3].description}
            index={5}
          />
          <BenefitItem
            key={4}
            number={benefits[4].number}
            title={benefits[4].title}
            description={benefits[4].description}
            index={6}
          />
          <BenefitItem
            key={5}
            number={benefits[5].number}
            title={benefits[5].title}
            description={benefits[5].description}
            index={7}
          />
          <BenefitItem
            key={6}
            number={benefits[6].number}
            title={benefits[6].title}
            description={benefits[6].description}
            index={8}
          />
        </div>
      </div>
    </section>
  )
}
