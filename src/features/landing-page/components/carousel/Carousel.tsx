'use client'

import dynamic from 'next/dynamic'

const MorphCarousel = dynamic(() => import('./MorphCarousel'), { ssr: false })

export default function Carousel (): React.JSX.Element {
  return <MorphCarousel />
}
