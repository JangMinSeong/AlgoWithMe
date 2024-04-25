import SideBar from '@/components/layout/SideBar'
import React from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex">
        <SideBar />
        <main>{children}</main>
      </div>
    </>
  )
}
