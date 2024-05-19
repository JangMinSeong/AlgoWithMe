import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store.ts'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface HeaderProps {
  activeTab: string
  onSave: () => void
  room: number
}

const Header: React.FC<HeaderProps> = ({ activeTab, onSave, room }) => {
  const pageLists = useSelector((state: RootState) => state.sidebar.pageList)
  const [curTitle, setCurTitle] = useState<string>()

  useEffect(() => {
    const title = findTitle(pageLists, room)
    setCurTitle(title)
  }, [pageLists, room])

  const findTitle = (pages, id: number): string => {
    for (let i = 0; i < pages.length; i++) {
      if (!pages[i].docs) continue
      if (pages[i].pageId === id) {
        return pages[i].title
      }
      if (pages[i].children) {
        const result = findTitle(pages[i].children, id)
        if (result) return result
      }
    }
    return ''
  }

  const handleSaveClick = (action: string) => {
    if (action === '저장') {
      onSave() // 저장 버튼 클릭 시 onSave 호출
      toast.success('저장했어요')
    }
  }

  return (
    <div className="flex ml-64">
      <div className="text-[40px] font-[800] mb-2 mt-10 mr-6  ml-50">
        {curTitle}
      </div>
      {activeTab === '개인 메모장' && (
        <button
          className="border-primary border hover:bg-primary/70 hover:text-white text-primary text-xs px-2 h-8 mt-14 mr-1 transition-colors"
          onClick={() => handleSaveClick('저장')}
        >
          저장하기
        </button>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default Header
