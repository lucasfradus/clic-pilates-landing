import React from 'react'
import Image from 'next/image'
import { TextAnimate } from '@/components/magicui/text-animate'

export default function DownloadApp (): React.JSX.Element {
  return (
    <section className='h-auto text-background'>
      <div className='h-full w-full rounded-b-[100px] md:rounded-b-[125px] lg:rounded-b-[161.5px] py-14 lg:py-18 bg-accent flex flex-col lg:flex-row justify-evenly items-center gap-8 lg:gap-4 px-4 md:px-8'>
        <TextAnimate
          className='text-center lg:text-start'
          animation='fadeIn'
          by='line'
          as='div'
          delay={0.5} // Using 0.5 seconds delay
          duration={0.8} // Slightly longer duration for smoother animation
          startOnView
        >
          <h6 className='font-semibold text-3xl sm:text-4xl md:text-5xl'>Push your <span className='italic'>Habits,</span></h6>
          <h6 className='font-semibold text-3xl sm:text-4xl md:text-5xl'>Push your <span className='italic'>Body,</span></h6>
          <h6 className='font-semibold text-3xl sm:text-4xl md:text-5xl'>Push your <span className='italic'>Level.</span></h6>
        </TextAnimate>
        <div className='flex flex-col items-center gap-4'>
          <p className='font-normal text-base sm:text-lg md:text-xl text-center'>Descargate nuestra App y empezá hoy!</p>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-2'>
            <button>
              <Image
                src='/app-store.svg'
                alt='App Store Badge'
                width={200}
                height={75}
                className='w-[160px] sm:w-[180px] md:w-[200px]'
              />
            </button>
            <button>
              <Image
                src='/google-play.svg'
                alt='Google Play Badge'
                width={200}
                height={75}
                className='w-[160px] sm:w-[180px] md:w-[200px]'
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
