'use client'

import StudyHeader from '@/components/header/StudyHeader'
import React from 'react'
import SideBar from '@/components/sidebar/SideBar'
import PageCreateModal from '@/components/sidebar/PageCreateModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useParams } from 'next/navigation'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)

  const { groupId } = useParams() as { groupId: string }

  return (
    <div className="flex">
      <SideBar groupId={Number(groupId)} />
      <main
        className={`${isSidebarOpen ? 'ml-52 mr-2' : 'mr-2'} ml-2 w-dvw max-w-dvw transition-all duration-700`}
      >
        <div>
          <StudyHeader />
          <main className="bg-white bg-opacity-70 p-8 rounded-lg mr-6">
            {children}
          </main>
        </div>
      </main>
      {isModalOpen && <PageCreateModal />}
    </div>
  )
}
