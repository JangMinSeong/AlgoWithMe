'use client'

import useGroupCall from '@/hooks/useGroupCall'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useState } from 'react'

const GroupCall = () => {
  const myNickname = useSelector(
    (state: RootState) => state.groupcall.myNickname,
  )
  const activeSpeaker = useSelector(
    (state: RootState) => state.groupcall.activeSpeaker,
  )
  const existingSessionId = useSelector(
    (state: RootState) => state.study.callSessionId,
  )

  const teamId = 1 // dummy

  const { createSession, joinSession, disconnectSession } = useGroupCall()

  const participants = useSelector(
    (state: RootState) => state.groupcall.participants,
  )

  const mySession = useSelector((state: RootState) => state.groupcall.mySession)

  return (
    <div>
      <div onClick={() => joinSession(teamId)}>참여하기</div>

      {participants.map((el, idx) => (
        <div>사람{idx + 1}</div>
        // activeSpeaker 인 사람은 빨간 링띄우기
      ))}
      <div onClick={() => disconnectSession(mySession)}>연결끊기</div>
    </div>
  )
}
export default GroupCall
