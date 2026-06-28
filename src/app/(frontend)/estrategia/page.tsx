import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Estrategia de Póker Online | Ninja Poker Academy',
  description:
    'Artículos de estrategia de cash game: preflop, postflop, análisis de manos, mental game, estadísticas y bankroll. Aprende póker online gratis.',
}

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface Category {
  id: string
  title: string
  slug: string
}

interface Post {
  id: string
  title: string
  slug: string
  publishedAt?: string
  heroImage?: { url?: string; alt?: string }
  categories?: Category[]
  meta?: { description?: string }
  content?: unknown
}

interface PayloadResponse {
  docs: Post[]
  totalDocs: number
  totalPages: number
  page: number
}

// ── Constantes ────────────────────────────────────────────────────────────────

const CATEGORIAS = [
  { label: 'Todos', value: '' },
  { label: 'Preflop', value: 'preflop' },
  { label: 'Postflop', value: 'postflop' },
  { label: 'Análisis de manos', value: 'analisis-manos' },
  { label: 'Mental game', value: 'mental-game' },
  { label: 'Estadísticas', value: 'estadisticas' },
  { label: 'Bankroll', value: 'bankroll' },
]

const PER_PAGE = 12

// ── Fetch ─────────────────────────────────────────────────────────────────────

async function fetchPosts({
  categoria,
  pagina,
  busqueda,
}: {
  categoria: string
  pagina: number
  busqueda: string
}): Promise<PayloadResponse> {
  const h = await headers()
  const host = h.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const base = `${protocol}://${host}`

  const params = new URLSearchParams()
  params.set('limit', String(PER_PAGE))
  params.set('page', String(pagina))
  params.set('sort', '-publishedAt')
  params.set('where[_status][equals]', 'published')
  params.set('depth', '1')
  if (busqueda) params.set('where[title][like]', busqueda)
  if (categoria) params.set('where[categories.slug][equals]', categoria)

  try {
    const res = await fetch(`${base}/api/posts?${params.toString()}`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch {
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildUrl(p: { categoria?: string; pagina?: number; busqueda?: string }) {
  const sp = new URLSearchParams()
  if (p.categoria) sp.set('categoria', p.categoria)
  if (p.busqueda) sp.set('q', p.busqueda)
  if (p.pagina && p.pagina > 1) sp.set('pagina', String(p.pagina))
  const qs = sp.toString()
  return `/estrategia${qs ? `?${qs}` : ''}`
}

function estimateReadTime(content: unknown): number {
  if (!content) return 3
  const text = JSON.stringify(content)
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function formatDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
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
  categoria,
  busqueda,
}: {
  page: number
  totalPages: number
  categoria: string
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
        <Link href={buildUrl({ categoria, busqueda, pagina: page - 1 })} className="btn-ghost">
          ← Anterior
        </Link>
      )}
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={buildUrl({ categoria, busqueda, pagina: p })}
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
        <Link href={buildUrl({ categoria, busqueda, pagina: page + 1 })} className="btn-ghost">
          Siguiente →
        </Link>
      )}
    </nav>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string; q?: string }>
}

export default async function EstrategiaPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const categoria = sp.categoria || ''
  const busqueda = sp.q || ''
  const pagina = Math.max(1, parseInt(sp.pagina || '1', 10))

  const data = await fetchPosts({ categoria, pagina, busqueda })
  const { docs: posts, totalDocs, totalPages, page } = data

  const categoriaLabel = CATEGORIAS.find((c) => c.value === categoria)?.label || ''

  // Schema.org ItemList
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Artículos de estrategia de póker — Ninja Poker Academy',
    url: 'https://ninjapokeracademy.com/estrategia',
    numberOfItems: totalDocs,
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://ninjapokeracademy.com/estrategia/${post.slug}`,
      name: post.title,
    })),
  }

  return (
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />

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
                  <div className="hero-av">✍️</div>
                  <div className="hero-av">🃏</div>
                  <div className="hero-av">📊</div>
                </div>
                <span>
                  <strong>Estrategia</strong> · Artículos de Póker Online
                </span>
              </div>

              <div className="hero-h1 sr" style={{ textAlign: 'center' }}>
                <h1>
                  {categoria ? (
                    <>
                      Artículos de <em>{categoriaLabel}</em>
                    </>
                  ) : busqueda ? (
                    <>
                      Resultados: <em>{busqueda}</em>
                    </>
                  ) : (
                    <>
                      Estrategia de <em>cash game</em>
                    </>
                  )}
                </h1>
              </div>

              <div className="hero-sub sr" style={{ textAlign: 'center' }}>
                <p className="p1">
                  Análisis de manos, conceptos de estrategia, mental game y bankroll. Todo lo que
                  necesitas para mejorar tu winrate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FILTROS + ARTÍCULOS ══ */}
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
              {/* Buscador */}
              <form method="GET" action="/estrategia" style={{ display: 'flex', maxWidth: 480 }}>
                {categoria && <input type="hidden" name="categoria" value={categoria} />}
                <input
                  type="search"
                  name="q"
                  defaultValue={busqueda}
                  placeholder="Buscar artículo..."
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

              <div style={{ height: 1, background: '#f4f4f4' }} />

              {/* Categorías */}
              <div>
                <span className="sect-label" style={{ marginBottom: 8, fontSize: 11 }}>
                  Categoría
                </span>
                <div className="pills" style={{ marginTop: 8 }}>
                  {CATEGORIAS.map((opt) => (
                    <Link
                      key={opt.value}
                      href={buildUrl({ categoria: opt.value, busqueda, pagina: 1 })}
                      className={`pill${opt.value === categoria ? ' on' : ''}`}
                      style={{ fontSize: 12, padding: '6px 14px' }}
                      aria-current={opt.value === categoria ? 'page' : undefined}
                    >
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>

              {(categoria || busqueda) && (
                <Link
                  href="/estrategia"
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
                {totalDocs} artículo{totalDocs !== 1 ? 's' : ''} disponible
                {totalDocs !== 1 ? 's' : ''}
                {categoria || busqueda ? ' · filtrado' : ''}
              </p>
            )}

            {/* Grid de artículos */}
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#1d1d1d', margin: '0 0 8px' }}>
                  Sin resultados
                </p>
                <p style={{ fontSize: 14, color: '#575757', margin: '0 0 24px' }}>
                  {busqueda
                    ? `No encontramos artículos para "${busqueda}".`
                    : 'Prueba con otra categoría.'}
                </p>
                <Link href="/estrategia" className="btn red">
                  <span className="btn-text">Ver todos los artículos</span>
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
                <div className="art-grid">
                  {posts.map((post) => {
                    const cat = post.categories?.[0]
                    const readTime = estimateReadTime(post.content)
                    const imgUrl = post.heroImage?.url
                    return (
                      <Link
                        key={post.id}
                        href={`/estrategia/${post.slug}`}
                        className="art-card"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div
                          className="art-img"
                          style={{
                            background: imgUrl
                              ? `url(${imgUrl}) center/cover no-repeat`
                              : 'linear-gradient(135deg,#0d1a05,#1a3208)',
                            fontSize: imgUrl ? undefined : '3rem',
                          }}
                        >
                          {!imgUrl && '📝'}
                        </div>
                        <div className="art-body">
                          <div className="art-meta">
                            {cat && <span className="art-tag">{cat.title}</span>}
                            <span className="art-time">⏱ {readTime} min</span>
                            {post.publishedAt && (
                              <span className="art-time">{formatDate(post.publishedAt)}</span>
                            )}
                          </div>
                          <div className="art-title">{post.title}</div>
                          {post.meta?.description && (
                            <p className="art-sum">{post.meta.description}</p>
                          )}
                          <div className="art-cta">
                            Leer más <Arr11 />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  categoria={categoria}
                  busqueda={busqueda}
                />
              </>
            )}
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
              <h2>¿Quieres aprender en vivo?</h2>
              <p className="p1" style={{ color: 'var(--text-03)', maxWidth: '40ch' }}>
                Además de los artículos, en la academia tenemos clases diarias, revisión de manos y
                seguimiento personalizado. Todo gratis.
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
                <Link href="/clases" className="btn-ghost">
                  Ver clases gratis <Arr13 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
