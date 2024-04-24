import SideBar from '@/components/layout/SideBar'
import React from 'react'
import SidebarProvider from '@/context/SidebarProvider'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SidebarProvider>
        <div className="flex">
          <SideBar />
          <div className="flex-grow">
            <main className="bg-background h-full bg-opacity-80">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
