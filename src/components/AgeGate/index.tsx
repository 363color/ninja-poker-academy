'use client'

import React, { useEffect, useState } from 'react'

const COOKIE_NAME = 'age_verified'
const COOKIE_DAYS = 365

function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export const AgeGate: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const verified = getCookie(COOKIE_NAME)
    if (!verified) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleConfirm = () => {
    setCookie(COOKIE_NAME, 'true', COOKIE_DAYS)
    setVisible(false)
    document.body.style.overflow = ''
  }

  const handleDeny = () => {
    window.location.href = 'https://www.google.com'
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') e.preventDefault()
    }
    if (visible) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
      className="age-gate-overlay"
    >
      <div className="age-gate-card">
        {/* Línea roja superior */}
        <div className="age-gate-topbar" aria-hidden="true" />

        {/* Icono escudo */}
        <div className="age-gate-icon" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        {/* Eyebrow */}
        <p className="age-gate-eyebrow">Ninja Poker Academy</p>

        {/* Título */}
        <h2 id="age-gate-title" className="age-gate-title">
          Verificación de edad
        </h2>

        {/* Descripción */}
        <p id="age-gate-desc" className="age-gate-desc">
          Este sitio contiene contenido relacionado con el juego de póker. Debes tener{' '}
          <strong>18 años o más</strong> para acceder.
        </p>

        {/* Botones */}
        <div className="age-gate-actions">
          {/* Botón primario — estilo .btn.red */}
          <button
            onClick={handleConfirm}
            autoFocus
            className="btn red age-gate-btn-primary"
            type="button"
          >
            <span className="btn-text">Confirmo que tengo 18 años o más</span>
            <span className="btn-fill" aria-hidden="true" />
            <span className="btn-circle" aria-hidden="true">
              <span className="btn-icon">
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    className="btn-arrow"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </button>

          {/* Botón ghost — estilo .btn-ghost */}
          <button onClick={handleDeny} className="btn-ghost age-gate-btn-ghost" type="button">
            Soy menor de edad
          </button>
        </div>

        {/* Nota legal */}
        <p className="age-gate-legal">
          Al continuar aceptas nuestros{' '}
          <a href="/terminos" className="age-gate-legal-link">
            Términos y condiciones
          </a>{' '}
          y confirmas que el juego de póker está permitido en tu jurisdicción.
        </p>
      </div>

      <style>{`
        .age-gate-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .age-gate-card {
          background: var(--npa-black-elevated, #111111);
          border: 1px solid oklch(18% 0 0deg);
          border-radius: 4px;
          padding: 2.5rem 2rem;
          max-width: 440px;
          width: 100%;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .age-gate-topbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--npa-red, #CC1A1A);
          border-radius: 4px 4px 0 0;
        }

        .age-gate-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: oklch(62% 0.22 25deg / 12%);
          border: 1px solid oklch(62% 0.22 25deg / 28%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--npa-red, #CC1A1A);
          margin-bottom: 1.25rem;
        }

        .age-gate-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: oklch(50% 0 0deg);
          margin: 0 0 0.5rem;
          font-family: var(--font-display, inherit);
        }

        .age-gate-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--npa-cream, #F3F0EB);
          margin: 0 0 0.75rem;
          letter-spacing: -0.01em;
          font-family: var(--font-display, inherit);
          text-transform: uppercase;
        }

        .age-gate-desc {
          font-size: 0.875rem;
          color: oklch(55% 0 0deg);
          line-height: 1.65;
          margin: 0 0 2rem;
          max-width: 320px;
        }

        .age-gate-desc strong {
          color: oklch(75% 0 0deg);
          font-weight: 600;
        }

        .age-gate-actions {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          width: 100%;
          align-items: center;
        }

        .age-gate-btn-primary {
          width: 100%;
          justify-content: space-between;
        }

        .age-gate-btn-ghost {
          width: 100%;
          justify-content: center;
          border-color: oklch(22% 0 0deg) !important;
          color: oklch(40% 0 0deg) !important;
          background: transparent !important;
        }

        .age-gate-btn-ghost:hover {
          background: oklch(22% 0 0deg) !important;
          color: var(--npa-cream, #F3F0EB) !important;
          border-color: oklch(22% 0 0deg) !important;
        }

        .age-gate-legal {
          font-size: 0.7rem;
          color: oklch(32% 0 0deg);
          margin: 1.25rem 0 0;
          line-height: 1.6;
          max-width: 300px;
        }

        .age-gate-legal-link {
          color: oklch(42% 0 0deg);
          text-decoration: underline;
        }

        .age-gate-legal-link:hover {
          color: oklch(55% 0 0deg);
        }

        @media (max-width: 480px) {
          .age-gate-card {
            padding: 2rem 1.25rem;
          }
          .age-gate-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  )
}
