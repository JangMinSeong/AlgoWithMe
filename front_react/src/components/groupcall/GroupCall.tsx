import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useState } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'
// import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
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

  // const [isHeadphoneOn, setIsHeadphoneOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState<string>()
  const [participants, setParticipants] = useState<Array<IParticipant>>([])
  const [session, setSession] = useState<Session | null>()
  const [subscriber, setSubscriber] = useState<Subscriber | null>()
  const [publisher, setPublisher] = useState<Publisher | null>()
  const [OV, setOV] = useState<OpenVidu>()

  const connectToSession = async (token: string) => {
    if (session) session.disconnect()

    const newOV = new OpenVidu()
    setOV(newOV)
    newOV.enableProdMode()

    const mySession = newOV.initSession()
    setSession(mySession)

    mySession.on('streamCreated', (event) => {
      const mySubscriber = mySession.subscribe(event.stream, 'subscriberDiv')
      const connectionId = event.stream.connection.connectionId
      const nickname = event.stream.connection.data
      console.log(connectionId)

      setParticipants((prevParticipants) => [
        ...prevParticipants,
        { connectionId, nickname, mySubscriber },
      ])

      console.log('참가자목록', participants)
    })

    mySession.on('streamDestroyed', (event) => {
      event.preventDefault
      const connectionId = event.stream.connection.connectionId
      setParticipants((prevParticipants) =>
        prevParticipants.filter((item) => item.connectionId !== connectionId),
      )
      const nickname = event.stream.connection.data
      toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
        icon: '👋',
      })
    })

    mySession
      .connect(token, myNickname)
      .then(() => {
        console.log('커넥트요청보냄')
      })
      .catch((err) => {
        console.error(err)
        toast.error('연결에 실패했어요. 잠시후 다시 시도해주세요.')
      })

    const myPublisher = newOV.initPublisher('', {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: isMicOn,
      publishVideo: false,
    })

    mySession.publish(myPublisher)
    setPublisher(myPublisher)

    mySession.on('connectionCreated', (event) => {
      const nickname = event.connection.data
      toast(`${nickname}님이 음성채팅에 입장했어요`, {
        icon: '🙋‍♀️',
      })
    })

    mySession.on('connectionDestroyed', (event) => {
      const nickname = event.connection.data
      toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
        icon: '👋',
      })
    })

    mySession.on('publisherStartSpeaking', (event) => {
      setActiveSpeaker(event.connection.connectionId)
      console.log('User ' + event.connection.connectionId + ' start speaking')
    })

    mySession.on('publisherStopSpeaking', (event) => {
      setActiveSpeaker(undefined)
      console.log('User ' + event.connection.connectionId + ' stop speaking')
    })

    mySession.on('exception', (exception) => {
      console.warn(exception)
    })
  }

  // const handleHeadphoneOff = () => {
  //   console.log(subscriber)
  //   subscriber.subscribeToAudio(false)
  //   setIsHeadphoneOn(false)
  // }
  // const handleHeadphoneOn = () => {
  //   console.log(subscriber)
  //   subscriber.subscribeToAudio(true)
  //   setIsHeadphoneOn(true)
  // }
  const handleMicOff = () => {
    publisher.publishAudio(false)
    console.log(publisher)
    setIsMicOn(false)
  }
  const handleMicOn = () => {
    publisher.publishAudio(true)
    console.log(publisher)

    setIsMicOn(true)
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
  return (
    <div className="flex items-center justify-center">
      <div id="subscriberDiv" style={{ display: 'none' }}></div>
      <div id="publisher-container" style={{ display: 'none' }}></div>

      {/* 오디오컨트롤 */}
      {session && (
        <div className="mr-2 bg-white bg-opacity-20 border border-accent border-opacity-50 flex pl-2  w-fit rounded-3xl ">
          {/* {isHeadphoneOn ? (
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
          )} */}

          {isMicOn ? (
            <div onClick={handleMicOff}>
              <a id="willOffMic" className={anchorTagCSS}>
                <FiMic className="w-4 h-4" />
              </a>
              <Tooltip anchorSelect="#willOffMic" place="bottom">
                마이크 끄기
              </Tooltip>
            </div>
          ) : (
            <div onClick={handleMicOn}>
              <a id="willOnMic" className={anchorTagCSS}>
                <FiMicOff className="w-4 h-4 text-red-400" />
              </a>
              <Tooltip anchorSelect="#willOnMic" place="bottom">
                마이크 켜기
              </Tooltip>
            </div>
          )}
        </div>
      )}

      {session ? (
        <div
          onClick={() => disconnectSession()}
          className="rounded-xl border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center h-6 mr-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          연결끊기
        </div>
      ) : (
        <div
          className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1  hover:bg-primary hover:text-white transition-colors"
          onClick={() => fetchSessionAndToken()}
        >
          참여하기
        </div>
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}
export default GroupCall
