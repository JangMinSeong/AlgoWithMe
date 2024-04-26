'use client'

import * as React from 'react'
import Button from '@/components/Button'

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
      <div className="flex space-x-2">
        <Button
          className="bg-darkNavy hover:bg-navy px-3 py-2 rounded"
          onClick={() => handleButtonClick('BFS')}
        >
          BFS
        </Button>
        <Button
          className="bg-blueishPurple hover:bg-navy px-3 py-1 rounded"
          onClick={() => handleButtonClick('...')}
        >
          ...
        </Button>
      </div>
      <div className="flex space-x-2">
        {activeTab === '개인 메모장' && (
          <Button
            className="bg-darkNavy hover:bg-navy px-3 py-2 rounded"
            onClick={() => handleSaveClick('저장')}
          >
            저장
          </Button>
        )}
        <Button
          className="bg-blueishPurple hover:bg-navy px-3 py-1 rounded"
          onClick={() => handleButtonClick('정답')}
        >
          정답
        </Button>
        <Button
          className="bg-darkNavy hover:bg-navy px-3 py-1 rounded"
          onClick={() => handleButtonClick('문제 링크')}
        >
          문제 링크
        </Button>
      </div>
    </div>
  )
}

export default LeftHeader
