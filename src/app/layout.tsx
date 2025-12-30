import './globals.css'
import type { Metadata } from 'next'

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
      <body className="bg-graveyard-dark text-gray-200 min-h-screen">{children}</body>
    </html>
  )
}
