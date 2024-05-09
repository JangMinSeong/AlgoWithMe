import { useDispatch } from 'react-redux'
import { endSolving, startSolving } from '@/features/solving/solvingSlice'

const useSolving = () => {
  const dispatch = useDispatch()

  const handleStartSolving = () => {
    dispatch(startSolving())
  }

  const handleEndSolving = () => {
    dispatch(endSolving())
  }

  return { handleStartSolving, handleEndSolving }
}

export default useSolving
