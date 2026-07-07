import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { FAQAccordion } from '../_components/FAQAccordion'
import { NewsletterPill } from '../_components/NewsletterPill'

export const metadata: Metadata = {
  title: 'Comunidad | Ninja Poker Academy',
  description:
    'La experiencia real de Ninja Poker Academy: clases en vivo, revisión de manos, análisis HUD, bancaje disponible y una comunidad cercana de jugadores de cash game.',
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
                Una comunidad cercana donde se habla de póker y de todo. Clases en vivo durante la
                semana, revisión de manos, análisis HUD y bancaje disponible. Todo lo que necesitas
                para romper tus límites en cash game.
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
                { num: '🎬', label: 'Clases grabadas' },
                { num: '📚', label: 'Clase en vivo' },
                { num: '💼', label: 'Bancaje disponible' },
                { num: '🎁', label: 'Pack de bienvenida gratis' },
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
                Alumnos reales,
                <br />
                resultados reales.
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
                Alumnos que empezaron en microlímites y hoy son regulares de NL50 y NL100. Nuestros
                intereses están alineados con los tuyos.
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
                  No compartimos la invitación del Discord públicamente. El proceso es simple y
                  personal — así garantizamos una comunidad activa y de confianza.
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
                      desc: 'Te enviamos la invitación al Discord. A partir de ahí eres parte de la comunidad.',
                    },
                    {
                      num: '04',
                      title: 'Empiezas a mejorar',
                      desc: 'Clases en vivo durante la semana, revisión de manos, análisis HUD. Todo desde el primer día.',
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
                      La invitación solo se comparte tras conversar con el equipo.
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
                    question: '¿Cómo es la comunidad de Ninja Poker Academy?',
                    answer:
                      'Una comunidad cercana y activa donde se habla de póker y de todo. No es un grupo masivo en silencio: hay debate constante sobre manos, dudas resueltas al momento y compañeros que juegan tus mismos límites en cash game.',
                  },
                  {
                    question: '¿Quiénes son los instructores de la academia?',
                    answer:
                      'Perep es jugador profesional de midstakes con más de una década de experiencia. Vive del póker. Yani es jugador profesional de NL50 y también vive de esto. No son teóricos: juegan, ganan y enseñan desde la experiencia real en las mesas de cash game.',
                  },
                  {
                    question: '¿Qué incluye la formación dentro de la academia?',
                    answer:
                      'Clases en vivo casi diarias, coaching grupal cercano con análisis de spots reales, sesiones en vivo, mental game, juego contra recreacionales, revisión de manos, análisis de estadísticas y HUD, seguimiento personalizado y acceso a la videoteca completa con todas las sesiones grabadas.',
                  },
                  {
                    question: '¿Ofrecen bancaje para jugar?',
                    answer:
                      'Sí. La academia ofrece bancaje a alumnos que cumplan los requisitos. Te permite desarrollar tu carrera en el póker sin arriesgar tu propio dinero. Es una opción disponible, no obligatoria, y tiene condiciones que se explican al entrar.',
                  },
                  {
                    question: '¿Por qué no comparten la invitación de Discord públicamente?',
                    answer:
                      'Para mantener la calidad de la comunidad. Preferimos conocer a cada persona antes de darle acceso. Así garantizamos un grupo activo, de confianza y enfocado en mejorar en cash game.',
                  },
                  {
                    question: '¿Puedo unirme si estoy estancado en microlímites?',
                    answer:
                      'Precisamente para eso existe Ninja Poker Academy. Alumnos que empezaron en microlímites hoy son regulares de NL50 y NL100. El seguimiento personalizado, la revisión de manos y el coaching grupal están diseñados para ayudarte a romper tu techo actual.',
                  },
                  {
                    question: '¿Cómo me uno a la comunidad?',
                    answer:
                      'Escríbenos por Telegram, Instagram o el formulario de contacto. Cuéntanos tu historia en el póker, desde qué país juegas y qué buscas mejorar. Conversamos contigo y te enviamos la invitación de Discord.',
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
                  <NewsletterPill />
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
