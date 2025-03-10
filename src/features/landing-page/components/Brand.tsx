import { TypingAnimation } from '@/components/magicui/typing-animation'
import Image from 'next/image'

export default function Brand (): React.JSX.Element {
  return (
    <section className='min-h-[90vh] w-full flex flex-col md:flex-row border-t border-accent'>
      {/* Left column with pilates equipment image */}
      <div className='relative w-full md:w-1/3 h-[30vh] md:h-auto'>
        <Image
          src='/2CLIC.jpeg'
          fill
          priority
          alt='Clic Pilates Equipment'
          className='object-cover'
        />
      </div>

      {/* Right column with brand content and second image */}
      <div className='flex flex-col w-full md:w-2/3'>
        {/* Brand content */}
        <div className='flex-1 flex flex-col gap-5 justify-center p-8 md:p-12 basis-2/5'>
          <h2 className='text-2xl md:text-3xl text-accent font-semibold'>CLIC</h2>
          <p className='text-2xl md:text-3xl text-accent font-semibold'>/klik/</p>

          <TypingAnimation startOnView duration={50} className='text-md md:text-lg text-accent font-normal max-w-3xl'>
            Hacer el clic. Momento de transformación en el que decidís priorizarte,
            conectar con tu cuerpo y reencontrarte a través del movimiento.
          </TypingAnimation>
        </div>

        {/* Bottom image - now shown on all devices with responsive layout */}
        <div className='relative w-full h-[40vh] md:h-auto md:basis-3/5'>
          <Image
            src='/3CLIC.jpeg'
            fill
            priority
            alt='Clic Pilates Studio'
            className='object-cover object-center md:object-top'
          />
          <Image
            src='/texto_brand2.png'
            width={350}
            height={30}
            priority
            alt='Clic Pilates Studio'
            className='absolute bottom-4 right-4 md:bottom-0 md:right-5 transform'
          />
        </div>
      </div>
    </section>
  )
}
