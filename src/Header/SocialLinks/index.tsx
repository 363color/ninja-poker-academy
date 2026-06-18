'use client'

import React from 'react'
import Link from 'next/link'
import { SiYoutube, SiInstagram, SiDiscord, SiTelegram, SiTiktok } from 'react-icons/si'

export const SocialLinks: React.FC = () => {
  const socials = [
    { name: 'YouTube', url: 'https://youtube.com/@ninjapokeracademy', Icon: SiYoutube },
    { name: 'Instagram', url: 'https://instagram.com/ninjapokeracademy', Icon: SiInstagram },
    { name: 'Discord', url: '#', Icon: SiDiscord },
    { name: 'Telegram', url: 'https://t.me/Perep10', Icon: SiTelegram },
    { name: 'TikTok', url: 'https://tiktok.com/@ninjapokeracademy', Icon: SiTiktok },
  ]

  return (
    <div className="hidden lg:flex gap-4 items-center">
      {socials.map(({ name, url, Icon }) => (
        <Link
          key={name}
          href={url}
          target={url !== '#' ? '_blank' : undefined}
          rel={url !== '#' ? 'noopener noreferrer' : undefined}
          aria-label={name}
          className="text-foreground hover:text-npa-red transition-colors"
        >
          <Icon size={20} />
        </Link>
      ))}
    </div>
  )
}
