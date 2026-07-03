'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'idle' | 'loading' | 'error'

const DOMINIOS_PERMITIDOS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'yahoo.es',
  'icloud.com',
  'live.com',
  'protonmail.com',
  'proton.me',
  'aol.com',
  'msn.com',
]

function emailValido(email: string): boolean {
  const partes = email.toLowerCase().split('@')
  if (partes.length !== 2) return false
  return DOMINIOS_PERMITIDOS.includes(partes[1])
}

export function ContactForm() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [emailError, setEmailError] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    nivel: '',
    telegram: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    discord: '',
    mensaje: '',
    rgpd: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (name === 'email') setEmailError('')
  }

  const tieneRedSocial =
    form.discord || form.telegram || form.instagram || form.tiktok || form.youtube

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.rgpd) return

    if (!emailValido(form.email)) {
      setEmailError(
        'Usa un email de un proveedor conocido (Gmail, Outlook, Yahoo, iCloud...). No aceptamos emails temporales.',
      )
      return
    }

    if (!tieneRedSocial) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')

      const params = new URLSearchParams()
      params.set('nombre', form.nombre)
      params.set('email', form.email)
      params.set('nivel', form.nivel)
      if (form.discord) params.set('discord', form.discord)
      if (form.telegram) params.set('telegram', form.telegram)
      if (form.instagram) params.set('instagram', form.instagram)
      if (form.tiktok) params.set('tiktok', form.tiktok)
      if (form.youtube) params.set('youtube', form.youtube)

      router.push(`/contacto/gracias?${params.toString()}`)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label htmlFor="nombre" className="contacto-label">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          value={form.nombre}
          onChange={handleChange}
          className="contacto-input"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="contacto-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="contacto-input"
          placeholder="tu@gmail.com"
        />
        <p style={{ fontSize: 12, color: '#b8b7b7', margin: '6px 0 0' }}>
          No te contactamos por email — es solo para confirmar tu solicitud y la newsletter (puedes
          darte de baja cuando quieras).
        </p>
        {emailError && (
          <p style={{ fontSize: 12, color: '#CC1A1A', margin: '6px 0 0' }}>{emailError}</p>
        )}
      </div>

      <div>
        <label htmlFor="nivel" className="contacto-label">
          Tu nivel actual
        </label>
        <select
          id="nivel"
          name="nivel"
          required
          value={form.nivel}
          onChange={handleChange}
          className="contacto-input"
        >
          <option value="">Selecciona una opción</option>
          <option value="principiante">Soy principiante, no sé jugar</option>
          <option value="recreativo">Juego de forma recreativa</option>
          <option value="intermedio">Tengo experiencia, busco mejorar</option>
          <option value="semipro">Juego semi-profesional</option>
        </select>
      </div>

      <div>
        <div className="contacto-label">
          Tus redes sociales <span style={{ color: '#CC1A1A' }}>(al menos una, obligatorio)</span>
        </div>
        <p style={{ fontSize: 12, color: '#575757', margin: '0 0 10px' }}>
          Nos contactamos por aquí — Discord es el principal. Deja varias para encontrarte más
          rápido.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <input
            name="discord"
            type="text"
            value={form.discord}
            onChange={handleChange}
            className="contacto-input"
            placeholder="Discord (usuario)"
            style={{ gridColumn: 'span 2', borderColor: '#CC1A1A20', background: '#fff9f9' }}
          />
          <input
            name="telegram"
            type="text"
            value={form.telegram}
            onChange={handleChange}
            className="contacto-input"
            placeholder="Telegram (@usuario)"
          />
          <input
            name="instagram"
            type="text"
            value={form.instagram}
            onChange={handleChange}
            className="contacto-input"
            placeholder="Instagram (@usuario)"
          />
          <input
            name="tiktok"
            type="text"
            value={form.tiktok}
            onChange={handleChange}
            className="contacto-input"
            placeholder="TikTok (@usuario)"
          />
          <input
            name="youtube"
            type="text"
            value={form.youtube}
            onChange={handleChange}
            className="contacto-input"
            placeholder="YouTube (canal)"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className="contacto-label">
          Mensaje{' '}
          <span style={{ color: '#b8b7b7', textTransform: 'none', fontWeight: 400 }}>
            (opcional)
          </span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          className="contacto-input"
          placeholder="Cuéntanos algo más si quieres — tu objetivo, tus límites actuales, dudas..."
          style={{ resize: 'vertical' }}
        />
      </div>

      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          fontSize: 13,
          color: '#575757',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          name="rgpd"
          checked={form.rgpd}
          onChange={handleChange}
          required
          style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16, accentColor: '#CC1A1A' }}
        />
        <span>
          Acepto que mis datos sean tratados para responder a esta consulta, según la{' '}
          <a href="/privacidad" style={{ color: '#CC1A1A', textDecoration: 'underline' }}>
            política de privacidad
          </a>
          .
        </span>
      </label>

      {status === 'error' && (
        <p style={{ fontSize: 13, color: '#CC1A1A', margin: 0 }}>
          Algo falló al enviar el mensaje. Inténtalo de nuevo o escríbenos por Telegram.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !form.rgpd}
        className="btn red"
        style={{
          justifyContent: 'space-between',
          opacity: status === 'loading' || !form.rgpd ? 0.6 : 1,
          cursor: status === 'loading' || !form.rgpd ? 'not-allowed' : 'pointer',
        }}
      >
        <span className="btn-text">
          {status === 'loading' ? 'Enviando...' : 'Enviar solicitud'}
        </span>
        <span className="btn-fill" />
        <span className="btn-circle">
          <span className="btn-icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" className="btn-arrow" />
            </svg>
          </span>
        </span>
      </button>

      <style>{`
        .contacto-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #575757;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: .04em;
        }
        .contacto-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e7e6e6;
          border-radius: var(--r-m);
          font-size: 14px;
          font-family: inherit;
          color: #1d1d1d;
          background: #fff;
          outline: none;
          transition: border-color .2s;
          box-sizing: border-box;
        }
        .contacto-input:focus {
          border-color: #CC1A1A;
        }
        .contacto-input::placeholder {
          color: #b8b7b7;
        }
      `}</style>
    </form>
  )
}
