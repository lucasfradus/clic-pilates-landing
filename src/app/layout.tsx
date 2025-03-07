import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Clic Pilates',
  description: 'Bienvenida a tu Pilates Era'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang='es'>
      <body
        className={`${poppins.variable} antialiased font-poppins`}
      >
        {children}
      </body>
    </html>
  )
}
