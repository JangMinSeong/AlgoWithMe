'use client'

import React from 'react'
import SearchDropdown from '@/components/header/SearchDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Image from 'next/image'
import Logo from '@/public/logo.svg'

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
        <Image src={Logo} alt="Logo" width={80} />
        {/* <div className="text-xl font-bold">LOGO</div> */}
      </div>
      <SearchDropdown items={items} />

      <div className="flex-1 text-right">
        {avatarUrl ? (
          <div className="inline-block">
            <Image
              src={avatarUrl}
              alt="Profile Image"
              width={60}
              height={60}
              className="rounded-full shadow-md"
            />
          </div>
        ) : (
          <div>profile</div>
        )}
      </div>
    </header>
  )
}

export default MainHeader
