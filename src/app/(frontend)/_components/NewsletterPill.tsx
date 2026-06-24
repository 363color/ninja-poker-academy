'use client'
import React, { useState } from 'react'

export function NewsletterPill() {
  const [email, setEmail] = useState('')

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{ display: 'flex' }}>
        <input
          type="email"
          placeholder="Tu email"
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
          style={{
            padding: '12px 24px',
            background: 'var(--npa-red)',
            color: '#fff',
            border: 'none',
            borderRadius: '0 999px 999px 0',
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            fontFamily: 'inherit',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Suscribirme
        </button>
      </div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', marginTop: 12 }}>
        Sin spam. Cancela cuando quieras.
      </p>
    </form>
  )
}
