import type { Metadata } from 'next'
import './globals.css'

import NextAuthProvider from '@/context/NextAuthProvider'
import UserProvider from '@/context/UserProvider'
import SidebarProvider from '@/context/SidebarProvider'

import SideBar from '@/components/layout/SideBar'

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
			<body>
				<UserProvider>
					<NextAuthProvider>
						<SidebarProvider>
							<div className='flex'>
								<SideBar />
								{children}
							</div>
						</SidebarProvider>
					</NextAuthProvider>
				</UserProvider>
			</body>
		</html>
	)
}
