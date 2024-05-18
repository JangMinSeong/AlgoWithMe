import { useState, useEffect, useCallback } from 'react'
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from 'openvidu-browser'
import fetch from '@/lib/fetch'
import JoinButton from './JoinButton'
import Session from './Session'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { FiMic, FiMicOff } from 'react-icons/fi'
import { Tooltip } from 'react-tooltip'
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
import useMember from '@/hooks/useMember'
import { PiDotsThreeBold } from 'react-icons/pi'

const Main = () => {
  const { groupId } = useParams()
  const myNickname = useSelector((state: RootState) => state.auth.user.nickname)
  const myUrl = useSelector((state: RootState) => state.auth.user.imageUrl)
  const {
    handleSetOnline,
    handleUnsetOnline,
    handleSetOffline,
    handleUnsetOffline,
    handleSetSpeaker,
    handleUnsetSpeaker,
  } = useMember()

  const [session, setSession] = useState<OVSession | ''>('')
  const [sessionId, setSessionId] = useState<string>('')
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [OV, setOV] = useState<OpenVidu | null>(null)
  // const [activeSpeaker, setActiveSpeaker] = useState<string>()
  const [isMicOn, setIsMicOn] = useState(true)
  const [isHeadphoneOn, setIsHeadphoneOn] = useState(true)
  // const [participants, setParticipants] = useState([])

  const [enterAlertArr, setEnterAlertArr] = useState([])
  const [leaveAlertArr, setLeaveAlertArr] = useState([])

  const memberList = useSelector((State: RootState) => State.study.memberList)

  const leaveSession = useCallback(() => {
    if (session) session.disconnect()

    const myData = {
      nickname: myNickname,
      imageUrl: myUrl,
      isSpeaking: false,
    }

    handleUnsetOnline(myNickname)
    handleSetOffline(myData)
    setOV(null)
    setSession('')
    setSessionId('')
    setSubscriber(null)
    setPublisher(null)
  }, [session])

  const joinSession = () => {
    const newOV = new OpenVidu()
    newOV.enableProdMode()
    setOV(newOV)
    setSession(newOV.initSession())
  }

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession)

    return () => {
      window.removeEventListener('beforeunload', leaveSession)
    }
  }, [leaveSession])

  //   const sessionIdChangeHandler = () => {
  //     setSessionId(groupId) // 여기 숴정
  //   }

  useEffect(() => {
    if (session === '') return

    session.on('streamCreated', (event) => {
      //   console.log('스트림생성')
      const mySubscriber = session.subscribe(event.stream, 'subscriberDiv')
      const connectionId = event.stream.connection.connectionId
      const nickname = event.stream.connection.data
      //    console.log(connectionId)

      setSubscriber(mySubscriber)

      // if (enterAlertArr.findIndex((nn) => nn === nickname) === -1) {
      //   toast(`${nickname}님이 음성채팅에 입장했어요`, {
      //     icon: '🙋‍♀️',
      //   })
      //   setEnterAlertArr((prev) => [...prev, nickname])
      //   setLeaveAlertArr((prev) => prev.filter((nn) => nn !== nickname))
      // }
    })

    session.on('streamDestroyed', (event) => {
      event.preventDefault()
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null)
      }
      //     console.log('스트림파괴')
      const nickname = event.stream.connection.data

      const memberData = memberList.find((item) => item.nickname === nickname)
      const member = {
        nickname: nickname,
        imageUrl: memberData.imageUrl,
        isSpeaking: false,
      }

      handleUnsetOnline(nickname)
      handleSetOffline(member)

      // if (leaveAlertArr.findIndex((nn) => nn === nickname) === -1) {
      //   toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
      //     icon: '👋',
      //   })
      //   setLeaveAlertArr((prev) => [...prev, nickname])
      //   setEnterAlertArr((prev) => prev.filter((nn) => nn !== nickname))
      // }

      // toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
      //   icon: '👋',
      // })

      // const connectionId = event.stream.connection.connectionId
    })

    // session.on('streamDestroyed', (event) => {
    //   //   const nickname = event.stream.connection.data
    //   //   toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
    //   //     icon: '👋',
    //   //   })
    // })

    session.on('connectionCreated', (event) => {
      const nickname = event.connection.data
      const memberData = memberList.find((item) => item.nickname === nickname)
      const member = {
        nickname: nickname,
        imageUrl: memberData.imageUrl,
        isSpeaking: false,
      }

      handleSetOnline(member)
      handleUnsetOffline(nickname)
    })

    session.on('connectionDestroyed', (event) => {
      const nickname = event.connection.data
      handleUnsetOnline(nickname)
      // toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
      //   icon: '👋',
      // })
    })

    session.on('publisherStartSpeaking', (event) => {
      handleSetSpeaker(event.connection.data)
      console.log('User ' + event.connection.data + '가 말하고 있어요')
    })

    session.on('publisherStopSpeaking', (event) => {
      handleUnsetSpeaker(event.connection.data)
      console.log('User ' + event.connection.data + '가 말을 멈췄어요')
    })
  }, [subscriber, session])

  useEffect(() => {
    if (session === '') return

    const connectToSession = (token) => {
      session.connect(token, myNickname).then(() => {
        if (OV) {
          const publishers = OV.initPublisher('publisherDiv', {
            audioSource: isHeadphoneOn,
            videoSource: false,
            publishAudio: isMicOn, // 여기 수정
            publishVideo: false, // 여기 수정
          })

          setPublisher(publishers)
          session.publish(publishers)
        }
      })
    }

    const createSession = async () => {
      try {
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
      } catch (error) {
        //      console.error(error)
      }
    }

    createSession()
  }, [session, OV, sessionId])

  const handleHeadphoneOff = () => {
    //   console.log(subscriber)
    setIsHeadphoneOn(false)
    subscriber.subscribeToAudio(false)
  }
  const handleHeadphoneOn = () => {
    //   console.log(subscriber)
    setIsHeadphoneOn(true)
    subscriber.subscribeToAudio(true)
  }

  const handleMicOff = () => {
    setIsMicOn(false)
    publisher.publishAudio(false)
    //   console.log(publisher)
  }
  const handleMicOn = () => {
    setIsMicOn(true)
    //  console.log(publisher)
    publisher.publishAudio(true)
  }

  const [AudioControllerVisible, setAudioControllerVisible] = useState(false)

  return (
    <div className="flex">
      <JoinButton joinSession={joinSession} outSession={leaveSession} />

      {session && (
        <div
          onClick={() => setAudioControllerVisible(!AudioControllerVisible)}
          className="cursor-pointer rounded-full w-10 h-10 border border-primary text-primary text-xs flex px-2 items-center justify-center  mr-1  hover:bg-primary hover:text-white transition-colors"
        >
          <PiDotsThreeBold className="w-5 h-5" />
        </div>
      )}

      {/* 오디오컨트롤 */}
      <div
        className={`cursor-pointer mr-2 flex ${
          AudioControllerVisible ? 'visible' : 'invisible'
        }`}
      >
        <div>
          {isHeadphoneOn ? (
            <div onClick={handleHeadphoneOff}>
              <a
                id="willOffHeadphone"
                className="rounded-full w-10 h-10 border border-primary text-primary text-xs flex px-2 items-center justify-center  mr-1  hover:bg-primary hover:text-white transition-colors"
              >
                <TbHeadphones className="w-5 h-5" />
              </a>
              <Tooltip anchorSelect="#willOffHeadphone" place="bottom">
                헤드셋 소리 끄기
              </Tooltip>
            </div>
          ) : (
            <div onClick={handleHeadphoneOn}>
              <a
                id="willOnHeadphone"
                className="rounded-full w-10 h-10 border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center mr-1 hover:bg-red-500 hover:text-white transition-colors"
              >
                <TbHeadphonesOff className="w-5 h-5 " />
              </a>
              <Tooltip anchorSelect="#willOnHeadphone" place="bottom">
                헤드셋 소리 켜기
              </Tooltip>
            </div>
          )}
        </div>
        <div>
          {isMicOn ? (
            <div onClick={handleMicOff}>
              <a
                id="willOffMic"
                className="rounded-full w-10 h-10 border border-primary text-primary text-xs flex px-2 items-center justify-center  mr-1  hover:bg-primary hover:text-white transition-colors"
              >
                <FiMic className="w-4 h-4" />
              </a>
              <Tooltip anchorSelect="#willOffMic" place="bottom">
                마이크 끄기
              </Tooltip>
            </div>
          ) : (
            <div onClick={handleMicOn}>
              <a
                id="willOnMic"
                className="rounded-full w-10 h-10 border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center mr-1 hover:bg-red-500 hover:text-white transition-colors"
              >
                <FiMicOff className="w-4 h-4" />
              </a>
              <Tooltip anchorSelect="#willOnMic" place="bottom">
                마이크 켜기
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      {/* <Session
        publisher={publisher as Publisher}
        subscriber={subscriber as Subscriber}
        participants={participants}
      /> */}

      <div style={{ display: 'none' }} id="subscriberDiv"></div>
      <div style={{ display: 'none' }} id="publisherDiv"></div>

      {/* <Toaster position="bottom-center" reverseOrder={false} /> */}
    </div>
  )
}

export default Main
