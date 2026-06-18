'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { useScrollY } from '@/hooks/useScrollY'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const scrollY = useScrollY()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const hasScrolled = scrollY > 0

  return (
    <header
      className={`sticky top-0 z-20 transition-all duration-200 ${
        hasScrolled
          ? 'bg-background/80 shadow-sm backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <HeaderNav data={data} />
    </header>
  )
}
