import { useDispatch } from 'react-redux'
import {
  viewStudyInfo,
  editImage,
  editName,
  addCandidateProblems,
  deleteCandidateProblem,
} from '@/features/study/studySlice'
import fetch from '@/lib/fetch'

const useStudy = () => {
  const dispatch = useDispatch()

  const handleFetchStudyInfo = async (teamId: number) => {
    await fetch(`/study/${teamId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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

  const handleAddCandidateProblems = async (
    teamId: number,
    problemId: number,
  ) => {
    await fetch(`/study/problem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId, problemId }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => dispatch(addCandidateProblems(json)))
      .catch((err) => console.error(err))
  }

  const handleDeleteCandidateProblem = async (candidateId: number) => {
    await fetch(`/study/problem`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidateId),
      credentials: 'include',
    })
      .then((res) => console.log(res))
      .then(() => dispatch(deleteCandidateProblem(candidateId)))
      .catch((err) => console.error(err))
  }

  const handleEditImage = async (teamId: number, file: string) => {
    await fetch(`/study/image/${teamId}}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        dispatch(editImage(json)) // 이거 다시 확인해야함
      })
      .catch((err) => console.error(err))
  }

  const handleEditName = async (teamId: number, name: string) => {
    await fetch(`/study/name/${teamId}}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(name),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        dispatch(editName(name)) // 이거 다시 확인해야함
      })
      .catch((err) => console.error(err))
  }

  return {
    handleFetchStudyInfo,
    handleAddCandidateProblems,
    handleDeleteCandidateProblem,
    handleEditImage,
    handleEditName,
  }
}

export default useStudy
