'use client'
import DesktopNav from '@/features/landing-page/components/NavBar/components/DesktopNav'
import MobileNav from '@/features/landing-page/components/NavBar/components/MobileNav'
import { useEffect, useState } from 'react'

export default function NavBar (): React.ReactElement {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Check scroll position immediately on mount
    const checkInitialScroll = (): void => {
      setScrolled(window.scrollY > 20)
    }

    // Run once on mount
    checkInitialScroll()

    // Then set up the scroll listener for future scrolling
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
