import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useState } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'
import fetch from '@/lib/fetch'
import { useParams } from 'react-router'
import { OpenVidu, Session, Subscriber, Publisher } from 'openvidu-browser'
import toast, { Toaster } from 'react-hot-toast'

interface IParticipant {
  connectionId: string
  nickname: string
}

const GroupCall = () => {
  const { groupId } = useParams()
  const myNickname = useSelector((state: RootState) => state.auth.user.nickname)

  const [isHeadphoneOn, setIsHeadphoneOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState<string>()
  const [participants, setParticipants] = useState<Array<IParticipant>>([])
  const [session, setSession] = useState<Session>()
  const [subscriber, setSubscriber] = useState<Subscriber>()
  const [publisher, setPublisher] = useState<Publisher>()

  const OV = new OpenVidu()
  OV.enableProdMode()

  const connectToSession = async (token: string) => {
    // 이미 있으면 삭제하고 다시
    if (session) session.disconnect()

    const mySession = OV.initSession()
    setSession(mySession)

    await mySession
      .connect(token, myNickname)
      .then(() => publishInSession())
      .catch(() => toast.error('연결에 실패했어요. 잠시후 다시 시도해주세요.'))
  }

  const publishInSession = async () => {
    if (session) {
      const myPublisher = await OV.initPublisher('publisher-container', {
        audioSource: undefined,
        videoSource: false,
        publishAudio: isMicOn,
        publishVideo: isHeadphoneOn,
      })

      setPublisher(myPublisher)
      session.publish(myPublisher)

      // 내가 접속했을 때
      await session.on('streamCreated', (event) => {
        const mySubscriber = session.subscribe(event.stream, 'subscriberDiv')
        setSubscriber(mySubscriber)

        const connectionId = event.stream.connection.connectionId
        const nickname = event.stream.connection.data

        setParticipants((prevParticipants) => [
          ...prevParticipants,
          { connectionId, nickname },
        ])
        console.log('참가자목록', participants)
      })

      // 내가 연결 끊었을 때
      await session.on('streamDestroyed', (event) => {
        const connectionId = event.stream.connection.connectionId
        session.unsubscribe(subscriber)

        setSubscriber(null)
        setParticipants((prevParticipants) =>
          prevParticipants.filter((item) => item.connectionId !== connectionId),
        )
      })

      await session.on('connectionCreated', (event) => {
        const nickname = event.connection.data
        toast(`${nickname}님이 음성채팅에 입장했어요`, {
          icon: '🙋‍♀️',
        })
      })

      await session.on('connectionDestroyed', (event) => {
        const nickname = event.connection.data
        toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
          icon: '👋',
        })
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

  const handleHeadphoneOff = () => {
    if (subscriber) {
      subscriber.subscribeToAudio(false)
      setIsHeadphoneOn(false)
    }
  }
  const handleHeadphoneOn = () => {
    if (subscriber) {
      subscriber.subscribeToAudio(true)
      setIsHeadphoneOn(true)
    }
  }
  const handleMicOff = () => {
    if (publisher) {
      publisher.publishAudio(false)
      setIsMicOn(false)
    }
  }
  const handleMicOn = () => {
    if (publisher) {
      publisher.publishAudio(true)
      setIsMicOn(true)
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
        connectToSession(json.token)
      })
  } // fetchSessionAndToken

  const disconnectSession = () => {
    if (session) {
      session.disconnect()
      setSession(null)
      setPublisher(null)
      setParticipants([])
    }
  }

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  const chipCss =
    'rounded-xl bg-slate-200 text-xs flex px-3 items-center justify-center h-6 mr-1 mb-1'
  return (
    <div className="flex items-center justify-center">
      <div id="subscriberDiv" style={{ display: 'none' }}></div>
      <div id="publisher-container" style={{ display: 'none' }}></div>
      <div className={chipCss} onClick={() => fetchSessionAndToken()}>
        참여하기
      </div>

      <div onClick={() => disconnectSession()} className={chipCss}>
        연결끊기
      </div>

      {/* 오디오컨트롤 */}
      {session && (
        <div className="ml-2 bg-white bg-opacity-20 border border-accent border-opacity-50 flex pl-2 py-2 w-fit rounded-3xl shadow-foggyPurple">
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
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}
export default GroupCall
