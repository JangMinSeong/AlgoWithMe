import { useState } from 'react'
import useTimer from '@/hooks/useTimer'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import toast, { Toaster } from 'react-hot-toast'

const SetTimer = () => {
  const [isActiveEditing, setIsActiveEditing] = useState(false)

  const isSolving = useSelector((state: RootState) => state.solving.isSolving)
  const hour = useSelector((state: RootState) => state.timer.initialhour)
  const min = useSelector((state: RootState) => state.timer.initialmin)

  const [timerHour, setTimerHour] = useState(hour)
  const [timerMin, setTimerMin] = useState(min)

  const { handleSetTimer, handleChangeTimer } = useTimer()

  const handleActivateTimerEdit = () => {
    if (isSolving) {
      toast.error('이미 문제 풀이가 진행 중이에요.')
    } else {
      setIsActiveEditing(true)
    }
  }

  const handleSetTime = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newHour = Number(formData.get('newHour'))
    setTimerHour(newHour)
    const newMin = Number(formData.get('newMin'))
    setTimerMin(newMin)

    setIsActiveEditing(false)

    handleSetTimer({ hour: newHour, min: newMin, sec: 0 })
    handleChangeTimer({ hour: newHour, min: newMin, sec: 0 })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full p-1 border relative bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 shadow-foggyPink mb-3">
        <div
          style={{ fontFamily: 'orbitron' }}
          className={`rounded-full w-80 h-80 relative bg-white font-bold text-xl text-darkNavy`}
        >
          {isActiveEditing ? (
            <form
              id="timer"
              onSubmit={handleSetTime}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
              <div style={{ fontFamily: 'orbitron' }}>
                <input
                  type="number"
                  name="newHour"
                  min={0}
                  max={23}
                  required
                  defaultValue={timerHour}
                  className="w-[40px] border rounded-lg p-1 text-center mr-2"
                />
                h{' '}
                <input
                  type="number"
                  name="newMin"
                  min={0}
                  max={59}
                  required
                  defaultValue={timerMin}
                  className="w-[50px] border rounded-lg p-1 text-center mr-2"
                />
                m
              </div>
            </form>
          ) : (
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">{`${timerHour} h ${timerMin} m`}</div>
          )}
        </div>
      </div>
      {isActiveEditing ? (
        <button
          type="submit"
          form="timer"
          className="border rounded-3xl bg-background py-3 px-3 text-navy text-xs w-fit"
        >
          저장하기
        </button>
      ) : (
        <div
          onClick={handleActivateTimerEdit}
          className="border rounded-3xl bg-background py-3 px-3 text-navy text-xs w-fit"
        >
          시간 수정하기
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default SetTimer
