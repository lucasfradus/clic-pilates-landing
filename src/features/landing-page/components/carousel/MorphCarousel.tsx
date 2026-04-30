'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

const galleryImages = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/carousel/${i + 6}GALERIA.webp`,
  alt: `Gallery image ${i + 1}`
}))

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 1.05,
    x: direction > 0 ? 100 : -100
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.98,
    x: direction < 0 ? 100 : -100
  })
}

export default function MorphCarousel (): React.JSX.Element {
  const [[page, direction], setPage] = useState([0, 0])
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const imageIndex = ((page % galleryImages.length) + galleryImages.length) % galleryImages.length

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }, [page])

  // Autoplay
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => paginate(1), 4000)
    return () => clearInterval(timer)
  }, [isHovered, paginate])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    if (info.offset.x < -50) paginate(1)
    if (info.offset.x > 50) paginate(-1)
  }

  return (
    <div
      ref={containerRef}
      className='relative w-full h-[70vh] overflow-hidden cursor-grab active:cursor-grabbing'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode='popLayout'>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
            x: { duration: 0.6, ease: 'easeOut' }
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className='absolute inset-0'
        >
          <Image
            src={galleryImages[imageIndex].src}
            alt={galleryImages[imageIndex].alt}
            fill
            sizes='100vw'
            className='object-cover'
            priority={imageIndex === 0}
            loading={imageIndex === 0 ? 'eager' : 'lazy'}
            quality={80}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle gradient overlays for depth */}
      <div className='absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none' />
      <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />

      {/* Dots navigation */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10'>
        {galleryImages.map((_, i) => (
          <button
            key={i}
            type='button'
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              i === imageIndex
                ? 'w-8 bg-white'
                : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
