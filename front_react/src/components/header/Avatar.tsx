import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import useCode from '@/hooks/useCode.ts'
import { useWebSocket } from '@/hooks/useWebSocket.ts'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'

interface UserInfo {
  id: number
  nickname: string
  imageUrl: string
}

const Avatar = (props: { userInfo: UserInfo; isProfile: boolean }) => {
  //const userImage = useSelector((state: RootState) => state.auth.user.imageUrl)
  const { handleLogout } = useAuth()
  const [showLogOutButton, setShowLogOutButton] = useState(false)
  const { handleCurUserId } = useCode()
  const curUser = useSelector((state: RootState) => state.code.curUserId)
  const handleClickEvent = () => {
    handleCurUserId(props.userInfo.id)
    if (props.isProfile) {
      setShowLogOutButton(!showLogOutButton)
    }
  }

  return (
    <div
      className={`${
        curUser === props.userInfo.id && !props.isProfile
          ? 'border border-red-500 rounded-full'
          : ''
      } mr-2`}
    >
      <img
        src={props.userInfo.imageUrl}
        alt="프로필"
        width={30}
        height={0}
        className="rounded-full"
        onClick={handleClickEvent}
      />
      {showLogOutButton && (
        <button onClick={() => handleLogout()}>로그아웃</button>
      )}
    </div>
  )
}

export default Avatar
