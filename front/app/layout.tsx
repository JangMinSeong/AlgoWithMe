import type { Metadata } from 'next'
import './globals.css'
import { Orbitron } from 'next/font/google'
import localFont from 'next/font/local'

const pretendard = localFont({
  src: '../fonts/Pretendard.ttf',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '400',
})

import NextAuthProvider from '@/context/NextAuthProvider'
import UserProvider from '@/context/UserProvider'
import React from 'react'

export const metadata: Metadata = {
  title: 'AlgoWithMe',
  description: '알고리즘 스터디 통합 관리 플랫폼',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr" className={pretendard.className}>
      <body>
        <UserProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </UserProvider>
      </body>
    </html>
  )
}
