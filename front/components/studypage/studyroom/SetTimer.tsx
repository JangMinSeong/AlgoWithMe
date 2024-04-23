'use client'
import { useState } from 'react'
import Button from '@/components/Button'

const SetTimer = () => {
  const [isActiveEditing, setIsActiveEditing] = useState(false)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const handleActivateTimerEdit = () => {
    setIsActiveEditing(!isActiveEditing)
  }

  const handleSetTime = (formData) => {
    setHour(formData.get('newHour'))
    setMin(formData.get('newMin'))
    setIsActiveEditing(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full p-1 border relative bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 shadow-foggyPink">
        <div className="rounded-full w-80 h-80 relative bg-white ">
          {isActiveEditing ? (
            <form
              action={(formData: FormData) => handleSetTime(formData)}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            >
              <div className="">
                <input
                  type="number"
                  name="newHour"
                  min={0}
                  max={11}
                  required
                  defaultValue={hour}
                  className="w-12 border rounded-lg p-1 text-center mr-2"
                />
                h
                <input
                  type="number"
                  name="newMin"
                  min={0}
                  max={59}
                  required
                  defaultValue={min}
                />
                m
              </div>
            </form>
          ) : (
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">{`${hour}h ${min}m`}</div>
          )}
        </div>
      </div>
      <div
        onClick={handleActivateTimerEdit}
        className="border rounded-3xl bg-background py-3 px-3 text-navy text-xs w-fit"
      >
        {isActiveEditing ? '저장하기' : '시간 수정하기'}
      </div>
    </div>
  )
}

export default SetTimer
