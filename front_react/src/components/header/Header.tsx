import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Logo from '@/components/Logo'
import SearchDropdown from '@/components/header/SearchDropdown.tsx'

const MainHeader: React.FC = () => {
  const avatarUrl = useSelector((state: RootState) => state.auth.user?.imageUrl)

  return (
    <header className="fixed top-2 left-2 w-[98vw] h-12 flex justify-between items-center bg-white bg-opacity-50 rounded-xl px-5">
      <div className="flex-none">
        {/*<SideBarButton />*/}
        <Logo />
      </div>
      <div className="shrink w-1/2">
        <SearchDropdown />
      </div>

      {avatarUrl ? (
        <div className="flex-none">
          <img
            src={avatarUrl}
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full shadow-md"
          />
        </div>
      ) : (
        <div>profile</div>
      )}
    </header>
  )
}

export default MainHeader
