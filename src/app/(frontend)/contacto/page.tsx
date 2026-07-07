import type { Metadata } from 'next'
import React from 'react'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contacto | Ninja Poker Academy',
  description:
    'Únete a Ninja Poker Academy. Cuéntanos tu historia en el póker, desde qué país juegas y qué buscas mejorar. Te respondemos por Discord.',
}

const CANALES = [
  {
    icon: '💬',
    name: 'Telegram',
    handle: '@ninjapokeracademy',
    href: 'https://t.me/ninjapokeracademy',
    desc: 'El canal más rápido. Respondemos el mismo día.',
    color: '#1a9fcc',
  },
  {
    icon: '📸',
    name: 'Instagram',
    handle: '@ninjapokeracademy',
    href: 'https://www.instagram.com/ninjapokeracademy',
    desc: 'Mándanos un DM. Vemos todos los mensajes.',
    color: '#cc1a6e',
  },
  {
    icon: '🎵',
    name: 'TikTok',
    handle: '@ninjapokeracademy',
    href: 'https://www.tiktok.com/@ninjapokeracademy',
    desc: 'También respondemos por aquí.',
    color: '#1d1d1d',
  },
]

export default function ContactoPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto | Ninja Poker Academy',
    url: 'https://ninjapokeracademy.com/contacto',
    mainEntity: {
      '@type': 'Organization',
      name: 'Ninja Poker Academy',
      url: 'https://ninjapokeracademy.com',
      sameAs: [
        'https://t.me/ninjapokeracademy',
        'https://www.instagram.com/ninjapokeracademy',
        'https://www.tiktok.com/@ninjapokeracademy',
        'https://www.youtube.com/@ninjapokeracademy',
      ],
    },
  }

  return (
    <main className="bg-white min-h-screen" style={{ paddingTop: 80 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ══ HERO ══ */}
      <section
        style={{ background: 'linear-gradient(180deg, var(--npa-cream, #F3F0EB) 0%, #fff 100%)' }}
      >
        <div className="container">
          <div className="pvp">
            <div
              style={{
                paddingTop: 72,
                paddingBottom: 56,
                textAlign: 'center',
                maxWidth: 700,
                margin: '0 auto',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: '#1d1d1d',
                  fontFamily: 'var(--font-display)',
                  margin: '0 0 24px',
                }}
              >
                Cuéntanos de <em style={{ color: '#CC1A1A', fontStyle: 'normal' }}>ti</em>
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#575757', margin: 0 }}>
                Tu historia en el póker, desde qué país juegas, qué buscas mejorar. Nuestra escuela
                está en Discord — te enviamos la invitación tras conversar contigo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO + CANALES ══ */}
      <section className="featured">
        <div className="container">
          <div className="pvp spl">
            <div className="contacto-grid">
              {/* Formulario */}
              <div className="contacto-form-block">
                <div className="sect-label">Solicitud</div>
                <h2
                  style={{
                    fontSize: 'clamp(22px, 3vw, 30px)',
                    fontWeight: 700,
                    color: '#1d1d1d',
                    margin: '0 0 8px',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Cuéntanos sobre ti
                </h2>
                <p style={{ fontSize: 14, color: '#575757', margin: '0 0 28px' }}>
                  2 minutos. Sin compromiso.
                </p>
                <ContactForm />
              </div>

              {/* Canales */}
              <div>
                <div className="sect-label">Directo</div>
                <h2
                  style={{
                    fontSize: 'clamp(22px, 3vw, 30px)',
                    fontWeight: 700,
                    color: '#1d1d1d',
                    margin: '0 0 8px',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  O escríbenos ya
                </h2>
                <p style={{ fontSize: 14, color: '#575757', margin: '0 0 28px' }}>
                  Si prefieres ir directo, aquí nos encuentras.
                </p>

                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}
                >
                  {CANALES.map((c) => (
                    <a
                      key={c.name}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contacto-canal"
                    >
                      <div
                        className="contacto-canal-icon"
                        style={{ background: `${c.color}14`, color: c.color }}
                      >
                        {c.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                          <span style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1d' }}>
                            {c.name}
                          </span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: c.color }}>
                            {c.handle}
                          </span>
                        </div>
                        <div
                          style={{ fontSize: 13, color: '#575757', lineHeight: 1.5, marginTop: 2 }}
                        >
                          {c.desc}
                        </div>
                      </div>
                      <div className="contacto-canal-arrow">→</div>
                    </a>
                  ))}
                </div>

                {/* Proceso Discord */}
                <div className="contacto-discord-card">
                  <div className="contacto-discord-deco" />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '.12em',
                        color: 'rgba(255,255,255,.35)',
                        marginBottom: 4,
                      }}
                    >
                      Sobre el Discord
                    </div>
                    <h3
                      style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 14px' }}
                    >
                      La escuela está en Discord
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {[
                        'Nos cuentas tu historia en el formulario',
                        'Conversamos contigo sobre tu nivel y objetivos',
                        'Te enviamos la invitación al Discord',
                      ].map((step, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <div
                            style={{
                              flexShrink: 0,
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: 'rgba(204,26,26,.25)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 11,
                              fontWeight: 700,
                              color: '#ff6b6b',
                            }}
                          >
                            {i + 1}
                          </div>
                          <span
                            style={{
                              fontSize: 13,
                              color: 'rgba(255,255,255,.75)',
                              lineHeight: 1.6,
                              paddingTop: 2,
                            }}
                          >
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contacto-form-block {
          background: #f9f9f7;
          border: 1px solid #eeeeec;
          border-radius: var(--r-xl);
          padding: 36px;
        }
        .contacto-form-block input,
        .contacto-form-block select,
        .contacto-form-block textarea {
          background: #fff !important;
        }
        @media (max-width: 768px) {
          .contacto-form-block { padding: 24px; border-radius: var(--r-l); }
        }

        .contacto-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: start; }

        .contacto-canal {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          background: #fff;
          border: 1px solid #e7e6e6;
          border-radius: var(--r-l);
          text-decoration: none;
          transition: box-shadow .2s, transform .2s, border-color .2s;
        }
        .contacto-canal:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,.08);
          transform: translateY(-2px);
          border-color: #e0e0e0;
        }
        .contacto-canal-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .contacto-canal-arrow {
          font-size: 16px;
          color: #d0d0d0;
          flex-shrink: 0;
          transition: transform .2s, color .2s;
        }
        .contacto-canal:hover .contacto-canal-arrow {
          transform: translateX(4px);
          color: #CC1A1A;
        }

        .contacto-discord-card {
          background: #0D0D0D;
          border-radius: var(--r-l);
          padding: 28px;
          position: relative;
          overflow: hidden;
        }
        .contacto-discord-deco {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(204,26,26,.18) 0%, transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .contacto-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </main>
  )
}
