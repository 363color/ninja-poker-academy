'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { CMSLink } from '@/components/Link'

import type { Header as HeaderType } from '@/payload-types'

interface MobileNavProps {
  data: HeaderType
}

export const MobileNav: React.FC<MobileNavProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = data?.navItems || []

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden flex items-center relative">
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="p-2 text-foreground hover:bg-secondary rounded-md transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
          <nav className="py-4 flex flex-col gap-2 px-4">
            {navItems.map(({ link }, i) => {
              return (
                <div key={i} onClick={closeMenu}>
                  <CMSLink
                    {...link}
                    appearance="link"
                    className="uppercase tracking-widest text-foreground hover:text-npa-red transition-colors font-display text-sm block py-2"
                  />
                </div>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
