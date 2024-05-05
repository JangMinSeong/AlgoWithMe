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
      .then((res) => {
        console.log('문제전부내놔', res)
        // dispatch(viewProblems(res.data))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return { viewAllProblems }
}

export default useProblems
