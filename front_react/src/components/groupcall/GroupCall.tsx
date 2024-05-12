import useGroupCall from '@/hooks/useGroupCall'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useState, useEffect } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'

const API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_URL

const GroupCall = () => {
  const [isHeadphoneOn, setIsHeadphoneOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(false)

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
        })
        const sessionIdData = await sessionIdResponse.json()
        const sessionId = sessionIdData.id // Assuming the ID is stored in the `id` property

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
        )
        const tokenData = await tokenResponse.json()
        const token = tokenData.token // Assuming the token is stored in the `token` property

        // Connecting to the session
        connectToSession(token)
      } catch (error) {
        console.error('Failed to fetch session or token:', error)
      }
    }

    fetchSessionAndConnect()

    return () => disconnectSession()
  }, [])

  const handleHeadphoneOff = () => {
    // subscriber.subscribeToAudio(false)
    setIsHeadphoneOn(false)
  }
  const handleHeadphoneOn = () => {
    // subscriber.subscribeToAudio(true)
    setIsHeadphoneOn(true)
  }
  const handleMicOff = () => {
    // publisher.publishAudio(false)
    setIsMicOn(false)
  }
  const handleMicOn = () => {
    // publisher.publishAudio(true)
    setIsMicOn(true)
  }

  const participants = useSelector(
    (state: RootState) => state.groupcall.participants,
  )

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  const chipCss =
    'rounded-xl bg-slate-200 text-xs flex pl-3 items-center justify-center h-6 mr-1 mb-1'
  return (
    <div className="flex">
      <div className={chipCss}>참여하기</div>

      {participants.map((el, idx) => (
        <div>사람{idx + 1}</div>
        // activeSpeaker 인 사람은 빨간 링띄우기
      ))}
      <div onClick={disconnectSession} className={chipCss}>
        연결끊기
      </div>

      {/* 오디오컨트롤 */}
      <div className="ml-2 bg-white bg-opacity-20 border border-accent border-opacity-50 flex pl-2 py-2 w-fit rounded-3xl shadow-foggyPurple">
        {isMicOn ? (
          <div onClick={handleMicOff}>
            <a id="willOffMic" className={anchorTagCSS}>
              <FiMic className="w-5 h-5" />
            </a>
            <Tooltip anchorSelect="#willOffMic" place="bottom">
              마이크 끄기
            </Tooltip>
          </div>
        ) : (
          <div onClick={handleMicOn}>
            <a id="willOnMic" className={anchorTagCSS}>
              <FiMicOff className="w-5 h-5 text-red-400" />
            </a>
            <Tooltip anchorSelect="#willOnMic" place="bottom">
              마이크 켜기
            </Tooltip>
          </div>
        )}

        {isHeadphoneOn ? (
          <div onClick={handleHeadphoneOff}>
            <a id="willOffHeadphone" className={anchorTagCSS}>
              <TbHeadphones className="w-5 h-5" />
            </a>
            <Tooltip anchorSelect="#willOffHeadphone" place="bottom">
              헤드셋 소리 끄기
            </Tooltip>
          </div>
        ) : (
          <div onClick={handleHeadphoneOn}>
            <a id="willOnHeadphone" className={anchorTagCSS}>
              <TbHeadphonesOff className="w-5 h-5 text-red-400" />
            </a>
            <Tooltip anchorSelect="#willOnHeadphone" place="bottom">
              헤드셋 소리 켜기
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  )
}
export default GroupCall
