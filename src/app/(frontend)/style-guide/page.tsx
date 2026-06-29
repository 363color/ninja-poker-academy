import type { Metadata } from 'next'
import { Zap, BookOpen, BarChart2 } from 'lucide-react'
import Link from 'next/link'

import { getMeUser } from '@/utilities/getMeUser'
import { Badge, type BadgeVariant } from '@/components/Badge'
import { Button } from '@/components/Button'
import { ArticleCard } from '@/components/ArticleCard'
import { Input } from '@/components/Input'
import { FilterPillsDemo } from './FilterPillsDemo'

export const metadata: Metadata = {
  title: 'Style Guide — NPA',
  robots: { index: false, follow: false },
}

// ── helpers ───────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-foreground/40 border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Swatch({ label, bg, hex }: { label: string; bg: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={`h-16 w-full rounded-none ${bg} border border-border/20`} />
      <p className="text-xs font-display font-bold text-foreground/80">{label}</p>
      <p className="text-[10px] text-foreground/40 font-mono">{hex}</p>
    </div>
  )
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

// ── page ──────────────────────────────────────────────────────────────────────

export default async function StyleGuidePage() {
  await getMeUser({ nullUserRedirect: '/admin' })

  const BADGE_VARIANTS: BadgeVariant[] = [
    'basico',
    'intermedio',
    'avanzado',
    'vivo',
    'grabada',
    'teoria',
    'analisis',
  ]

  const SAMPLE_CARDS = [
    {
      youtubeId: 'dQw4w9WgXcQ',
      nivel: 'basico',
      nivelLabel: 'Básico',
      title: 'Blind vs Blind: la guerra de los ciegos en cash game',
      slug: '#',
    },
    {
      youtubeId: 'dQw4w9WgXcQ',
      nivel: 'avanzado',
      nivelLabel: 'Avanzado',
      title: 'Spot de torneo: ICM pressure en final table',
      slug: '#',
    },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-npa-red">
          Ninja Poker Academy
        </p>
        <h1 className="font-display font-bold text-4xl leading-none">Style Guide</h1>
        <p className="text-sm text-foreground/50">
          Referencia visual del design system · solo visible para usuarios autenticados
        </p>
      </div>

      {/* ── Colores ── */}
      <Section title="Colores">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch label="npa-red" bg="bg-npa-red" hex="#CC1A1A" />
          <Swatch label="npa-black" bg="bg-npa-black" hex="#0D0D0D" />
          <Swatch label="npa-cream" bg="bg-npa-cream" hex="#FFFFFF" />
          <Swatch label="npa-cream-muted" bg="bg-[--npa-cream-muted]" hex="#C9C4BC" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Swatch label="npa-red-hover" bg="bg-[--npa-red-hover]" hex="#A81515" />
          <Swatch label="npa-red-light (12%)" bg="bg-npa-red/12" hex="npa-red @ 12%" />
          <Swatch label="npa-black-elevated" bg="bg-[--npa-black-elevated]" hex="#1A1A1A" />
        </div>
      </Section>

      {/* ── Tipografía ── */}
      <Section title="Tipografía">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[10px] text-foreground/40 mb-1 font-mono">
              font-display / Interdisplay — display/headings
            </p>
            <p className="font-display font-bold text-4xl leading-none">ABCDEFGHIJKLMNOP</p>
            <p className="font-display font-bold text-4xl leading-none">abcdefghijklmnop</p>
          </div>
          <div>
            <p className="text-[10px] text-foreground/40 mb-1 font-mono">
              font-sans / Geist Sans — body
            </p>
            <p className="font-sans text-base leading-relaxed text-foreground/80">
              La academia donde los ninjas del poker perfeccionan su juego. Teoría, análisis y
              partidas en vivo para todos los niveles.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {(['4xl', '2xl', 'xl', 'base', 'sm', 'xs'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <span className={`font-display font-bold text-${size}`}>Aa</span>
                <span className="text-[10px] text-foreground/40 font-mono">text-{size}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Badge ── */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-3">
          {BADGE_VARIANTS.map((v) => (
            <Badge key={v} variant={v} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Badge variant="vivo" icon={Zap} />
          <Badge variant="teoria" icon={BookOpen} />
          <Badge variant="analisis" icon={BarChart2} />
        </div>
      </Section>

      {/* ── Button ── */}
      <Section title="Button">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3 items-center">
            <Button>Normal</Button>
            <Button active>Activo (rojo)</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div>
            <Button href="#">Como enlace (href)</Button>
          </div>
        </div>
      </Section>

      {/* ── Botones NPA ── */}
      <Section title="Botones NPA (globals.css)">
        <div className="flex flex-wrap gap-4 items-center">
          <Link href="#" className="btn red">
            <span className="btn-text">Quiero unirme</span>
            <span className="btn-fill" />
            <span className="btn-circle">
              <span className="btn-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" className="btn-arrow" />
                </svg>
              </span>
            </span>
          </Link>
          <Link href="#" className="btn">
            <span className="btn-text">Negro (default)</span>
            <span className="btn-fill" />
            <span className="btn-circle">
              <span className="btn-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" className="btn-arrow" />
                </svg>
              </span>
            </span>
          </Link>
          <Link href="#" className="btn-ghost">
            Ver todas →
          </Link>
        </div>
      </Section>

      {/* ── Input ── */}
      <Section title="Input">
        <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
          <Input label="Email" placeholder="tu@email.com" type="email" />
          <Input label="Contraseña" placeholder="••••••••" type="password" />
          <Input label="Con error" placeholder="escribe algo" error="Este campo es obligatorio" />
          <Input placeholder="Sin label" />
        </div>
      </Section>

      {/* ── Pills ── */}
      <Section title="Filter Pills">
        <FilterPillsDemo />
        <div>
          <p className="text-[10px] text-foreground/40 mb-3 font-mono">Pills CSS (globals.css)</p>
          <div className="pills">
            <div className="pill on">Todos</div>
            <div className="pill">Preflop</div>
            <div className="pill">Postflop</div>
            <div className="pill">Mental game</div>
            <div className="pill">Bankroll</div>
          </div>
        </div>
      </Section>

      {/* ── Badges CSS ── */}
      <Section title="Badges CSS (globals.css)">
        <div className="flex flex-wrap gap-3">
          <span className="badge basico">Básico</span>
          <span className="badge intermedio">Intermedio</span>
          <span className="badge avanzado">Avanzado</span>
          <span className="badge en-vivo">En vivo</span>
          <span className="badge grabada">Grabada</span>
          <span className="badge teoria">Teoría</span>
          <span className="badge analisis">Análisis</span>
        </div>
      </Section>

      {/* ── Course Card ── */}
      <Section title="Course Card (globals.css)">
        <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {SAMPLE_CARDS.map((card, i) => (
            <div key={i} className="course-card">
              <div className="c-img-wrap">
                <div
                  className="c-img"
                  style={{
                    background: `url(https://img.youtube.com/vi/${card.youtubeId}/mqdefault.jpg) center/cover no-repeat`,
                  }}
                />
                <div className="c-img-badges">
                  <span className={`badge ${card.nivel}`}>{card.nivelLabel}</span>
                </div>
              </div>
              <div className="c-body">
                <div className="c-title">{card.title}</div>
                <div className="c-instructor">
                  <div className="c-av">P</div>
                  <span className="c-name">Perep</span>
                </div>
              </div>
              <Link href={card.slug} className="c-cta">
                Ver clase
                <span className="c-cta-arr">
                  <Arr11 />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ── ArticleCard ── */}
      <Section title="ArticleCard">
        <div className="grid sm:grid-cols-2 gap-6">
          <ArticleCard
            title="Cómo jugar Aces preflop en torneos de poker"
            excerpt="Descubre las líneas óptimas cuando sostienes el mejor starting hand en distintas posiciones y stack depths."
            date="2025-03-15"
            category="Estrategia"
            readTime={5}
            href="#"
          />
          <ArticleCard
            title="Sin imagen — fallback SVG"
            excerpt="Este artículo muestra el placeholder cuando no hay imagen disponible."
            date="2025-06-01"
            category="Análisis"
            readTime="8 min"
            href="#"
          />
        </div>
      </Section>
    </main>
  )
}
