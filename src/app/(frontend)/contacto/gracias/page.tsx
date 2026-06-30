import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import { GraciasContent } from './GraciasContent'

export const metadata: Metadata = {
  title: 'Solicitud recibida | Ninja Poker Academy',
  robots: { index: false, follow: false },
}

export default function GraciasPage() {
  return (
    <Suspense fallback={null}>
      <GraciasContent />
    </Suspense>
  )
}
