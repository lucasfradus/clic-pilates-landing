'use client'
import DesktopNav from '@/features/landing-page/components/NavBar/components/DesktopNav'
import MobileNav from '@/features/landing-page/components/NavBar/components/MobileNav'
import { useEffect, useState } from 'react'

export default function NavBar (): React.ReactElement {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <DesktopNav scrolled={scrolled} />
      <MobileNav scrolled={scrolled} />
    </>
  )
}
