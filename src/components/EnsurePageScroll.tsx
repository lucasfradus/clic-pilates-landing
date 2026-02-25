'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * En páginas fuera del home (sede, horarios), asegura que html/body
 * permitan scroll. Útil porque Lenis en la home puede dejar overflow
 * bloqueado al navegar, o hay estilos que lo restringen.
 */
export function EnsurePageScroll (): null {
  const pathname = usePathname()
  const isSubPage = pathname !== '/' && (pathname.startsWith('/sede') || pathname.startsWith('/horarios'))

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (isSubPage) {
      html.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-locked', 'lenis-scrolling')
      html.style.overflow = ''
      html.style.height = ''
      body.style.overflow = 'auto'
      body.style.minHeight = '100%'
    } else {
      body.style.overflow = ''
      body.style.minHeight = ''
    }
  }, [isSubPage])

  return null
}
