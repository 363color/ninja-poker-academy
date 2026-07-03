'use client'

import React, { useState, useCallback } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export const GenerateArticleButton: React.FC = () => {
  const { id } = useDocumentInfo()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleGenerate = useCallback(async () => {
    if (!id) {
      setMessage('Guarda el video primero antes de generar un artículo.')
      setStatus('error')
      return
    }

    const confirmed = window.confirm(
      '¿Generar un artículo de estrategia a partir de este video?\n\nSe creará como borrador en /estrategia/ para que lo revises antes de publicar.',
    )
    if (!confirmed) return

    setStatus('loading')
    setMessage('Generando artículo con IA... esto puede tardar 15-30 segundos.')

    try {
      const response = await fetch('/api/pipeline/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ videoId: id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error desconocido')
      }

      setStatus('success')
      setMessage(
        `✅ Artículo creado: "${data.article.title}"\n\nRevísalo en Posts → Borradores`,
      )
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Error generando artículo')
    }
  }, [id])

  return (
    <div
      style={{
        padding: '16px 0',
        borderTop: '1px solid #e0e0e0',
        marginTop: 8,
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: '#666',
          marginBottom: 12,
          lineHeight: 1.5,
        }}
      >
        Genera un artículo SEO de 800-1500 palabras a partir de este video.
        Se crea como borrador — revisa y publica cuando esté listo.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={status === 'loading'}
        style={{
          padding: '10px 20px',
          backgroundColor: status === 'loading' ? '#999' : '#CC1A1A',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          fontSize: 14,
          fontWeight: 600,
          width: '100%',
        }}
      >
        {status === 'loading' ? '⏳ Generando artículo...' : '📝 Generar artículo de estrategia'}
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
            color: status === 'success' ? '#2e7d32' : status === 'error' ? '#c62828' : '#1565c0',
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}
