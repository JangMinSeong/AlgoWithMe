import Button from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'
import ViewProblems from './ViewProblems'

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_URL

const AddProblemModal = ({
  clickModal,
  groupId,
}: {
  clickModal: (e: MouseEvent) => void
  groupId: number
}) => {
  const problemId = 1 // dummy

  const handleAddCandidate = async () => {
    const duplicated = () => {
      // 후보 리스트 전부 돌면서 동일한 아이디가 있으면
      return true
    }

    if (duplicated()) {
      toast.error('이미 추가된 문제예요')
    } else {
      toast.success('문제가 추가되었어요')
      const addCandidate = await fetch(`${API_URL}/study/problem`, {
        method: 'POST',
        body: { group_id: groupId, problem_id: problemId },
        credentials: 'include',
      })
    }
  }

  // 여기서 문제를 선택하면, 선택한 문제의 Id를 가져온다.

  return (
    <div
      onClick={(e) => clickModal(e)}
      className="z-10 top-0 left-0 fixed bg-black/30 w-lvw h-lvh"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[50%] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg"
      >
        <div>문제 추가하기</div>
        <div>검색창</div>
        <div>태그 모음집</div>
        <ViewProblems />
        <Button onClick={(e) => clickModal(e)} variant="secondary">
          취소하기
        </Button>
        <Button onClick={handleAddCandidate}>추가하기</Button>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default AddProblemModal
