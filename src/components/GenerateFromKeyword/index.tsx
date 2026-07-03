'use client'

import React, { useState } from 'react'

const CATEGORIES = [
  { value: 'fundamentos', label: 'Fundamentos' },
  { value: 'preflop', label: 'Preflop' },
  { value: 'postflop', label: 'Postflop' },
  { value: 'analisis-manos', label: 'Análisis de manos' },
  { value: 'mental-game', label: 'Mental game' },
  { value: 'estadisticas', label: 'Estadísticas' },
  { value: 'bankroll', label: 'Bankroll' },
]

export const GenerateFromKeyword: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState('fundamentos')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (!keyword.trim()) {
      setMessage('Escribe una keyword')
      setStatus('error')
      return
    }

    const confirmed = window.confirm(
      `¿Generar artículo para la keyword "${keyword}"?\n\nSe creará como borrador.`,
    )
    if (!confirmed) return

    setStatus('loading')
    setMessage('Generando artículo con IA... 15-30 segundos.')

    try {
      const response = await fetch('/api/pipeline/generate-from-keyword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ keyword, topic, category }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Error desconocido')

      setStatus('success')
      setMessage(`✅ Artículo creado: "${data.article.title}"\n\nRevísalo en Posts → Borradores`)
      setKeyword('')
      setTopic('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 6,
    marginBottom: 12,
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
    marginBottom: 4,
    display: 'block',
  }

  return (
    <div style={{ maxWidth: 500, padding: '24px 0' }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
        📝 Generar artículo desde keyword
      </h3>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>
        Escribe una keyword SEO y opcionalmente un tema. La IA genera un artículo
        de 1000-1500 palabras como borrador en /estrategia/.
      </p>

      <label style={labelStyle}>Keyword principal *</label>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="ej: cómo jugar poker texas holdem"
        style={inputStyle}
      />

      <label style={labelStyle}>Tema / contexto adicional (opcional)</label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="ej: guía para principiantes con ejemplos prácticos"
        style={inputStyle}
      />

      <label style={labelStyle}>Categoría</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{
          width: '100%',
          padding: '12px 20px',
          backgroundColor: status === 'loading' ? '#999' : '#CC1A1A',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {status === 'loading' ? '⏳ Generando...' : '🚀 Generar artículo'}
      </button>

      {message && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 6,
            fontSize: 13,
            lineHeight: 1.5,
            whiteSpace: 'pre-line',
            backgroundColor:
              status === 'success' ? '#e8f5e9' : status === 'error' ? '#fce4ec' : '#e3f2fd',
            color:
              status === 'success' ? '#2e7d32' : status === 'error' ? '#c62828' : '#1565c0',
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}
