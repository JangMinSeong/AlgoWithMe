import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { useWebSocket } from '@/hooks/useWebSocket.ts'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'

interface UserInfo {
  nickname: string
  imageUrl: string
  isSpeaking: boolean
}

const Avatar = (props: { userInfo: UserInfo; isProfile: boolean }) => {
  //const userImage = useSelector((state: RootState) => state.auth.user.imageUrl)
  const { handleLogout } = useAuth()
  const [showLogOutButton, setShowLogOutButton] = useState(false)
  const handleClickEvent = () => {
    if (props.isProfile) {
      setShowLogOutButton(!showLogOutButton)
    }
  }

  return (
    <div className="mr-2">
      <img
        src={props.userInfo.imageUrl}
        alt="프로필"
        width={30}
        height={0}
        className={`${
          props.userInfo.isSpeaking && 'border-red-500 border-2'
        } rounded-full`}
        onClick={handleClickEvent}
      />
      {showLogOutButton && (
        <button onClick={() => handleLogout()}>로그아웃</button>
      )}
    </div>
  )
}

export default Avatar
