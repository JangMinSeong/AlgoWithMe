import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useState } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'
import fetch from '@/lib/fetch'
import { useParams } from 'react-router'
import { OpenVidu, Session } from 'openvidu-browser'

const OV = new OpenVidu()
OV.enableProdMode()

const GroupCall = () => {
  const { groupId } = useParams()
  const [isHeadphoneOn, setIsHeadphoneOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState<string>()
  const [participants, setParticipants] = useState([])
  const [session, setSession] = useState<Session>()

  const connectToSession = (token: string) => {
    const mySession = OV.initSession()

    console.log(mySession)
    console.log(token)

    mySession.connect(token)
    console.log(mySession.connect(token))
    setSession(mySession)

    publishInSession()
  }

  const publishInSession = () => {
    if (session) {
      const publisher = OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: false,
        publishAudio: false,
        publishVideo: false,
      })

      session.publish(publisher)

      // 누군가 접속했을 때
      session.on('streamCreated', (event) => {
        const subscriber = session.subscribe(event.stream, undefined)
        const nickname = event.stream.connection.data.split('=')[1]
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          { subscriber, nickname },
        ])
        console.log(subscriber, '입장', nickname)
      })

      // 누군가 연결 끊었을 때
      session.on('streamDestroyed', (event) => {
        event.preventDefault()
        const nickname = event.stream.connection.data.split('=')[1]
        setParticipants((prevParticipants) =>
          prevParticipants.filter((item) => item.nickname !== nickname),
        )
        console.log('퇴장', nickname)
      })

      session.on('publisherStartSpeaking', (event) => {
        setActiveSpeaker(event.connection.connectionId)
        console.log('User ' + event.connection.connectionId + ' start speaking')
      })

      session.on('publisherStopSpeaking', (event) => {
        setActiveSpeaker(undefined)
        console.log('User ' + event.connection.connectionId + ' stop speaking')
      })

      session.on('exception', (exception) => {
        console.warn(exception)
      })
    }
  }

  const fetchSessionAndToken = async () => {
    await fetch(`/openvidu/sessions/${groupId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(
        async () =>
          await fetch(`/openvidu/sessions/${groupId}/connections`, {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
          }),
      )
      .then((res) => res.json())
      .then((json) => connectToSession(json.token))
  } // fetchSessionAndToken

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

  const disconnectSession = () => {
    if (session) session.disconnect()
  }

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  const chipCss =
    'rounded-xl bg-slate-200 text-xs flex pl-3 items-center justify-center h-6 mr-1 mb-1'
  return (
    <div className="flex">
      <div className={chipCss} onClick={() => fetchSessionAndToken()}>
        참여하기
      </div>

      {participants.map((el, idx) => (
        <div>사람{idx + 1}</div>
        // activeSpeaker 인 사람은 빨간 링띄우기
      ))}
      <div onClick={() => disconnectSession()} className={chipCss}>
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
