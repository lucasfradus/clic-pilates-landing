import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Clic Studio Pilates',
  description: 'Franquicias de Clic Studio Pilates'
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
        <Toaster />
      </body>
    </html>
  )
}
