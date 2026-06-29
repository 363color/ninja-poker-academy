import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { ClassCard } from '../_components/ClassCard'

export const metadata: Metadata = {
  title: 'Clases de Póker Online Gratis | Ninja Poker Academy',
  description:
    'Videoteca de clases de cash game en español: preflop, postflop, análisis de manos, estadísticas y mental game. Filtra por nivel y tema.',
}

interface Video {
  id: string
  title: string
  slug: string
  youtubeId?: string
  descripcionCorta?: string
  nivel?: string
  modalidad?: string
}
interface PayloadResponse {
  docs: Video[]
  totalDocs: number
  totalPages: number
  page: number
}

const NIVELES = [
  { label: 'Todos', value: '' },
  { label: 'Básico', value: 'basico' },
  { label: 'Intermedio', value: 'intermedio' },
  { label: 'Avanzado', value: 'avanzado' },
]
const TEMAS = [
  { label: 'Todos', value: '' },
  { label: 'Preflop', value: 'cash' },
  { label: 'Postflop', value: 'postflop' },
  { label: 'Análisis de manos', value: 'analisis-manos' },
  { label: 'Estadísticas', value: 'estadisticas' },
  { label: 'Mental game', value: 'mental-game' },
]
const PER_PAGE = 12

const FAQ_ITEMS = [
  {
    q: '¿Las clases son realmente gratis?',
    a: 'Sí. Todas las clases de la videoteca son gratuitas. Ninja Poker Academy es una escuela de póker online sin coste para el alumno. Nuestro modelo se basa en afiliación con salas de póker, no en el cobro de cuotas.',
  },
  {
    q: '¿Qué nivel necesito para empezar?',
    a: 'Ninguno en particular. Formamos jugadores desde cero y también ayudamos a mejorar a jugadores con experiencia. Usa el filtro "Básico" para empezar desde el principio.',
  },
  {
    q: '¿Estas clases son solo de cash game?',
    a: "Sí. Ninja Poker Academy se especializa exclusivamente en cash game de Texas Hold'em. No cubrimos torneos, MTTs, Spins ni PLO.",
  },
  {
    q: '¿Quién imparte las clases?',
    a: 'Las clases las imparte Perep, instructor principal de Ninja Poker Academy, con experiencia en NL50 y NL100 y un historial demostrado de resultados en cash game.',
  },
  {
    q: '¿Puedo acceder a más material si me uno a la academia?',
    a: 'Sí. Los alumnos de la academia tienen acceso a clases en vivo diarias, revisión de manos, análisis de HUD y seguimiento personalizado, además de la videoteca pública.',
  },
  {
    q: '¿Cómo me uno a la academia?',
    a: 'Escríbenos por Telegram, Instagram o el formulario de contacto. Nuestro equipo te responderá para conocer tu nivel y objetivos.',
  },
]

async function fetchVideos({
  nivel,
  tema,
  pagina,
  busqueda,
}: {
  nivel: string
  tema: string
  pagina: number
  busqueda: string
}): Promise<PayloadResponse> {
  const h = await headers()
  const host = h.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const params = new URLSearchParams()
  params.set('limit', String(PER_PAGE))
  params.set('page', String(pagina))
  params.set('sort', '-createdAt')
  params.set('where[status][equals]', 'published')
  if (nivel) params.set('where[nivel][equals]', nivel)
  if (tema) params.set('where[modalidad][equals]', tema)
  if (busqueda) params.set('where[title][like]', busqueda)
  try {
    const res = await fetch(`${protocol}://${host}/api/videos?${params.toString()}`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch {
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
  }
}

function buildUrl(p: { nivel?: string; tema?: string; pagina?: number; busqueda?: string }) {
  const sp = new URLSearchParams()
  if (p.nivel) sp.set('nivel', p.nivel)
  if (p.tema) sp.set('tema', p.tema)
  if (p.busqueda) sp.set('q', p.busqueda)
  if (p.pagina && p.pagina > 1) sp.set('pagina', String(p.pagina))
  const qs = sp.toString()
  return `/clases${qs ? `?${qs}` : ''}`
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

function Pagination({
  page,
  totalPages,
  nivel,
  tema,
  busqueda,
}: {
  page: number
  totalPages: number
  nivel: string
  tema: string
  busqueda: string
}) {
  if (totalPages <= 1) return null
  return (
    <nav
      aria-label="Paginación"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 48,
        flexWrap: 'wrap',
      }}
    >
      {page > 1 && (
        <Link href={buildUrl({ nivel, tema, busqueda, pagina: page - 1 })} className="btn-ghost">
          ← Anterior
        </Link>
      )}
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={buildUrl({ nivel, tema, busqueda, pagina: p })}
            aria-current={p === page ? 'page' : undefined}
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              background: p === page ? '#0D0D0D' : 'transparent',
              color: p === page ? '#fff' : '#575757',
              transition: 'background .2s, color .2s',
            }}
          >
            {p}
          </Link>
        ))}
      </div>
      {page < totalPages && (
        <Link href={buildUrl({ nivel, tema, busqueda, pagina: page + 1 })} className="btn-ghost">
          Siguiente →
        </Link>
      )}
    </nav>
  )
}

interface PageProps {
  searchParams: Promise<{ nivel?: string; tema?: string; pagina?: string; q?: string }>
}

export default async function ClasesPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const nivel = sp.nivel || ''
  const tema = sp.tema || ''
  const busqueda = sp.q || ''
  const pagina = Math.max(1, parseInt(sp.pagina || '1', 10))
  const data = await fetchVideos({ nivel, tema, pagina, busqueda })
  const { docs: videos, totalDocs, totalPages, page } = data

  return (
    <main className="bg-background min-h-screen">
      {/* ══ HERO ══ */}
      <section className="hero" style={{ paddingTop: 100 }}>
        <div className="container">
          <div className="pvp">
            <div
              style={{
                paddingTop: 56,
                paddingBottom: 56,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <div className="hero-pill sr">
                <div className="hero-avatars">
                  <div className="hero-av">🥷</div>
                  <div className="hero-av">🃏</div>
                  <div className="hero-av">♠</div>
                </div>
                <span>
                  <strong>Videoteca</strong> · Clases de Póker Online
                </span>
              </div>
              <div className="hero-h1 sr" style={{ textAlign: 'center' }}>
                <h1>
                  {nivel ? (
                    <>
                      Clases <em>nivel {nivelLabel(nivel)}</em>
                    </>
                  ) : tema ? (
                    <>
                      Clases de <em>{TEMAS.find((t) => t.value === tema)?.label}</em>
                    </>
                  ) : busqueda ? (
                    <>
                      Resultados: <em>{busqueda}</em>
                    </>
                  ) : (
                    <>
                      Clases de <em>cash game</em> gratis
                    </>
                  )}
                </h1>
              </div>
              <div className="hero-sub sr" style={{ textAlign: 'center' }}>
                <p className="p1">
                  Aprende cash game con clases grabadas por Perep. Filtra por nivel o tema y empieza
                  a mejorar tu winrate hoy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FILTROS + GRID ══ */}
      <section className="why">
        <div className="container">
          <div className="pvp spl">
            {/* Caja de filtros */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #e7e6e6',
                borderRadius: 'var(--r-l)',
                padding: '20px 24px',
                marginBottom: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {/* Buscador — con botón submit */}
              <form
                method="GET"
                action="/clases"
                style={{ display: 'flex', gap: 0, maxWidth: 480 }}
              >
                {nivel && <input type="hidden" name="nivel" value={nivel} />}
                {tema && <input type="hidden" name="tema" value={tema} />}
                <input
                  type="search"
                  name="q"
                  defaultValue={busqueda}
                  placeholder="Buscar clase..."
                  style={{
                    flex: 1,
                    height: 40,
                    padding: '0 16px',
                    borderRadius: 'var(--r-pill) 0 0 var(--r-pill)',
                    border: '1px solid #e7e6e6',
                    borderRight: 0,
                    fontSize: 13,
                    fontFamily: 'inherit',
                    outline: 'none',
                    background: '#f4f4f4',
                    color: '#1d1d1d',
                  }}
                />
                <button
                  type="submit"
                  className="nl-btn"
                  style={{ borderRadius: '0 var(--r-pill) var(--r-pill) 0', height: 40 }}
                >
                  Buscar
                </button>
              </form>

              {/* Separador */}
              <div style={{ height: 1, background: '#f4f4f4' }} />

              {/* Nivel — pills como links */}
              <div>
                <span className="sect-label" style={{ marginBottom: 8, fontSize: 11 }}>
                  Nivel
                </span>
                <div className="pills" style={{ marginTop: 8, flexWrap: 'wrap' }}>
                  {NIVELES.map((opt) => (
                    <Link
                      key={opt.value}
                      href={buildUrl({ nivel: opt.value, tema, busqueda, pagina: 1 })}
                      className={`pill${opt.value === nivel ? ' on' : ''}`}
                      style={{ fontSize: 12, padding: '6px 14px' }}
                      aria-current={opt.value === nivel ? 'page' : undefined}
                    >
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tema — pills como links */}
              <div>
                <span className="sect-label" style={{ marginBottom: 8, fontSize: 11 }}>
                  Tema
                </span>
                <div className="pills" style={{ marginTop: 8, flexWrap: 'wrap' }}>
                  {TEMAS.map((opt) => (
                    <Link
                      key={opt.value}
                      href={buildUrl({ nivel, tema: opt.value, busqueda, pagina: 1 })}
                      className={`pill${opt.value === tema ? ' on' : ''}`}
                      style={{ fontSize: 12, padding: '6px 14px' }}
                      aria-current={opt.value === tema ? 'page' : undefined}
                    >
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Limpiar filtros */}
              {(nivel || tema || busqueda) && (
                <Link
                  href="/clases"
                  style={{
                    fontSize: 12,
                    color: '#b8b7b7',
                    textDecoration: 'underline',
                    alignSelf: 'flex-start',
                  }}
                >
                  Limpiar filtros
                </Link>
              )}
            </div>

            {/* Contador */}
            {totalDocs > 0 && (
              <p style={{ fontSize: 13, color: '#b8b7b7', margin: '0 0 24px', fontWeight: 500 }}>
                {totalDocs} clase{totalDocs !== 1 ? 's' : ''} disponible{totalDocs !== 1 ? 's' : ''}
                {nivel || tema || busqueda ? ' · filtrado' : ''}
              </p>
            )}

            {/* Grid */}
            {videos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#1d1d1d', margin: '0 0 8px' }}>
                  Sin resultados
                </p>
                <p style={{ fontSize: 14, color: '#575757', margin: '0 0 24px' }}>
                  {busqueda
                    ? `No encontramos clases para "${busqueda}".`
                    : 'Prueba con otro nivel o tema.'}
                </p>
                <Link href="/clases" className="btn red">
                  <span className="btn-text">Ver todas las clases</span>
                  <span className="btn-fill" />
                  <span className="btn-circle">
                    <span className="btn-icon">
                      <Arr13 />
                    </span>
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="courses-grid">
                  {videos.map((video) => (
                    <ClassCard key={video.id} video={video} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  nivel={nivel}
                  tema={tema}
                  busqueda={busqueda}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="faq">
        <div className="container">
          <div className="pvp">
            <div className="spl">
              <div className="faq-wrap">
                <div className="faq-left">
                  <div className="sect-label">FAQ</div>
                  <h2>Preguntas frecuentes sobre las clases</h2>
                  <p
                    style={{
                      color: 'var(--text-03)',
                      marginBottom: 32,
                      fontSize: 15,
                      lineHeight: 1.65,
                    }}
                  >
                    Todo lo que necesitas saber antes de empezar a estudiar póker con nosotros.
                  </p>
                  <Link href="/contacto" className="btn-ghost">
                    Contactar <Arr13 />
                  </Link>
                </div>
                <div className="faq-list">
                  {FAQ_ITEMS.map((item, i) => (
                    <details key={i} className="faq-item">
                      <summary className="faq-q" style={{ listStyle: 'none' }}>
                        {item.q}
                        <span className="faq-icon">+</span>
                      </summary>
                      <div className="faq-a" style={{ display: 'block' }}>
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
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
                <Link href="/contacto" className="btn red">
                  <span className="btn-text">Quiero unirme</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
