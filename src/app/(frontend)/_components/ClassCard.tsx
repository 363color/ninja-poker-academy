import Link from 'next/link'
import React from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ClassCardData {
  id: string
  title: string
  slug: string
  youtubeId?: string
  descripcionCorta?: string
  nivel?: string
  modalidad?: string
  publishedAt?: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function nivelClass(n?: string) {
  if (n === 'basico') return 'basico'
  if (n === 'intermedio') return 'intermedio'
  if (n === 'avanzado') return 'avanzado'
  return ''
}

function nivelLabel(n?: string) {
  if (n === 'basico') return 'Básico'
  if (n === 'intermedio') return 'Intermedio'
  if (n === 'avanzado') return 'Avanzado'
  return ''
}

function modalidadClass(m?: string) {
  if (m === 'cash') return 'teoria'
  if (m === 'analisis-manos') return 'analisis'
  if (m === 'estadisticas') return 'analisis'
  if (m === 'mental-game') return 'teoria'
  if (m === 'postflop') return 'grabada'
  return 'grabada'
}

function modalidadLabel(m?: string) {
  if (m === 'cash') return 'Preflop'
  if (m === 'analisis-manos') return 'Análisis de manos'
  if (m === 'estadisticas') return 'Estadísticas'
  if (m === 'mental-game') return 'Mental game'
  if (m === 'postflop') return 'Postflop'
  return ''
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
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

export function ClassCard({ video }: { video: ClassCardData }) {
  return (
    <div className="course-card">
      <Link href={`/clases/${video.slug}`} style={{ display: 'contents' }}>
        <div className="c-img-wrap">
          <div
            className="c-img"
            style={{
              background: video.youtubeId
                ? `url(https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg) center/cover no-repeat`
                : 'linear-gradient(135deg,#0d0202,#1e0505)',
            }}
          >
            {!video.youtubeId && (
              <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '2rem' }}>▶</span>
            )}
          </div>
          <div className="c-img-badges">
            {video.nivel && (
              <span className={`badge ${nivelClass(video.nivel)}`}>{nivelLabel(video.nivel)}</span>
            )}
            {video.modalidad && (
              <span className={`badge ${modalidadClass(video.modalidad)}`}>
                {modalidadLabel(video.modalidad)}
              </span>
            )}
          </div>
        </div>
        <div className="c-body">
          <div className="c-title">{video.title}</div>
          {video.descripcionCorta && (
            <div className="c-meta">
              <span className="c-meta-item" style={{ fontSize: 12, color: '#b8b7b7' }}>
                {video.descripcionCorta}
              </span>
            </div>
          )}
          {video.publishedAt && (
            <div className="c-meta" style={{ marginTop: 8 }}>
              <span className="c-meta-item" style={{ fontSize: 11, color: '#888' }}>
                {formatDate(video.publishedAt)}
              </span>
            </div>
          )}
        </div>
      </Link>
      <Link href={`/clases/${video.slug}`} className="c-cta">
        Ver clase{' '}
        <span className="c-cta-arr">
          <Arr11 />
        </span>
      </Link>
    </div>
  )
}
