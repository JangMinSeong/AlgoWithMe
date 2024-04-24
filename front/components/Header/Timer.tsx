'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/timerStore'

const Timer = () => {
  const timer = useSelector((state: RootState) => state.timer)

  return (
    <div>
      {timer.hour}시간 {timer.min}분
    </div>
  )
}

export default Timer
