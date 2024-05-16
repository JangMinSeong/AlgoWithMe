import {useDispatch, useSelector} from 'react-redux'
import {
  viewStudyInfo,
  viewStudyMembers,
  editImage,
  editName,
  addCandidateProblems,
  deleteCandidateProblem,
} from '@/features/study/studySlice'
import fetch from '@/lib/fetch'
import toast from 'react-hot-toast'
import useCode from "@/hooks/useCode.ts";
import {RootState} from "@/lib/store.ts";

const useStudy = () => {
  const dispatch = useDispatch()
  const { handleMyId, handleCurUserId } = useCode()
  const nickname = useSelector((state: RootState) => state.auth.user?.nickname)
  const curUser = useSelector((state:RootState) => state.code.curUserId)

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

  const handleFetchStudyMembers = async (groupId) => {
    await fetch(`/study/${groupId}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('멤버', json)
        dispatch(viewStudyMembers(json))
        // 현재 사용자 닉네임과 일치하는 사용자 찾기
        const foundUser = json.find(
            (user) => user.nickname === nickname,
        )
        handleMyId(foundUser.id)
        if (curUser === 0) handleCurUserId(foundUser.id)
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
      .then((json) => {
        toast.success('문제가 추가되었어요')
        console.log(json)
        dispatch(addCandidateProblems(json))
      })
      .catch((err) => {
        toast.error('이미 추가된 문제예요')
        console.error(err)
      })
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

  const handleEditImage = async (teamId: number, formData) => {
    await fetch(`/study/image/${teamId}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
      .then((res) => res.text())
      .then((text) => dispatch(editImage(text)))
      .catch((err) => console.error(err))
  }

  const handleEditName = async (teamId: number, name: string) => {
    await fetch(`/study/name/${teamId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(name),
      credentials: 'include',
    })
      .then(() => {
        dispatch(editName(name))
      })
      .catch((err) => {
        console.log(teamId)
        console.error(err)
      })
  }

  return {
    handleFetchStudyInfo,
    handleFetchStudyMembers,
    handleAddCandidateProblems,
    handleDeleteCandidateProblem,
    handleEditImage,
    handleEditName,
  }
}

export default useStudy
