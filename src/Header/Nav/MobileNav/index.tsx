'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

interface MobileNavProps {
  data: HeaderType
}

export const MobileNav: React.FC<MobileNavProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = data?.navItems || []

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((v) => !v)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="md:hidden">
      {/* Botón hamburguesa */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          border: '1px solid #e7e6e6',
          background: '#fff',
          cursor: 'pointer',
          color: '#1d1d1d',
          transition: 'background .2s',
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Panel full-screen */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header del panel */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              height: '64px',
              borderBottom: '1px solid #e7e6e6',
              flexShrink: 0,
            }}
          >
            <Link
              href="/"
              onClick={closeMenu}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: '#1d1d1d',
                textDecoration: 'none',
              }}
            >
              Ninja Poker Academy
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Cerrar menú"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid #e7e6e6',
                background: '#f4f4f4',
                cursor: 'pointer',
                color: '#1d1d1d',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Links de navegación */}
          <nav
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 20px',
              gap: '4px',
              overflowY: 'auto',
            }}
          >
            {navItems.map(({ link }, i) => (
              <div
                key={i}
                onClick={closeMenu}
                style={{
                  borderBottom: '1px solid #f4f4f4',
                }}
              >
                <CMSLink {...link} appearance="link" className="npa-mobile-link" />
              </div>
            ))}
          </nav>

          {/* CTA al fondo */}
          <div
            style={{
              padding: '20px',
              borderTop: '1px solid #e7e6e6',
              flexShrink: 0,
            }}
          >
            <Link
              href="/contacto"
              onClick={closeMenu}
              className="btn red"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span className="btn-text">Quiero unirme</span>
              <span className="btn-fill" />
              <span className="btn-circle">
                <span className="btn-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" className="btn-arrow" />
                  </svg>
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .npa-mobile-link {
          display: block;
          padding: 16px 0;
          font-size: 18px;
          font-weight: 600;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: .06em;
          color: #1d1d1d;
          text-decoration: none;
          transition: color .2s;
        }
        .npa-mobile-link:hover {
          color: #CC1A1A;
        }
      `}</style>
    </div>
  )
}
