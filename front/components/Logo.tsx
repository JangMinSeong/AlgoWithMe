'use client'

import Image from 'next/image'
import LogoSrc from '@/public/logo/Logo.png'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src={LogoSrc}
      alt="Logo"
      className={`h-8 object-contain hover:cursor-pointer ${className || ''}`}
    />
  )
}
