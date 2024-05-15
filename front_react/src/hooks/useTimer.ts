import { useDispatch } from 'react-redux'
import { changeTimer, setTimer } from '@/features/timer/timerSlice'
import { ITime } from '@/features/timer/timerTypes'

const useTimer = () => {
  const dispatch = useDispatch()

  const handleSetTimer = (prop: ITime) => {
    const initialTime: ITime = {
      hour: prop.hour,
      min: prop.min,
      sec: prop.sec,
    }
    dispatch(setTimer(initialTime))
  }

  const handleChangeTimer = (prop: ITime) => {
    const newTime: ITime = {
      hour: prop.hour,
      min: prop.min,
      sec: prop.sec,
    }
    dispatch(changeTimer(newTime))
  }

  return { handleChangeTimer, handleSetTimer }
}

export default useTimer
