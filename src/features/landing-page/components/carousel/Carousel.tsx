'use client'
import { useBlazeSlider } from 'react-blaze-slider'
import 'blaze-slider/dist/blaze.css'
import { JSX } from 'react'
import Image from 'next/image'

export default function Carousel (): JSX.Element {
  const ref = useBlazeSlider({
    all: {
      slidesToShow: 1,
      slidesToScroll: 1,
      slideGap: '0px',
      loop: true,
      enableAutoplay: true,
      autoplayInterval: 2000,
      autoplayDirection: 'to left',
      stopAutoplayOnInteraction: true,
      transitionDuration: 800,
      transitionTimingFunction: 'ease',
      draggable: true,
      enablePagination: false
    },
    '(min-width: 640px)': {
      slidesToShow: 3
    },
    '(min-width: 1024px)': {
      slidesToShow: 4
    }
  })

  // Gallery images array for the carousel
  const galleryImages = Array.from({ length: 9 }, (_, i) => `/carousel/${i + 6}GALERIA.jpeg`)

  return (
    <div>
      <div className='blaze-slider' ref={ref}>
        <div className='blaze-container'>
          <div className='blaze-track-container'>
            <div className='blaze-track h-[60vh]'>
              {galleryImages.map((imageSrc, index) => (
                <div key={index} className='relative w-full h-full'>
                  <Image
                    src={imageSrc}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                    className='object-cover'
                    priority={index < 2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className='controls'>
          <button className='blaze-prev'>prev</button>
          <div className='blaze-pagination' />
          <button className='blaze-next'>next</button>
        </div> */}
      </div>
    </div>
  )
}
