import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import toast, { Toaster } from 'react-hot-toast'
import { FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa'
import useSolving from '@/hooks/useSolving'
import useTimer from '@/hooks/useTimer'
import { useRef } from 'react'

const Timer = () => {
  const { handleChangeTimer } = useTimer()

  const timerHour = useSelector((state: RootState) => state.timer.hour)
  const timerMin = useSelector((state: RootState) => state.timer.min)
  const timerSec = useSelector((state: RootState) => state.timer.sec)

  const studyDurationInSec = timerHour * 3600 + timerMin * 60 // 스터디 진행시간 in S

  //   const [remainHour, setRemainHour] = useState(timerHour)
  //   const [remainMin, setRemainMin] = useState(timerMin)
  //   const [remainSec, setRemainSec] = useState(0)

  const isSolving = useSelector((state: RootState) => state.solving.isSolving)

  const { handleStartSolving, handleEndSolving } = useSolving()

  const timerId = useRef()

  const handleTimerPlay = () => {
    const startTime = Number(localStorage.getItem('startedAt'))
    timerId.current = setInterval(() => {
      const localTime = new Date().getTime()
      // 매 초마다 현재 로컬 시간 업데이트

      const totalPassedSec = Math.floor((localTime - startTime) / 1000) // 전체 경과 in S

      // 총 남은 초
      const totalRemainSec = studyDurationInSec - totalPassedSec

      if (totalRemainSec <= 0) {
        toast('풀이 시간이 종료되었어요', { icon: '⏱' })
        handleEndSolving()
        clearInterval(timerId.current)
      }

      // 남은 초를 시간 분 초 단위로 변경
      const newRemainSec = totalRemainSec % 60 // 나머지 == 초
      const newRemainMin = Math.floor((totalRemainSec / 60) % 60)
      const newRemainHour = Math.floor(totalRemainSec / 3600)

      handleChangeTimer({
        hour: Math.max(0, newRemainHour),
        min: Math.max(0, newRemainMin),
        sec: Math.max(0, newRemainSec),
      })
    }, 1000) // 1초 간격으로 setInterval 실행
  }

  const handleStart = () => {
    if (timerHour === 0 && timerMin === 0 && timerSec === 0) {
      toast.error('시간을 다시 설정해주세요')
    } else {
      handleStartSolving()
      handleTimerPlay()
    }
  }

  const handleEnd = () => {
    if (confirm('풀이를 종료하시겠어요?')) {
      clearInterval(timerId.current)
      handleEndSolving()
      handleChangeTimer({ hour: 0, min: 0, sec: 0 })
    }
  }

  return (
    <div className="flex items-center">
      <div
        className={`bg-white bg-opacity-20 border border-accent border-opacity-50 flex p-2 w-fit rounded-3xl shadow-foggyPurple items-center mr-2`}
      >
        <span className="text-xs text-navy mr-2 ">남은 시간</span>
        {timerHour}
        <span className="text-xs text-navy mr-2 ml-1">시간</span>
        {timerMin}
        <span className="text-xs text-navy mr-2 ml-1">분</span>
        {timerSec}
        <span className="text-xs text-navy ml-1 mr-2">초</span>

        <div className="flex">
          {isSolving ? (
            <FaRegStopCircle onClick={handleEnd} />
          ) : (
            <FaRegPlayCircle
              className="text-red-500 mr-1"
              onClick={handleStart}
            />
          )}
        </div>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default Timer
