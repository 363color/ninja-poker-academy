import Link from 'next/link'
import React from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ArticleCardData {
  id: string
  title: string
  slug: string
  publishedAt?: string
  heroImage?: { url?: string; alt?: string }
  categories?: { id: string; title: string; slug: string }[]
  meta?: { description?: string }
  content?: unknown
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function estimateReadTime(content: unknown): number {
  if (!content) return 3
  const text = JSON.stringify(content)
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function formatDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
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

// ── Component ─────────────────────────────────────────────────────────────────

export function ArticleCard({ post }: { post: ArticleCardData }) {
  const cat = post.categories?.[0]
  const readTime = estimateReadTime(post.content)
  const imgUrl = post.heroImage?.url

  return (
    <Link
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
          {post.publishedAt && <span className="art-time">{formatDate(post.publishedAt)}</span>}
        </div>
        <div className="art-title">{post.title}</div>
        {post.meta?.description && <p className="art-sum">{post.meta.description}</p>}
        <div className="art-cta">
          Leer más <Arr11 />
        </div>
      </div>
    </Link>
  )
}
