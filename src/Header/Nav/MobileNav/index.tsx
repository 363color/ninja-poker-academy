'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

interface MobileNavProps {
  data: HeaderType
}

export const MobileNav: React.FC<MobileNavProps> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const navItems = data?.navItems || []
  const panelRef = useRef<HTMLDivElement>(null)

  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="md:hidden">
      {/* ── Hamburger button ── */}
      <button
        onClick={toggle}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          border: '1.5px solid rgba(0,0,0,.12)',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 5,
          padding: 0,
          transition: 'border-color .2s',
        }}
      >
        <span
          style={{
            display: 'block',
            width: 18,
            height: 1.5,
            background: '#1d1d1d',
            borderRadius: 2,
            transition: 'transform .25s, opacity .25s',
            transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }}
        />
        <span
          style={{
            display: 'block',
            width: 18,
            height: 1.5,
            background: '#1d1d1d',
            borderRadius: 2,
            transition: 'opacity .25s',
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: 'block',
            width: 18,
            height: 1.5,
            background: '#1d1d1d',
            borderRadius: 2,
            transition: 'transform .25s, opacity .25s',
            transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            background: 'rgba(0,0,0,.35)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* ── Slide-in panel ── */}
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 200,
          width: 'min(320px, 85vw)',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,.15)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
          willChange: 'transform',
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: 64,
            borderBottom: '1px solid #f0f0f0',
            flexShrink: 0,
          }}
        >
          <Link
            href="/"
            onClick={close}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: '#1d1d1d',
              textDecoration: 'none',
            }}
          >
            Ninja Poker Academy
          </Link>
          <button
            onClick={close}
            aria-label="Cerrar menú"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: '1px solid #e7e6e6',
              background: '#f9f9f9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#575757',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 0',
          }}
        >
          {navItems.map(({ link }, i) => (
            <div key={i} onClick={close} style={{ borderBottom: '1px solid #f9f9f9' }}>
              <CMSLink {...link} appearance="link" className="npa-mobile-link" />
            </div>
          ))}
        </nav>

        {/* CTA footer */}
        <div
          style={{
            padding: 20,
            borderTop: '1px solid #f0f0f0',
            flexShrink: 0,
            background: '#fff',
          }}
        >
          <Link
            href="/contacto"
            onClick={close}
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

      <style>{`
        .npa-mobile-link {
          display: block;
          padding: 16px 24px;
          font-size: 15px;
          font-weight: 600;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: .06em;
          color: #1d1d1d;
          text-decoration: none;
          transition: color .15s, background .15s;
        }
        .npa-mobile-link:hover,
        .npa-mobile-link:active {
          color: #CC1A1A;
          background: #fdf5f5;
        }
      `}</style>
    </div>
  )
}
