import type { Metadata } from 'next'
import { Zap, BookOpen, BarChart2 } from 'lucide-react'

import { getMeUser } from '@/utilities/getMeUser'
import { Badge, type BadgeVariant } from '@/components/Badge'
import { Button } from '@/components/Button'
import { ArticleCard } from '@/components/ArticleCard'
import { ClassCard } from '@/components/ClassCard'
import { Input } from '@/components/Input'
import { FilterPillsDemo } from './FilterPillsDemo'

export const metadata: Metadata = {
  title: 'Style Guide — NPA',
  robots: { index: false, follow: false },
}

// ── helpers ──────────────────────────────────────────────────────────────────

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

// ── page ─────────────────────────────────────────────────────────────────────

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
              font-display / JetBrains Mono — display/headings
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
          {/* estados */}
          <div className="flex flex-wrap gap-3 items-center">
            <Button>Normal</Button>
            <Button active>Activo (rojo)</Button>
            <Button disabled>Disabled</Button>
          </div>
          {/* tamaños */}
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          {/* como link */}
          <div>
            <Button href="#">Como enlace (href)</Button>
          </div>
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

      {/* ── FilterPills ── */}
      <Section title="FilterPills">
        <FilterPillsDemo />
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

      {/* ── ClassCard ── */}
      <Section title="ClassCard">
        <div className="grid sm:grid-cols-2 gap-6">
          <ClassCard
            title="Blind vs Blind: la guerra de los ciegos"
            youtubeId="dQw4w9WgXcQ"
            badges={[{ variant: 'intermedio' }, { variant: 'teoria' }]}
            teacher="Perep"
            duration="38:24"
            href="#"
          />
          <ClassCard
            title="Spot de torneo: ICM pressure en final table"
            youtubeId="dQw4w9WgXcQ"
            badges={[{ variant: 'avanzado' }, { variant: 'analisis' }]}
            teacher="Perep"
            duration="52:10"
            href="#"
          />
        </div>
      </Section>
    </main>
  )
}
