import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'
import { CookiePreferencesButton } from '@/components/CookieConsent/PreferencesButton'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { SiYoutube, SiInstagram, SiTiktok, SiTelegram, SiDiscord } from 'react-icons/si'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Clases', href: '/clases' },
  { label: 'Estrategia', href: '/estrategia' },
  { label: 'Comunidad', href: '/comunidad' },
  { label: 'Contacto', href: '/contacto' },
]

const temaLinks = [
  { label: 'Preflop', href: '/clases?tema=preflop' },
  { label: 'Postflop', href: '/clases?tema=postflop' },
  { label: 'Análisis de manos', href: '/clases?tema=analisis-manos' },
  { label: 'Estadísticas', href: '/clases?tema=estadisticas' },
  { label: 'Mental game', href: '/clases?tema=mental-game' },
  { label: 'Bankroll', href: '/estrategia?tema=bankroll' },
]

const legalLinks = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Juego responsable', href: '/juego-responsable' },
  { label: 'Aviso legal', href: '/aviso-legal' },
]

const socialLinks = [
  { icon: SiYoutube, href: 'https://youtube.com/@ninjapokeracademy', title: 'YouTube' },
  { icon: SiInstagram, href: 'https://instagram.com/ninjapokeracademy', title: 'Instagram' },
  { icon: SiTiktok, href: 'https://tiktok.com/@ninjapokeracademy', title: 'TikTok' },
  { icon: SiTelegram, href: 'https://t.me/ninjapokeracademy', title: 'Telegram' },
  { icon: SiDiscord, href: '/contacto', title: 'Discord' },
]

function FooterCol({ label, links }: { label: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">{label}</p>
      <nav className="flex flex-col gap-2.5">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-[14px] font-medium text-white/40 hover:text-white transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-auto bg-npa-black text-white">
      <div className="container">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-10">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <Logo priority={false} width={40} height={40} />
              <span className="font-display font-bold text-[11px] uppercase tracking-[0.08em] text-white">
                Ninja Poker Academy
              </span>
            </Link>
            <p className="text-[14px] text-white/40 leading-relaxed">
              Academia de cash game en español. Clases diarias, revisión de manos y seguimiento real
              para jugadores de todos los niveles.
            </p>
            <div className="flex gap-2 mt-1">
              {socialLinks.map(({ icon: Icon, href, title }) => (
                <Link
                  key={title}
                  href={href}
                  title={title}
                  className="w-[34px] h-[34px] rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:border-npa-red hover:text-white transition-colors"
                  {...(href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Navegación */}
          <FooterCol label="Navegación" links={navLinks} />

          {/* Col 3: Temas */}
          <FooterCol label="Temas" links={temaLinks} />

          {/* Col 4: Legal + cookies + +18 + logos */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/30">
                Legal
              </p>
              <nav className="flex flex-col gap-2.5">
                {legalLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[14px] font-medium text-white/40 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <div className="[&>button]:text-[14px] [&>button]:font-medium [&>button]:text-white/40 [&>button]:hover:text-white [&>button]:transition-colors [&>button]:p-0 [&>button]:bg-transparent [&>button]:border-0 [&>button]:cursor-pointer [&>button]:text-left">
                  <CookiePreferencesButton />
                </div>
              </nav>
            </div>

            {/* +18 */}
            <div className="flex items-start gap-3 pt-2 border-t border-white/10">
              <span className="text-xl font-display font-bold text-npa-red leading-none mt-0.5">
                +18
              </span>
              <p className="text-[11px] text-white/30 leading-relaxed">
                Solo para mayores de 18 años. Verifica las leyes locales antes de participar.
              </p>
            </div>

            {/* Logos juego responsable */}
            <div className="flex items-center gap-4">
              <Link
                href="https://www.gamcare.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GamCare"
              >
                <Image
                  src="/media/GamCare.svg"
                  alt="GamCare"
                  width={72}
                  height={28}
                  className="opacity-40 hover:opacity-70 transition-opacity"
                />
              </Link>
              <Link
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BeGambleAware"
              >
                <Image
                  src="/media/gambleaware_logos.svg"
                  alt="BeGambleAware"
                  width={100}
                  height={28}
                  className="opacity-40 hover:opacity-70 transition-opacity"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/25">
          <p>© {new Date().getFullYear()} [NOMBRE DE LA EMPRESA]. Todos los derechos reservados.</p>
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
