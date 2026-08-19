import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { EnsurePageScroll } from '@/components/EnsurePageScroll'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Clic Pilates',
  description:
    'Hace el clic y transforma tu vida con Clic Pilates. Descubre la mejor experiencia de pilates en Buenos Aires. ¡Únete a nosotros hoy mismo!',
  // El dominio real del sitio. Apuntaba a clic-landing.vercel.app, que además
  // de no ser el dominio publicado hoy devuelve 404: cada página se declaraba
  // duplicada de una URL inexistente.
  metadataBase: new URL('https://www.clicpilates.com'),
  // El canonical NO va acá: los hijos heredan `alternates` del layout, así que
  // un `canonical: '/'` en la raíz hacía que /sede/nunez se declarara duplicado
  // de la home. Cada página declara el suyo.
  icons: {
    apple: [
      { url: '/images/opengraph-image.webp' },
      {
        url: '/images/opengraph-image.webp',
        sizes: '180x180',
        type: 'image/webp'
      }
    ],
    other: [
      {
        rel: 'opengraph-image',
        url: '/images/opengraph-image.webp'
      }
    ]
  },
  // Los previews de Vercel no se indexan: son copias del sitio en otro dominio,
  // compitiendo con él. VERCEL_ENV vale 'production' sólo en el deploy real.
  robots:
    process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production'
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
          }
        },
  // Sin `keywords`: Google las ignora desde hace años, y las que había incluían
  // yoga y meditación, que no se ofrecen.
  authors: [{ name: 'Clic Pilates' }]
  // Sin `verification`: estaba el placeholder literal
  // 'your-google-verification-code' saliendo en el HTML de producción. Cuando
  // se verifique el dominio en Search Console, va acá el código real (o se
  // verifica por DNS, que no toca el código).
}

export const viewport: Viewport = {
  themeColor: '#edece7',
  initialScale: 1,
  // Sin `maximumScale`: bloquear el pinch-zoom deja afuera a quien necesita
  // agrandar para leer.
  width: 'device-width'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang='es'>
      {/* El <meta viewport> lo emite Next desde el export `viewport` de arriba.
          Acá había uno hardcodeado con maximum-scale=1 que pisaba al otro. */}
      <body
        className={`${poppins.variable} antialiased font-poppins bg-background min-h-screen`}
      >
        {children}
        <EnsurePageScroll />
        <Toaster position='top-center' />
      </body>
    </html>
  )
}
