import useGroupCall from '@/hooks/useGroupCall'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useEffect } from 'react'

const API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_URL

const GroupCall = () => {
  const roomId = 'dummy'
  const myUserName = useSelector(
    (state: RootState) => state.groupcall.myUserName,
  )
  const activeSpeaker = useSelector(
    (state: RootState) => state.groupcall.activeSpeaker,
  )
  const { connectToSession, disconnectSession } = useGroupCall()

  useEffect(() => {
    const fetchSessionAndConnect = async () => {
      try {
        // Fetching session ID
        const sessionIdResponse = await fetch(`${API_URL}/openvidu/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customSessionId: roomId }),
          credentials: 'include',
        });
        const sessionIdData = await sessionIdResponse.json();
        const sessionId = sessionIdData.id;  // Assuming the ID is stored in the `id` property

        // Fetching token
        const tokenResponse = await fetch(
            `${API_URL}/openvidu/sessions/${sessionId}/connections`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({ customSessionId: roomId }),
              credentials: 'include',
            },
        );
        const tokenData = await tokenResponse.json();
        const token = tokenData.token;  // Assuming the token is stored in the `token` property

        // Connecting to the session
        connectToSession(token);
      } catch (error) {
        console.error('Failed to fetch session or token:', error);
      }
    };

    fetchSessionAndConnect();

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
        // activeSpeaker 인 사람은 빨간 링띄우기
      ))}
    </div>
  )
}
export default GroupCall
