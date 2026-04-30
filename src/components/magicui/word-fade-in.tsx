'use client'

import { motion } from 'framer-motion'

interface WordFadeInProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function WordFadeIn ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.08
}: WordFadeInProps): React.JSX.Element {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i }
    })
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100
      }
    }
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} className='mr-[0.25em] inline-block' key={index}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
