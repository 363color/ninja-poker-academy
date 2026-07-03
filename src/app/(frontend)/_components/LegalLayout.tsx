import Link from 'next/link'
import React from 'react'

interface Props {
  title: string
  toc: [string, string][]
  children: React.ReactNode
}

export function LegalLayout({ title, toc, children }: Props) {
  return (
    <main className="bg-white min-h-screen" style={{ paddingTop: 80 }}>
      {/* ══ CABECERA ══ */}
      <section
        style={{ background: 'linear-gradient(180deg, var(--npa-cream, #F3F0EB) 0%, #fff 100%)' }}
      >
        <div className="container">
          <div className="pvp">
            <div style={{ paddingTop: 48, paddingBottom: 40 }}>
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
                    href="/"
                    style={{ color: '#b8b7b7', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Inicio
                  </Link>
                  <span style={{ opacity: 0.4 }}>›</span>
                  <span style={{ color: '#575757' }}>{title}</span>
                </div>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  margin: '0 0 12px',
                  color: '#1d1d1d',
                  fontFamily: 'var(--font-display)',
                  maxWidth: 800,
                }}
              >
                {title}
              </h1>
              <p style={{ fontSize: 13, color: '#b8b7b7', margin: 0 }}>
                Última actualización:{' '}
                <strong style={{ color: '#575757' }}>[FECHA DE ÚLTIMA ACTUALIZACIÓN]</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENIDO ══ */}
      <section>
        <div className="container">
          <div className="pvp">
            <div style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 720, margin: '0 auto' }}>
              {/* TOC */}
              {toc.length > 0 && (
                <nav
                  style={{
                    background: '#fff',
                    border: '1px solid #e7e6e6',
                    borderRadius: 'var(--r-l)',
                    padding: '20px 24px',
                    marginBottom: 40,
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '.14em',
                      color: '#b8b7b7',
                      margin: '0 0 12px',
                    }}
                  >
                    Contenido
                  </p>
                  <ol
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    {toc.map(([href, label], i) => (
                      <li key={href}>
                        <a
                          href={href}
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 10,
                            fontSize: 13,
                            textDecoration: 'none',
                            color: '#575757',
                            padding: '4px 0',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              color: '#b8b7b7',
                              flexShrink: 0,
                              fontWeight: 500,
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Legal content */}
              <article className="legal-content">{children}</article>

              {/* Volver */}
              <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e7e6e6' }}>
                <Link href="/" className="btn-ghost" style={{ display: 'inline-flex' }}>
                  ← Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .legal-content { font-size: 15px; line-height: 1.8; color: #3a3a3a; }
        .legal-content h2 { font-size: 22px; font-weight: 700; color: #1d1d1d; margin: 44px 0 14px; font-family: var(--font-display); line-height: 1.25; scroll-margin-top: 100px; }
        .legal-content h2:first-child { margin-top: 0; }
        .legal-content p { margin: 0 0 18px; }
        .legal-content p:last-child { margin-bottom: 0; }
        .legal-content strong { font-weight: 600; color: #1d1d1d; }
        .legal-content ul, .legal-content ol:not(.legal-toc) { margin: 0 0 18px 22px; }
        .legal-content li { margin-bottom: 8px; line-height: 1.7; }
        .legal-content a { color: #CC1A1A; text-decoration: none; }
        .legal-content a:hover { text-decoration: underline; }
        .legal-content table { width: 100%; border-collapse: collapse; margin: 16px 0 24px; font-size: 13px; }
        .legal-content th, .legal-content td { border: 1px solid #e7e6e6; padding: 10px 14px; text-align: left; }
        .legal-content th { background: #f9f9f7; font-weight: 600; color: #1d1d1d; }
        .legal-content td { color: #575757; }
        .legal-content td:first-child { font-family: monospace; font-size: 12px; }
        .legal-card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0; }
        .legal-card { display: flex; flex-direction: column; gap: 12px; padding: 22px; background: #f9f9f7; border: 1px solid #eeeeec; border-radius: var(--r-l); text-decoration: none; transition: box-shadow .2s, transform .2s; }
        .legal-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.08); transform: translateY(-2px); text-decoration: none; }
        .legal-card img { height: 32px; width: auto; }
        .legal-card-title { font-weight: 700; color: #1d1d1d; font-size: 15px; }
        .legal-card-desc { font-size: 13px; color: #575757; line-height: 1.6; }
        .legal-card-link { font-size: 12px; color: #CC1A1A; font-weight: 600; }
        @media (max-width: 640px) {
          .legal-card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
