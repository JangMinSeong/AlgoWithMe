import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { useWebSocket } from '@/hooks/useWebSocket.ts'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { Tooltip } from 'react-tooltip'

interface UserInfo {
  nickname: string
  imageUrl: string
  isSpeaking: boolean
}

const Avatar = (props: {
  userInfo: UserInfo
  isProfile: boolean
  isOnline: boolean
}) => {
  //const userImage = useSelector((state: RootState) => state.auth.user.imageUrl)

  return (
    <div
      className={`mr-1 relative`}
      data-tooltip-id="onlineMemberName"
      data-tooltip-content={props.userInfo.nickname}
    >
      <img
        src={props.userInfo.imageUrl}
        alt="프로필"
        width={36}
        height={36}
        className={`${
          props.userInfo.isSpeaking && 'border-red-500 border-2'
        } rounded-full`}
      />
      {!props.isOnline && !props.isProfile && (
        <div className="rounded-full absolute w-[36px] h-[36px] bg-black/50  top-0" />
      )}
      <Tooltip id="onlineMemberName" place="bottom" />
    </div>
  )
}

export default Avatar
