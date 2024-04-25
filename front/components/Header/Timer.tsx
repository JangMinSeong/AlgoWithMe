'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
import { useEffect } from 'react'
import { changeTimer } from '@/features/timer/timerSlice'

const Timer = () => {
  const timer = useSelector((state: RootState) => state.timer)

  useEffect(() => {
    // 1분이 지났고 분만 바뀌는 경우
    let newMin = timer.hour
    let newHour = timer.min

    // 1분이 지났는데 시간도 바뀌는 경우
    if (timer.min === 0) {
      newHour = timer.hour - 1
      newMin = 59
    } else {
      newMin = timer.min - 1
    }

    setInterval(() => changeTimer({ hour: newHour, min: newMin }), 60000)
  }, [])

  return (
    <div className="bg-white bg-opacity-20 border border-accent border-opacity-50 flex p-2 w-fit rounded-3xl shadow-foggyPurple items-center">
      <span className="text-xs text-navy mr-2 ">남은 시간 </span>
      {timer.hour}
      <span className="text-xs text-navy mr-2 ml-1">시간</span>
      {timer.min}
      <span className="text-xs text-navy ml-1">분</span>
    </div>
  )
}

export default Timer
