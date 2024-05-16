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
    <div className="w-full">
      <img
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/File%20Folder.png"
        alt="File Folder"
        width="66"
        height="66"
        className="ml-10 mt-10 mb-4"
      />
      <div className="flex justify-between  ml-10 ">
        <div className=" text-4xl font-bold mb-8">{curTitle}</div>
        <div className="flex">
          {activeTab === '개인 메모장' && (
            <button
              className="bg-primary hover:bg-primary/70 text-white rounded-xl text-xs px-3 h-8 mt-8 mr-1 transition-colors"
              onClick={() => handleSaveClick('저장')}
            >
              저장하기
            </button>
          )}
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default Header
