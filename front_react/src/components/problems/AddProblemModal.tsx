import { useState } from 'react'
import Button from '@/components/Button'
import { Toaster } from 'react-hot-toast'
import ViewProblems from './ViewProblems'
import LevelSelector from './LevelSelector'
import ProblemSearch from './ProblemSearch'
import TempSelected from './TempSelected'
import { IProblem } from '@/features/problems/problemSlice'
import useStudy from '@/hooks/useStudy'

const AddProblemModal = ({
  clickModal,
  groupId,
  type,
}: {
  clickModal: (e: MouseEvent) => void
  groupId: number
  type: string
}) => {
  const { handleAddCandidateProblems } = useStudy()

  const [chosenProblem, setChosenProblem] = useState<IProblem>()

  return (
    <div
      onClick={(e) => clickModal(e)}
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
          <div className="w-[50%] mr-6">
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
            <ViewProblems setParentChosenProblem={setChosenProblem} />
          </div>
        </div>

        {/* 아래쪽 */}
        <div className="absolute bottom-2 ">
          <Button
            onClick={(e) => clickModal(e)}
            variant="secondary"
            className="mr-2"
          >
            취소하기
          </Button>
          {type === 'addCandidates' ? (
            <Button
              onClick={() => {
                handleAddCandidateProblems(groupId, chosenProblem.id)
              }}
            >
              추가하기
            </Button>
          ) : (
            <Button>생성하기</Button> // 페이지 생성 요청하기
          )}
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default AddProblemModal
