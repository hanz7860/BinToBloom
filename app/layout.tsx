import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BinToBloom - Sustainable Waste Management',
  description: 'Transform waste into blooming opportunities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-gray-50`}
        suppressHydrationWarning
      >
        <Providers>
          {/* Navbar must be wrapped in Providers */}
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
