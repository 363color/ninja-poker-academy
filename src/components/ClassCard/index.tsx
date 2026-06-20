import React from 'react'
import Link from 'next/link'
import { Badge, type BadgeVariant } from '@/components/Badge'
import { Button } from '@/components/Button'

const CARD_CLIP =
  'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
const PLAY_CLIP = 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)'

export interface BadgeConfig {
  variant: BadgeVariant
  label?: string
}

export interface ClassCardProps {
  title: string
  youtubeId?: string
  badges?: BadgeConfig[]
  href?: string
  teacher?: string
  duration?: string
  className?: string
}

export const ClassCard: React.FC<ClassCardProps> = ({
  title,
  youtubeId,
  badges = [],
  href = '#',
  teacher,
  duration,
  className = '',
}) => {
  const meta = [teacher, duration].filter(Boolean).join(' · ')

  return (
    <div style={{ position: 'relative' }} className={className}>

      {/* Cuerpo de la card */}
      <div
        style={{
          background: 'var(--background)',
          border: '0.5px solid var(--border)',
          clipPath: CARD_CLIP,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Thumbnail */}
        <Link href={href} style={{ display: 'block' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: youtubeId ? '#0D0D0D' : '#150505',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Imagen YouTube a opacity 0.45 */}
            {youtubeId && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.45,
                }}
              />
            )}

            {/* Play button — sólido si hay imagen, ghost si no */}
            {youtubeId ? (
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: '#CC1A1A',
                  clipPath: PLAY_CLIP,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderLeft: '10px solid #F3F0EB',
                    marginLeft: 3,
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: 'transparent',
                  border: '2px solid #CC1A1A',
                  clipPath: PLAY_CLIP,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                  opacity: 0.4,
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderLeft: '10px solid #CC1A1A',
                    marginLeft: 3,
                  }}
                />
              </div>
            )}
          </div>
        </Link>

        {/* Contenido de texto */}
        <div style={{ padding: '14px 16px' }}>
          {badges.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              {badges.map((b, i) => (
                <Badge key={i} variant={b.variant} label={b.label} />
              ))}
            </div>
          )}

          <Link href={href}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--foreground)',
                margin: '0 0 6px',
                lineHeight: 1.4,
              }}
            >
              {title}
            </p>
          </Link>

          {meta && (
            <p
              style={{
                fontSize: 11,
                color: 'var(--foreground)',
                opacity: 0.5,
                margin: '0 0 12px',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              {meta}
            </p>
          )}

          <Button href={href} className="w-full">
            Ver clase
          </Button>
        </div>
      </div>
    </div>
  )
}
