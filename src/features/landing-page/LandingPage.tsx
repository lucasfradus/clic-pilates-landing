'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import NavBar from '@/features/landing-page/components/NavBar/NavBar'
import Hero from '@/features/landing-page/components/Hero'
import HaceElClic from '@/features/landing-page/components/HaceElClic'
import Brand from '@/features/landing-page/components/Brand'
import QuienesSomos from '@/features/landing-page/components/QuienesSomos'
import Niveles from '@/features/landing-page/components/Niveles'
import Carousel from '@/features/landing-page/components/carousel/Carousel'
import DownloadApp from './components/DownloadApp'
import PorqueElegirnos from './PorqueElegirnos'

export default function LandingPage (): React.JSX.Element {
  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis()
    function raf (time: any): void {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <>
      <NavBar />

      <main className='w-full h-full'>
        <Hero />
        <HaceElClic />
        <Brand />
        <QuienesSomos />
        <Niveles />
        <Carousel />
        <DownloadApp />
        <PorqueElegirnos />
      </main>
    </>
  )
}
