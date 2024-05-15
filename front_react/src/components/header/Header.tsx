import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Logo from '@/components/Logo'
import SearchDropdown from '@/components/header/SearchDropdown.tsx'
import { useScroll } from '@/hooks/useScroll.ts'
import UserProfile from '@/components/mainpage/UserProfile.tsx'

const MainHeader: React.FC = () => {
  const avatarUrl = useSelector((state: RootState) => state.auth.user?.imageUrl)
  const { y } = useScroll()
  const [showProfile, setShowProfile] = React.useState<boolean>(false)
  const avatarRef = useRef<HTMLImageElement>(null)

  return (
    <header
      className={`fixed z-[100] top-0 left-0 right-0 w-full h-16 flex justify-between items-center backdrop-blur-md px-5 transition ease-in-out duration-300 ${
        y > 0 ? 'shadow-md' : ''
      }`}
    >
      <div className="flex-none">
        <Logo />
      </div>
      <div className="shrink w-1/2">
        <SearchDropdown />
      </div>

      {avatarUrl ? (
        <div className="relative flex-none">
          <img
            src={avatarUrl}
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full shadow-md hover:cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
            ref={avatarRef}
          />
          {showProfile && (
            <UserProfile
              avatarUrl={avatarUrl}
              onClose={() => setShowProfile(false)}
              avatarRef={avatarRef}
            />
          )}
        </div>
      ) : (
        <div>profile</div>
      )}
    </header>
  )
}

export default MainHeader
