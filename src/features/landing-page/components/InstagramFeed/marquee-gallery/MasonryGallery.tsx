import Image from 'next/image'
import { motion } from 'framer-motion'
import { JSX } from 'react'

const instagramPosts = [
  { id: '1', imageUrl: '/images/insta-feed/1.webp' },
  { id: '2', imageUrl: '/images/insta-feed/2.webp' },
  { id: '3', imageUrl: '/images/insta-feed/3.webp' },
  { id: '4', imageUrl: '/images/insta-feed/4.webp' },
  { id: '5', imageUrl: '/images/insta-feed/5.webp' },
  { id: '6', imageUrl: '/images/insta-feed/6.webp' },
  { id: '7', imageUrl: '/images/insta-feed/7.webp' },
  { id: '8', imageUrl: '/images/insta-feed/8.webp' },
  { id: '9', imageUrl: '/images/insta-feed/9.webp' },
  { id: '10', imageUrl: '/images/insta-feed/10.webp' },
  { id: '11', imageUrl: '/images/insta-feed/11.webp' },
  { id: '12', imageUrl: '/images/insta-feed/12.webp' }
]

const PostCard = ({
  imageUrl,
  index
}: {
  imageUrl: string
  index: number
}): JSX.Element => {
  return (
    <motion.div
      className='relative overflow-hidden rounded-xl mb-4 break-inside-avoid group'
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
    >
      <div className='relative aspect-square overflow-hidden rounded-xl'>
        <Image
          src={imageUrl}
          alt='Instagram post by @clic.pilates'
          fill
          sizes='(max-width: 768px) 50vw, 33vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          loading='lazy'
        />

        {/* Warm hover overlay */}
        <div className='absolute inset-0 bg-nude/0 group-hover:bg-nude/20 transition-all duration-500' />

        {/* Instagram icon on hover */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
          <div className='bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-warm'>
            <svg className='w-6 h-6 text-accent' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function MasonryGallery (): JSX.Element {
  return (
    <div className='columns-2 md:columns-3 gap-4 px-4'>
      {instagramPosts.map((post, index) => (
        <PostCard key={post.id} imageUrl={post.imageUrl} index={index} />
      ))}
    </div>
  )
}
