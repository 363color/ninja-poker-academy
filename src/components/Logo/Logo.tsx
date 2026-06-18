import Image from 'next/image'
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export const Logo = (props: Props) => {
  const { width = 64, height = 64, priority = false, className } = props

  return (
    <Image
      alt="Ninja Poker Academy Logo"
      src="/media/Ninja-Poker-Academy-Avatar-transparente.png"
      width={width}
      height={height}
      priority={priority}
      className={clsx('h-auto w-auto', className)}
    />
  )
}
