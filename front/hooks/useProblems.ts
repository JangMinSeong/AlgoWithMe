import { useDispatch } from 'react-redux'
import { viewProblems } from '@/features/problems/problemSlice'
import fetch from '@/lib/fetch'

const useProblems = () => {
  const dispatch = useDispatch()

  const viewAllProblems = async () => {
    await fetch('/problem/all', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.problemList)
        dispatch(viewProblems(res.problemList))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleAddCandidateProblem = () => {}

  return { viewAllProblems, handleAddCandidateProblem }
}

export default useProblems
