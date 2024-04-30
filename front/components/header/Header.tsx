'use client'

import React from 'react'
import SearchDropdown from '@/components/header/SearchDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Image from 'next/image'

const MainHeader: React.FC = () => {
  interface Item {
    id: number
    description: string
  }

  const avatarUrl = useSelector((state: RootState) => state.auth.user?.imageUrl)

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

      {avatarUrl ? (
        <div className="flex items-center justify-end">
          <Image
            src={avatarUrl}
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      ) : (
        <div>profile</div>
      )}

      <div className="flex-none w-1/4 text-right">profile</div>
    </header>
  )
}

export default MainHeader
