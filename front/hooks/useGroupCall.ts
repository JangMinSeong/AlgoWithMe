import { OpenVidu } from 'openvidu-browser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import {
  setSession,
  setMyUserName,
  setMySessionId,
  setMainStreamManager,
  setSubscribers,
  setPublisher,
  turnMicOff,
  turnMicOn,
} from '@/features/groupcall/groupcallSlice'

const useGroupCall = async (token) => {
  const dispatch = useDispatch()
  const session = useSelector((state: RootState) => state.groupcall.session)
  const isMicOn = useSelector((state: RootState) => state.groupcall.isMicOn)
  const publisher = useSelector((state: RootState) => state.groupcall.publisher)
  const OV = new OpenVidu()

  const connectToSession = () => {
    if (session) session.disconnect()

    const mySession = OV.initSession()
    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined)
      const nickname = event.stream.connection.data.split('=')[1]
      dispatch(
        setSubscribers((prevSubscribers) => [
          ...prevSubscribers,
          { subscriber, nickname },
        ]),
      )
    })

    mySession.on('streamDestroyed', (event) => {
      event.preventDefault()
      const nickname = event.stream.connection.data.split('=')[1]
      dispatch(
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter(
            (subscriber) => subscriber.nickname !== nickname,
          ),
        ),
      )
    })

    await mySession.connect(token)

    mySession.on('exception', (exception) => {
      console.warn(exception)
    })

    const publisher = OV.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: false,
      publishVideo: false,
    })

    await mySession.publish(publisher)

    dispatch(setPublisher(publisher))
    dispatch(setSession(mySession))
  }

  const disconnectSession = () => {
    if (session) {
      session.disconnect()
      dispatch(setSession(undefined))
      dispatch(setSubscribers([]))
    }
  }

  const handleMicOff = () => {
    if (publisher) {
      dispatch(turnMicOff())
    }
  }

  const handleMicOn = () => {
    if (publisher) {
      dispatch(turnMicOn())
      publisher.publishAudio(isMicOn)
    }
  }
  return {
    connectToSession,
    disconnectSession,
    handleMicOff,
    handleMicOn,
  }
}

export default useGroupCall
