import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import StoreProvider from '@/app/StoreProvider'
import { orbitron, pretendard } from './fonts'

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
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
