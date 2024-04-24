import type { Metadata } from 'next'
import './globals.css'
import { pretendard, orbitron } from './fonts'

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
    <html lang="kr" className={`${pretendard.className} ${orbitron.variable}`}>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
