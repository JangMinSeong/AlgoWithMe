import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import NextAuthProvider from '@/context/NextAuthProvider'
import UserProvider from '@/context/UserProvider'

const inter = Inter({ subsets: ['latin'] })

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
		<html lang='kr'>
			<body className={inter.className}>
				<UserProvider>
					<NextAuthProvider>{children}</NextAuthProvider>
				</UserProvider>
			</body>
		</html>
	)
}
