import './globals.css'
import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})

export const metadata: Metadata = {
  title: 'Whispering Stones - Digital Graveyard',
  description: 'A peaceful 8-bit pixel art memorial graveyard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} bg-graveyard-dark text-gray-200 min-h-screen`}>{children}</body>
    </html>
  )
}
