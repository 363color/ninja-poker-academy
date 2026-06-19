import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'
import { CookiePreferencesButton } from '@/components/CookieConsent/PreferencesButton'
import { SocialLinks } from '@/Header/SocialLinks'

const legalLinks = [
  { label: 'Política de Privacidad', href: '/privacidad' },
  { label: 'Política de Cookies', href: '/cookies' },
  { label: 'Términos y Condiciones', href: '/terminos' },
  { label: 'Juego Responsable', href: '/juego-responsable' },
  { label: 'Aviso Legal', href: '/aviso-legal' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Col 1: Logo + Legal navigation */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Ninja Poker Academy">
              <Logo />
            </Link>
            <nav aria-label="Legal" className="flex flex-col gap-2">
              {legalLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 2: Social links */}
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-widest text-white/40 font-display">
              Síguenos
            </p>
            <SocialLinks
              className="flex flex-wrap gap-5 items-center"
              linkClassName="text-white/60 hover:text-white transition-colors"
            />
          </div>

          {/* Col 3: 18+ / Responsible gambling */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-display font-bold text-npa-red leading-none">+18</span>
              <span className="text-sm text-white/60">
                Solo para mayores de{' '}
                <strong className="text-white/80">[EDAD MÍNIMA LEGAL]</strong> años
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              El juego en línea puede estar sujeto a restricciones según tu país de residencia.
              Verifica las leyes locales antes de participar. Este sitio opera bajo la regulación
              de <strong className="text-white/70">[ORGANISMO REGULADOR LOCAL]</strong>.
            </p>
            <div className="flex items-center gap-4 mt-1">
              <Link
                href="https://www.gamcare.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GamCare — Ayuda para el juego responsable"
              >
                <Image
                  src="/media/GamCare.svg"
                  alt="GamCare"
                  width={80}
                  height={32}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </Link>
              <Link
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BeGambleAware — Juega con responsabilidad"
              >
                <Image
                  src="/media/gambleaware_logos.svg"
                  alt="BeGambleAware"
                  width={120}
                  height={32}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} [NOMBRE DE LA EMPRESA]. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <CookiePreferencesButton />
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
