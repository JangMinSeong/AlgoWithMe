import { useDispatch } from 'react-redux'
import { viewStudyInfo } from '@/features/study/studySlice'
import fetch from '@/lib/fetch'

const useStudy = () => {
  const dispatch = useDispatch()

  const handleViewStudyInfo = async (teamId: number) => {
    await fetch(`/study/${teamId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        dispatch(viewStudyInfo(json))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return { handleViewStudyInfo }
}

export default useStudy
