'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'

const Timer = () => {
  const initialHour = useSelector((state: RootState) => state.timer.hour)
  const initialMin = useSelector((state: RootState) => state.timer.min)

  return (
    <div>
      시간 {initialHour}분 {initialMin}
    </div>
  )
}

export default Timer
