import React from 'react'
import Link from 'next/link'

export type ButtonSize = 'sm' | 'md' | 'lg'

const CLIP_PATH =
  'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-[11px]',
  md: 'px-5 py-[9px] text-[12px]',
  lg: 'px-6 py-3 text-[13px]',
}

interface ButtonProps {
  size?: ButtonSize
  href?: string
  target?: string
  rel?: string
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  active?: boolean
  'aria-label'?: string
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  href,
  target,
  rel,
  children,
  className = '',
  onClick,
  disabled,
  type = 'button',
  active = false,
  'aria-label': ariaLabel,
}) => {
  const base = [
    'inline-flex items-center justify-center gap-1.5',
    'font-display font-bold uppercase tracking-[0.06em]',
    'bg-background text-foreground',
    'border border-[1.5px]',
    active ? 'border-npa-red text-npa-red' : 'border-border',
    'hover:bg-[#EFEDE8] dark:hover:bg-white/10',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-npa-red focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'active:scale-[0.98]',
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style = { clipPath: CLIP_PATH }

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={base}
        style={style}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={base}
      style={style}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
