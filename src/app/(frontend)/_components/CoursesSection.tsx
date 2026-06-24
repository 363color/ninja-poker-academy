'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const FILTERS = ['Todos', 'Preflop', 'Postflop', 'Análisis de manos', 'Estadísticas', 'Mental game', 'Bankroll']

const COURSES = [
  {
    bg: 'linear-gradient(135deg,#0d0202,#1e0505)',
    badges: [{ label: 'Básico', color: 'rgba(59,130,246,.12)', textColor: '#1d4ed8' }, { label: 'En vivo', color: 'rgba(16,185,129,.12)', textColor: '#065f46' }],
    title: 'Fundamentos del preflop: rangos de apertura por posición en cash game',
    time: '38 min',
    type: { label: 'Teoría', color: 'rgba(139,92,246,.08)', textColor: '#5b21b6' },
    instructor: 'Nuestro equipo · NPA',
  },
  {
    bg: 'linear-gradient(135deg,#0d1a05,#1a3208)',
    badges: [{ label: 'Intermedio', color: 'rgba(245,158,11,.12)', textColor: '#b45309' }, { label: 'Grabada', color: 'rgba(107,114,128,.1)', textColor: '#374151' }],
    title: 'Cómo leer el HUD: los stats más importantes en NL50',
    time: '52 min',
    type: { label: 'Análisis', color: 'rgba(236,72,153,.1)', textColor: '#9d174d' },
    instructor: 'Nuestro equipo · NPA',
  },
  {
    bg: 'linear-gradient(135deg,#05102a,#0a2040)',
    badges: [{ label: 'Avanzado', color: 'rgba(239,68,68,.1)', textColor: '#991b1b' }, { label: 'Grabada', color: 'rgba(107,114,128,.1)', textColor: '#374151' }],
    title: 'Bluff catching en el river: cómo leer al villano y tomar la decisión correcta',
    time: '44 min',
    type: { label: 'Análisis', color: 'rgba(236,72,153,.1)', textColor: '#9d174d' },
    instructor: 'Nuestro equipo · NPA',
  },
  {
    bg: 'linear-gradient(135deg,#1a0d05,#301a08)',
    badges: [{ label: 'Todos los niveles', color: 'rgba(59,130,246,.12)', textColor: '#1d4ed8' }, { label: 'En vivo', color: 'rgba(16,185,129,.12)', textColor: '#065f46' }],
    title: 'Gestión del tilt: técnicas para mantener el foco en sesiones largas',
    time: '35 min',
    type: { label: 'Teoría', color: 'rgba(139,92,246,.08)', textColor: '#5b21b6' },
    instructor: 'Nuestro equipo · NPA',
  },
]

const ArrowSvg = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export function CoursesSection() {
  const [active, setActive] = useState('Todos')

  return (
    <>
      {/* feat-top */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, marginBottom: 48 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--muted-foreground)', marginBottom: 16 }}>
            Videoteca
          </div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,48px)', lineHeight: '1.16em', fontWeight: 700, margin: 0 }}>
            Últimas clases gratis<br />de póker
          </h2>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  border: `1px solid ${active === f ? 'var(--npa-black)' : 'var(--border)'}`,
                  fontSize: 13,
                  fontWeight: 500,
                  color: active === f ? '#fff' : 'var(--muted-foreground)',
                  background: active === f ? 'var(--npa-black)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all .2s',
                  fontFamily: 'inherit',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <Link
          href="/clases"
          className="npa-btn-ghost"
          style={{ flexShrink: 0, marginTop: 'auto' }}
        >
          Ver todas <ArrowSvg />
        </Link>
      </div>

      {/* courses-grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        {COURSES.map((c, i) => (
          <div
            key={i}
            style={{ border: '1px solid var(--border)', background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {/* Thumbnail */}
            <div style={{ padding: 6, position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: 12,
                  background: c.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'rgba(255,255,255,.35)',
                  fontWeight: 700,
                  overflow: 'hidden',
                }}
              >
                ▶
              </div>
              {/* Badges */}
              <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {c.badges.map((b, j) => (
                  <span
                    key={j}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: 999,
                      padding: '3px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                      background: b.color,
                      color: b.textColor,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.4, margin: '8px 0 0' }}>
                {c.title}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>⏱ {c.time}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)', display: 'inline-block', flexShrink: 0 }} />
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: 999,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    background: c.type.color,
                    color: c.type.textColor,
                  }}
                >
                  {c.type.label}
                </span>
              </div>
              {/* Instructor */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(204,26,26,.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--npa-red)',
                    flexShrink: 0,
                  }}
                >
                  N
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted-foreground)' }}>{c.instructor}</span>
              </div>
            </div>

            {/* CTA bar */}
            <Link
              href="/clases"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderTop: '1px solid var(--border)',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
                color: 'var(--foreground)',
                textDecoration: 'none',
                transition: 'background .2s,color .2s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'var(--secondary)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              Ver clase
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'var(--secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowSvg />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
