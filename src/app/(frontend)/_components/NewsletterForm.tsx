'use client'
import React, { useState } from 'react'
import { Input } from '@/components/Input'

export function NewsletterForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Tu correo electrónico"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center font-display font-bold uppercase tracking-widest text-[12px] text-white py-3.5 px-6 rounded-full transition-opacity hover:opacity-90 active:scale-[0.98]"
        style={{ background: 'var(--npa-red)' }}
      >
        Suscribirme
      </button>
      <p
        className="font-display uppercase text-[11px] tracking-wider"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        Sin spam. Cancela cuando quieras.
      </p>
    </form>
  )
}
