import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { ShareButtons } from './ShareButtons'

interface Video {
  id: string
  title: string
  slug: string
  youtubeId?: string
  youtubeUrl?: string
  descripcionCorta?: string
  resumen?: string
  transcripcion?: unknown
  nivel?: string
  modalidad?: string
  publishedAt?: string
  articuloRelacionado?: { slug?: string; title?: string; descripcionCorta?: string }
}

async function getBase() {
  const h = await headers()
  const host = h.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

async function fetchVideoBySlug(slug: string): Promise<Video | null> {
  const base = await getBase()
  try {
    const res = await fetch(
      `${base}/api/videos?where[slug][equals]=${slug}&where[status][equals]=published&depth=1&limit=1`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.docs?.[0] ?? null
  } catch {
    return null
  }
}

async function fetchRelated(video: Video): Promise<Video[]> {
  const base = await getBase()
  try {
    const params = new URLSearchParams()
    params.set('limit', '3')
    params.set('where[status][equals]', 'published')
    params.set('where[slug][not_equals]', video.slug)
    if (video.modalidad) params.set('where[modalidad][equals]', video.modalidad)
    else if (video.nivel) params.set('where[nivel][equals]', video.nivel)
    params.set('sort', '-createdAt')
    const res = await fetch(`${base}/api/videos?${params.toString()}`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs ?? []
  } catch {
    return []
  }
}

function nivelLabel(n?: string) {
  return n === 'basico'
    ? 'Básico'
    : n === 'intermedio'
      ? 'Intermedio'
      : n === 'avanzado'
        ? 'Avanzado'
        : ''
}
function nivelClass(n?: string) {
  return n === 'intermedio' ? 'intermedio' : n === 'avanzado' ? 'avanzado' : 'basico'
}
function modalidadLabel(m?: string) {
  const map: Record<string, string> = {
    cash: 'Preflop',
    'analisis-manos': 'Análisis de manos',
    estadisticas: 'Estadísticas',
    'mental-game': 'Mental game',
    postflop: 'Postflop',
  }
  return map[m || ''] || ''
}
function modalidadClass(m?: string) {
  return m === 'analisis-manos' || m === 'estadisticas'
    ? 'analisis'
    : m === 'postflop'
      ? 'grabada'
      : 'teoria'
}
function formatDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const video = await fetchVideoBySlug(slug)
  if (!video) return { title: 'Clase no encontrada | Ninja Poker Academy' }
  const desc =
    video.descripcionCorta ||
    `Clase de cash game: ${video.title}. Aprende póker online gratis con Ninja Poker Academy.`
  return {
    title: `${video.title} | Ninja Poker Academy`,
    description: desc,
    openGraph: {
      title: `${video.title} | Ninja Poker Academy`,
      description: desc,
      images: video.youtubeId
        ? [
            {
              url: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
              width: 1280,
              height: 720,
              alt: video.title,
            },
          ]
        : [{ url: 'https://ninjapokeracademy.com/og-image.png', width: 1200, height: 630 }],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${video.title} | Ninja Poker Academy`,
      description: desc,
      images: video.youtubeId
        ? [`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`]
        : ['https://ninjapokeracademy.com/og-image.png'],
    },
  }
}

export default async function ClaseSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [video, related] = await Promise.all([
    fetchVideoBySlug(slug),
    fetchVideoBySlug(slug).then((v) => (v ? fetchRelated(v) : [])),
  ])
  if (!video) notFound()

  const shareUrl = `https://ninjapokeracademy.com/clases/${video.slug}`
  const shareText = `${video.title} — Clase gratis de cash game en Ninja Poker Academy`
  const youtubeChannelUrl = 'https://www.youtube.com/@ninjapokeracademy'

  return (
    <main className="bg-background min-h-screen" style={{ paddingTop: 80 }}>
      {/* ══ VIDEO ══ */}
      <section style={{ background: '#0D0D0D' }}>
        {video.youtubeId ? (
          <div style={{ maxWidth: 1280, margin: '0 auto', aspectRatio: '16/9' }}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        ) : (
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              aspectRatio: '16/9',
              background: '#141414',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,.3)', fontSize: 14 }}>Video no disponible</p>
          </div>
        )}
      </section>

      {/* ══ CONTENIDO ══ */}
      <section className="featured">
        <div className="container">
          <div className="pvp">
            <div
              style={{
                paddingTop: 48,
                paddingBottom: 48,
                display: 'grid',
                gridTemplateColumns: '1fr 320px',
                gap: 64,
                alignItems: 'start',
              }}
            >
              {/* ── Columna principal ── */}
              <div>
                {/* Breadcrumb */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: '#b8b7b7',
                    marginBottom: 20,
                  }}
                >
                  <Link href="/clases" style={{ color: '#b8b7b7', textDecoration: 'none' }}>
                    Videoteca
                  </Link>
                  <span>›</span>
                  <span style={{ color: '#575757' }}>
                    {video.nivel ? nivelLabel(video.nivel) : 'Clase'}
                  </span>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {video.nivel && (
                    <span className={`badge ${nivelClass(video.nivel)}`}>
                      {nivelLabel(video.nivel)}
                    </span>
                  )}
                  {video.modalidad && (
                    <span className={`badge ${modalidadClass(video.modalidad)}`}>
                      {modalidadLabel(video.modalidad)}
                    </span>
                  )}
                </div>

                {/* Título */}
                <h1
                  style={{
                    fontSize: 'clamp(24px, 4vw, 40px)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    margin: '0 0 16px',
                    color: '#1d1d1d',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {video.title}
                </h1>

                {/* Meta */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    fontSize: 13,
                    color: '#b8b7b7',
                    marginBottom: 24,
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'rgba(204,26,26,.12)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#CC1A1A',
                      }}
                    >
                      P
                    </span>
                    Perep
                  </span>
                  {video.publishedAt && <span>{formatDate(video.publishedAt)}</span>}
                  {video.youtubeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#CC1A1A',
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      Ver en YouTube ↗
                    </a>
                  )}
                </div>

                {/* Compartir + YouTube — Client Component */}
                <ShareButtons
                  shareUrl={shareUrl}
                  shareText={shareText}
                  youtubeChannelUrl={youtubeChannelUrl}
                />

                {/* Descripción */}
                {video.descripcionCorta && (
                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: '#575757',
                      marginTop: 24,
                      marginBottom: 32,
                      padding: '20px 24px',
                      background: '#f4f4f4',
                      borderRadius: 'var(--r-l)',
                      borderLeft: '3px solid #CC1A1A',
                    }}
                  >
                    {video.descripcionCorta}
                  </div>
                )}

                {/* Resumen SEO */}
                {video.resumen && (
                  <div
                    style={{
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: '#575757',
                      marginBottom: 32,
                    }}
                  >
                    {video.resumen.split('\n\n').map((paragraph, i) => (
                      <p key={i} style={{ margin: '0 0 16px' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Artículo relacionado */}
                {video.articuloRelacionado?.slug && (
                  <div
                    style={{
                      marginBottom: 32,
                      padding: '20px 24px',
                      background: '#fff',
                      border: '1px solid #e7e6e6',
                      borderRadius: 'var(--r-l)',
                    }}
                  >
                    <div className="sect-label" style={{ marginBottom: 8 }}>
                      Artículo relacionado
                    </div>
                    <Link
                      href={`/estrategia/${video.articuloRelacionado.slug}`}
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: '#1d1d1d',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      {video.articuloRelacionado.title}
                      <Arr11 />
                    </Link>
                    {video.articuloRelacionado.descripcionCorta && (
                      <p
                        style={{
                          fontSize: 13,
                          color: '#575757',
                          margin: '8px 0 0',
                          lineHeight: 1.6,
                        }}
                      >
                        {video.articuloRelacionado.descripcionCorta}
                      </p>
                    )}
                  </div>
                )}

                {/* Volver */}
                <Link
                  href="/clases"
                  className="btn-ghost"
                  style={{ display: 'inline-flex', marginTop: 24 }}
                >
                  ← Volver a la videoteca
                </Link>
              </div>

              {/* ── Sidebar ── */}
              <div
                style={{
                  position: 'sticky',
                  top: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    background: '#0D0D0D',
                    borderRadius: 'var(--r-l)',
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.1em',
                      color: 'rgba(255,255,255,.4)',
                    }}
                  >
                    Ninja Poker Academy
                  </div>
                  <h3
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 700,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    ¿Quieres aprender más en vivo?
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,.55)',
                      fontSize: 14,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Clases diarias, revisión de manos y seguimiento personalizado. Todo gratis para
                    los alumnos de la academia.
                  </p>
                  <Link
                    href="/contacto"
                    className="btn red"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span className="btn-text">Quiero unirme</span>
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
                  <Link
                    href="/contacto"
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,.4)',
                      textAlign: 'center',
                      textDecoration: 'underline',
                    }}
                  >
                    ¿Tienes dudas? Escríbenos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CLASES RELACIONADAS ══ */}
      {related.length > 0 && (
        <section className="why">
          <div className="container">
            <div className="pvp spl">
              <div className="feat-top" style={{ marginBottom: 32 }}>
                <div>
                  <div className="sect-label">Videoteca</div>
                  <h2>Clases relacionadas</h2>
                </div>
                <Link
                  href="/clases"
                  className="btn-ghost"
                  style={{ flexShrink: 0, marginTop: 'auto' }}
                >
                  Ver todas <Arr11 />
                </Link>
              </div>
              <div className="courses-grid">
                {related.map((rel) => (
                  <div key={rel.id} className="course-card">
                    <Link href={`/clases/${rel.slug}`} style={{ display: 'contents' }}>
                      <div className="c-img-wrap">
                        <div
                          className="c-img"
                          style={{
                            background: rel.youtubeId
                              ? `url(https://img.youtube.com/vi/${rel.youtubeId}/mqdefault.jpg) center/cover no-repeat`
                              : 'linear-gradient(135deg,#0d0202,#1e0505)',
                          }}
                        >
                          {!rel.youtubeId && (
                            <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '2rem' }}>
                              ▶
                            </span>
                          )}
                        </div>
                        <div className="c-img-badges">
                          {rel.nivel && (
                            <span className={`badge ${nivelClass(rel.nivel)}`}>
                              {nivelLabel(rel.nivel)}
                            </span>
                          )}
                          {rel.modalidad && (
                            <span className={`badge ${modalidadClass(rel.modalidad)}`}>
                              {modalidadLabel(rel.modalidad)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="c-body">
                        <div className="c-title">{rel.title}</div>
                        <div className="c-instructor">
                          <div className="c-av">P</div>
                          <span className="c-name">Perep</span>
                        </div>
                      </div>
                    </Link>
                    <Link href={`/clases/${rel.slug}`} className="c-cta">
                      Ver clase{' '}
                      <span className="c-cta-arr">
                        <Arr11 />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
