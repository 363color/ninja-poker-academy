'use client'

import React from 'react'
import { Search } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { MobileNav } from './MobileNav'
import { SocialLinks } from '../SocialLinks'
import { Logo } from '@/components/Logo/Logo'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <div className="container">
      <div className="relative flex items-center py-4 md:py-6">
        {/* Left: Logo — z-10 so it always renders above the pill if there's any brush at md */}
        <div className="flex-shrink-0 relative z-10">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo priority={true} width={64} height={64} />
          </Link>
        </div>

        {/* Center: absolutely centered relative to the container — always true viewport center */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center px-5 py-2.5 lg:px-8 lg:py-3 bg-card/80 backdrop-blur-sm rounded-full pointer-events-auto">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="uppercase tracking-widest text-foreground hover:text-npa-red transition-colors font-display text-sm whitespace-nowrap"
                />
              )
            })}
            <div className="hidden lg:flex ml-2 pl-3 border-l border-foreground/20">
              <button
                aria-label="Buscar"
                className="text-foreground hover:text-npa-red transition-colors flex items-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>

        {/* Right: SocialLinks + Mobile Menu */}
        <div className="ml-auto flex items-center gap-4">
          <SocialLinks />
          <MobileNav data={data} />
        </div>
      </div>
    </div>
  )
}
