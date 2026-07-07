'use client'
import React, { useState } from 'react'

export function NewsletterPill() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle')
  const [rgpd, setRgpd] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !rgpd) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        return
      }

      if (data.existing) {
        setStatus('exists')
      } else {
        setStatus('success')
        setEmail('')
        setRgpd(false)
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <p style={{ fontSize: 15, color: '#4caf50', fontWeight: 600, margin: '0 0 4px' }}>
          ✅ ¡Suscrito!
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', margin: 0 }}>
          Recibirás estrategia de póker cada semana.
        </p>
      </div>
    )
  }

  if (status === 'exists') {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', fontWeight: 600, margin: 0 }}>
          Ya estás suscrito con ese email 👍
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <input
          type="email"
          placeholder="Tu email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,.07)',
            border: '1px solid rgba(255,255,255,.12)',
            borderRight: 0,
            borderRadius: '999px 0 0 999px',
            padding: '12px 20px',
            fontSize: 15,
            color: '#fff',
            fontFamily: 'inherit',
            outline: 'none',
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !rgpd}
          style={{
            padding: '12px 24px',
            background: status === 'loading' || !rgpd ? '#666' : 'var(--npa-red)',
            color: '#fff',
            border: 'none',
            borderRadius: '0 999px 999px 0',
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            fontFamily: 'inherit',
            cursor: status === 'loading' || !rgpd ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'background .2s',
          }}
        >
          {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
        </button>
      </div>
      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          marginTop: 12,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={rgpd}
          onChange={(e) => setRgpd(e.target.checked)}
          style={{
            marginTop: 2,
            flexShrink: 0,
            width: 14,
            height: 14,
            accentColor: '#CC1A1A',
          }}
        />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', lineHeight: 1.5 }}>
          Acepto recibir emails de estrategia de póker.{' '}
          <a href="/privacidad" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'underline' }}>
            Política de privacidad
          </a>
          . Cancela cuando quieras.
        </span>
      </label>
      {status === 'error' && (
        <p style={{ fontSize: 12, color: '#ff6b6b', marginTop: 8 }}>
          Error al suscribir. Inténtalo de nuevo.
        </p>
      )}
    </form>
  )
}
