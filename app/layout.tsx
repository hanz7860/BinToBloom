<<<<<<< HEAD
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
=======
import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"
import { NotificationProvider } from "@/components/notification-provider"

export const metadata = {
  title: "BinToBloom - Turn Your Waste into Blooming Fields",
  description:
    "We collect your food waste and turn it into powerful, eco-friendly pesticides that help communities grow.",
    generator: 'v0.dev'
>>>>>>> 821ad8e3403df0274503f1568fa817ddb0fbdfa7
}

export default function RootLayout({
  children,
<<<<<<< HEAD
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
=======
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <NotificationProvider>{children}</NotificationProvider>
          </ThemeProvider>
        </Providers>
      </body>
>>>>>>> 821ad8e3403df0274503f1568fa817ddb0fbdfa7
    </html>
  )
}
