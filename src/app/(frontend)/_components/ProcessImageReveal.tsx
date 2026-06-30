'use client'
import React, { useEffect, useRef } from 'react'

interface Props {
  src: string
  alt: string
}

export function ProcessImageReveal({ src, alt }: Props) {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const processSection = document.querySelector('.process') as HTMLElement | null
    if (!processSection) return

    const onScroll = () => {
      const rect = processSection.getBoundingClientRect()
      const windowH = window.innerHeight
      const totalScroll = rect.height - windowH
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      const radius = 8 + progress * 142
      img.style.clipPath = `circle(${radius}% at 50% 50%)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'circle(8% at 50% 50%)',
          willChange: 'clip-path',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  )
}
