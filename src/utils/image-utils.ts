import { CarouselImage } from '@/data/carousel-images'

// This function gets all images from the carousel directory using webpack's require.context
export function getCarouselImages (): CarouselImage[] {
  // In Next.js, we can use the public directory directly
  // For this approach, we'll return a static list that will be updated at build time

  // You would need to manually update this list if you add new images,
  // or implement a build script to generate this file

  return [
    {
      src: '/carousel/6GALERIA.jpeg',
      alt: 'Dean blunt - Black Metal 2'
    },
    {
      src: '/carousel/7GALERIA.jpeg',
      alt: 'Jungle Jack - JUNGLE DES ILLUSIONS VOL 2'
    },
    {
      src: '/carousel/8GALERIA.jpeg',
      alt: 'Yung Lean - Stardust'
    },
    {
      src: '/carousel/9GALERIA.jpeg',
      alt: 'Lana Del Rey - Ultraviolence'
    },
    {
      src: '/carousel/10GALERIA.jpeg',
      alt: 'A$AP Rocky - Tailor Swif'
    },
    {
      src: '/carousel/11GALERIA.jpeg',
      alt: 'Midnight Miami (feat Konvy) - Nino Paid, Konvy'
    }
  ]
}
