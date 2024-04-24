import { useDispatch } from 'react-redux'
import { changeTimer } from '@/features/timer/timerSlice'
import { ITime } from '@/features/timer/timerTypes'

const useTimer = () => {
  const dispatch = useDispatch()

  const handleChangeTimer = (prop) => {
    const newTime: ITime = {
      hour: prop.hour,
      min: prop.min,
    }
    dispatch(changeTimer(newTime))
  }

  return { handleChangeTimer }
}

export default useTimer
