import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Ninja Poker Academy',
  description:
    'Conoce al equipo detrás de Ninja Poker Academy: nuestra historia, filosofía y los profesores que forman a jugadores ganadores de cash game online en español.',
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

const PROFESORES = [
  {
    nombre: 'Perep',
    rol: 'Fundador · Coach Principal',
    nivel: 'NL50 – NL100',
    color: '#CC1A1A',
    bio: 'Lleva más de 8 años jugando cash game online. Fundó Ninja Poker Academy en 2023 con una idea simple: la mayoría de las escuelas de póker venden cursos y desaparecen. Aquí el seguimiento es real, diario, y el coach sigue jugando los mismos límites que enseña.',
    especialidad: 'Estrategia preflop, construcción de rangos y análisis de HUD avanzado.',
  },
  {
    nombre: 'Yani',
    rol: 'Profesora · Ex-alumna',
    nivel: 'NL50+',
    color: '#1acc7a',
    bio: 'Empezó en Ninja Poker Academy sin saber nada de póker, jugando NL2. En poco más de un año llegó a NL50 y se convirtió en parte del equipo docente. Su perspectiva es única: sabe exactamente qué se siente empezar desde cero.',
    especialidad: 'Mental game, control del tilt y acompañamiento a alumnos principiantes.',
  },
  {
    nombre: 'Galathea',
    rol: 'Profesora · Análisis de Datos',
    nivel: 'NL100+',
    color: '#1a7acc',
    bio: 'Especialista en estadísticas y bases de datos. Si tu HUD tiene un leak, ella lo encuentra. Su enfoque combina matemática aplicada al póker con explicaciones claras, sin jerga innecesaria.',
    especialidad: 'HUD, tracking de manos, GTO aplicado y revisión de sesiones.',
  },
]

const PILARES = [
  { icon: '📅', title: 'Clases diarias en vivo' },
  { icon: '🃏', title: 'Revisión y análisis de manos' },
  { icon: '📊', title: 'Análisis de estadísticas y bases de datos' },
  { icon: '🎯', title: 'Tutorías y seguimiento personalizado' },
  { icon: '🧠', title: 'Trabajo sobre leaks, decisiones y mental game' },
  { icon: '💰', title: 'Bancaje y condiciones competitivas (opcional)' },
  { icon: '🤝', title: 'Trato cercano y familiar' },
]

const FILOSOFIA = [
  {
    title: 'Educación primero',
    desc: 'No vendemos atajos. Cada alumno construye su juego desde fundamentos sólidos: rangos, posición, matemática del bote. El resto viene después.',
  },
  {
    title: 'Comunidad real',
    desc: 'Un Discord activo donde se comparten manos, dudas y victorias. No es un grupo de difusión silencioso — es gente que juega y estudia junta.',
  },
  {
    title: 'Mejora continua',
    desc: 'El póker cambia. Los rangos óptimos de hace dos años no son los de hoy. Por eso estudiamos constantemente y actualizamos el contenido cada mes.',
  },
  {
    title: 'Cash game, sin distracciones',
    desc: "Torneos, Spins, PLO — no es nuestro terreno. Nos especializamos en cash game NL Hold'em porque creemos que la especialización produce mejores resultados.",
  },
]

export default function SobreNosotrosPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre Nosotros | Ninja Poker Academy',
    description:
      'Historia, filosofía y equipo docente de Ninja Poker Academy, escuela de póker online en español especializada en cash game.',
    url: 'https://ninjapokeracademy.com/sobre-nosotros',
    mainEntity: {
      '@type': 'Organization',
      name: 'Ninja Poker Academy',
      foundingDate: '2023',
      description:
        'Academia de póker online en español especializada en cash game, con clases diarias en vivo, revisión de manos y comunidad activa.',
      employee: PROFESORES.map((p) => ({
        '@type': 'Person',
        name: p.nombre,
        jobTitle: p.rol,
        description: p.bio,
      })),
    },
  }

  return (
    <main className="bg-white min-h-screen" style={{ paddingTop: 80 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ══ HERO ══ */}
      <section
        style={{ background: 'linear-gradient(180deg, var(--npa-cream, #F3F0EB) 0%, #fff 100%)' }}
      >
        <div className="container">
          <div className="pvp">
            <div
              style={{
                paddingTop: 72,
                paddingBottom: 64,
                textAlign: 'center',
                maxWidth: 760,
                margin: '0 auto',
              }}
            >
              <div className="hero-pill" style={{ display: 'inline-flex', marginBottom: 32 }}>
                <div className="hero-avatars">
                  <div className="hero-av">🥷</div>
                  <div className="hero-av">🃏</div>
                  <div className="hero-av">♠</div>
                </div>
                <span>Sobre nosotros</span>
              </div>
              <h1
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: '#1d1d1d',
                  fontFamily: 'var(--font-display)',
                  margin: '0 0 24px',
                }}
              >
                Una academia hecha por
                <br />
                <em style={{ color: '#CC1A1A', fontStyle: 'normal' }}>
                  jugadores que siguen jugando
                </em>
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: '#575757', margin: '0 0 40px' }}>
                Ninja Poker Academy nació de una frustración simple: la mayoría de las escuelas de
                póker enseñan teoría desconectada de la mesa real. Aquí, quien enseña también juega
                — y compite en los mismos límites que tú.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <BtnRed href="/contacto">Quiero unirme</BtnRed>
                <Link href="/comunidad" className="btn-ghost">
                  Conoce la comunidad <Arr13 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HISTORIA ══ */}
      <section className="featured">
        <div className="container">
          <div className="pvp spl">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 80,
                alignItems: 'center',
              }}
            >
              <div>
                <div className="sect-label">Nuestra historia</div>
                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 42px)',
                    fontWeight: 700,
                    margin: '0 0 20px',
                    lineHeight: 1.2,
                  }}
                >
                  De grupo de estudio a escuela de cash game
                </h2>
                <p style={{ fontSize: 16, color: '#575757', lineHeight: 1.75, margin: '0 0 20px' }}>
                  Ninja Poker Academy empezó en 2023 como un pequeño grupo de Discord donde Perep
                  compartía sus sesiones de NL50 y revisaba manos con un puñado de jugadores. No
                  había estructura, ni clases formales — solo un coach jugando en vivo y
                  respondiendo dudas en tiempo real.
                </p>
                <p style={{ fontSize: 16, color: '#575757', lineHeight: 1.75, margin: '0 0 20px' }}>
                  Cuando los primeros alumnos empezaron a subir de límite, algo cambió: la comunidad
                  creció orgánicamente, sin publicidad. Hoy Ninja Poker Academy tiene clases diarias
                  en vivo, una videoteca con cientos de horas de contenido y un equipo docente que
                  incluye a antiguos alumnos que llegaron desde NL2.
                </p>
                <p style={{ fontSize: 16, color: '#575757', lineHeight: 1.75, margin: 0 }}>
                  Seguimos siendo lo que éramos al principio: un grupo de jugadores que ayuda a
                  otros jugadores. Solo que ahora hay estructura, seguimiento y resultados medibles.
                </p>
              </div>
              <div
                style={{
                  background: '#0D0D0D',
                  borderRadius: 'var(--r-l)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
              >
                <div className="sect-label" style={{ color: 'rgba(255,255,255,.35)' }}>
                  En números
                </div>
                {[
                  { num: '2023', label: 'Año de fundación' },
                  { num: '+200', label: 'Clases grabadas en la videoteca' },
                  { num: '3', label: 'Profesores activos jugando cash game' },
                  { num: 'NL2 → NL100', label: 'Rango de progreso real de alumnos' },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      paddingBottom: i < 3 ? 20 : 0,
                      borderBottom: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>{s.label}</span>
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#fff',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FILOSOFÍA ══ */}
      <section style={{ background: '#f9f9f7' }}>
        <div className="container">
          <div className="pvp spl">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="sect-label">Nuestra filosofía</div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 700,
                  margin: '0 0 16px',
                  lineHeight: 1.2,
                }}
              >
                Cuatro principios que no negociamos
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 20,
              }}
            >
              {FILOSOFIA.map((f, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid #e7e6e6',
                    borderRadius: 'var(--r-l)',
                    padding: 28,
                  }}
                >
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: '#CC1A1A', marginBottom: 12 }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    style={{ fontSize: 17, fontWeight: 700, color: '#1d1d1d', margin: '0 0 10px' }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#575757', lineHeight: 1.65, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ EQUIPO ══ */}
      <section className="featured">
        <div className="container">
          <div className="pvp spl">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="sect-label">El equipo</div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 700,
                  margin: '0 0 16px',
                  lineHeight: 1.2,
                }}
              >
                Los profesores que te van a formar
              </h2>
              <p style={{ fontSize: 16, color: '#575757', maxWidth: 520, margin: '0 auto' }}>
                Todos juegan activamente. Ninguno dejó las mesas para "enseñar teoría" — siguen
                compitiendo en los límites que enseñan.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 24,
              }}
            >
              {PROFESORES.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid #e7e6e6',
                    borderRadius: 'var(--r-l)',
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: `${p.color}1a`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        fontWeight: 700,
                        color: p.color,
                        flexShrink: 0,
                      }}
                    >
                      {p.nombre[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1d1d1d' }}>
                        {p.nombre}
                      </div>
                      <div style={{ fontSize: 13, color: '#575757' }}>{p.rol}</div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: p.color,
                          textTransform: 'uppercase',
                          letterSpacing: '.08em',
                          marginTop: 4,
                        }}
                      >
                        {p.nivel}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#575757', lineHeight: 1.7, margin: 0 }}>
                    {p.bio}
                  </p>
                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 14 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#b8b7b7',
                        textTransform: 'uppercase',
                        letterSpacing: '.08em',
                        marginBottom: 6,
                      }}
                    >
                      Especialidad
                    </div>
                    <div style={{ fontSize: 13, color: '#1d1d1d', lineHeight: 1.6 }}>
                      {p.especialidad}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7 PILARES OFICIALES ══ */}
      <section style={{ background: '#0D0D0D' }}>
        <div className="container">
          <div className="pvp spl">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="sect-label" style={{ color: 'rgba(255,255,255,.35)' }}>
                Los 7 pilares
              </div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 16px',
                  lineHeight: 1.2,
                }}
              >
                Lo que sostiene la academia
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,.55)',
                  maxWidth: 480,
                  margin: '0 auto',
                }}
              >
                Estos son los principios oficiales sobre los que construimos cada clase y cada
                interacción con un alumno.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              {PILARES.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,.04)',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: 'var(--r-l)',
                    padding: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>
                    {p.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRATO CERCANO — frase de marca ══ */}
      <section className="featured">
        <div className="container">
          <div className="pvp" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto' }}>
              <div style={{ fontSize: 40, marginBottom: 20 }}>🤝</div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 700,
                  margin: '0 0 20px',
                  lineHeight: 1.25,
                  fontFamily: 'var(--font-display)',
                }}
              >
                "Trato cercano y familiar"
              </h2>
              <p style={{ fontSize: 16, color: '#575757', lineHeight: 1.75 }}>
                No es solo un eslogan. Es la razón por la que limitamos el ritmo de crecimiento de
                la academia: preferimos conocer a cada alumno por su nombre antes que tener miles de
                personas anónimas en un servidor.
              </p>
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
                ¿Quieres que te
                <br />
                formemos nosotros?
              </h2>
              <p className="p1" style={{ color: 'var(--text-03)', maxWidth: '40ch' }}>
                Escríbenos y empieza tu camino con el mismo equipo que ha llevado a alumnos de NL2 a
                NL100.
              </p>
              <div className="cta-btns">
                <BtnRed href="/contacto">Quiero unirme</BtnRed>
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
