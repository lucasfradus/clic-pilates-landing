'use client'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

export default function Hero (): React.JSX.Element {
  const sectionRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Wait for component to mount before showing animations
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      ref={sectionRef}
      id='home'
      className='relative h-screen w-full'
    >
      {/* Static background container (no motion) to prevent shifts */}
      <div className='absolute inset-0 h-full w-full'>
        {/* Image wrapper */}
        <div className='relative h-full w-full'>
          <Image
            alt='CLIC Pilates Studio'
            title='Pilates Studio'
            src='/1HOME.webp'
            fill
            priority
            quality={100}
            sizes='100vw'
            className='object-cover object-top'
            onLoad={() => setIsLoaded(true)}
          />

          {/* Black overlay for better text visibility */}
          <div className='absolute inset-0 bg-black/50' />
        </div>
      </div>

      {/* Content container - centered for all screen sizes */}
      <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center px-6 sm:px-10'>
        <div className='flex flex-col items-center text-center max-w-3xl gap-6'>
          {/* Main heading with smoother animation */}
          <h1
            className={`text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${
              isLoaded ? 'animate-fade-up animate-duration-1000 animate-delay-300 animate-once animate-ease-in-out' : 'opacity-0'
            }`}
          >
            Bienvenida a tu<br />Pilates Era
          </h1>

          {/* Tu Nueva Era text - responsive width based on screen size */}
          <Image
            src='/tu_nueva_era.png'
            alt='Tu Nueva Era'
            width={300}
            height={50}
            quality={100}
            className={`w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px] xl:w-[300px] ${
              isLoaded ? 'animate-fade-up animate-duration-1000 animate-delay-500 animate-once animate-ease-in-out' : 'opacity-0'
            }`}
          />

          {/* Down arrow - responsive width based on screen size */}
          <Image
            src='/hero_arrow.png'
            alt='Scroll down'
            width={60}
            height={60}
            quality={100}
            className={`w-[40px] sm:w-[45px] md:w-[50px] lg:w-[55px] xl:w-[60px] ${
              isLoaded ? 'animate-fade-up animate-duration-1000 animate-delay-1000 animate-once animate-ease-in-out' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </section>
  )
}
