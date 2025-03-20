import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Clic Pilates',
  description:
    'Hace el clic y transforma tu vida con Clic Pilates. Descubre la mejor experiencia de pilates en Buenos Aires. ¡Únete a nosotros hoy mismo!',
  metadataBase: new URL('https://clic-landing.vercel.app/'),
  alternates: {
    canonical: '/'
  },
  icons: {
    apple: [
      { url: '/opengraph-image.png' },
      {
        url: '/opengraph-image.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'opengraph-image',
        url: '/opengraph-image.png'
      }
    ]
  },
  robots: {
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
  keywords: [
    'pilates',
    'reformer',
    'wellness',
    'yoga',
    'meditación',
    'buenos aires',
    'argentina'
  ],
  authors: [{ name: 'Clic Pilates' }],
  verification: {
    google: 'your-google-verification-code' // Add your Google Search Console verification code
  }
}

export const viewport: Viewport = {
  themeColor: '#edece7',
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang='es'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      </head>
      <body
        className={`${poppins.variable} antialiased font-poppins bg-background`}
      >
        {children}
        <Toaster position='top-center' />
      </body>
    </html>
  )
}
