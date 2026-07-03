import Link from 'next/link'
import React from 'react'

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

function BtnRed({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn red">
      <span className="btn-text">{children}</span>
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
  )
}

const LINKS = [
  { icon: '🏠', title: 'Inicio', desc: 'Vuelve a la página principal', href: '/' },
  { icon: '📚', title: 'Clases', desc: '+200 clases gratis de cash game', href: '/clases' },
  {
    icon: '✍️',
    title: 'Estrategia',
    desc: 'Artículos de análisis y bankroll',
    href: '/estrategia',
  },
]

export default function NotFound() {
  return (
    <main className="bg-white min-h-screen" style={{ paddingTop: 80 }}>
      <section
        style={{ background: 'linear-gradient(180deg, var(--npa-cream, #F3F0EB) 0%, #fff 100%)' }}
      >
        <div className="container">
          <div className="pvp">
            <div
              style={{
                paddingTop: 96,
                paddingBottom: 64,
                textAlign: 'center',
                maxWidth: 620,
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 700,
                  lineHeight: 1,
                  color: '#CC1A1A',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 8,
                }}
              >
                404
              </div>
              <div style={{ fontSize: 40, marginBottom: 24 }}>🥷</div>
              <h1
                style={{
                  fontSize: 'clamp(26px, 4vw, 38px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#1d1d1d',
                  fontFamily: 'var(--font-display)',
                  margin: '0 0 16px',
                }}
              >
                Esta mano no está en el rango
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#575757', margin: '0 0 36px' }}>
                La página que buscas no existe o se ha movido. Pero tranquilo, tenemos mucho más
                para ti.
              </p>
              <BtnRed href="/">Volver al inicio</BtnRed>
            </div>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <div className="pvp" style={{ paddingTop: 0, paddingBottom: 80 }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div className="sect-label" style={{ textAlign: 'center' }}>
                O prueba con
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  marginTop: 16,
                }}
              >
                {LINKS.map((l) => (
                  <Link key={l.title} href={l.href} className="notfound-card">
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{l.icon}</div>
                    <div
                      style={{ fontSize: 16, fontWeight: 700, color: '#1d1d1d', marginBottom: 4 }}
                    >
                      {l.title}
                    </div>
                    <div
                      style={{ fontSize: 13, color: '#575757', lineHeight: 1.5, marginBottom: 14 }}
                    >
                      {l.desc}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        color: '#CC1A1A',
                      }}
                    >
                      Ir <Arr13 />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .notfound-card {
          display: flex;
          flex-direction: column;
          padding: 24px;
          background: #fff;
          border: 1px solid #e7e6e6;
          border-radius: var(--r-l);
          text-decoration: none;
          transition: box-shadow .2s, transform .2s;
        }
        .notfound-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,.08);
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  )
}
