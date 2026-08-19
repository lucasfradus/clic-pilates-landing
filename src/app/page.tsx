import type { Metadata } from 'next'
import LandingPage from '@/features/landing-page/LandingPage'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

export default function Home (): React.ReactElement {
  return <LandingPage />
}
