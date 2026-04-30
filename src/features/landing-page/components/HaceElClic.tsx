export default function HaceElClic (): React.JSX.Element {
  const words = Array.from({ length: 6 }, () => 'HACÉ EL CLIC')

  return (
    <section id='hace-el-clic' className='flex flex-col justify-center h-[35vh] w-full overflow-hidden gap-2 py-4'>
      {/* First row - moving right */}
      <div className='marquee-wrapper relative w-full opacity-100'>
        <div className='marquee-track flex whitespace-nowrap'>
          <div className='flex animate-marquee'>
            {words.map((text, i) => (
              <h2 key={`a-${i}`} className='text-7xl sm:text-8xl md:text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
                {text}
              </h2>
            ))}
          </div>
          <div className='flex animate-marquee' aria-hidden>
            {words.map((text, i) => (
              <h2 key={`a2-${i}`} className='text-7xl sm:text-8xl md:text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
                {text}
              </h2>
            ))}
          </div>
        </div>
      </div>

      {/* Second row - moving left (reverse) */}
      <div className='marquee-wrapper relative w-full opacity-40'>
        <div className='marquee-track flex whitespace-nowrap'>
          <div className='flex animate-marquee-reverse'>
            {words.map((text, i) => (
              <h2 key={`b-${i}`} className='text-7xl sm:text-8xl md:text-9xl font-light text-accent px-4 whitespace-nowrap italic'>
                {text}
              </h2>
            ))}
          </div>
          <div className='flex animate-marquee-reverse' aria-hidden>
            {words.map((text, i) => (
              <h2 key={`b2-${i}`} className='text-7xl sm:text-8xl md:text-9xl font-light text-accent px-4 whitespace-nowrap italic'>
                {text}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
