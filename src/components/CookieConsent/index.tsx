'use client'

import React, { useEffect } from 'react'

const klaroNPAStyles = `
/* ─── KLARO NPA OVERRIDE ─────────────────────────────────────────── */

/* Banner (notice) */
.klaro .cookie-notice {
  background: #141414 !important;
  border: 1px solid oklch(22% 0 0deg) !important;
  border-top: 3px solid #CC1A1A !important;
  border-radius: 4px !important;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5) !important;
  padding: 20px 24px !important;
  max-width: 480px !important;
  font-family: var(--font-geist-sans), system-ui, sans-serif !important;
}

.klaro .cookie-notice p,
.klaro .cookie-notice .notice-description {
  font-size: 14px !important;
  line-height: 1.6 !important;
  color: oklch(65% 0 0deg) !important;
  margin: 0 0 16px !important;
}

/* Banner botones */
.klaro .cookie-notice .cn-buttons {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
}

.klaro .cookie-notice button.cm-btn {
  font-family: var(--font-geist-sans), system-ui, sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  border-radius: 999px !important;
  padding: 9px 18px !important;
  cursor: pointer !important;
  transition: background 0.2s, color 0.2s, border-color 0.2s !important;
  border: 1px solid transparent !important;
}

/* Botón "Aceptar" (cn-agree / cm-btn-success) */
.klaro .cookie-notice button.cm-btn-success,
.klaro .cookie-notice button.cn-agree {
  background: #CC1A1A !important;
  color: #fff !important;
  border-color: #CC1A1A !important;
}

.klaro .cookie-notice button.cm-btn-success:hover,
.klaro .cookie-notice button.cn-agree:hover {
  background: oklch(38% 0.18 25deg) !important;
  border-color: oklch(38% 0.18 25deg) !important;
}

/* Botón "Descartar" (cn-decline) */
.klaro .cookie-notice button.cn-decline,
.klaro .cookie-notice button.cm-btn-danger {
  background: transparent !important;
  color: oklch(45% 0 0deg) !important;
  border-color: oklch(22% 0 0deg) !important;
}

.klaro .cookie-notice button.cn-decline:hover,
.klaro .cookie-notice button.cm-btn-danger:hover {
  background: oklch(16% 0 0deg) !important;
  color: oklch(65% 0 0deg) !important;
}

/* Enlace "Personalizar" */
.klaro .cookie-notice a.cn-learn-more,
.klaro .cookie-notice .cn-learn-more {
  color: oklch(50% 0 0deg) !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  text-decoration: underline !important;
  cursor: pointer !important;
}

.klaro .cookie-notice a.cn-learn-more:hover {
  color: oklch(70% 0 0deg) !important;
}

/* ─── MODAL ───────────────────────────────────────────────────────── */

.klaro .cookie-modal {
  font-family: var(--font-geist-sans), system-ui, sans-serif !important;
}

.klaro .cookie-modal .cm-modal {
  background: #141414 !important;
  border: 1px solid oklch(22% 0 0deg) !important;
  border-top: 3px solid #CC1A1A !important;
  border-radius: 4px !important;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7) !important;
  max-width: 520px !important;
  color: oklch(85% 0 0deg) !important;
}

/* Header del modal */
.klaro .cookie-modal .cm-header {
  border-bottom: 1px solid oklch(20% 0 0deg) !important;
  padding: 20px 24px !important;
}

.klaro .cookie-modal .cm-header h1,
.klaro .cookie-modal .cm-header h2 {
  font-size: 16px !important;
  font-weight: 700 !important;
  color: oklch(90% 0 0deg) !important;
  font-family: var(--font-display), var(--font-geist-sans), sans-serif !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  margin: 0 !important;
}

.klaro .cookie-modal .cm-header p {
  font-size: 13px !important;
  color: oklch(55% 0 0deg) !important;
  margin: 8px 0 0 !important;
  line-height: 1.5 !important;
}

/* Botón cerrar */
.klaro .cookie-modal .cm-header .hide {
  color: oklch(45% 0 0deg) !important;
  font-size: 20px !important;
  transition: color 0.2s !important;
}

.klaro .cookie-modal .cm-header .hide:hover {
  color: oklch(70% 0 0deg) !important;
}

/* Body / servicios */
.klaro .cookie-modal .cm-body {
  padding: 16px 24px !important;
}

/* Grupos de propósito */
.klaro .cookie-modal .cm-purposes .cm-purpose,
.klaro .cookie-modal .cm-list-title {
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  color: oklch(45% 0 0deg) !important;
  margin: 12px 0 8px !important;
}

/* Ítems de servicio */
.klaro .cookie-modal .cm-list-entry {
  background: oklch(11% 0 0deg) !important;
  border: 1px solid oklch(20% 0 0deg) !important;
  border-radius: 4px !important;
  padding: 14px 16px !important;
  margin-bottom: 8px !important;
}

.klaro .cookie-modal .cm-list-entry .cm-list-title {
  font-size: 13px !important;
  font-weight: 600 !important;
  color: oklch(85% 0 0deg) !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  margin: 0 !important;
}

.klaro .cookie-modal .cm-list-entry p,
.klaro .cookie-modal .cm-list-entry .purposes,
.klaro .cookie-modal .cm-list-entry .cm-list-description {
  font-size: 12px !important;
  color: oklch(50% 0 0deg) !important;
  line-height: 1.5 !important;
  margin: 4px 0 0 !important;
}

/* Toggle switch */
.klaro .cookie-modal .cm-list-entry .switch .slider,
.klaro .cm-list-entry .slider {
  background: oklch(25% 0 0deg) !important;
}

.klaro .cookie-modal input[type="checkbox"]:checked + .cm-list-label .slider,
.klaro input[type="checkbox"]:checked + .slider {
  background: #CC1A1A !important;
}

/* Footer del modal */
.klaro .cookie-modal .cm-footer {
  border-top: 1px solid oklch(20% 0 0deg) !important;
  padding: 16px 24px !important;
  display: flex !important;
  gap: 8px !important;
  justify-content: flex-end !important;
  flex-wrap: wrap !important;
}

/* Botones del modal */
.klaro .cookie-modal .cm-footer button.cm-btn {
  font-family: var(--font-geist-sans), system-ui, sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  border-radius: 999px !important;
  padding: 9px 18px !important;
  cursor: pointer !important;
  transition: background 0.2s, color 0.2s, border-color 0.2s !important;
  border: 1px solid transparent !important;
}

.klaro .cookie-modal .cm-footer button.cm-btn-success {
  background: #CC1A1A !important;
  color: #fff !important;
  border-color: #CC1A1A !important;
}

.klaro .cookie-modal .cm-footer button.cm-btn-success:hover {
  background: oklch(38% 0.18 25deg) !important;
  border-color: oklch(38% 0.18 25deg) !important;
}

.klaro .cookie-modal .cm-footer button.cm-btn-accept-all {
  background: #CC1A1A !important;
  color: #fff !important;
  border-color: #CC1A1A !important;
}

.klaro .cookie-modal .cm-footer button.cm-btn-accept-all:hover {
  background: oklch(38% 0.18 25deg) !important;
}

.klaro .cookie-modal .cm-footer button.cm-btn-decline,
.klaro .cookie-modal .cm-footer button:not(.cm-btn-success):not(.cm-btn-accept-all) {
  background: transparent !important;
  color: oklch(45% 0 0deg) !important;
  border-color: oklch(22% 0 0deg) !important;
}

.klaro .cookie-modal .cm-footer button.cm-btn-decline:hover,
.klaro .cookie-modal .cm-footer button:not(.cm-btn-success):not(.cm-btn-accept-all):hover {
  background: oklch(16% 0 0deg) !important;
  color: oklch(70% 0 0deg) !important;
}

/* Overlay */
.klaro .cookie-modal-overlay {
  background: rgba(0, 0, 0, 0.75) !important;
}

/* Ocultar "powered by Klaro" por si acaso */
.klaro .cm-powered-by {
  display: none !important;
}
`

export const CookieConsent: React.FC = () => {
  useEffect(() => {
    const initKlaro = async () => {
      const klaro = await import('klaro')
      const klaroConfig = (await import('./klaro-config')).default
      ;(window as any).klaro = klaro
      ;(window as any).klaroConfig = klaroConfig
      ;(window as any).GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      klaro.setup(klaroConfig)
    }
    initKlaro()
  }, [])

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/klaro@0.7/dist/klaro.min.css" />
      <style dangerouslySetInnerHTML={{ __html: klaroNPAStyles }} />
    </>
  )
}

export const openKlaroModal = () => {
  if (typeof window !== 'undefined' && (window as any).klaro) {
    ;(window as any).klaro.show()
  }
}
