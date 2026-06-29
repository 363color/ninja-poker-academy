import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { FAQAccordion } from './_components/FAQAccordion'
import { ArticleCard } from './_components/ArticleCard'
import type { ArticleCardData } from './_components/ArticleCard'
import { ClassCard } from './_components/ClassCard'
import type { ClassCardData } from './_components/ClassCard'

export const metadata: Metadata = {
  title: 'Academia de Poker Online en Español | Ninja Poker Academy',
  description:
    'Ninja Poker Academy: academia de póker online en español. Clases diarias, revisión de manos y comunidad activa para jugadores de todos los niveles.',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function Arr11() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
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
        <div className="btn-icon arr">
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

function BtnDark({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn">
      <span className="btn-text">{children}</span>
      <div className="btn-fill" />
      <div className="btn-circle">
        <div className="btn-icon arr">
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

// ── Video helpers ─────────────────────────────────────────────────────────────

async function fetchLatestVideos(): Promise<ClassCardData[]> {
  try {
    const h = await headers()
    const host = h.get('host') || 'localhost:3000'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const base = `${protocol}://${host}`
    const res = await fetch(
      `${base}/api/videos?limit=3&sort=-createdAt&where[status][equals]=published`,
      { cache: 'no-store' },
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

// ── Article helpers ───────────────────────────────────────────────────────────

async function fetchLatestArticles(): Promise<ArticleCardData[]> {
  try {
    const h = await headers()
    const host = h.get('host') || 'localhost:3000'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const base = `${protocol}://${host}`
    const res = await fetch(
      `${base}/api/posts?limit=3&sort=-createdAt&where[_status][equals]=published&depth=1`,
      { cache: 'no-store' },
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: '¿Qué incluye la membresía de Ninja Poker Academy?',
    answer:
      'Clases en vivo de lunes a viernes, acceso a la videoteca completa, revisión de tus manos, análisis de tu HUD, seguimiento personalizado de nuestro equipo y acceso al Discord. Todo incluido sin coste adicional.',
  },
  {
    question: '¿Necesito experiencia previa para unirme?',
    answer:
      'No. Formamos jugadores desde cero y también ayudamos a mejorar a cualquier persona con experiencia. Lo importante es estar dispuesto a estudiar y recibir feedback honesto sobre tu juego.',
  },
  {
    question: '¿Cuándo son las clases en vivo?',
    answer:
      'Las clases son de lunes a viernes. El horario exacto se comunica dentro de la academia. Todas quedan grabadas si no puedes asistir en directo.',
  },
  {
    question: '¿La academia es solo de cash game?',
    answer:
      "Sí. Ninja Poker Academy es 100% cash game (NL Hold'em). No cubrimos torneos, MTTs, Spins ni PLO.",
  },
  {
    question: '¿Qué es el bancaje y cómo funciona?',
    answer:
      'El bancaje es capital que la academia pone a disposición de los alumnos que lo necesiten. Es completamente opcional y no afecta al acceso al resto del contenido.',
  },
  {
    question: '¿Cómo me uno a la academia?',
    answer:
      'Escríbenos por Telegram, Instagram o el formulario de contacto. Nuestro equipo te responderá para hablar sobre tu nivel y objetivos. Si encajas, te damos acceso inmediato.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const videos = await fetchLatestVideos()
  const articles = await fetchLatestArticles()

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="container">
          <div className="pvp">
            <div className="hero-content">
              <div className="hero-top">
                <div className="hero-pill sr">
                  <div className="hero-avatars">
                    <div className="hero-av">🥷</div>
                    <div className="hero-av">🃏</div>
                    <div className="hero-av">♠</div>
                  </div>
                  <span>
                    <strong>Ninja Poker Academy</strong> · Escuela de Póker Online
                  </span>
                </div>
                <div className="hero-h1 sr">
                  <h1>
                    Academia de póker online para <em>jugadores ganadores</em>
                  </h1>
                </div>
                <div className="hero-sub sr">
                  <p className="p1">
                    Aprende cash game con clases en vivo, revisión de manos y el seguimiento real
                    que necesitas para mejorar tu winrate.
                  </p>
                </div>
                <div className="hero-ctas sr">
                  <BtnRed href="/contacto">Quiero unirme</BtnRed>
                  <Link href="/clases" className="btn-ghost">
                    Ver clases gratis <Arr13 />
                  </Link>
                </div>
                <div className="hero-bubbles" aria-hidden="true">
                  <div className="bubble _1">
                    <div className="bubble-icon">📅</div>
                    <span className="bubble-label">Clases diarias</span>
                  </div>
                  <div className="bubble _2">
                    <div className="bubble-icon">🎯</div>
                    <span className="bubble-label">Cash game</span>
                  </div>
                  <div className="bubble _3">
                    <div className="bubble-icon">📊</div>
                    <span className="bubble-label">Análisis HUD</span>
                  </div>
                  <div className="bubble _4">
                    <div className="bubble-icon">🃏</div>
                    <span className="bubble-label">Revisión de manos</span>
                  </div>
                </div>
              </div>

              {/* Hero cards */}
              <div className="hero-cards-section" id="hcs">
                <div className="hero-cards-clip" id="hclip">
                  <div className="hero-cards-grid">
                    <Link href="/clases" className="hero-card" id="hcl">
                      <div className="hero-card-img">
                        <div style={{ fontSize: '5rem' }}>📚</div>
                      </div>
                      <div className="hero-card-overlay" />
                      <div className="hero-card-body">
                        <div className="hero-card-tag">▶ Videoteca</div>
                        <h4>+200 clases grabadas</h4>
                        <p>Preflop · Postflop · Estadísticas · Mental game</p>
                      </div>
                    </Link>
                    <div className="hero-video-card" id="hvc">
                      <div className="hero-vid-play">
                        <svg
                          viewBox="0 0 24 24"
                          style={{ fill: '#CC1A1A', width: 20, height: 20, marginLeft: 3 }}
                        >
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>
                    <Link href="/estrategia" className="hero-card" id="hcr">
                      <div
                        className="hero-card-img"
                        style={{ background: 'linear-gradient(135deg,#1a0a0a,#2d1010)' }}
                      >
                        <div style={{ fontSize: '5rem' }}>🧠</div>
                      </div>
                      <div className="hero-card-overlay" />
                      <div className="hero-card-body">
                        <div className="hero-card-tag">✍️ Estrategia</div>
                        <h4>Artículos de cash game</h4>
                        <p>Análisis · Bankroll · Mental game</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ÚLTIMAS CLASES ══ */}
      <section className="featured">
        <div className="container">
          <div className="pvp">
            <div className="spl">
              <div className="feat-top sr">
                <div>
                  <div className="sect-label">Videoteca</div>
                  <h2>
                    Últimas clases gratis
                    <br />
                    de póker
                  </h2>
                  <div className="pills">
                    <Link href="/clases" className="pill on">
                      Todos
                    </Link>
                    <Link href="/clases?tema=cash" className="pill">
                      Preflop
                    </Link>
                    <Link href="/clases?tema=postflop" className="pill">
                      Postflop
                    </Link>
                    <Link href="/clases?tema=analisis-manos" className="pill">
                      Análisis de manos
                    </Link>
                    <Link href="/clases?tema=estadisticas" className="pill">
                      Estadísticas
                    </Link>
                    <Link href="/clases?tema=mental-game" className="pill">
                      Mental game
                    </Link>
                  </div>
                </div>
                <Link
                  href="/clases"
                  className="btn-ghost"
                  style={{ flexShrink: 0, marginTop: 'auto' }}
                >
                  Ver todas <Arr13 />
                </Link>
              </div>

              <div className="courses-grid">
                {videos.map((video) => (
                  <ClassCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOS 7 PILARES ══ */}
      <section className="why">
        <div className="container">
          <div className="pvp">
            <div className="spl">
              <div className="why-wrap">
                <div className="why-top sr">
                  <div className="sect-label">Por qué elegirnos</div>
                  <h2>Lo que incluye la academia</h2>
                  <p className="p1" style={{ color: 'var(--text-03)', maxWidth: 480 }}>
                    Todo lo que necesitas para mejorar tu juego, en un solo lugar, sin costes
                    adicionales.
                  </p>
                </div>

                <div className="why-cards-block">
                  {/* Left */}
                  <div className="why-col">
                    {[
                      {
                        icon: '📅',
                        title: 'Clases diarias',
                        desc: 'Sesiones en vivo de lunes a viernes. Todas quedan grabadas en la videoteca para verlas cuando quieras.',
                        d: 'sr-d1',
                      },
                      {
                        icon: '🃏',
                        title: 'Revisión de manos',
                        desc: 'Analizamos tus manos reales para identificar errores concretos y mejorar tus decisiones en la mesa.',
                        d: 'sr-d2',
                      },
                      {
                        icon: '📊',
                        title: 'Análisis de estadísticas',
                        desc: 'Subimos tu HUD y analizamos tus bases de datos para detectar leaks y áreas de mejora inmediata.',
                        d: 'sr-d3',
                      },
                    ].map((w) => (
                      <div key={w.title} className={`why-card sr ${w.d}`}>
                        <div className="why-card-icon-block">{w.icon}</div>
                        <div className="why-card-body">
                          <h4>{w.title}</h4>
                          <p>{w.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Center */}
                  <div className="why-center-col sr">
                    <div className="why-center-img">
                      <div className="why-center-emoji">🥷</div>
                      <div className="why-center-label">Ninja Poker Academy</div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="why-col">
                    {[
                      {
                        icon: '🎯',
                        title: 'Seguimiento personalizado',
                        desc: 'Tutorías y seguimiento de nuestro equipo. Un trato tan cercano como el coaching individual.',
                        d: 'sr-d1',
                      },
                      {
                        icon: '🧠',
                        title: 'Leaks · Decisiones · Mental game',
                        desc: 'Trabajamos tus puntos débiles: leaks técnicos, toma de decisiones bajo presión y mentalidad ganadora.',
                        d: 'sr-d2',
                      },
                      {
                        icon: '💰',
                        title: 'Bancaje y condiciones',
                        desc: 'Acceso a bancaje para los alumnos que lo necesiten. Opcional, sin comprometer el aprendizaje.',
                        d: 'sr-d3',
                      },
                    ].map((w) => (
                      <div key={w.title} className={`why-card sr ${w.d}`}>
                        <div className="why-card-icon-block">{w.icon}</div>
                        <div className="why-card-body">
                          <h4>{w.title}</h4>
                          <p>{w.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pilar 7 CTA */}
                <div className="why-cta-band sr">
                  <div className="why-cta-inner">
                    <div style={{ fontSize: '2.5rem' }}>🤝</div>
                    <h3>Trato cercano y familiar</h3>
                    <p>
                      No somos una academia masiva. Cada alumno importa. Nuestro equipo conoce tu
                      juego, tus objetivos y tu progreso.
                    </p>
                    <BtnRed href="/comunidad">Conoce la comunidad</BtnRed>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ARTÍCULOS ══ */}
      <section className="articles">
        <div className="container">
          <div className="pvp">
            <div className="spl">
              <div className="feat-top sr">
                <div>
                  <div className="sect-label">Estrategia</div>
                  <h2>Últimos artículos</h2>
                </div>
                <Link
                  href="/estrategia"
                  className="btn-ghost"
                  style={{ flexShrink: 0, marginTop: 'auto' }}
                >
                  Leer todos <Arr13 />
                </Link>
              </div>

              <div className="art-grid">
                {articles.map((article, i) => {
                  const delay = i === 0 ? 'sr-d1' : i === 1 ? 'sr-d2' : 'sr-d3'
                  return (
                    <div key={article.id} className={`sr ${delay}`}>
                      <ArticleCard post={article} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ══ */}
      <section className="process">
        <div className="process-img-block">
          <div className="process-section-img" />
          <div className="process-overlay" />
          <div className="process-circles" aria-hidden="true">
            <div className="process-circles-inner">
              <div className="pc-ring _3" />
              <div className="pc-ring _2" />
              <div className="pc-ring _1" />
              <div className="pc-center">🥷</div>
            </div>
          </div>
          <div className="process-top sr">
            <div className="sect-label" style={{ color: 'rgba(255,255,255,.4)' }}>
              El proceso
            </div>
            <h2>¿Cómo funciona?</h2>
            <p className="p2" style={{ color: 'rgba(255,255,255,.55)' }}>
              Empieza en minutos. Sin burocracia.
            </p>
          </div>
        </div>
        <div className="process-cards">
          <div className="process-card">
            <div className="pc-emoji">✉️</div>
            <div>
              <div className="pc-num">Paso 01</div>
              <h4>Escríbenos</h4>
              <p>
                Contacta con nosotros por Telegram, Instagram o el formulario. Nuestro equipo lee
                todos los mensajes.
              </p>
            </div>
          </div>
          <div className="process-card right">
            <div className="pc-emoji">💬</div>
            <div>
              <div className="pc-num">Paso 02</div>
              <h4>Conversamos</h4>
              <p>
                Nuestro equipo habla contigo para entender tu nivel y tus objetivos, y asegurarse de
                que NPA es la academia adecuada para ti.
              </p>
            </div>
          </div>
          <div className="process-card">
            <div className="pc-emoji">🏠</div>
            <div>
              <div className="pc-num">Paso 03</div>
              <h4>Te damos acceso</h4>
              <p>
                Recibes acceso al Discord, la videoteca completa y empiezas a asistir a las clases
                en vivo desde el primer día.
              </p>
            </div>
          </div>
          <div className="process-card right">
            <div className="pc-emoji">🏆</div>
            <div>
              <div className="pc-num">Paso 04</div>
              <h4>Mejoras y ganas</h4>
              <p>
                Con seguimiento continuo, revisión de manos y clases diarias, tu winrate empieza a
                moverse. Así de simple.
              </p>
            </div>
          </div>
        </div>
        <div className="process-cta">
          <BtnRed href="/contacto">Empezar ahora</BtnRed>
        </div>
      </section>

      {/* ══ TEMAS ══ */}
      <section className="temas">
        <div className="container">
          <div className="pvp">
            <div className="spl">
              <div style={{ textAlign: 'left', marginBottom: 56 }} className="why-top sr">
                <div className="sect-label">Explora por tema</div>
                <h2>
                  Mejora tus habilidades
                  <br />
                  en cada área del juego
                </h2>
              </div>
              <div className="temas-grid">
                {[
                  {
                    icon: '🃏',
                    count: '32 clases',
                    title: 'Preflop',
                    desc: 'Rangos de apertura, 3-bet, 4-bet y construcción de rangos por posición en cash game.',
                    href: '/clases?tema=preflop',
                    cta: 'Ver clases',
                    d: 'sr-d1',
                  },
                  {
                    icon: '🎯',
                    count: '28 clases',
                    title: 'Postflop',
                    desc: 'Lectura del board, c-bets, extracción de valor y bluffs efectivos en flop, turn y river.',
                    href: '/clases?tema=postflop',
                    cta: 'Ver clases',
                    d: 'sr-d2',
                  },
                  {
                    icon: '🔍',
                    count: '24 clases',
                    title: 'Análisis de manos',
                    desc: 'Revisión de manos reales de los alumnos para identificar errores y mejorar decisiones.',
                    href: '/clases?tema=analisis-manos',
                    cta: 'Ver análisis',
                    d: 'sr-d3',
                  },
                  {
                    icon: '📊',
                    count: '18 clases',
                    title: 'Estadísticas y HUD',
                    desc: 'Uso de bases de datos y tracker para detectar leaks y optimizar tu juego con datos reales.',
                    href: '/clases?tema=estadisticas',
                    cta: 'Ver clases',
                    d: 'sr-d1',
                  },
                  {
                    icon: '🧠',
                    count: '15 clases',
                    title: 'Mental game',
                    desc: 'Control del tilt, foco en sesiones largas y mentalidad ganadora para jugar tu mejor póker.',
                    href: '/clases?tema=mental-game',
                    cta: 'Ver clases',
                    d: 'sr-d2',
                  },
                  {
                    icon: '💰',
                    count: '12 artículos',
                    title: 'Bankroll',
                    desc: 'Gestión del bankroll para subir de límites sin riesgo de ruina y con criterio profesional.',
                    href: '/estrategia?tema=bankroll',
                    cta: 'Ver artículos',
                    d: 'sr-d3',
                  },
                ].map((t) => (
                  <Link key={t.title} href={t.href} className={`tema-card sr ${t.d}`}>
                    <div className="tema-head">
                      <div className="tema-icon">{t.icon}</div>
                      <span className="tema-count">{t.count}</span>
                    </div>
                    <h5>{t.title}</h5>
                    <p className="tema-desc">{t.desc}</p>
                    <div className="tema-foot">
                      {t.cta}
                      <div className="tema-arr">
                        <Arr11 />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="faq">
        <div className="container">
          <div className="pvp">
            <div className="spl">
              <div className="faq-wrap">
                <div className="faq-left sr">
                  <div className="sect-label">FAQ</div>
                  <h2>Preguntas frecuentes</h2>
                  <p className="p2" style={{ color: 'var(--text-03)', marginBottom: 32 }}>
                    ¿Tienes dudas? Aquí respondemos las más habituales.
                  </p>
                  <Link href="/contacto" className="btn-ghost">
                    Contactar <Arr13 />
                  </Link>
                </div>
                <FAQAccordion items={FAQ_ITEMS} />
              </div>
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
                  <h2 style={{ color: '#fff' }}>
                    Estrategia de póker,
                    <br />
                    cada semana
                  </h2>
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
            <div className="cta-card sr">
              <div className="cta-deco d1" />
              <div className="cta-deco d2" />
              <div className="sect-label">Únete hoy</div>
              <h2>
                ¿Listo para mejorar
                <br />
                tu juego en serio?
              </h2>
              <p className="p1" style={{ color: 'var(--text-03)', maxWidth: '40ch' }}>
                Cuéntanos dónde estás. Nuestro equipo te ayuda a llegar donde quieres estar en el
                póker.
              </p>
              <div className="cta-btns">
                <BtnRed href="/contacto">Quiero unirme</BtnRed>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
