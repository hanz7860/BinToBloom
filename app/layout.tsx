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
}

export default function RootLayout({
  children,
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
    </html>
  )
}
