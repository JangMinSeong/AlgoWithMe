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
    <div className="flex flex-col h-dvh pt-16">
      <div className="h-full w-dvw flex transition-all duration-700 border-t-[1px] border-blueishPurple">
        <ScrollToTop />
        {isSidebarOpen && (
          <>
            <SideBar groupId={Number(groupId)} />
            <div className="w-px h-full bg-blueishPurple" />
          </>
        )}
        <main className="h-full w-dvw max-w-dvw">
          <div className="h-full">
            <StudyHeader groupId={Number(groupId)} />
            <main className="h-full overflow-y-scroll no-scrollbar">
              <Outlet />
            </main>
          </div>
        </main>
        {isModalOpen && <PageCreateModal />}
      </div>
    </div>
  )
}
