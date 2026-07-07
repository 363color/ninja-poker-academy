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
    discord: '',
    pais: '',
    interes: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.rgpd) return

    if (!emailValido(form.email)) {
      setEmailError(
        'Usa un email de un proveedor conocido (Gmail, Outlook, Yahoo, iCloud...). No aceptamos emails temporales.',
      )
      return
    }

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
      if (form.discord) params.set('discord', form.discord)
      if (form.pais) params.set('pais', form.pais)
      if (form.interes) params.set('interes', form.interes)

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
          Solo para confirmar tu solicitud. No te contactamos por email.
        </p>
        {emailError && (
          <p style={{ fontSize: 12, color: '#CC1A1A', margin: '6px 0 0' }}>{emailError}</p>
        )}
      </div>

      <div>
        <label htmlFor="discord" className="contacto-label">
          Discord <span style={{ color: '#CC1A1A' }}>(usuario)</span>
        </label>
        <input
          id="discord"
          name="discord"
          type="text"
          required
          value={form.discord}
          onChange={handleChange}
          className="contacto-input"
          placeholder="Tu usuario de Discord"
        />
        <p style={{ fontSize: 12, color: '#b8b7b7', margin: '6px 0 0' }}>
          La escuela funciona en Discord. Te enviaremos la invitación por aquí.
        </p>
      </div>

      <div>
        <label htmlFor="pais" className="contacto-label">
          País
        </label>
        <input
          id="pais"
          name="pais"
          type="text"
          required
          value={form.pais}
          onChange={handleChange}
          className="contacto-input"
          placeholder="¿Desde qué país juegas?"
        />
      </div>

      <div>
        <label htmlFor="interes" className="contacto-label">
          ¿Qué te interesa?
        </label>
        <select
          id="interes"
          name="interes"
          required
          value={form.interes}
          onChange={handleChange}
          className="contacto-input"
        >
          <option value="">Selecciona una opción</option>
          <option value="aprender">Aprender desde cero</option>
          <option value="mejorar">Mejorar mi juego y subir de límites</option>
          <option value="bancaje">Bancaje — quiero jugar sin arriesgar mi dinero</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="contacto-label">
          Cuéntanos tu historia en el póker{' '}
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
          placeholder="Qué límites juegas, en qué salas, qué buscas mejorar, si usas HUD o trackers..."
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
