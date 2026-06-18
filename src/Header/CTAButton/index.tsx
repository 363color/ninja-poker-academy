'use client'

import React from 'react'
import Link from 'next/link'

export const CTAButton: React.FC = () => {
  return (
    <Link
      href="/contacto"
      className="hidden sm:inline-flex px-6 py-2.5 bg-gradient-to-r from-npa-red to-npa-black text-npa-cream font-semibold uppercase tracking-widest text-sm rounded-md hover:from-npa-black hover:to-npa-red hover:scale-105 hover:shadow-lg transition-all duration-300"
    >
      Únete
    </Link>
  )
}
