import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useState } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'
import fetch from '@/lib/fetch'
import { useParams } from 'react-router'
import { OpenVidu, Session, Subscriber, Publisher } from 'openvidu-browser'

const OV = new OpenVidu()
OV.enableProdMode()

const GroupCall = () => {
  const { groupId } = useParams()
  const [isHeadphoneOn, setIsHeadphoneOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState<string>()
  const [participants, setParticipants] = useState([])
  const [session, setSession] = useState<Session>()
  const [subscriber, setSubscriber] = useState<Subscriber>()
  const [publisher, setPublisher] = useState<Publisher>()

  const connectToSession = async (token: string) => {
    const mySession = OV.initSession()
    await mySession.connect(token).then(() => {
      setSession(mySession)
      publishInSession()
    })
  }

  const publishInSession = async () => {
    if (session) {
      const myPublisher = OV.initPublisher('publisher-container', {
        audioSource: undefined,
        videoSource: false,
        publishAudio: undefined,
        publishVideo: false,
      })

      await session.publish(myPublisher).then(() => setPublisher(myPublisher))

      // 누군가 접속했을 때
      await session.on('streamCreated', (event) => {
        const subscriber = session.subscribe(event.stream, 'subscriberDiv')
        const nickname = event.stream.connection.data.split('=')[1]
        console.log('누군가 들어왔다', nickname)
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          { subscriber, nickname },
        ])
      })

      // 누군가 연결 끊었을 때
      await session.on('streamDestroyed', (event) => {
        event.preventDefault()
        const nickname = event.stream.connection.data.split('=')[1]
        setParticipants((prevParticipants) =>
          prevParticipants.filter((item) => item.nickname !== nickname),
        )
        console.log('퇴장', nickname)
      })

      await session.on('publisherStartSpeaking', (event) => {
        setActiveSpeaker(event.connection.connectionId)
        console.log('User ' + event.connection.connectionId + ' start speaking')
      })

      await session.on('publisherStopSpeaking', (event) => {
        setActiveSpeaker(undefined)
        console.log('User ' + event.connection.connectionId + ' stop speaking')
      })

      await session.on('exception', (exception) => {
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
      .then((res) => res.json())
      .then((json) =>
        fetch(`/openvidu/sessions/${json.sessionId}/connections`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        }),
      )
      .then((res) => res.json())
      .then((json) => {
        // const tokenStr = json.token
        // const tokenIdx = tokenStr.indexOf('token=') + 6
        // console.log(tokenStr.slice(tokenIdx))
        connectToSession(json.token)
      })
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
    publisher.publishAudio(false)
    console.log('되긴하나')
    setIsMicOn(false)
  }
  const handleMicOn = () => {
    publisher.publishAudio(true)
    console.log('되긴하나')
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
      <div id="subscriberDiv" style={{ display: 'none' }}></div>
      <div id="publisher-container" style={{ display: 'none' }}></div>
      <div className={chipCss} onClick={() => fetchSessionAndToken()}>
        참여하기
      </div>

      {participants.map((el, idx) => (
        <div>사람{idx + 1}</div>
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
