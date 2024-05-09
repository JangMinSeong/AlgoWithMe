import { useDispatch } from 'react-redux'
import { changeTimer } from '@/features/timer/timerSlice'
import { ITime } from '@/features/timer/timerTypes'

const useTimer = () => {
  const dispatch = useDispatch()

  const handleChangeTimer = (prop: ITime) => {
    const newTime: ITime = {
      hour: prop.hour,
      min: prop.min,
      sec: prop.sec,
    }
    dispatch(changeTimer(newTime))
  }

  return { handleChangeTimer }
}

export default useTimer
