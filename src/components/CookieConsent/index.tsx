'use client'

import React, { useEffect } from 'react'

export const CookieConsent: React.FC = () => {
  useEffect(() => {
    const initKlaro = async () => {
      const klaro = await import('klaro')
      const klaroConfig = (await import('./klaro-config')).default
      ;(window as any).klaro = klaro
      ;(window as any).klaroConfig = klaroConfig
      klaro.setup(klaroConfig)
    }
    initKlaro()
  }, [])

  return <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/klaro@0.7/dist/klaro.min.css" />
}

export const openKlaroModal = () => {
  if (typeof window !== 'undefined' && (window as any).klaro) {
    ;(window as any).klaro.show()
  }
}
