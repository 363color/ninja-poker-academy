'use client'

import React from 'react'

export const CookiePreferencesButton: React.FC = () => {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).klaro) {
      ;(window as any).klaro.show()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="text-white text-sm underline hover:no-underline"
      type="button"
    >
      Personalizar cookies
    </button>
  )
}
