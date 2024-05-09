import Button from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'
import ViewProblems from './ViewProblems'
import LevelSelector from './LevelSelector'
import ProblemSearch from './ProblemSearch'
import TempSelected from './TempSelected'

const API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_URL

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group_id: groupId, problem_id: problemId }),
        credentials: 'include',
      })
    }
  }

  // 여기서 문제를 선택하면, 선택한 문제의 Id를 가져온다.

  return (
    <div
      onClick={(e) => clickModal(e.nativeEvent)}
      className="z-10 top-0 left-0 fixed bg-black/30 w-lvw h-lvh"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[60%] h-[88%] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-6 flex flex-col items-center "
      >
        {/* 위쪽 */}
        <h2 className="text-lg font-bold mb-4">문제 검색하기</h2>

        <div className="flex ">
          {/* 왼쪽 */}
          <div className="w-[50%] ">
            <div className="font-bold mb-2">제목으로 검색하기</div>
            <ProblemSearch />
            <div className="w-full">
              <div className="font-bold mb-2">난이도로 검색하기</div>
              <TempSelected />
              <LevelSelector />
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="w-[50%]">
            <ViewProblems />
          </div>
        </div>

        {/* 아래쪽 */}
        <div className="absolute bottom-2 ">
          <Button
            onClick={(e) => clickModal(e.nativeEvent)}
            variant="secondary"
            className="mr-2"
          >
            취소하기
          </Button>
          <Button onClick={handleAddCandidate}>추가하기</Button>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default AddProblemModal
