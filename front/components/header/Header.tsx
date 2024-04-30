'use client'

import React from 'react'
import SearchDropdown from '@/components/header/SearchDropdown'

const MainHeader: React.FC = () => {
  interface Item {
    id: number
    description: string
  }

  const items: Item[] = [
    { id: 1, description: '스터디 1' },
    { id: 2, description: '스터디 2' },
    { id: 3, description: '스터디 3' },
  ]

  return (
    <header className="fixed z-20 top-2 left-2 w-[98vw] h-12 flex justify-between items-center bg-white bg-opacity-50 rounded-xl px-5">
      <div className="flex-none w-1/4">
        <div className="text-xl font-bold">LOGO</div>
      </div>
      <SearchDropdown items={items} />
      <div className="flex-none w-1/4 text-right">profile</div>
    </header>
  )
}

export default MainHeader
