'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { MobileNav } from './MobileNav'
import { Logo } from '@/components/Logo/Logo'
import { useScrollY } from '@/hooks/useScrollY'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const scrollY = useScrollY()
  const scrolled = scrollY > 10

  return (
    <div
      style={{
        position: 'fixed',
        inset: '0 0 auto',
        zIndex: 100,
        transition: 'background .3s, padding .3s, box-shadow .3s',
        background: scrolled ? '#fff' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 #e7e6e6' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          height: '64px',
        }}
      >
        {/* ── Logo izquierda ── */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: '#1d1d1d',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Logo priority={true} width={44} height={44} />
          <span className="hidden sm:inline">Ninja Poker Academy</span>
        </Link>

        {/* ── Nav links centro ── */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '4px' }}>
          {navItems.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="link" className="npa-nav-link" />
          ))}
        </nav>

        {/* ── CTA + Mobile ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Botón Quiero unirme — estilo exacto del mockup */}
          <Link href="/contacto" className="npa-header-cta hidden md:inline-flex">
            <span className="npa-btn-text">Quiero unirme</span>
            <span className="npa-btn-fill" />
            <span className="npa-btn-circle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" className="npa-btn-arrow" />
              </svg>
            </span>
          </Link>

          <MobileNav data={data} />
        </div>
      </div>

      {/* ── Estilos del Header ── */}
      <style>{`
        /* Nav links */
        .npa-nav-link {
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #575757;
          border-radius: 999px;
          text-decoration: none;
          transition: color .2s, background .2s;
          white-space: nowrap;
          display: inline-block;
        }
        .npa-nav-link:hover {
          color: #1d1d1d;
          background: #f4f4f4;
        }

        /* CTA Button */
        .npa-header-cta {
          padding: 0 2px 0 20px;
          gap: 16px;
          border: 2px solid #CC1A1A;
          background: #CC1A1A;
          color: #fff;
          border-radius: 999px;
          align-items: center;
          height: 48px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: color .35s;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .05em;
          text-transform: uppercase;
        }
        .npa-header-cta:hover { color: #CC1A1A; }

        .npa-btn-text {
          z-index: 1;
          position: relative;
          white-space: nowrap;
        }
        .npa-btn-fill {
          z-index: 0;
          background: #fff;
          border-radius: 50px;
          position: absolute;
          inset: 0 0 0 auto;
          width: 0;
          height: 100%;
          transition: width .4s cubic-bezier(.4,0,.2,1);
        }
        .npa-header-cta:hover .npa-btn-fill { width: 100%; }

        .npa-btn-circle {
          background: #fff;
          border-radius: 999px;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          display: flex;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          transition: background .3s;
        }
        .npa-header-cta:hover .npa-btn-circle { background: #CC1A1A; }

        .npa-btn-arrow {
          stroke: #CC1A1A;
          transition: stroke .3s;
        }
        .npa-header-cta:hover .npa-btn-arrow { stroke: #fff; }
        @media (max-width: 900px) {
  .npa-header-cta {
    font-size: 12px;
    padding: 0 2px 0 12px;
    height: 40px;
    gap: 8px;
    letter-spacing: 0;
  }
  .npa-btn-circle {
    width: 32px;
    height: 32px;
  }
}
@media (max-width: 768px) {
  .npa-header-cta {
    display: none !important;
  }
}
  @media (min-width: 769px) {
  .npa-header-cta { display: inline-flex !important; }
}
      `}</style>
    </div>
  )
}
