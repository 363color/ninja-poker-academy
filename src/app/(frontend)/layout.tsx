import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import localFont from 'next/font/local'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

import { AgeGate } from '@/components/AgeGate'
import { CookieConsent } from '@/components/CookieConsent'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

const interdisplay = localFont({
  src: [
    { path: '../../../public/fonts/Interdisplay-400.ttf', weight: '400' },
    { path: '../../../public/fonts/Interdisplay-500.ttf', weight: '500' },
    { path: '../../../public/fonts/Interdisplay-600.ttf', weight: '600' },
    { path: '../../../public/fonts/Interdisplay-700.ttf', weight: '700' },
  ],
  variable: '--font-display',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, interdisplay.variable)}
      lang="es"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ninja Poker Academy',
              url: 'https://ninjapokeracademy.com',
              logo: 'https://ninjapokeracademy.com/media/Ninja-Poker-Academy-Avatar-transparente.png',
              description:
                'Ninja Poker Academy: academia de póker online en español. Clases diarias, revisión de manos y comunidad activa para jugadores de todos los niveles.',
              sameAs: [
                'https://www.youtube.com/@ninjapokeracademy',
                'https://www.instagram.com/ninjapokeracademy',
                'https://www.tiktok.com/@ninjapokeracademy',
                'https://t.me/ninjapokeracademy',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                url: 'https://ninjapokeracademy.com/contacto/',
              },
            }),
          }}
        />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <GoogleAnalytics />
        <AgeGate />
        <CookieConsent />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Academia de Poker Online en Español | Ninja Poker Academy',
    template: '%s | Ninja Poker Academy',
  },
  description:
    'Ninja Poker Academy: academia de póker online en español. Clases diarias, revisión de manos y comunidad activa para jugadores de todos los niveles.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@ninjapokeracademy',
    site: '@ninjapokeracademy',
  },
}
