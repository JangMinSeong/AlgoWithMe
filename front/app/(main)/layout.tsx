import SideBar from '@/components/layout/SideBar'
import SidebarProvider from '@/context/SidebarProvider'
import React from 'react'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="flex">
        <SideBar />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  )
}
