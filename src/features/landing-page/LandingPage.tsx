import NavBar from '@/features/landing-page/components/NavBar/NavBar'
import Hero from '@/features/landing-page/components/Hero'

export default function LandingPage (): React.JSX.Element {
  return (
    <>
      <NavBar />

      <main className='w-full h-full'>
        <Hero />
      </main>
    </>
  )
}
