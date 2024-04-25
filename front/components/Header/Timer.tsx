'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
import { changeTimer } from '@/features/timer/timerSlice'
import { useEffect, useState } from 'react'
import Clock from './test'
const Timer = () => {
  const timer = useSelector((state: RootState) => state.timer)
  const [remainTime, setRemainTime] = useState(new Date()) // 현재 시간 상태 초기화

  useEffect(() => {
    const timerID = setInterval(() => {
      setRemainTime(new Date()) // 매 초마다 현재 시간 업데이트
    }, 60000) // 1000ms (1초) 간격으로 setInterval 실행

    return () => {
      clearInterval(timerID) // 컴포넌트가 언마운트될 때 인터벌 정리
    }
  }, []) // 빈 배열을 의존성 목록으로 제공하여 마운트 시에만 effect 실행

  return (
    <Clock />
    // <div className="bg-white bg-opacity-20 border border-accent border-opacity-50 flex p-2 w-fit rounded-3xl shadow-foggyPurple items-center mr-2">
    //   <span className="text-xs text-navy mr-2 ">남은 시간 </span>
    //   {timer.hour}
    //   <span className="text-xs text-navy mr-2 ml-1">시간</span>
    //   {timer.min}
    //   <span className="text-xs text-navy ml-1">분</span>
    // </div>
  )
}

export default Timer
