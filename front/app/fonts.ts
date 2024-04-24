import localFont from 'next/font/local'
import { Orbitron } from 'next/font/google'

export const pretendard = localFont({
  src: '../fonts/Pretendard.ttf',
  display: 'swap',
})

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-orbitron',
})
