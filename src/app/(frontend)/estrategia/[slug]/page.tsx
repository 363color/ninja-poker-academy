import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { ArticleTOC } from './ArticleTOC'
import { ArticleShareButtons } from './ArticleShareButtons'

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface Category {
  id: string
  title: string
  slug: string
}
interface Author {
  id: string
  name: string
}
interface Post {
  id: string
  title: string
  slug: string
  publishedAt?: string
  heroImage?: { url?: string; alt?: string }
  categories?: Category[]
  content?: unknown
  relatedPosts?: Post[]
  populatedAuthors?: Author[]
  meta?: { title?: string; description?: string; image?: { url?: string } }
}

interface TocItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function getBase() {
  const h = await headers()
  const host = h.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const base = await getBase()
  try {
    const res = await fetch(
      `${base}/api/posts?where[slug][equals]=${slug}&where[_status][equals]=published&depth=2&limit=1`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.docs?.[0] ?? null
  } catch {
    return null
  }
}

async function fetchRelated(post: Post): Promise<Post[]> {
  const base = await getBase()
  try {
    const catSlug = post.categories?.[0]?.slug
    const params = new URLSearchParams()
    params.set('limit', '3')
    params.set('where[_status][equals]', 'published')
    params.set('where[slug][not_equals]', post.slug)
    if (catSlug) params.set('where[categories.slug][in]', catSlug)
    params.set('sort', '-publishedAt')
    const res = await fetch(`${base}/api/posts?${params.toString()}`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs ?? []
  } catch {
    return []
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractToc(content: unknown): TocItem[] {
  if (!content) return []
  try {
    const data = content as { root?: { children?: unknown[] } }
    if (!data.root?.children) return []
    const items: TocItem[] = []
    data.root.children.forEach((node: unknown) => {
      const n = node as { type?: string; tag?: string; children?: unknown[] }
      if (n.type !== 'heading') return
      if (n.tag !== 'h2' && n.tag !== 'h3') return
      const text = (n.children || [])
        .map((c: unknown) => (c as { text?: string }).text || '')
        .join('')
      if (!text) return
      items.push({ id: slugify(text), text, level: n.tag as 'h2' | 'h3' })
    })
    return items
  } catch {
    return []
  }
}

function estimateReadTime(content: unknown): number {
  if (!content) return 3
  const text = JSON.stringify(content)
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function formatDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderContent(content: unknown): string {
  if (!content) return ''
  try {
    const data = content as { root?: { children?: unknown[] } }
    if (!data.root?.children) return ''
    return data.root.children.map((node: unknown) => renderNode(node)).join('')
  } catch {
    return ''
  }
}

function renderNode(node: unknown): string {
  const n = node as {
    type?: string
    children?: unknown[]
    text?: string
    format?: number
    tag?: string
    url?: string
    fields?: { url?: string }
  }
  if (!n) return ''
  if (n.type === 'text') {
    let text = (n.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    if (n.format && n.format & 1) text = `<strong>${text}</strong>`
    if (n.format && n.format & 2) text = `<em>${text}</em>`
    return text
  }
  const children = (n.children || []).map(renderNode).join('')
  switch (n.type) {
    case 'heading': {
      const tag = n.tag || 'h2'
      const text = (n.children || [])
        .map((c: unknown) => (c as { text?: string }).text || '')
        .join('')
      const id = slugify(text)
      return `<${tag} id="${id}">${children}</${tag}>`
    }
    case 'paragraph':
      return children ? `<p>${children}</p>` : ''
    case 'list':
      return n.tag === 'ol' ? `<ol>${children}</ol>` : `<ul>${children}</ul>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'quote':
      return `<blockquote>${children}</blockquote>`
    case 'link':
      return `<a href="${n.fields?.url || n.url || '#'}">${children}</a>`
    case 'horizontalrule':
      return '<hr />'
    default:
      return children
  }
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

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)
  if (!post) return { title: 'Artículo no encontrado | Ninja Poker Academy' }
  const desc =
    post.meta?.description ||
    `Artículo de estrategia de cash game: ${post.title}. Aprende póker online gratis con Ninja Poker Academy.`
  const img =
    post.meta?.image?.url || post.heroImage?.url || 'https://ninjapokeracademy.com/og-image.png'
  return {
    title: post.meta?.title || `${post.title} | Ninja Poker Academy`,
    description: desc,
    openGraph: {
      title: post.meta?.title || `${post.title} | Ninja Poker Academy`,
      description: desc,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: img, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta?.title || `${post.title} | Ninja Poker Academy`,
      description: desc,
      images: [img],
    },
  }
}

// ── Página ────────────────────────────────────────────────────────────────────

export default async function EstrategiaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, related] = await Promise.all([
    fetchPostBySlug(slug),
    fetchPostBySlug(slug).then((p) => (p ? fetchRelated(p) : [])),
  ])
  if (!post) notFound()

  const readTime = estimateReadTime(post.content)
  const cat = post.categories?.[0]
  const author = post.populatedAuthors?.[0]
  const contentHtml = renderContent(post.content)
  const tocItems = extractToc(post.content)
  const shareUrl = `https://ninjapokeracademy.com/estrategia/${post.slug}`
  const shareText = `${post.title} — Ninja Poker Academy`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta?.description || '',
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: author?.name || 'Perep' },
    publisher: {
      '@type': 'Organization',
      name: 'Ninja Poker Academy',
      logo: { '@type': 'ImageObject', url: 'https://ninjapokeracademy.com/favicon.ico' },
    },
    image: post.heroImage?.url || 'https://ninjapokeracademy.com/og-image.png',
    url: `https://ninjapokeracademy.com/estrategia/${post.slug}`,
    mainEntityOfPage: `https://ninjapokeracademy.com/estrategia/${post.slug}`,
    ...(cat && { articleSection: cat.title }),
    timeRequired: `PT${readTime}M`,
  }

  return (
    <main className="bg-white min-h-screen" style={{ paddingTop: 80 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ══ CABECERA ══ */}
      <section
        style={{ background: 'linear-gradient(180deg, var(--npa-cream, #F3F0EB) 0%, #fff 100%)' }}
      >
        <div className="container">
          <div className="pvp">
            <div style={{ paddingTop: 48, paddingBottom: 0 }}>
              {/* Breadcrumb pill */}
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#fff',
                    border: '1px solid #e7e6e6',
                    borderRadius: 999,
                    padding: '6px 14px',
                    fontSize: 12,
                    color: '#b8b7b7',
                    boxShadow: '0 1px 4px rgba(0,0,0,.06)',
                  }}
                >
                  <Link
                    href="/estrategia"
                    style={{ color: '#b8b7b7', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Estrategia
                  </Link>
                  {cat && (
                    <>
                      <span style={{ opacity: 0.4 }}>›</span>
                      <Link
                        href={`/estrategia?categoria=${cat.slug}`}
                        style={{ color: '#CC1A1A', textDecoration: 'none', fontWeight: 600 }}
                      >
                        {cat.title}
                      </Link>
                    </>
                  )}
                  <span style={{ opacity: 0.4 }}>›</span>
                  <span
                    style={{
                      color: '#575757',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: 260,
                    }}
                  >
                    {post.title}
                  </span>
                </div>
              </div>

              {/* Título */}
              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  margin: '0 0 24px',
                  color: '#1d1d1d',
                  fontFamily: 'var(--font-display)',
                  maxWidth: 800,
                }}
              >
                {post.title}
              </h1>

              {/* Meta row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontSize: 13,
                  color: '#b8b7b7',
                  marginBottom: 10,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(204,26,26,.12)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#CC1A1A',
                    }}
                  >
                    {author?.name?.[0] || 'P'}
                  </span>
                  {author?.name || 'Perep'}
                </span>
                {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                <span>⏱ {readTime} min de lectura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENIDO + SIDEBAR ══ */}
      <section>
        <div className="container">
          <div className="pvp">
            <div className="article-layout">
              {/* ── Columna principal ── */}
              <div>
                {/* Share arriba */}
                <div style={{ marginBottom: 24 }}>
                  <ArticleShareButtons shareUrl={shareUrl} shareText={shareText} />
                </div>

                {/* Imagen portada — 16/9 */}
                {post.heroImage?.url && (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: 'var(--r-l)',
                      overflow: 'hidden',
                      marginBottom: 32,
                      background: '#f4f4f4',
                    }}
                  >
                    <img
                      src={post.heroImage.url}
                      alt={post.heroImage.alt || post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Descripción destacada */}
                {post.meta?.description && (
                  <div
                    style={{
                      fontSize: 18,
                      lineHeight: 1.7,
                      color: '#575757',
                      marginBottom: 40,
                      padding: '20px 24px',
                      background: '#f4f4f4',
                      borderRadius: 'var(--r-l)',
                      borderLeft: '3px solid #CC1A1A',
                    }}
                  >
                    {post.meta.description}
                  </div>
                )}

                {/* TOC — Client Component */}
                <ArticleTOC items={tocItems} />

                {/* Contenido */}
                <article
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                {/* Caja autor */}
                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: '28px 24px',
                    background: '#f9f9f9',
                    border: '1px solid #e7e6e6',
                    borderRadius: 'var(--r-l)',
                    margin: '48px 0 32px',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'rgba(204,26,26,.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#CC1A1A',
                    }}
                  >
                    {author?.name?.[0] || 'P'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '.12em',
                        color: '#b8b7b7',
                      }}
                    >
                      Sobre el autor
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1d' }}>
                      {author?.name || 'Perep'}
                    </div>
                    <p style={{ fontSize: 13, color: '#575757', lineHeight: 1.7, margin: 0 }}>
                      Coach principal de Ninja Poker Academy. Especialista en cash game NL
                      Hold&apos;em, análisis de rangos y mental game. Más de 10 años jugando y
                      enseñando póker online en español.
                    </p>
                  </div>
                </div>

                {/* Botones compartir — abajo */}
                <ArticleShareButtons shareUrl={shareUrl} shareText={shareText} />

                {/* Newsletter inline */}
                <div
                  style={{
                    background: '#0D0D0D',
                    borderRadius: 'var(--r-l)',
                    padding: '32px 28px',
                    margin: '0 0 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.14em',
                      color: 'rgba(255,255,255,.35)',
                    }}
                  >
                    Newsletter
                  </div>
                  <h3
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: 700,
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Estrategia de póker, cada semana
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,.55)',
                      fontSize: 14,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Análisis de manos, artículos como este y novedades de la academia. Sin spam.
                  </p>
                  <div className="nl-pill" style={{ maxWidth: 440 }}>
                    <input type="email" placeholder="Tu email" className="nl-input" />
                    <button className="nl-btn">Suscribirme</button>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,.25)', margin: 0 }}>
                    Sin spam. Cancela cuando quieras.
                  </p>
                </div>

                {/* Volver */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/estrategia" className="btn-ghost" style={{ display: 'inline-flex' }}>
                    ← Volver a Estrategia
                  </Link>
                  {cat && (
                    <Link
                      href={`/estrategia?categoria=${cat.slug}`}
                      className="btn-ghost"
                      style={{ display: 'inline-flex' }}
                    >
                      Más de {cat.title} <Arr13 />
                    </Link>
                  )}
                </div>
              </div>

              {/* ── Sidebar ── */}
              <aside className="article-sidebar">
                {/* CTA */}
                <div
                  style={{
                    background: '#0D0D0D',
                    borderRadius: 'var(--r-l)',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.12em',
                      color: 'rgba(255,255,255,.35)',
                    }}
                  >
                    Ninja Poker Academy
                  </div>
                  <h3
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 700,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    ¿Quieres aplicar esto en vivo?
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,.55)',
                      fontSize: 13,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Clases diarias, revisión de manos y seguimiento personalizado. Todo gratis.
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
                      fontSize: 12,
                      color: 'rgba(255,255,255,.35)',
                      textAlign: 'center',
                      textDecoration: 'underline',
                    }}
                  >
                    ¿Tienes dudas? Escríbenos
                  </Link>
                </div>

                {/* Más artículos */}
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e7e6e6',
                    borderRadius: 'var(--r-l)',
                    padding: 20,
                  }}
                >
                  <div className="sect-label" style={{ marginBottom: 14 }}>
                    Más artículos
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      {
                        slug: 'rangos-de-apertura-cash-game',
                        cat: 'Preflop',
                        title: 'Cómo construir rangos de apertura en cash game',
                      },
                      {
                        slug: 'habitos-previos-juego-evitar-tilt-poker',
                        cat: 'Mental game',
                        title: '7 hábitos previos al juego para evitar el tilt',
                      },
                      {
                        slug: 'bankroll-management-nl25-nl50',
                        cat: 'Bankroll',
                        title: '¿Tienes el bankroll para ganar en NL25 y NL50?',
                      },
                      {
                        slug: 'errores-partidas-cash-poker',
                        cat: 'Análisis de manos',
                        title: '8 errores comunes en partidas de cash',
                      },
                      {
                        slug: 'cbet-postflop-cash-game',
                        cat: 'Postflop',
                        title: 'Dominando las apuestas de continuación (c-bet)',
                      },
                    ]
                      .filter((a) => a.slug !== post.slug)
                      .slice(0, 4)
                      .map((a, i, arr) => (
                        <Link
                          key={a.slug}
                          href={`/estrategia/${a.slug}`}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            textDecoration: 'none',
                            padding: '12px 0',
                            borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '.08em',
                              color: '#CC1A1A',
                            }}
                          >
                            {a.cat}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#1d1d1d',
                              lineHeight: 1.4,
                            }}
                          >
                            {a.title}
                          </span>
                        </Link>
                      ))}
                  </div>
                  <Link
                    href="/estrategia"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#CC1A1A',
                      textDecoration: 'none',
                      marginTop: 14,
                    }}
                  >
                    Ver todos <Arr11 />
                  </Link>
                </div>

                {/* Ver clases */}
                <Link
                  href={cat ? `/clases?tema=${cat.slug}` : '/clases'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: '#fff',
                    border: '1px solid #e7e6e6',
                    borderRadius: 'var(--r-l)',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#1d1d1d',
                  }}
                >
                  <span>Ver clases de {cat?.title || 'cash game'}</span>
                  <Arr11 />
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ARTÍCULOS RELACIONADOS ══ */}
      {related.length > 0 && (
        <section className="why">
          <div className="container">
            <div className="pvp spl">
              <div className="feat-top" style={{ marginBottom: 32 }}>
                <div>
                  <div className="sect-label">Estrategia</div>
                  <h2>Artículos relacionados</h2>
                </div>
                <Link
                  href="/estrategia"
                  className="btn-ghost"
                  style={{ flexShrink: 0, marginTop: 'auto' }}
                >
                  Ver todos <Arr13 />
                </Link>
              </div>
              <div className="art-grid">
                {related.map((rel) => {
                  const relCat = rel.categories?.[0]
                  const relTime = estimateReadTime(rel.content)
                  return (
                    <Link
                      key={rel.id}
                      href={`/estrategia/${rel.slug}`}
                      className="art-card"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div
                        className="art-img"
                        style={{
                          background: rel.heroImage?.url
                            ? `url(${rel.heroImage.url}) center/cover no-repeat`
                            : 'linear-gradient(135deg,#0d1a05,#1a3208)',
                          fontSize: rel.heroImage?.url ? undefined : '3rem',
                        }}
                      >
                        {!rel.heroImage?.url && '📝'}
                      </div>
                      <div className="art-body">
                        <div className="art-meta">
                          {relCat && <span className="art-tag">{relCat.title}</span>}
                          <span className="art-time">⏱ {relTime} min</span>
                        </div>
                        <div className="art-title">{rel.title}</div>
                        {rel.meta?.description && <p className="art-sum">{rel.meta.description}</p>}
                        <div className="art-cta">
                          Leer más <Arr11 />
                        </div>
                      </div>
                    </Link>
                  )
                })}
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
                <Link href="/clases" className="btn-ghost">
                  Ver clases gratis <Arr13 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .article-content { font-size: 16px; line-height: 1.8; color: #3a3a3a; }
        .article-content h2 { font-size: clamp(20px, 3vw, 28px); font-weight: 700; color: #1d1d1d; margin: 48px 0 16px; font-family: var(--font-display); line-height: 1.2; scroll-margin-top: 100px; }
        .article-content h3 { font-size: clamp(17px, 2.5vw, 22px); font-weight: 600; color: #1d1d1d; margin: 36px 0 12px; scroll-margin-top: 100px; }
        .article-content h4 { font-size: 17px; font-weight: 600; color: #1d1d1d; margin: 28px 0 10px; }
        .article-content p { margin: 0 0 20px; }
        .article-content p:last-child { margin-bottom: 0; }
        .article-content strong { font-weight: 600; color: #1d1d1d; }
        .article-content em { font-style: italic; }
        .article-content ul, .article-content ol { margin: 0 0 20px 24px; }
        .article-content li { margin-bottom: 8px; line-height: 1.7; }
        .article-content blockquote { border-left: 3px solid #CC1A1A; margin: 32px 0; padding: 16px 20px; background: #f4f4f4; border-radius: 0 var(--r-l) var(--r-l) 0; font-style: italic; color: #575757; }
        .article-content a { color: #CC1A1A; text-decoration: underline; }
        .article-content hr { border: none; border-top: 1px solid #e7e6e6; margin: 48px 0; }

        /* ── Layout responsive ── */
        .article-layout { display: grid; grid-template-columns: 1fr 280px; gap: 64px; align-items: start; padding-top: 0; padding-bottom: 64px; }
        .article-sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 16px; padding-top: 56px; }

        @media (max-width: 1024px) {
          .article-layout { grid-template-columns: 1fr; gap: 40px; padding-bottom: 48px; }
          .article-sidebar { position: static; top: auto; padding-top: 0; }
        }
        @media (max-width: 768px) {
          .article-layout { gap: 32px; padding-bottom: 40px; }
          .article-content { font-size: 15px; }
          .article-content h2 { font-size: 22px !important; margin: 36px 0 12px !important; }
          .article-content h3 { font-size: 18px !important; margin: 28px 0 10px !important; }
        }
      `}</style>
    </main>
  )
}
