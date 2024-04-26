'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
// import { changeTimer } from '@/features/timer/timerSlice'
import { useEffect, useState } from 'react'
const Timer = () => {
  const timer = useSelector((state: RootState) => state.timer)

  // 설정된 시간
  let initialHour = timer.hour
  let initialMin = timer.min

  if (timer.min === 0) {
    initialMin = 59
    initialHour -= 1
  } else {
    initialMin -= 1
  }

  // 만약 분이 0으로 시작되면, initialhour에서 -1 하고 분을 59로 만들어줘야함

  const [remainHour, setRemainHour] = useState(initialHour) // 현재 시간 상태 초기화
  const [remainMin, setRemainMin] = useState(initialMin) // 현재 시간 상태 초기화
  const [remainSec, setRemainSec] = useState(59)
  // 스터디 시작 시간
  const dummyStartTime = new Date(2024, 3, 26, 8, 0).getTime()
  // 기점부터 경과된 밀리초

  useEffect(() => {
    const timerID = setInterval(() => {
      const localTime = new Date().getTime()
      // 매 초마다 현재 로컬 시간 업데이트

      const timeDiffinMS = localTime - dummyStartTime
      // 밀리세컨드를 시간, 분, 초로 변환

      // 1시간 : 3600000 ms == 3600s
      // 1분 : 60000 ms == 60s
      // 1초 : 1000 ms == 1s

      const totalPassedSec = Math.floor(timeDiffinMS / 1000) // 전체 경과 in S

      const hourPassed = Math.floor(totalPassedSec / 3600) // 경과 초에서 3600 나눈 몫
      const minPassed = Math.floor((totalPassedSec - hourPassed * 3600) / 60) // 경과 초에서 (시간*초)을 빼고, 60으로 나눈 몫
      const secPassed = totalPassedSec % 60 // 경과 초

      const newRemainHour = Math.max(0, initialHour - hourPassed)
      const newRemainMin = Math.max(0, initialMin - minPassed)
      const newRemainSec = Math.max(0, 59 - secPassed)

      setRemainHour(newRemainHour) // 매 분마다 현재 시간 업데이트
      setRemainMin(newRemainMin)
      setRemainSec(newRemainSec)
    }, 1000) // 1분 간격으로 setInterval 실행

    return () => {
      clearInterval(timerID) // 컴포넌트가 언마운트될 때 인터벌 정리
    }
  }, [initialHour, initialMin]) // 빈 배열을 의존성 목록으로 제공하여 마운트 시에만 effect 실행

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
