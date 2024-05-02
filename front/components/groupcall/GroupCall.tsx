import useGroupCall from '@/hooks/useGroupCall'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useEffect } from 'react'

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_URL

const GroupCall = () => {
  const roomId = 'dummy'
  const myUserName = useSelector(
    (state: RootState) => state.groupcall.myUserName,
  )

  const { connectToSession, disconnectSession } = useGroupCall()

  useEffect(() => {
    const sessionIdResponse = fetch(`${API_URL}/groupcall/session`, {
      method: 'POST',
      body: { customSessionId: roomId },
      credentials: 'include',
    })
    const sessionId = sessionIdResponse.data

    const tokenResponse = fetch(
      `${API_URL}/groupcall/session/${sessionId}/connections`,
      {
        method: 'POST',
        body: { customNickname: myUserName },
        credentials: 'include',
      },
    )

    const token = tokenResponse.data

    connectToSession(token)

    return () => disconnectSession()
  }, [])

  const participants = useSelector(
    (state: RootState) => state.groupcall.participants,
  )

  return (
    <div>
      그룹콜
      {participants.map((el, idx) => (
        <div>사람{idx + 1}</div>
      ))}
    </div>
  )
}
export default GroupCall
