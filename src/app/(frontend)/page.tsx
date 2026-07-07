import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { FAQAccordion } from './_components/FAQAccordion'
import { ArticleCard } from './_components/ArticleCard'
import type { ArticleCardData } from './_components/ArticleCard'
import { ClassCard } from './_components/ClassCard'
import type { ClassCardData } from './_components/ClassCard'
import { ProcessImageReveal } from './_components/ProcessImageReveal'
import { NewsletterPill } from './_components/NewsletterPill'

export const metadata: Metadata = {
  title: 'Academia de Poker Online en Español | Ninja Poker Academy',
  description:
    'Ninja Poker Academy: academia de póker online en español. Formación profesional en cash game, revisión de manos y comunidad activa para jugadores de todos los niveles.',
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
    question: '¿Qué incluye la formación en Ninja Poker Academy?',
    answer:
      'Clases en vivo casi diarias de cash game, videoteca completa con todas las sesiones grabadas, revisión personalizada de manos, análisis de estadísticas y HUD, tutorías de seguimiento y acceso a la comunidad privada en Discord. Todo enfocado a que mejores tu winrate y rompas tus límites actuales.',
  },
  {
    question: '¿Quiénes son los instructores?',
    answer:
      'Perep es jugador profesional de midstakes con más de una década de experiencia. Vive del póker. Yani es jugador profesional de NL50 y también vive de esto. No son teóricos: juegan, ganan y enseñan desde la experiencia real en las mesas.',
  },
  {
    question: '¿Necesito experiencia previa para unirme?',
    answer:
      'No. Formamos jugadores desde cero y también ayudamos a regulares con experiencia que quieren subir de límites. Lo importante es tener compromiso con el estudio y estar abierto a recibir feedback honesto sobre tu juego.',
  },
  {
    question: '¿Tengo que pagar para entrar a la academia?',
    answer:
      'El modelo de Ninja Poker Academy permite que desarrolles tu carrera en el póker sin arriesgar tu propio dinero. Los alumnos juegan en salas afiliadas y el rakeback generado cubre el coste de la formación. También ofrecemos bancaje para quienes cumplan los requisitos. En nuestro canal de YouTube y redes sociales tienes clases gratuitas y un pack de bienvenida gratis para empezar.',
  },
  {
    question: '¿Qué es el bancaje y cómo funciona?',
    answer:
      'El bancaje es capital que la academia pone a disposición de alumnos que cumplan los requisitos. Te permite jugar y desarrollarte como jugador profesional sin poner dinero de tu bolsillo. Es una opción disponible, no obligatoria, y tiene condiciones que se explican al entrar.',
  },
  {
    question: '¿Las clases de YouTube son todo el contenido?',
    answer:
      'No. Lo que ves en YouTube es solo una pequeña muestra de las clases que se dan en vivo dentro de la academia. El contenido privado incluye sesiones casi diarias, coaching grupal cercano, análisis de spots, sesiones en vivo, mental game, juego contra recreacionales y mucho más. Todas las clases quedan grabadas para los alumnos.',
  },
  {
    question: '¿La academia es solo de cash game?',
    answer:
      "Sí. Ninja Poker Academy se especializa exclusivamente en cash game (NL Hold'em). No cubrimos torneos, MTTs, Spins ni PLO. Esa especialización es lo que nos permite ir a fondo en cada concepto.",
  },
  {
    question: '¿Cómo me uno a la academia?',
    answer:
      'Escríbenos por Telegram, Instagram o el formulario de contacto. Cuéntanos tu historia en el póker, desde qué país juegas y qué buscas mejorar. Nuestro equipo te responderá para conocer tu nivel y objetivos.',
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
                <div className="hero-h1 sr">
                  <h1>
                    Academia de póker online para <em>jugadores ganadores</em>
                  </h1>
                </div>
                <div className="hero-sub sr">
                  <p className="p1">
                    Formación profesional en cash game con clases en vivo, revisión de manos y
                    seguimiento real para romper tus límites.{' '}
                    <em>Pack de bienvenida gratis al unirte.</em>
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
                    <span className="bubble-label">Clases semanales</span>
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
                      <div className="hero-card-img" style={{ padding: 0 }}>
                        <img
                          src="https://media.ninjapokeracademy.com/hero-videoteca-poker-online.jpg"
                          alt="Fichas de Ninja Poker Academy sobre mesa de póker verde"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                      <div className="hero-card-overlay" />
                      <div className="hero-card-body">
                        <div className="hero-card-tag">▶ Videoteca</div>
                        <h4>+200 clases grabadas</h4>
                        <p>Preflop · Postflop · Estadísticas · Mental game</p>
                      </div>
                    </Link>
                    <div
                      className="hero-video-card"
                      id="hvc"
                      style={{ padding: 0, overflow: 'hidden' }}
                    >
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      >
                        <source
                          src="https://media.ninjapokeracademy.com/hero-video-poker-fichas.webm"
                          type="video/webm"
                        />
                      </video>
                    </div>
                    <Link href="/estrategia" className="hero-card" id="hcr">
                      <div className="hero-card-img" style={{ padding: 0 }}>
                        <img
                          src="https://media.ninjapokeracademy.com/hero-estrategia-poker-estadisticas.jpg"
                          alt="Jugador de póker online con hoodie jugando cash game de noche con fichas y laptop"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
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
      <section className="featured">
        <div className="container">
          <div className="pvp spl">
            <div style={{ textAlign: 'center', marginBottom: 64 }} className="sr">
              <div className="sect-label">Lo que incluye</div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 700,
                  margin: '0 0 16px',
                  lineHeight: 1.2,
                }}
              >
                Todo lo que necesitas para mejorar tu juego
              </h2>
              <p style={{ fontSize: 16, color: '#575757', maxWidth: 480, margin: '0 auto' }}>
                Formación completa desde el primer día. Desarrolla tu carrera en el póker sin
                arriesgar tu propio dinero.
              </p>
            </div>
            <div className="pilares-grid">
              {[
                {
                  icon: '📅',
                  title: 'Clases varias veces por semana',
                  desc: 'Sesiones en directo donde puedes preguntar, participar y aprender en tiempo real. Y si no puedes conectarte, queda grabada. No son grabaciones de hace meses — es contenido fresco.',
                },
                {
                  icon: '🃏',
                  title: 'Revisión de manos',
                  desc: 'Mandas tus manos, las analizamos. No teoría genérica — feedback concreto sobre tus decisiones reales en la mesa. Así es como realmente se mejora.',
                },
                {
                  icon: '📊',
                  title: 'Análisis de estadísticas y HUD',
                  desc: 'Subimos tu base de datos, analizamos tu HUD y encontramos los leaks que te están costando dinero. Datos reales, mejoras reales.',
                },
                {
                  icon: '🎯',
                  title: 'Tutorías y seguimiento',
                  desc: 'No eres un número. Nuestro equipo conoce tu juego, tu nivel y tus objetivos. El seguimiento es personal y continuo.',
                },
                {
                  icon: '🧠',
                  title: 'Mental game y toma de decisiones',
                  desc: 'El tilt, la varianza, las rachas malas — trabajamos también la cabeza. Porque el mejor rango del mundo no sirve de nada si no puedes ejecutarlo bajo presión.',
                },
                {
                  icon: '💰',
                  title: 'Bancaje disponible',
                  desc: 'Capital para jugar sin arriesgar tu propio dinero. Disponible para alumnos que cumplan los requisitos. Opcional y con condiciones que se explican al entrar.',
                },
                {
                  icon: '🤝',
                  title: 'Trato cercano y familiar',
                  desc: 'No somos una academia masiva donde eres invisible. Aquí te conocen por tu nick, saben en qué límite juegas y se alegran cuando subes.',
                },
              ].map((p, i) => (
                <div key={i} className={`pilar-card pilar-${i} sr`}>
                  <div className="pilar-icon">{p.icon}</div>
                  <h3 className="pilar-title">{p.title}</h3>
                  <p className="pilar-desc">{p.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <BtnRed href="/comunidad">Conoce la comunidad</BtnRed>
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
          <ProcessImageReveal
            src="https://media.ninjapokeracademy.com/proceso-jugador-poker-online.jpg"
            alt="Jugador de póker online exitoso con laptop y fichas"
          />
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
                que Ninja Poker Academy es la academia adecuada para ti.
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
                Con seguimiento continuo, revisión de manos y clases durante la semana, tu winrate
                empieza a moverse. Así de simple.
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
            <div className="cta-card sr">
              <div className="cta-deco d1" />
              <div className="cta-deco d2" />
              <div className="sect-label">Únete hoy</div>
              <h2>¿Listo para mejorar tu juego en serio?</h2>
              <p className="p1" style={{ color: 'var(--text-03)', maxWidth: '40ch' }}>
                Cuéntanos dónde estás y qué buscas mejorar. Al unirte recibes un pack de bienvenida
                gratis para empezar con todo desde el primer día.
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
