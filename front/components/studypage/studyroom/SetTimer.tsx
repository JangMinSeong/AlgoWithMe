'use client'
import { useState } from 'react'
import useTimer from '@/hooks/useTimer'

const SetTimer = () => {
  const [isActiveEditing, setIsActiveEditing] = useState(false)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)

  const { handleChangeTimer } = useTimer()

  const handleActivateTimerEdit = () => {
    setIsActiveEditing(true)
  }

  const handleSetTime = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newHour = Number(formData.get('newHour'))
    setHour(newHour)
    const newMin = Number(formData.get('newMin'))
    setMin(newMin)

    setIsActiveEditing(false)

    handleChangeTimer({ hour: newHour, min: newMin })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full p-1 border relative bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 shadow-foggyPink mb-3">
        <div
          className={`rounded-full w-80 h-80 relative bg-white font-orbitron font-bold text-xl text-darkNavy`}
        >
          {isActiveEditing ? (
            <form
              id="timer"
              onSubmit={handleSetTime}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
              <div className="font-orbitron">
                <input
                  type="number"
                  name="newHour"
                  min={0}
                  max={23}
                  required
                  defaultValue={hour}
                  className="w-[40px] border rounded-lg p-1 text-center mr-2"
                />
                h{' '}
                <input
                  type="number"
                  name="newMin"
                  min={0}
                  max={59}
                  required
                  defaultValue={min}
                  className="w-[50px] border rounded-lg p-1 text-center mr-2"
                />
                m
              </div>
            </form>
          ) : (
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">{`${hour} h ${min} m`}</div>
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
    </div>
  )
}

export default SetTimer
