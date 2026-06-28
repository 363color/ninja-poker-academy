'use client'

import React, { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

export function ArticleTOC({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!items.length) return
    const observers: IntersectionObserver[] = []
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-20% 0px -70% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [items])

  if (!items.length) return null

  return (
    <nav
      style={{
        background: '#fff',
        border: '1px solid #e7e6e6',
        borderRadius: 'var(--r-l)',
        padding: '20px 24px',
        marginBottom: 32,
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '.14em',
          color: '#b8b7b7',
          marginBottom: 12,
        }}
      >
        Contenido
      </p>
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setActive(item.id)
              }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                fontSize: 13,
                textDecoration: 'none',
                color: active === item.id ? '#CC1A1A' : '#575757',
                fontWeight: active === item.id ? 600 : 400,
                padding: '4px 0',
                paddingLeft: item.level === 'h3' ? 16 : 0,
                transition: 'color .15s',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: active === item.id ? '#CC1A1A' : '#b8b7b7',
                  flexShrink: 0,
                  fontWeight: 500,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
