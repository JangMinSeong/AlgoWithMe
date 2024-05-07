import { useDispatch } from 'react-redux'
import { viewStudyInfo } from '@/features/study/studySlice'
import fetch from '@/lib/fetch'

const useStudy = (teamId: number) => {
  const dispatch = useDispatch()

  const handleViewStudyInfo = async () => {
    await fetch(`/study/${teamId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        const newStudyInfo = {
          id: teamId,
          name: res.name,
          ranking: res.ranking,
          problems: res.problems,
          statistics: res.statistics,
          joindate: res.joindate,
        }
        dispatch(viewStudyInfo(newStudyInfo))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return { handleViewStudyInfo }
}

export default useStudy
