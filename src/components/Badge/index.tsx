import React from 'react'
import type { LucideIcon } from 'lucide-react'

export type BadgeVariant =
  | 'basico'
  | 'intermedio'
  | 'avanzado'
  | 'vivo'
  | 'grabada'
  | 'teoria'
  | 'analisis'

const variantClasses: Record<BadgeVariant, string> = {
  basico:
    'bg-[#E6F1FB] text-[#0C447C] dark:bg-[#0C447C]/25 dark:text-[#7BBAF5]',
  intermedio:
    'bg-[#FAEEDA] text-[#633806] dark:bg-[#633806]/25 dark:text-[#F0A84B]',
  avanzado:
    'bg-[#FCEBEB] text-[#791F1F] dark:bg-[#791F1F]/25 dark:text-[#E87070]',
  vivo:
    'bg-[#EAF3DE] text-[#27500A] dark:bg-[#27500A]/25 dark:text-[#7CC94A]',
  grabada:
    'bg-[#EEEDFE] text-[#3C3489] dark:bg-[#3C3489]/25 dark:text-[#9B94F5]',
  teoria:
    'bg-foreground/10 text-foreground/60',
  analisis:
    'bg-[#FDEAED] text-[#7A1F2E] dark:bg-[#7A1F2E]/25 dark:text-[#E87080]',
}

const variantLabels: Record<BadgeVariant, string> = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
  vivo: 'En vivo',
  grabada: 'Grabada',
  teoria: 'Teoría',
  analisis: 'Análisis',
}

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  icon?: LucideIcon
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  label,
  icon: Icon,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-[5px] font-display font-bold uppercase text-[10px] leading-none tracking-[0.05em] ${variantClasses[variant]} ${className}`}
      style={{
        padding: '4px 10px 4px 8px',
        clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
      }}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {label ?? variantLabels[variant]}
    </span>
  )
}
