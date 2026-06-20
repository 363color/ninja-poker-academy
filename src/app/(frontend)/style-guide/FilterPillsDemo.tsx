'use client'

import React, { useState } from 'react'
import { FilterPills, type FilterOption } from '@/components/FilterPills'

const OPTIONS: FilterOption[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Teoría', value: 'teoria' },
  { label: 'Análisis', value: 'analisis' },
  { label: 'En vivo', value: 'vivo' },
  { label: 'Torneos', value: 'torneos' },
]

export function FilterPillsDemo() {
  const [active, setActive] = useState('all')
  return <FilterPills options={OPTIONS} value={active} onChange={setActive} />
}
