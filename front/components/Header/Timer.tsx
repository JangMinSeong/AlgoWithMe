'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
// import { changeTimer } from '@/features/timer/timerSlice'
import { useEffect, useState } from 'react'
const Timer = () => {
  const timer = useSelector((state: RootState) => state.timer)

  const studyDurationInSec = timer.hour * 3600 + timer.min * 60 // 스터디 진행시간 in S

  const [remainHour, setRemainHour] = useState(timer.hour)
  const [remainMin, setRemainMin] = useState(timer.min)
  const [remainSec, setRemainSec] = useState(0)

  // 스터디 시작 시간
  const dummyStartTime = new Date(2024, 3, 26, 8, 0).getTime()

  useEffect(() => {
    const timerID = setInterval(() => {
      const localTime = new Date().getTime()
      // 매 초마다 현재 로컬 시간 업데이트

      const totalPassedSec = Math.floor((localTime - dummyStartTime) / 1000) // 전체 경과 in S

      // 총 남은 초
      const totalRemainSec = studyDurationInSec - totalPassedSec

      if (totalRemainSec <= 0) {
        clearInterval(timerID)
      }

      // 남은 초를 시간 분 초 단위로 변경
      const newRemainSec = totalRemainSec % 60 // 나머지 == 초
      const newRemainMin = Math.floor((totalRemainSec / 60) % 60)
      const newRemainHour = Math.floor(totalRemainSec / 3600)

      setRemainHour(Math.max(0, newRemainHour))
      setRemainMin(Math.max(0, newRemainMin))
      setRemainSec(Math.max(0, newRemainSec))
    }, 1000) // 1초 간격으로 setInterval 실행

    return () => {
      clearInterval(timerID) // 컴포넌트가 언마운트될 때 인터벌 정리
    }
  }, [timer.hour, timer.min])

  return (
    <div className="bg-white bg-opacity-20 border border-accent border-opacity-50 flex p-2 w-fit rounded-3xl shadow-foggyPurple items-center mr-2">
      <span className="text-xs text-navy mr-2 ">남은 시간 </span>
      {remainHour}
      <span className="text-xs text-navy mr-2 ml-1">시간</span>
      {remainMin}
      <span className="text-xs text-navy mr-2 ml-1">분</span>
      {remainSec}
      <span className="text-xs text-navy ml-1">초</span>
    </div>
  )
}

export default Timer
