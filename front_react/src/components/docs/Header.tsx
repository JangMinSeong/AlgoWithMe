import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store.ts'
import { useEffect, useState } from 'react'

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
    }
  }

  return (
    <div className="bg-transparent border-b-[1px] border-blueishPurple text-white flex justify-between items-center p-0 w-full">
      <div className="flex items-center my-2 p-2 h-10">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/File%20Folder.png"
          alt="File Folder"
          width="25"
          height="25"
          className="mr-2"
        />
        <div className="mt-1 text-lg font-semibold text-gray-600">
          {curTitle}
        </div>
      </div>
      <div className="flex space-x-1 mr-2">
        {activeTab === '개인 메모장' && (
          <button
            className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 mt-2"
            onClick={() => handleSaveClick('저장')}
          >
            저장
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
