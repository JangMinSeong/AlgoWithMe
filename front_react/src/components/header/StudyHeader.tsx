import { useSelector } from 'react-redux'
import Logo from '@/components/Logo'
import Avatar from './Avatar'
import Timer from './Timer'
import SideBarButton from '../sidebar/SideBarButton'
// import GroupCall from '../groupcall/GroupCall'
import { useEffect, useState } from 'react'
import fetch from '@/lib/fetch.ts'
import { RootState } from '@/lib/store.ts'
import useCode from '@/hooks/useCode.ts'
import Main from '../groupcall/main'
import useMember from '@/hooks/useMember'

interface UserInfo {
  id: number
  nickname: string
  imageUrl: string
}

const StudyHeader = (props: { groupId: number }) => {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [curUser, setCurUser] = useState<UserInfo | null>(null)
  const nickname = useSelector((state: RootState) => state.auth.user.nickname) // 현재 사용자 닉네임 가져오기
  const { handleUserList, handleMyId, handleCurUserId } = useCode()
  const { handleFetchAllMembers } = useMember()
  const updateStudyMessage = useSelector(
    (state: RootState) => state.socket.messageStudyUpdate,
  )

  const participants = useSelector(
    (state: RootState) => state.call.participants,
  )

  const fetchUsers = async () => {
    const response = await fetch(`/study/${props.groupId}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const responseData = await response.json()
      setUsers(responseData)

      // 현재 사용자 닉네임과 일치하는 사용자 찾기
      const foundUser = responseData.find(
        (user: UserInfo) => user.nickname === nickname,
      )
      setCurUser(foundUser || null)
      handleMyId(foundUser.id)
      handleUserList(responseData)
      if (curUser === 0) handleCurUserId(foundUser.id)
    }
  }

  useEffect(() => {
    if (updateStudyMessage.startsWith(`"invite Member`)) fetchUsers()
  }, [updateStudyMessage])

  useEffect(() => {
    handleFetchAllMembers(props.groupId)
    fetchUsers()
  }, [props.groupId, nickname])

  return (
    <div className="fixed z-10 top-2 left-2 w-[98vw] h-12 flex justify-between items-center px-5">
      <div className="flex items-center w-1/2">
        <SideBarButton />
        <Logo />
        <div className="flex items-center ml-10">
          {users.map((user) => (
            <Avatar key={user.id} userInfo={user} isProfile={false} />
          ))}
          <Main />

          {participants.map((p) => (
            <div>참{p.nickname}</div>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <Timer />
        {curUser && <Avatar userInfo={curUser} isProfile={true} />}
      </div>
    </div>
  )
}

export default StudyHeader
