'use client'
import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'

function Arr13() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

const CANALES = [
  { icon: '💬', name: 'Telegram', href: 'https://t.me/ninjapokeracademy' },
  { icon: '📸', name: 'Instagram', href: 'https://www.instagram.com/ninjapokeracademy' },
  { icon: '🎵', name: 'TikTok', href: 'https://www.tiktok.com/@ninjapokeracademy' },
  { icon: '▶️', name: 'YouTube', href: 'https://www.youtube.com/@ninjapokeracademy' },
]

const NIVEL_LABELS: Record<string, string> = {
  principiante: 'Principiante — no sabe jugar',
  recreativo: 'Recreativo',
  intermedio: 'Con experiencia, busca mejorar',
  semipro: 'Semi-profesional',
}

export function GraciasContent() {
  const params = useSearchParams()

  const nombre = params.get('nombre') || ''
  const email = params.get('email') || ''
  const nivel = params.get('nivel') || ''
  const telegram = params.get('telegram') || ''
  const instagram = params.get('instagram') || ''
  const tiktok = params.get('tiktok') || ''
  const discord = params.get('discord') || ''
  const youtube = params.get('youtube') || ''

  const hayDatos = nombre || email

  const redes = [
    discord && { label: 'Discord', value: discord },
    telegram && { label: 'Telegram', value: telegram },
    instagram && { label: 'Instagram', value: instagram },
    tiktok && { label: 'TikTok', value: tiktok },
    youtube && { label: 'YouTube', value: youtube },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <main className="bg-white min-h-screen" style={{ paddingTop: 80 }}>
      <section
        style={{ background: 'linear-gradient(180deg, var(--npa-cream, #F3F0EB) 0%, #fff 100%)' }}
      >
        <div className="container">
          <div className="pvp">
            <div
              style={{
                paddingTop: 80,
                paddingBottom: 56,
                textAlign: 'center',
                maxWidth: 620,
                margin: '0 auto',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 20 }}>🥷</div>
              <h1
                style={{
                  fontSize: 'clamp(28px, 4.5vw, 48px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: '#1d1d1d',
                  fontFamily: 'var(--font-display)',
                  margin: '0 0 20px',
                }}
              >
                {nombre ? `Gracias, ${nombre}` : 'Hemos recibido tu solicitud'}
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: '#575757', margin: '0 0 8px' }}>
                Te contactaremos directamente por la red social que nos dejaste — no respondemos por
                email, así que mantente atento a tus mensajes.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#b8b7b7' }}>
                Te hemos enviado un correo de confirmación con más información sobre cómo es el
                proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <div className="pvp" style={{ paddingTop: 0, paddingBottom: 80 }}>
            <div
              style={{
                maxWidth: 760,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
              }}
            >
              {/* Resumen de lo enviado */}
              {hayDatos && (
                <div
                  style={{
                    background: '#f9f9f7',
                    border: '1px solid #eeeeec',
                    borderRadius: 'var(--r-l)',
                    padding: 28,
                  }}
                >
                  <div className="sect-label">Confirma tus datos</div>
                  <p style={{ fontSize: 13, color: '#575757', margin: '0 0 18px' }}>
                    Esto es lo que recibimos. Si algo está mal, escríbenos para corregirlo.
                  </p>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {nombre && (
                        <tr>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 12,
                              color: '#999',
                              width: '35%',
                              verticalAlign: 'top',
                            }}
                          >
                            Nombre
                          </td>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#1d1d1d',
                            }}
                          >
                            {nombre}
                          </td>
                        </tr>
                      )}
                      {email && (
                        <tr>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 12,
                              color: '#999',
                              verticalAlign: 'top',
                              borderTop: '1px solid #eee',
                            }}
                          >
                            Email
                          </td>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#1d1d1d',
                              borderTop: '1px solid #eee',
                            }}
                          >
                            {email}
                          </td>
                        </tr>
                      )}
                      {nivel && (
                        <tr>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 12,
                              color: '#999',
                              verticalAlign: 'top',
                              borderTop: '1px solid #eee',
                            }}
                          >
                            Nivel
                          </td>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#1d1d1d',
                              borderTop: '1px solid #eee',
                            }}
                          >
                            {NIVEL_LABELS[nivel] || nivel}
                          </td>
                        </tr>
                      )}
                      {redes.length > 0 && (
                        <tr>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 12,
                              color: '#999',
                              verticalAlign: 'top',
                              borderTop: '1px solid #eee',
                            }}
                          >
                            Redes
                          </td>
                          <td
                            style={{
                              padding: '8px 0',
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#1d1d1d',
                              borderTop: '1px solid #eee',
                            }}
                          >
                            {redes.map((r) => `${r.label}: ${r.value}`).join(' · ')}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mientras esperas */}
              <div style={{ background: '#0D0D0D', borderRadius: 'var(--r-l)', padding: 32 }}>
                <div className="sect-label" style={{ color: 'rgba(255,255,255,.35)' }}>
                  Mientras esperas
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>
                  Aprovecha y empieza a estudiar
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,.6)',
                    lineHeight: 1.7,
                    margin: '0 0 20px',
                  }}
                >
                  Tenemos más de 200 clases gratuitas en la videoteca. No necesitas esperar nuestra
                  respuesta para empezar a mejorar tu juego.
                </p>
                <Link
                  href="/clases"
                  className="btn red"
                  style={{ justifyContent: 'space-between', display: 'inline-flex' }}
                >
                  <span className="btn-text">Ver clases gratis</span>
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
                </Link>
              </div>

              {/* Conoce la comunidad */}
              <div style={{ border: '1px solid #e7e6e6', borderRadius: 'var(--r-l)', padding: 32 }}>
                <div className="sect-label">Cómo funcionamos</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1d1d1d', margin: '0 0 14px' }}>
                  ¿Quieres saber cómo es la academia por dentro?
                </h2>
                <p style={{ fontSize: 14, color: '#575757', lineHeight: 1.7, margin: '0 0 20px' }}>
                  Te contamos cómo son las clases, casos reales de alumnos que llegaron a NL100, y
                  cómo funciona el acceso al Discord.
                </p>
                <Link href="/comunidad" className="btn-ghost">
                  Conoce la comunidad <Arr13 />
                </Link>
              </div>

              {/* Síguenos */}
              <div>
                <div className="sect-label" style={{ textAlign: 'center' }}>
                  Síguenos
                </div>
                <p
                  style={{ fontSize: 14, color: '#575757', textAlign: 'center', marginBottom: 20 }}
                >
                  Contenido nuevo cada semana en todas nuestras redes.
                </p>
                <div
                  style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
                >
                  {CANALES.map((c) => (
                    <a
                      key={c.name}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 18px',
                        border: '1px solid #e7e6e6',
                        borderRadius: 'var(--r-pill)',
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#1d1d1d',
                      }}
                    >
                      <span>{c.icon}</span> {c.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
