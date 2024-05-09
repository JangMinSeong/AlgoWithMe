import { useDispatch } from 'react-redux'
import { endSolving, startSolving } from '@/features/solving/solvingSlice'

const useSolving = () => {
  const dispatch = useDispatch()

  const handleStartSolving = () => {
    const solvingStartTime = new Date().getTime()
    localStorage.setItem('startedAt', String(solvingStartTime))
    dispatch(startSolving())
  }

  const handleEndSolving = () => {
    localStorage.removeItem('startedAt')
    dispatch(endSolving())
  }

  return { handleStartSolving, handleEndSolving }
}

export default useSolving
