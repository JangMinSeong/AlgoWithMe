'use client'

import * as React from 'react'
import {useEffect, useState} from 'react'
import TagSelector from '@/components/tag/Tags'

interface LeftHeaderProps {
  activeTab: string
  onSave: () => void
  url: string
  pageId:number
  tags:string[]
}

const LeftHeader: React.FC<LeftHeaderProps> = ({ activeTab, onSave, url,pageId , tags}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // 선택된 태그를 관리하는 상태
  const [isTagSelectorOpen, setIsTagSelectorOpen] = useState(false)

  useEffect (() => {
    setSelectedTags(tags)
    console.log(tags)
  },[tags])

  const toggleTag = (key: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(key)
        ? prevTags.filter((tag) => tag !== key)
        : [...prevTags, key],
    )
  }

  const handleSaveClick = (action: string) => {
    if (action === '저장') {
      onSave() // 저장 버튼 클릭 시 onSave 호출
    }
  }

  const handleProblemLinkClick = () => {
    window.open(url, '_blank')
  }

  return (
    <div className="text-white flex justify-between items-center w-full">
      <div className="flex space-x-1">
        <button
            className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 ml-2"
            onClick={() => setIsTagSelectorOpen(!isTagSelectorOpen)}
        >
          문제 유형
        </button>
        {isTagSelectorOpen && (
            <TagSelector
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                onClose={() => setIsTagSelectorOpen(false)}
                pageId={pageId}
            />
        )}
      </div>
      <div className="flex space-x-1">
        {activeTab === '개인 메모장' && (
          <button
            className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
            onClick={() => handleSaveClick('저장')}
          >
            저장
          </button>
        )}
        {/*<button*/}
        {/*  className=" bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"*/}
        {/*  onClick={() => handleProblemLinkClick()}*/}
        {/*>*/}
        {/*  <img src='/public/link.png' className='w-5 h-5'/>*/}
        {/*</button>*/}
        <span className="hover:bg-gray-400 w-7 h-7 flex items-center justify-center rounded-md mr-2">
          <img src="/link.png" className="w-5 h-5" onClick={() => handleProblemLinkClick()} />
        </span>
      </div>
    </div>
  )
}

export default LeftHeader
