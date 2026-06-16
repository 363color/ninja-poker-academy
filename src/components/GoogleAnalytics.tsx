'use client'

import React, { useEffect } from 'react'

export const GoogleAnalytics: React.FC = () => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (!measurementId) {
      console.warn('Google Analytics Measurement ID not configured')
      return
    }

    // Initialize dataLayer and gtag FIRST (before GA script loads)
    const w = window as any
    w.dataLayer = w.dataLayer || []

    function gtag(...args: unknown[]) {
      w.dataLayer.push(args)
    }

    w.gtag = gtag

    // Set default consent state (deny until user chooses)
    // ✓ This runs BEFORE the GA script is injected
    // ✓ Required for Consent Mode v2 + RGPD compliance
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 2000,
    })

    // Inject the GA script AFTER consent is configured
    // ✓ Manual injection ensures timing control needed for Consent Mode v2
    // ✓ Can't use @next/third-parties/google because it doesn't support
    //   dynamic consent mode configuration before script load
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize Google Analytics config after script injection
    script.onload = () => {
      gtag('js', new Date())
      gtag('config', measurementId, {
        anonymize_ip: true,
        allow_google_signals: false,
      })
    }
  }, [measurementId])

  return null
}

