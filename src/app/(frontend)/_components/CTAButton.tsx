'use client'
import React from 'react'
import Link from 'next/link'

interface Props {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'ghost'
}

export function CTAButton({ href, children, className = '', variant = 'primary' }: Props) {
  if (variant === 'ghost') {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-2 font-display font-bold uppercase tracking-widest text-[12px] border px-7 py-3.5 rounded-full hover:bg-secondary transition-colors duration-200 ${className}`}
        style={{ borderColor: 'var(--border)' }}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center gap-3 font-display font-bold uppercase tracking-widest text-[12px] text-white overflow-hidden group rounded-full ${className}`}
      style={{ background: 'var(--npa-red)', padding: '14px 18px 14px 28px' }}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="#CC1A1A"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className="absolute inset-0 bg-white/15 translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-full"
        aria-hidden="true"
      />
    </Link>
  )
}
