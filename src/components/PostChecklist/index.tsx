'use client'

import React, { useState } from 'react'

const PASOS = [
  {
    id: 'paso1',
    emoji: '1️⃣',
    titulo: 'Generar en WordHero o Claude',
    desc: 'Brand voice NPA activa. Pegar texto plano en Claude para estructurar.',
  },
  {
    id: 'paso2',
    emoji: '2️⃣',
    titulo: 'Pegar título y slug',
    desc: 'Título con keyword principal. Slug sin tildes ni caracteres especiales.',
  },
  {
    id: 'paso3',
    emoji: '3️⃣',
    titulo: 'Pegar contenido estructurado',
    desc: 'H2s y H3s con keywords secundarias. CTA al final del artículo.',
  },
  {
    id: 'paso4',
    emoji: '4️⃣',
    titulo: 'Subir imagen de portada',
    desc: 'Usar prompt de Claude en Midjourney. Subir en campo Hero Image.',
  },
  {
    id: 'paso5',
    emoji: '5️⃣',
    titulo: 'Escribir alt text de portada',
    desc: 'Usar el alt text exacto que te dio Claude. Máx. 125 caracteres.',
  },
  {
    id: 'paso6',
    emoji: '6️⃣',
    titulo: 'Subir imágenes internas',
    desc: 'Una imagen por cada sección indicada en el brief de Claude.',
  },
  {
    id: 'paso7',
    emoji: '7️⃣',
    titulo: 'Asignar categoría y relacionados',
    desc: 'Categoría correcta. Al menos 2 artículos relacionados si existen.',
  },
  {
    id: 'paso8',
    emoji: '8️⃣',
    titulo: 'Completar SEO (pestaña SEO)',
    desc: 'Meta title y meta description exactos del brief de Claude.',
  },
  {
    id: 'paso9',
    emoji: '9️⃣',
    titulo: 'Publicar y verificar',
    desc: 'Cambiar a Published. Verificar en /estrategia/[slug]/ que todo se ve bien.',
  },
]

export function PostChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const done = PASOS.filter((p) => checked[p.id]).length
  const pct = Math.round((done / PASOS.length) * 100)

  return (
    <div style={{ padding: '16px 0 24px', maxWidth: 600 }}>
      {/* Barra de progreso */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.08em',
              color: '#6b7280',
              textTransform: 'uppercase',
            }}
          >
            Progreso de publicación
          </span>
          <span
            style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? '#059669' : '#CC1A1A' }}
          >
            {done}/{PASOS.length} — {pct}%
          </span>
        </div>
        <div style={{ height: 6, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: pct === 100 ? '#059669' : '#CC1A1A',
              borderRadius: 999,
              transition: 'width .3s ease',
            }}
          />
        </div>
        {pct === 100 && (
          <p
            style={{
              fontSize: 12,
              color: '#059669',
              fontWeight: 600,
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            ✅ Artículo listo para publicar
          </p>
        )}
      </div>

      {/* Lista */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PASOS.map((paso) => {
          const isChecked = !!checked[paso.id]
          return (
            <div
              key={paso.id}
              onClick={() => toggle(paso.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                border: `1px solid ${isChecked ? '#bbf7d0' : '#e5e7eb'}`,
                background: isChecked ? '#f0fdf4' : '#fafafa',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {/* Checkbox visual */}
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  flexShrink: 0,
                  marginTop: 2,
                  border: `2px solid ${isChecked ? '#059669' : '#d1d5db'}`,
                  background: isChecked ? '#059669' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all .15s',
                }}
              >
                {isChecked && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* Texto */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span>{paso.emoji}</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isChecked ? '#9ca3af' : '#111827',
                      textDecoration: isChecked ? 'line-through' : 'none',
                    }}
                  >
                    {paso.titulo}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>
                  {paso.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ fontSize: 11, color: '#d1d5db', marginTop: 16, marginBottom: 0 }}>
        ℹ️ El checklist es visual — no se guarda al cerrar el editor.
      </p>
    </div>
  )
}
