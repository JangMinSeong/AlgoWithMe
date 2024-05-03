import { OpenVidu } from 'openvidu-browser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import {
  setSession,
  setMyUserName,
  setMySessionId,
  setMainStreamManager, // 필요 없을 수도
  setSubscriber,
  setPublisher,
  setParticipants,
  turnMicOff,
  turnMicOn,
  turnHeadphoneOff,
  turnHeadphoneOn,
  setActiveSpeaker,
} from '@/features/groupcall/groupcallSlice'

const useGroupCall = () => {
  const dispatch = useDispatch()

  const session = useSelector((state: RootState) => state.groupcall.session)
  const publisher = useSelector((state: RootState) => state.groupcall.publisher)
  const subscriber = useSelector(
    (state: RootState) => state.groupcall.subscriber,
  )

  const OV = new OpenVidu()
  OV.enableProdMode()

  const connectToSession = (token) => {
    if (session) session.disconnect()

    const mySession = OV.initSession()

    mySession.on('streamCreated', (event) => {
      // 이부분 html 요소 할당해야하는지 확인 필요
      const subscriber = mySession.subscribe(event.stream, undefined)
      const nickname = event.stream.connection.data.split('=')[1]
      dispatch(setSubscriber(subscriber))
      dispatch(setMyUserName(nickname))
      dispatch(
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          { subscriber, nickname },
        ]),
      )
    })

    mySession.on('streamDestroyed', (event) => {
      event.preventDefault()
      const nickname = event.stream.connection.data.split('=')[1]
      dispatch(setSubscriber(undefined))
      dispatch(setMyUserName(undefined))
      dispatch(
        setParticipants((prevParticipants) =>
          prevParticipants.filter(
            (participant) => participant.nickname !== nickname,
          ),
        ),
      )
    })

    mySession.connect(token)

    // 현재 발화자
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

    // 이부분 html 요소 할당해야하는지 확인 필요
    const publisher = OV.initPublisher(undefined, {
      audioSource: undefined, // 이부분 수정필요
      videoSource: false,
      publishAudio: false,
      publishVideo: false,
    })

    mySession.publish(publisher)

    dispatch(setPublisher(publisher))
    dispatch(setSession(mySession))
  }

  const disconnectSession = () => {
    if (session) {
      session.disconnect()
      dispatch(setSession(undefined))
    }
  }

  const handleMicOff = () => {
    dispatch(turnMicOff())
    publisher.publishAudio(false)
  }

  const handleMicOn = () => {
    dispatch(turnMicOn())
    publisher.publishAudio(true)
  }

  const handleHeadphoneOn = () => {
    dispatch(turnHeadphoneOn())
    subscriber.subscribeToAudio(true) // true to unmute the audio track, false to mute it
  }

  const handleHeadphoneOff = () => {
    dispatch(turnHeadphoneOff())
    subscriber.subscribeToAudio(false)
  }

  return {
    connectToSession,
    disconnectSession,
    handleMicOff,
    handleMicOn,
    handleHeadphoneOn,
    handleHeadphoneOff,
  }
}

export default useGroupCall
