'use client'

import React from 'react'
import SearchDropdown from '@/components/header/SearchDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Logo from '/logo.svg'
import SideBarButton from '../sidebar/SideBarButton'

const MainHeader: React.FC = () => {

  const avatarUrl = useSelector((state: RootState) => state.auth.user?.imageUrl)

  return (
    <header className="fixed top-2 left-2 w-[98vw] h-12 flex justify-between items-center bg-white bg-opacity-50 rounded-xl px-5">
      <div className="flex w-1/4">
        <SideBarButton />

        <img src={Logo} alt="Logo" width={80} />
        {/* <div className="text-xl font-bold">LOGO</div> */}
      </div>
      <SearchDropdown/>

      <div className="flex-1 text-right">
        {avatarUrl ? (
          <div className="inline-block">
            <img
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
