'use client'

import React, { useState } from 'react'

interface ShareButtonsProps {
  shareUrl: string
  shareText: string
  youtubeChannelUrl: string
}

export function ShareButtons({ shareUrl, shareText, youtubeChannelUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedText = encodeURIComponent(shareText)

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 999,
    border: '1px solid #e7e6e6',
    fontSize: 12,
    fontWeight: 500,
    textDecoration: 'none',
    background: '#fff',
    cursor: 'pointer',
    fontFamily: 'inherit',
  }

  return (
    <>
      {/* ── Botones de compartir ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 32,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            color: '#b8b7b7',
            marginRight: 4,
          }}
        >
          Compartir
        </span>

        <a
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnStyle, color: '#25D366' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>

        <a
          href={`https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnStyle, color: '#1d1d1d' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X
        </a>

        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnStyle, color: '#0088cc' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          Telegram
        </a>

        <button
          onClick={handleCopy}
          style={{
            ...btnStyle,
            color: copied ? '#CC1A1A' : '#575757',
            borderColor: copied ? '#CC1A1A' : '#e7e6e6',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? '¡Copiado!' : 'Copiar enlace'}
        </button>
      </div>

      {/* ── Seguir en YouTube ── */}
      <a
        href={youtubeChannelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="yt-follow-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 20px',
          background: '#fff',
          border: '1px solid #e7e6e6',
          borderRadius: 'var(--r-l)',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: '#FF0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1d' }}>Síguenos en YouTube</div>
          <div style={{ fontSize: 12, color: '#b8b7b7' }}>@ninjapokeracademy</div>
        </div>
        <style>{`.yt-follow-btn:hover { border-color: #FF0000; box-shadow: 0 4px 16px rgba(255,0,0,.08); }`}</style>
      </a>
    </>
  )
}
