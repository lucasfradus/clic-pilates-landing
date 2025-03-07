import NavBar from '@/features/landing-page/components/NavBar/NavBar'
import Hero from '@/features/landing-page/components/Hero'
import HaceElClic from '@/features/landing-page/components/HaceElClic'
import Brand from './components/Brand'

export default function LandingPage (): React.JSX.Element {
  return (
    <>
      <NavBar />

      <main className='w-full h-full'>
        <Hero />
        <HaceElClic />
        <Brand />
      </main>
    </>
  )
}
