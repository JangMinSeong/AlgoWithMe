'use client'
import SideBar from '@/components/layout/SideBar'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen)

  return (
    <>
      <div className="flex">
        <SideBar />
        <main
          className={`${isSidebarOpen ? 'ml-44' : 'mr-2'} ml-2 min-w-vw mt-16 transition-all duration-700`}
        >
          {children}
        </main>
      </div>
    </>
  )
}
