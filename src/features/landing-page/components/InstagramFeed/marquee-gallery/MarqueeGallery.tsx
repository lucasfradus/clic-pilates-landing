import { cn } from '@/lib/utils'
import { Marquee } from '@/components/magicui/marquee'
import { JSX } from 'react'
import { Button } from '@/components/ui/button'

const instagramPosts = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    caption: 'Clase de Pilates Mat con enfoque en core 💪'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    caption: 'Comenzando la semana con energía ✨'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1581122584612-713f89daa8eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    caption: 'Reformer session para todos los niveles 🔥'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    caption: 'Nuevo espacio para clases grupales 🧘‍♀️'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    caption: 'Workshop de movilidad y flexibilidad 🙏'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    caption: 'Pilates es para todos - ¡Sumate! 💯'
  }
]

const firstRow = instagramPosts.slice(0, instagramPosts.length / 2)
const secondRow = instagramPosts.slice(instagramPosts.length / 2)

const PostCard = ({
  imageUrl,
  caption
}: {
  imageUrl: string
  caption: string
}): JSX.Element => {
  return (
    <div
      className={cn(
        'relative h-64 w-64 cursor-pointer overflow-hidden rounded-xl mx-2 group',
        'transition-transform duration-300 hover:scale-[1.02]'
      )}
    >
      <img
        src={imageUrl}
        alt={caption}
        className='w-full h-full object-cover'
      />

      {/* Overlay on hover */}
      <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4'>
        <svg className='w-5 h-5 mr-2' fill='#fffff' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
        </svg>
        <p className='text-background text-sm mb-3 text-center font-medium'>{caption}</p>
        <Button className='px-4 py-2 bg-backgound text-accent text-sm font-medium rounded-lg mt-2 hover:bg-opacity-90 transition-colors'>
          <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
          </svg>
          @clic.pilates
        </Button>
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
