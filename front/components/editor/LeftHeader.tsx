'use client'

import * as React from 'react'
import Button from '@/components/Button'

const LeftHeader: React.FC = () => {
  const handleButtonClick = (action: string) => {
    console.log(`${action} button clicked`)
  }

  return (
    <div className="bg-goldenPurple text-white flex justify-between items-center p-1">
      <div className="flex space-x-4 ml-4">
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
      <div className="flex space-x-4 mr-4">
        <Button
          className="bg-blueishPurple hover:bg-navy px-3 py-1 rounded"
          onClick={() => handleButtonClick('실행')}
        >
          실행
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
