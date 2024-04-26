'use client'

import * as React from 'react'

interface LeftHeaderProps {
  activeTab: string
  onSave: () => void
}

const LeftHeader: React.FC<LeftHeaderProps> = ({ activeTab, onSave }) => {
  const handleButtonClick = (action: string) => {
    console.log(`${action} button clicked`)
  }

  const handleSaveClick = (action: string) => {
    console.log(`${action} button clicked`)
    if (action === '저장') {
      onSave() // 저장 버튼 클릭 시 onSave 호출
    }
  }
  return (
    <div className="bg-goldenPurple text-white flex justify-between items-center p-1 w-full">
      <div className="flex space-x-1">
        <button
          className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          onClick={() => handleButtonClick('BFS')}
        >
          BFS
        </button>
        <button
          className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          onClick={() => handleButtonClick('...')}
        >
          ...
        </button>
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
        <button
          className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          onClick={() => handleButtonClick('정답')}
        >
          정답
        </button>
        <button
          className=" bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          onClick={() => handleButtonClick('문제 링크')}
        >
          문제 링크
        </button>
      </div>
    </div>
  )
}

export default LeftHeader
