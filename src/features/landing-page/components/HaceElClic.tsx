export default function HaceElClic (): React.JSX.Element {
  return (
    <section className='flex items-center justify-center h-[40vh] w-full'>
      <div className='marquee-container w-full'>
        <div className='marquee-content animate-marquee py-6'>
          {/* Each phrase is duplicated to create the continuous effect */}
          <h2 className='text-9xl font-semibold text-accent px-4'>
            HACÉ EL CLIC
          </h2>
          <h2 className='text-9xl font-semibold text-accent px-4'>
            HACÉ EL CLIC
          </h2>
          <h2 className='text-9xl font-semibold text-accent px-4'>
            HACÉ EL CLIC
          </h2>
          <h2 className='text-9xl font-semibold text-accent px-4'>
            HACÉ EL CLIC
          </h2>
          <h2 className='text-9xl font-semibold text-accent px-4'>
            HACÉ EL CLIC
          </h2>
          <h2 className='text-9xl font-semibold text-accent px-4'>
            HACÉ EL CLIC
          </h2>
        </div>
      </div>
    </section>
  )
}
