'use client'

import React from 'react'

export interface FilterOption {
  label: string
  value: string
}

interface FilterPillsProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      className={`flex items-center flex-wrap gap-1.5 overflow-x-auto scrollbar-none ${className}`}
    >
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={[
              'inline-flex items-center whitespace-nowrap cursor-pointer rounded-none',
              'font-display font-semibold uppercase text-[11px] tracking-[0.04em]',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-npa-red focus-visible:ring-inset',
              isActive
                ? 'bg-transparent text-npa-red'
                : 'bg-transparent text-foreground hover:bg-[#EFEDE8] dark:hover:bg-white/10',
            ].join(' ')}
            style={{
              padding: '6px 14px',
              border: isActive
                ? '0.5px solid var(--npa-red)'
                : '0.5px solid var(--border)',
              borderBottom: isActive
                ? '2.5px solid var(--npa-red)'
                : '2.5px solid color-mix(in oklch, var(--border) 70%, var(--foreground) 30%)',
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
