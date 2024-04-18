'use client'

import React from 'react'
import SearchDropdown from '@/components/Header/SearchDropdown'

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
    <header className="w-full flex justify-center items-center p-2 shadow">
      <div className="flex-none w-1/4">
        <div className="text-xl font-bold">LOGO</div>
      </div>
      <SearchDropdown items={items} />
      <div className="flex-none w-1/4 text-right">profile</div>
    </header>
  )
}

export default MainHeader
