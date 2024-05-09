import { OpenVidu } from 'openvidu-browser'
import { useDispatch } from 'react-redux'
import fetch from '@/lib/fetch'
import {
  setMyNickname,
  addParticipants,
  removeParticipants,
  turnMicOff,
  turnMicOn,
  turnHeadphoneOff,
  turnHeadphoneOn,
  setActiveSpeaker,
} from '@/features/groupcall/groupcallSlice'

import { setCallSessionId } from '@/features/study/studySlice'

const useGroupCall = () => {
  const dispatch = useDispatch()

  const OV = new OpenVidu()
  OV.enableProdMode()

  const createSession = async (teamId: number) => {
    await fetch(`/openvidu/sessions/${teamId}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        console.log(res)
        console.log(res.json())
        res.json()
      })
      .then((json) => {
        console.log('세션만들기성공')
        dispatch(setCallSessionId(json))
      })
      .catch((err) => console.error(err))
  }

  const joinSession = async (existingSessionId: number) => {
    const mySession = OV.initSession() // 만들어진 'Session'을 반환함

    mySession.on('streamCreated', (event) => {
      // stream이 만들어지면
      const subscriber = mySession.subscribe(event.stream, undefined) // 섭스크라이버로서의 나
      const nickname = event.stream.connection.data.split('=')[1] // 나의 닉네임
      dispatch(setMyNickname(nickname))
      dispatch(addParticipants(nickname))
    })

    mySession.on('streamDestroyed', (event) => {
      event.preventDefault()
      const nickname = event.stream.connection.data.split('=')[1]
      dispatch(setMyNickname(''))
      dispatch(removeParticipants(nickname))
    })

    await fetch(`/openvidu/sessions/${existingSessionId}/connections`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        mySession.connect(json)
        console.log('세션연결성공')
      })

    // 이부분 html 요소 할당해야하는지?
    const publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: false,
      publishAudio: true, // 이거 어떻게
      publishVideo: false, // 어떻게 하지
    })

    mySession.publish(publisher)

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
  } // joinsession 함수

  // 나에게 저장된 세션 있는지 확인해서 있으면 끊기
  const disconnectSession = () => {
    mySession.disconnect()
    dispatch(setMySession(undefined))
  }

  const handleMicOff = () => {
    dispatch(turnMicOff())
    myPublisher.publishAudio(false)
  }

  const handleMicOn = () => {
    dispatch(turnMicOn())
    myPublisher.publishAudio(true)
  }

  const handleHeadphoneOn = () => {
    dispatch(turnHeadphoneOn())
    mySubscriber.subscribeToAudio(true) // true to unmute the audio track, false to mute it
  }

  const handleHeadphoneOff = (mySubscriber) => {
    dispatch(turnHeadphoneOff())
    mySubscriber.subscribeToAudio(false)
  }

  return {
    createSession,
    joinSession,
    disconnectSession,
    handleMicOff,
    handleMicOn,
    handleHeadphoneOn,
    handleHeadphoneOff,
  }
}

export default useGroupCall
