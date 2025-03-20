import { cn } from '@/lib/utils'
import { Marquee } from '@/components/magicui/marquee'
import { JSX } from 'react'

const instagramPosts = [
  {
    id: '1',
    imageUrl: '/images/insta-feed/1.jpeg'
  },
  {
    id: '2',
    imageUrl: '/images/insta-feed/2.jpeg'
  },
  {
    id: '3',
    imageUrl: '/images/insta-feed/3.jpeg'
  },
  {
    id: '4',
    imageUrl: '/images/insta-feed/4.jpeg'
  },
  {
    id: '5',
    imageUrl: '/images/insta-feed/5.jpeg'
  },
  {
    id: '6',
    imageUrl: '/images/insta-feed/6.jpeg'
  },
  {
    id: '7',
    imageUrl: '/images/insta-feed/7.jpeg'
  },
  {
    id: '8',
    imageUrl: '/images/insta-feed/8.jpeg'
  },
  {
    id: '9',
    imageUrl: '/images/insta-feed/9.jpeg'
  },
  {
    id: '10',
    imageUrl: '/images/insta-feed/10.jpeg'
  },
  {
    id: '11',
    imageUrl: '/images/insta-feed/11.jpeg'
  },
  {
    id: '12',
    imageUrl: '/images/insta-feed/12.jpeg'
  }
]

// Split images for two rows
const firstRow = instagramPosts.slice(0, Math.ceil(instagramPosts.length / 2))
const secondRow = instagramPosts.slice(Math.ceil(instagramPosts.length / 2))

const PostCard = ({
  imageUrl
}: {
  imageUrl: string
}): JSX.Element => {
  return (
    <div
      className={cn(
        'relative h-64 w-64 overflow-hidden rounded-xl mx-2 group',
        'transition-transform duration-300 hover:scale-[1.02]'
      )}
    >
      <img
        src={imageUrl}
        alt='Instagram post by @clic.pilates'
        className='w-full h-full object-cover'
      />

      {/* Overlay on hover */}
      <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4'>
        <a
          href='https://www.instagram.com/clic.pilates/'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center px-6 py-3 bg-accent text-background font-medium rounded-lg hover:bg-accent/70 transition-colors duration-300'

        >
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
          </svg>
          @clic.pilates
        </a>
      </div>

      {/* Instagram gradient border on hover */}
      <div
        className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
        style={{
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.7)'
        }}
      />
    </div>
  )
}

export function MarqueeGallery (): JSX.Element {
  return (
    <div className='relative flex w-full flex-col items-center justify-center overflow-hidden gap-4'>
      <Marquee pauseOnHover className='[--duration:30s]'>
        {firstRow.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Marquee>

      <Marquee pauseOnHover reverse className='[--duration:30s]'>
        {secondRow.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Marquee>

      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background' />
    </div>
  )
}
