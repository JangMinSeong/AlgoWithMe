'use client'

import { OpenVidu } from 'openvidu-browser'
import { useState, useEffect } from 'react'
import fetch from '@/lib/fetch'
import { FiMic, FiMicOff } from 'react-icons/fi'
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from '@/components/ReactToolTip'

const GroupCall = () => {
  const teamId = 1 // dummy
  const [OV, setOV] = useState()
  const [publisher, setPublisher] = useState()
  const [subscriber, setSubscriber] = useState()

  const [activeSpeaker, setActiveSpeaker] = useState()
  const [participants, setParticipants] = useState([])
  const [mySession, setMySession] = useState()
  const [isHeadphoneOn, setIsHeadphoneOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(false)

  // const createSession = async () => {
  //   await fetch(`/openvidu/sessions/${teamId}`, {
  //     method: 'POST',
  //     credentials: 'include',
  //   })
  //     .then((res) => {
  //       console.log(res)
  //       console.log(res.json())
  //       res.json()
  //     })
  //     .then((json) => {
  //       console.log('세션만들기성공')
  //       console.log(json)
  //     })
  //     .catch((err) => console.error(err))
  // } // 이것의 필요성... 없다고 생각하는 바
  useEffect(() => {
    const newOV = new OpenVidu()
    setOV(newOV)

    newOV.enableProdMode()
    setMySession(newOV.initSession()) // 만들어진 'Session'을 반환함
  }, [])

  const joinSession = async () => {
    // connection 생성
    await fetch(`/openvidu/sessions/${teamId}/connections`, {
      method: 'POST',
      credentials: 'include',
    }) // 토큰 만들어서
      .then((res) => res.json())
      .then((json) => {
        mySession.connect(json.token)
        console.log('세션연결성공')
      })
      .then(() => {
        // publisher 생성
        const newPublisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: false,
          publishAudio: isMicOn,
          publishVideo: false,
        })

        setPublisher(newPublisher)

        mySession.publish(publisher)
      })

    // subscriber 생성
    mySession.on('streamCreated', (event) => {
      // stream이 만들어지면
      const newSubscriber = mySession.subscribe(event.stream, undefined) // 새로운 섭스크라이버가 생기면
      setSubscriber(newSubscriber)
      const nickname = event.stream.connection.data.split('=')[1] // 추가해줌
      setParticipants([...participants, nickname])
    })

    mySession.on('streamDestroyed', (event) => {
      const nickname = event.stream.connection.data.split('=')[1] // 누가 나가면
      setParticipants(participants.filter((item) => item !== nickname)) // 지워줌
    })

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

  // 세션에서 연결끊기
  const disconnectSession = () => {
    mySession.disconnect()
    setMySession(undefined)
  }

  const handleHeadphoneOff = () => {
    subscriber.subscribeToAudio(false)
    setIsHeadphoneOn(false)
  }
  const handleHeadphoneOn = () => {
    subscriber.subscribeToAudio(true)
    setIsHeadphoneOn(true)
  }
  const handleMicOff = () => {
    publisher.publishAudio(false)
    setIsMicOn(false)
  }
  const handleMicOn = () => {
    publisher.publishAudio(true)
    setIsMicOn(true)
  }

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  const chipCss =
    'rounded-xl bg-slate-200 text-xs flex pl-3 items-center justify-center h-6 mr-1 mb-1'
  return (
    <div className="flex">
      <div onClick={joinSession} className={chipCss}>
        참여하기
      </div>

      {participants.map((el, idx) => (
        <div>사람{idx + 1}</div>
        // activeSpeaker 인 사람은 빨간 링띄우기
      ))}
      <div onClick={disconnectSession} className={chipCss}>
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
