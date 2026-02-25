'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'lenis/dist/lenis.css'
import NavBar from '@/features/landing-page/components/NavBar/NavBar'
import Hero from '@/features/landing-page/components/Hero'
import Footer from '@/features/landing-page/components/Footer'

const HaceElClic = dynamic(() => import('@/features/landing-page/components/HaceElClic'), { ssr: true })
const Brand = dynamic(() => import('@/features/landing-page/components/Brand'), { ssr: true })
const QuienesSomos = dynamic(() => import('@/features/landing-page/components/QuienesSomos'), { ssr: true })
const Niveles = dynamic(() => import('@/features/landing-page/components/Niveles'), { ssr: true })
const Carousel = dynamic(() => import('@/features/landing-page/components/carousel/Carousel'), { ssr: true })
const DownloadApp = dynamic(() => import('@/features/landing-page/components/DownloadApp'), { ssr: true })
const PorqueElegirnos = dynamic(() => import('@/features/landing-page/components/PorqueElegirnos'), { ssr: true })
const Franquicias = dynamic(() => import('@/features/landing-page/components/franquicias/Franquicias'), { ssr: true })
const ClicAcademy = dynamic(() => import('@/features/landing-page/components/ClicAcademy'), { ssr: true })
const Locations = dynamic(() => import('@/features/landing-page/components/locations/Locations'), { ssr: true })
const InstagramFeed = dynamic(() => import('@/features/landing-page/components/InstagramFeed/InstagramFeed'), { ssr: true })

export default function LandingPage (): React.JSX.Element {
  useEffect(() => {
    let rafId: number | undefined
    const initLenis = async (): Promise<void> => {
      const { default: Lenis } = await import('lenis')
      const lenis = new Lenis({
        anchors: { offset: -80 }
      })
      function raf (time: number): void {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }
    initLenis()
    return () => { if (rafId !== undefined) cancelAnimationFrame(rafId) }
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
        <Franquicias />
        <ClicAcademy />
        <Locations />
        <InstagramFeed />

      </main>
      <Footer />
    </>
  )
}
