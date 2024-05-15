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

const Main = () => {
  const { groupId } = useParams()
  const myNickname = useSelector((state: RootState) => state.auth.user.nickname)

  const [session, setSession] = useState<OVSession | ''>('')
  const [sessionId, setSessionId] = useState<string>('')
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)
  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [OV, setOV] = useState<OpenVidu | null>(null)
  const [activeSpeaker, setActiveSpeaker] = useState<string>()
  const [isMicOn, setIsMicOn] = useState(false)
  const [participants, setParticipants] = useState([])

  const leaveSession = useCallback(() => {
    if (session) session.disconnect()

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
      const mySubscriber = session.subscribe(event.stream, 'subscriberDiv')
      const connectionId = event.stream.connection.connectionId
      const nickname = event.stream.connection.data
      console.log(connectionId)

      setParticipants((prevParticipants) => [
        ...prevParticipants,
        { connectionId, nickname, mySubscriber },
      ])

      console.log('참가자목록', participants)
    })

    session.on('streamDestroyed', (event) => {
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

    session.on('streamDestroyed', (event) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null)
      }
    })

    session.on('connectionCreated', (event) => {
      const nickname = event.connection.data
      toast(`${nickname}님이 음성채팅에 입장했어요`, {
        icon: '🙋‍♀️',
      })
    })

    session.on('connectionDestroyed', (event) => {
      const nickname = event.connection.data
      toast(`${nickname}님이 음성채팅에서 퇴장했어요`, {
        icon: '👋',
      })
    })

    session.on('publisherStartSpeaking', (event) => {
      setActiveSpeaker(event.connection.connectionId)
      console.log('User ' + event.connection.connectionId + '가 말하고 있어요')
    })

    session.on('publisherStopSpeaking', (event) => {
      setActiveSpeaker(undefined)
      console.log('User ' + event.connection.connectionId + '가 말을 멈췄어요')
    })
  }, [subscriber, session])

  useEffect(() => {
    if (session === '') return

    session.on('streamCreated', (event) => {
      const subscribers = session.subscribe(event.stream, '')
      setSubscriber(subscribers)
    })

    const connectToSession = (token) => {
      session.connect(token, myNickname).then(() => {
        if (OV) {
          const publishers = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true, // 여기 수정
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
        console.error(error)
      }
    }

    createSession()
  }, [session, OV, sessionId])

  return (
    <div>
      <>
        <JoinButton joinSession={joinSession} outSession={leaveSession} />

        <Session
          publisher={publisher as Publisher}
          subscriber={subscriber as Subscriber}
          participants={participants}
        />

        <Toaster position="bottom-center" reverseOrder={false} />
      </>
    </div>
  )
}

export default Main
