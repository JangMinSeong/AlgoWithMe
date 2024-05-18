import { useSelector } from 'react-redux'
import Logo from '@/components/Logo'
import Avatar from './Avatar'
import Timer from './Timer'
import SideBarButton from '../sidebar/SideBarButton'
// import GroupCall from '../groupcall/GroupCall'
import React, { useEffect, useRef, useState } from 'react'
// import fetch from '@/lib/fetch.ts'
import { RootState } from '@/lib/store.ts'
import useCode from '@/hooks/useCode.ts'
import Main from '../groupcall/main'
import useStudy from '@/hooks/useStudy'
import useAuth from '@/hooks/useAuth'
import UserProfile from '@/components/header/UserProfile.tsx'
import { Tooltip } from 'react-tooltip'
interface UserInfo {
  id: number
  nickname: string
  imageUrl: string
}

const StudyHeader = (props: { groupId: number }) => {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [curUser, setCurUser] = useState<UserInfo | null>(null)
  const avatarUrl = useSelector((state: RootState) => state.auth.user?.imageUrl)
  const [showProfile, setShowProfile] = React.useState<boolean>(false)
  const avatarRef = useRef<HTMLImageElement>(null)
  // const nickname = useSelector((state: RootState) => state.auth.user.nickname) // 현재 사용자 닉네임 가져오기
  const { handleFetchStudyMembers } = useStudy()

  useEffect(() => {
    handleFetchStudyMembers(props.groupId)
  }, [props.groupId])

  const onlineMembers = useSelector(
    (state: RootState) => state.member.onlineMembers,
  )

  const updateStudyMessage = useSelector(
    (state: RootState) => state.socket.messageStudyUpdate,
  )

  const myData = useSelector((state: RootState) => state.auth.user)

  const myInfo = {
    nickname: myData.nickname,
    imageUrl: myData.imageUrl,
    isSpeaking: false,
  }
  // const fetchUsers = async () => {
  //   const response = await fetch(`/study/${props.groupId}/members`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   if (response.ok) {
  //     const responseData = await response.json()
  //     setUsers(responseData)

  //     // 현재 사용자 닉네임과 일치하는 사용자 찾기
  //     const foundUser = responseData.find(
  //       (user: UserInfo) => user.nickname === nickname,
  //     )
  //     setCurUser(foundUser || null)
  //     handleMyId(foundUser.id)
  //     handleUserList(responseData)
  //     if (curUser === 0) handleCurUserId(foundUser.id)
  //   }
  // }

  useEffect(() => {
    if (updateStudyMessage.startsWith(`"invite Member`))
      handleFetchStudyMembers(props.groupId)
  }, [updateStudyMessage])

  return (
    <div>
      <div className="fixed z-10 top-2 left-2 w-[98vw] h-12 flex justify-between items-center px-5">
        <div className="flex items-center w-1/2">
          <SideBarButton />
          <Logo />
        </div>

        <div className="flex items-center">
          <Timer />
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
        </div>
      </div>
      {/* 음성채팅  */}
      <div className="border fixed bottom-2 left-2">
        <div className="mb-2">
          {onlineMembers.map((person) => (
            <Avatar
              key={person.nickname}
              userInfo={person}
              isProfile={false}
              data-tooltip-id="onlineMemberName"
              data-tooltip-content={person.nickname}
            />
          ))}
        </div>
        <div className="border flex items-center">
          <Avatar userInfo={myInfo} isProfile={true} />
          <Main />
        </div>
      </div>
    </div>
  )
}

export default StudyHeader
