import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export const Logo = (props: Props) => {
  const { width = 64, height = 64, className } = props
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Ninja Poker Academy"
      src="https://media.ninjapokeracademy.com/logo-ninja-poker-academy.png"
      style={{ width, height, objectFit: 'contain' }}
      className={clsx(className)}
    />
  )
}
