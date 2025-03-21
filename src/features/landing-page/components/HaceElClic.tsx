export default function HaceElClic (): React.JSX.Element {
  return (
    <section id='hace-el-clic' className='flex items-center justify-center h-[40vh] w-full overflow-hidden'>
      <div className='marquee-wrapper relative w-full'>
        <div className='marquee-track flex whitespace-nowrap'>
          {/* First set of items */}
          <div className='flex animate-marquee'>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
          </div>

          {/* Second set of identical items for seamless loop */}
          <div className='flex animate-marquee'>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
            <h2 className='text-9xl font-semibold text-accent px-4 whitespace-nowrap'>
              HACÉ EL CLIC
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
