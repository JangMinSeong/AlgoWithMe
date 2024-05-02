import React from 'react'
import { OpenVidu } from 'openvidu-browser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import {
  setSession,
  setMyUserName,
  setMySessionId,
  setMainStreamManager,
  setSubscriber,
  setPublisher,
  setParticipants,
  turnMicOff,
  turnMicOn,
  turnHeadphoneOff,
  turnHeadphoneOn,
} from '@/features/groupcall/groupcallSlice'

const useGroupCall = () => {
  const dispatch = useDispatch()

  const session = useSelector((state: RootState) => state.groupcall.session)
  const isMicOn = useSelector((state: RootState) => state.groupcall.isMicOn)
  const publisher = useSelector((state: RootState) => state.groupcall.publisher)
  const subscriber = useSelector(
    (state: RootState) => state.groupcall.subscriber,
  )

  const OV = new OpenVidu()

  const connectToSession = (token) => {
    if (session) session.disconnect()

    const mySession = OV.initSession()

    mySession.on('streamCreated', (event) => {
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

    mySession.on('exception', (exception) => {
      console.warn(exception)
    })

    const publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
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
