import StudyHeader from '@/components/header/StudyHeader'
import { Outlet, useParams } from 'react-router-dom'

import React from 'react'
import { RootState } from '@/lib/store.ts'
import { useSelector } from 'react-redux'
import SideBar from '@/components/sidebar/SideBar.tsx'
import PageCreateModal from '@/components/sidebar/PageCreateModal.tsx'
import ScrollToTop from '@/components/ScrollToTop'

export default function Layout() {
  const { groupId } = useParams()
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)

  return (
    <div className="flex transition-all duration-700">
      <ScrollToTop />
      {isSidebarOpen && <SideBar groupId={Number(groupId)} />}
      <main className="ml-2 w-dvw max-w-dvw">
        <div>
          <StudyHeader groupId={Number(groupId)} />
          <main className="bg-white bg-opacity-70 p-8 rounded-lg mr-2 h-screen overflow-y-scroll no-scrollbar">
            <Outlet />
          </main>
        </div>
      </main>
      {isModalOpen && <PageCreateModal />}
    </div>
  )
}
