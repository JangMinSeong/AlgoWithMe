'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/timerStore'
import { useEffect } from 'react'

const Timer = () => {
  const initialHour = useSelector((state: RootState) => state.timer.hour)
  const initialMin = useSelector((state: RootState) => state.timer.min)

  var click = true

  useEffect(() => {
    console.log(initialHour, initialMin)
    console.log(click)
  }, [click])
  return (
    <div>
      시간 {initialHour}분 {initialMin}
      <button
        onClick={() => {
          click = !click
          console.log(click)
        }}
      >
        ccS
      </button>
    </div>
  )
}

export default Timer
