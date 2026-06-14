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
    if (visible) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '2.5rem',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h2
          id="age-gate-title"
          style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111' }}
        >
          Verificación de edad
        </h2>
        <p
          id="age-gate-desc"
          style={{ fontSize: '1rem', color: '#444', marginBottom: '2rem', lineHeight: 1.6 }}
        >
          Este sitio contiene contenido relacionado con el juego de póker. Debes tener 18 años o más
          para acceder.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={handleConfirm}
            autoFocus
            style={{
              backgroundColor: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.875rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Confirmo que tengo 18 años o más
          </button>
          <button
            onClick={handleDeny}
            style={{
              backgroundColor: 'transparent',
              color: '#666',
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '0.875rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Soy menor de edad
          </button>
        </div>
      </div>
    </div>
  )
}
