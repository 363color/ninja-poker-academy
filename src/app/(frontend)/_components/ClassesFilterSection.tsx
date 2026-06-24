'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FilterPills, type FilterOption } from '@/components/FilterPills'
import { ClassCard } from '@/components/ClassCard'

const FILTER_OPTIONS: FilterOption[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Preflop', value: 'preflop' },
  { label: 'Postflop', value: 'postflop' },
  { label: 'Análisis de manos', value: 'analisis-manos' },
  { label: 'Estadísticas', value: 'estadisticas' },
  { label: 'Mental game', value: 'mental-game' },
  { label: 'Bankroll', value: 'bankroll' },
]

const CLASSES = [
  {
    title: 'Fundamentos del preflop: rangos de apertura por posición en cash game',
    youtubeId: 'placeholder',
    badges: [{ variant: 'basico' as const }, { variant: 'vivo' as const }],
    teacher: 'Nuestro equipo · NPA',
    duration: '38:00',
    href: '/clases',
  },
  {
    title: 'Cómo leer el HUD: los stats más importantes en NL50',
    youtubeId: 'placeholder',
    badges: [{ variant: 'intermedio' as const }, { variant: 'grabada' as const }],
    teacher: 'Nuestro equipo · NPA',
    duration: '52:00',
    href: '/clases',
  },
  {
    title: 'Bluff catching en el river: cómo leer al villano y tomar la decisión correcta',
    youtubeId: 'placeholder',
    badges: [{ variant: 'avanzado' as const }, { variant: 'grabada' as const }],
    teacher: 'Nuestro equipo · NPA',
    duration: '44:00',
    href: '/clases',
  },
  {
    title: 'Gestión del tilt: técnicas para mantener el foco en sesiones largas',
    youtubeId: 'placeholder',
    badges: [{ variant: 'basico' as const }, { variant: 'vivo' as const }],
    teacher: 'Nuestro equipo · NPA',
    duration: '35:00',
    href: '/clases',
  },
]

export function ClassesFilterSection() {
  const [filter, setFilter] = useState('todos')

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <FilterPills options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        <Link
          href="/clases"
          className="font-display font-bold uppercase text-[11px] tracking-wider whitespace-nowrap hover:underline"
          style={{ color: 'var(--npa-red)' }}
        >
          Ver todas →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CLASSES.map((cls, i) => (
          <ClassCard key={i} {...cls} />
        ))}
      </div>
    </>
  )
}
