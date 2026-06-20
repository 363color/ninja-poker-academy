import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'

const CARD_CLIP =
  'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'

export interface ArticleCardImage {
  url: string
  alt?: string
}

export interface ArticleCardProps {
  title: string
  excerpt?: string
  date?: string
  category?: string
  readTime?: string | number
  href: string
  image?: ArticleCardImage
  className?: string
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  date,
  category,
  readTime,
  href,
  image,
  className = '',
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  const readTimeLabel =
    readTime != null
      ? typeof readTime === 'number'
        ? `${readTime} min`
        : readTime
      : null

  const metaParts = [
    formattedDate,
    readTimeLabel,
  ].filter(Boolean)

  return (
    <div
      style={{
        background: 'var(--background)',
        border: '0.5px solid var(--border)',
        clipPath: CARD_CLIP,
        position: 'relative',
        overflow: 'hidden',
      }}
      className={className}
    >
      {/* Imagen o fallback */}
      <Link href={href} style={{ display: 'block' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--muted)',
          }}
        >
          <Image
            src={image?.url ?? '/media/npa_article_fallback_thumbnail.svg'}
            alt={image?.alt ?? title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Contenido de texto */}
      <div style={{ padding: '14px 16px' }}>

        {/* Meta: categoría · fecha · tiempo de lectura */}
        {(category || metaParts.length > 0) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 6,
              marginBottom: 6,
              fontSize: 10,
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--foreground)',
              opacity: 0.5,
            }}
          >
            {category && (
              <span style={{ color: 'var(--npa-red)', fontWeight: 700, opacity: 1 }}>
                {category}
              </span>
            )}
            {category && metaParts.length > 0 && <span aria-hidden>·</span>}
            {metaParts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span aria-hidden>·</span>}
                {i === 0 && date ? (
                  <time dateTime={date}>{part}</time>
                ) : (
                  <span>{part}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Título */}
        <Link href={href} style={{ textDecoration: 'none' }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--foreground)',
              margin: '0 0 6px',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </p>
        </Link>

        {/* Excerpt */}
        {excerpt && (
          <p
            style={{
              fontSize: 11,
              color: 'var(--foreground)',
              opacity: 0.6,
              margin: '0 0 12px',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.02em',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {excerpt}
          </p>
        )}

        {/* CTA */}
        <Button href={href} className="w-full">
          Leer más
        </Button>
      </div>
    </div>
  )
}
