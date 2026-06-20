import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-display font-bold uppercase tracking-widest text-foreground/70"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full bg-background text-foreground text-[13px]',
            'placeholder:text-foreground/40',
            'outline-none rounded-none',
            'transition-colors duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-[0.5px] border-red-400 border-l-[3px] border-l-red-500' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            padding: '9px 12px',
            border: error ? undefined : '0.5px solid color-mix(in oklch, var(--border) 80%, transparent)',
            borderLeft: error ? undefined : '3px solid var(--npa-red)',
          }}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'
