import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { FAQAccordion } from '../_components/FAQAccordion'
import { NewsletterPill } from '../_components/NewsletterPill'

export const metadata: Metadata = {
  title: 'Comunidad | Ninja Poker Academy',
  description:
    'Descubre la experiencia real de Ninja Poker Academy: clases diarias, revisión de manos, análisis HUD, bancaje y una comunidad activa de jugadores ganadores.',
}

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

function BtnRed({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn red">
      <span className="btn-text">{children}</span>
      <div className="btn-fill" />
      <div className="btn-circle">
        <div className="btn-icon">
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
        </div>
      </div>
    </Link>
  )
}

const ALUMNOS = [
  {
    nick: 'Stiben',
    nivel: 'NL100',
    color: '#CC1A1A',
    historia:
      'Entró sin saber nada de póker. En aproximadamente 12 meses pasó de NL2 a NL100 con resultados consistentes.',
    desde: 'NL2',
    hasta: 'NL100',
  },
  {
    nick: 'Yisus',
    nivel: 'NL50',
    color: '#1a7acc',
    historia:
      'Empezó desde cero junto al resto del equipo. Hoy juega NL50 de forma regular y sigue escalando límites.',
    desde: 'NL2',
    hasta: 'NL50',
  },
  {
    nick: 'Yani',
    nivel: 'NL50 · Profesora',
    color: '#1acc7a',
    historia:
      'No solo llegó a NL50 — se convirtió en parte del equipo docente. Hoy enseña a otros alumnos lo que ella misma aprendió aquí.',
    desde: 'NL2',
    hasta: 'NL50+',
  },
]

const CANALES = [
  {
    icon: '💬',
    name: 'Telegram',
    handle: '@ninjapokeracademy',
    href: 'https://t.me/ninjapokeracademy',
    desc: 'Canal principal. Escríbenos aquí para empezar.',
  },
  {
    icon: '▶️',
    name: 'YouTube',
    handle: '@ninjapokeracademy',
    href: 'https://www.youtube.com/@ninjapokeracademy',
    desc: '+200 clases gratuitas de cash game.',
  },
  {
    icon: '📸',
    name: 'Instagram',
    handle: '@ninjapokeracademy',
    href: 'https://www.instagram.com/ninjapokeracademy',
    desc: 'Contenido, tips y novedades de la academia.',
  },
  {
    icon: '🎵',
    name: 'TikTok',
    handle: '@ninjapokeracademy',
    href: 'https://www.tiktok.com/@ninjapokeracademy',
    desc: 'Clips cortos y estrategia en formato rápido.',
  },
]

export default function ComunidadPage() {
  return (
    <main className="bg-white min-h-screen" style={{ paddingTop: 80 }}>
      {/* ══ HERO ══ */}
      <section
        style={{ background: 'linear-gradient(180deg, var(--npa-cream, #F3F0EB) 0%, #fff 100%)' }}
      >
        <div className="container">
          <div className="pvp">
            <div
              style={{
                paddingTop: 72,
                paddingBottom: 64,
                textAlign: 'center',
                maxWidth: 720,
                margin: '0 auto',
              }}
            >
              <div className="hero-pill" style={{ display: 'inline-flex', marginBottom: 32 }}>
                <div className="hero-avatars">
                  <div className="hero-av">🥷</div>
                  <div className="hero-av">🃏</div>
                  <div className="hero-av">♠</div>
                </div>
                <span>La experiencia real de Ninja Poker Academy</span>
              </div>
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
                No es solo una academia. Es una{' '}
                <em style={{ color: '#CC1A1A', fontStyle: 'normal' }}>comunidad</em> ganadora.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#575757', margin: '0 0 40px' }}>
                Clases diarias, revisión de manos, análisis HUD y un equipo que conoce tu juego por
                tu nombre. Todo lo que necesitas para convertirte en un jugador ganador de cash
                game.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <BtnRed href="/contacto">Quiero unirme</BtnRed>
                <Link href="/clases" className="btn-ghost">
                  Ver clases gratis <Arr13 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS PUENTE ══ */}
      <section
        style={{
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <div className="container">
          <div className="pvp" style={{ paddingTop: 40, paddingBottom: 40 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 24,
                textAlign: 'center',
              }}
            >
              {[
                { num: '+200', label: 'Clases grabadas' },
                { num: '5/7', label: 'Días con clase en vivo' },
                { num: '0€', label: 'Coste para el alumno' },
                { num: '12 meses', label: 'NL2 a NL100, en promedio' },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      fontWeight: 700,
                      color: '#CC1A1A',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: 13, color: '#575757', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CASOS DE ÉXITO ══ */}
      <section style={{ background: '#0D0D0D' }}>
        <div className="container">
          <div className="pvp spl">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="sect-label" style={{ color: 'rgba(255,255,255,.35)' }}>
                Resultados reales
              </div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 16px',
                  lineHeight: 1.2,
                }}
              >
                De NL2 a NL100.
                <br />
                En 12 meses.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,.55)',
                  maxWidth: 520,
                  margin: '0 auto',
                }}
              >
                Tres alumnos que entraron sin saber nada de póker. Hoy juegan límites donde otros
                tardan años en llegar.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 20,
              }}
            >
              {ALUMNOS.map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,.04)',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: 'var(--r-l)',
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        background: `${a.color}22`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 700,
                        color: a.color,
                        flexShrink: 0,
                      }}
                    >
                      {a.nick[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{a.nick}</div>
                      <div
                        style={{
                          fontSize: 12,
                          color: a.color,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '.08em',
                        }}
                      >
                        {a.nivel}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,.35)',
                          textTransform: 'uppercase',
                          letterSpacing: '.08em',
                          marginBottom: 4,
                        }}
                      >
                        Desde
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,.4)' }}>
                        {a.desde}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background: `linear-gradient(90deg, rgba(255,255,255,.1), ${a.color})`,
                        borderRadius: 2,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          right: -4,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: a.color,
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,.35)',
                          textTransform: 'uppercase',
                          letterSpacing: '.08em',
                          marginBottom: 4,
                        }}
                      >
                        Hasta
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: a.color }}>{a.hasta}</div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,.55)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {a.historia}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.25)', marginBottom: 24 }}>
                Todos comenzaron desde cero. Ninguno pagó una cuota. El modelo funciona porque
                nuestros intereses están alineados con los tuyos.
              </p>
              <BtnRed href="/contacto">Empieza tu historia</BtnRed>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA EL ACCESO ══ */}
      <section className="featured">
        <div className="container">
          <div className="pvp spl">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 80,
                alignItems: 'center',
              }}
            >
              <div>
                <div className="sect-label">El proceso</div>
                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 42px)',
                    fontWeight: 700,
                    margin: '0 0 20px',
                    lineHeight: 1.2,
                  }}
                >
                  ¿Cómo entro al Discord?
                </h2>
                <p style={{ fontSize: 16, color: '#575757', lineHeight: 1.7, margin: '0 0 32px' }}>
                  No compartimos el invite del Discord públicamente. El proceso es simple y personal
                  — así nos aseguramos de que cada alumno encaja y recibe la atención que merece.
                </p>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}
                >
                  {[
                    {
                      num: '01',
                      title: 'Escríbenos',
                      desc: 'Contacta por Telegram, Instagram o el formulario. Cualquier canal funciona.',
                    },
                    {
                      num: '02',
                      title: 'Conversamos',
                      desc: 'Nuestro equipo habla contigo para entender tu nivel, tus objetivos y si Ninja Poker Academy es la academia adecuada para ti.',
                    },
                    {
                      num: '03',
                      title: 'Acceso al Discord',
                      desc: 'Si encajas, te enviamos el invite manualmente. A partir de ahí eres parte de la comunidad.',
                    },
                    {
                      num: '04',
                      title: 'Empiezas a mejorar',
                      desc: 'Clases diarias, revisión de manos, análisis HUD. Todo desde el primer día.',
                    },
                  ].map((s) => (
                    <div key={s.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div
                        style={{
                          flexShrink: 0,
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: 'rgba(204,26,26,.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#CC1A1A',
                          letterSpacing: '.06em',
                        }}
                      >
                        {s.num}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: '#1d1d1d',
                            marginBottom: 4,
                          }}
                        >
                          {s.title}
                        </div>
                        <div style={{ fontSize: 14, color: '#575757', lineHeight: 1.6 }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <BtnRed href="/contacto">Contactar ahora</BtnRed>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: '#0D0D0D', borderRadius: 'var(--r-l)', padding: 28 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.12em',
                      color: 'rgba(255,255,255,.3)',
                      marginBottom: 16,
                    }}
                  >
                    Discord
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,.55)',
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    El Discord es el corazón de la academia. Ahí están los canales de estudio, las
                    manos marcadas, los debates de estrategia y el seguimiento diario.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      '#estrategia-general',
                      '#revisión-de-manos',
                      '#análisis-hud',
                      '#mental-game',
                      '#bancaje',
                      '#éxitos-y-resultados',
                    ].map((ch) => (
                      <div
                        key={ch}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          fontSize: 13,
                          color: 'rgba(255,255,255,.4)',
                        }}
                      >
                        <span style={{ color: 'rgba(255,255,255,.2)', fontSize: 16 }}>#</span>
                        <span>{ch.replace('#', '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e7e6e6',
                    borderRadius: 'var(--r-l)',
                    padding: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <div style={{ fontSize: 28 }}>🔒</div>
                  <div>
                    <div
                      style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1d', marginBottom: 4 }}
                    >
                      Acceso privado
                    </div>
                    <div style={{ fontSize: 13, color: '#575757' }}>
                      El invite solo se comparte manualmente tras conversar con el equipo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CANALES ══ */}
      <section style={{ background: '#f9f9f7' }}>
        <div className="container">
          <div className="pvp spl">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="sect-label">Encuéntranos</div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, margin: 0 }}>
                Estamos en todas partes
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              {CANALES.map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comunidad-card comunidad-canal"
                >
                  <div style={{ fontSize: 28 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1d' }}>{c.name}</div>
                    <div
                      style={{ fontSize: 12, color: '#CC1A1A', fontWeight: 600, marginBottom: 6 }}
                    >
                      {c.handle}
                    </div>
                    <div style={{ fontSize: 13, color: '#575757', lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="faq">
        <div className="container">
          <div className="pvp spl">
            <div className="faq-wrap">
              <div className="faq-left">
                <div className="sect-label">FAQ</div>
                <h2
                  style={{
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 700,
                    margin: '0 0 16px',
                  }}
                >
                  Preguntas frecuentes
                </h2>
                <p style={{ fontSize: 15, color: '#575757', lineHeight: 1.7, marginBottom: 32 }}>
                  ¿Tienes dudas? Aquí respondemos las más habituales sobre la academia.
                </p>
                <Link href="/contacto" className="btn-ghost">
                  Contactar <Arr13 />
                </Link>
              </div>
              <FAQAccordion
                items={[
                  {
                    question: '¿Cómo es el ambiente dentro de la comunidad?',
                    answer:
                      'Cercano y activo. No es un grupo de cientos de personas en silencio: hay debate constante sobre manos, dudas resueltas al momento y compañeros que juegan los mismos límites que tú.',
                  },
                  {
                    question: '¿Por qué no comparten el invite de Discord públicamente?',
                    answer:
                      'Para mantener la calidad de la comunidad. Preferimos conocer a cada persona antes de darle acceso, así nos asegura que el grupo se mantiene activo y de confianza.',
                  },
                  {
                    question: '¿Qué pasa después de escribir por Telegram o Instagram?',
                    answer:
                      'Conversamos contigo sobre tu nivel y objetivos. Si encajas con la academia, te enviamos el invite de Discord manualmente, normalmente en el mismo día.',
                  },
                  {
                    question: '¿Hay seguimiento real o es un grupo donde nadie responde?',
                    answer:
                      'Seguimiento real. Nuestro equipo conoce el nivel de cada alumno y revisa su progreso, no es un canal de mensajes sin moderación.',
                  },
                  {
                    question: '¿Los profesores juegan o solo enseñan teoría?',
                    answer:
                      'Juegan. Perep y el resto del equipo docente compiten en NL50-NL100 activamente, no son coaches que dejaron de jugar hace años.',
                  },
                  {
                    question: '¿Puedo unirme si ya formo parte de otra escuela de póker?',
                    answer:
                      'Sí, no hay exclusividad. Lo que sí pedimos es compromiso real con el estudio dentro de nuestra comunidad mientras participes.',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      <section className="newsletter">
        <div className="container">
          <div className="pvp">
            <div className="spl">
              <div className="nl-wrap">
                <div className="nl-text sr">
                  <div className="sect-label" style={{ color: 'rgba(255,255,255,.3)' }}>
                    Newsletter
                  </div>
                  <h2 style={{ color: '#fff' }}>Estrategia de póker, cada semana</h2>
                  <p className="p2" style={{ color: 'rgba(255,255,255,.55)' }}>
                    Análisis de manos, artículos de estrategia y novedades de la academia. Sin spam.
                  </p>
                </div>
                <div className="nl-form sr">
                  <div className="nl-pill">
                    <input type="email" placeholder="Tu email" className="nl-input" />
                    <button className="nl-btn">Suscribirme</button>
                  </div>
                  <p className="nl-fine">Sin spam. Cancela cuando quieras.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="cta-final">
        <div className="container">
          <div className="pvp">
            <div className="cta-card">
              <div className="cta-deco d1" />
              <div className="cta-deco d2" />
              <div className="sect-label">Únete hoy</div>
              <h2>¿Listo para dejar de jugar solo?</h2>
              <p className="p1" style={{ color: 'var(--text-03)', maxWidth: '40ch' }}>
                La comunidad ya está jugando, estudiando y subiendo límites. Escríbenos y empieza
                hoy.
              </p>
              <div className="cta-btns">
                <BtnRed href="/contacto">Quiero unirme</BtnRed>
                <Link href="/clases" className="btn-ghost">
                  Ver clases gratis <Arr13 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Comunidad cards */
        .comunidad-card { background: #fff; border: 1px solid #e7e6e6; border-radius: var(--r-l); padding: 28px; display: flex; flex-direction: column; gap: 12px; transition: box-shadow .2s, transform .2s; }
        .comunidad-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.08); transform: translateY(-2px); }
        .comunidad-canal { padding: 24px; text-decoration: none; }

        @media (max-width: 768px) {
          .comunidad-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
