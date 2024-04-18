'use client'

import React, { useState } from 'react'
import SearchDropdown from '@/components/Header/SearchDropdown'

const MainHeader: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  interface Item {
    id: number
    description: string
  }

  const items: Item[] = [
    { id: 1, description: '스터디 1' },
    { id: 2, description: '스터디 2' },
    { id: 3, description: '스터디 3' },
  ]

  const handleItemClick = (itemName: string) => {
    console.log(`${itemName} 클릭됨!`)
    setDropdownVisible(false)
  }

  return (
    <header className="w-full flex justify-center items-center p-2 shadow">
      <div className="flex-none w-1/4">
        <div className="text-xl font-bold">LOGO</div>
      </div>
      <SearchDropdown items={items} handleItemClick={handleItemClick} />
      <div className="flex-none w-1/4 text-right">profile</div>
    </header>
  )
}

export default MainHeader
