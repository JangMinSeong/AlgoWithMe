import { useState } from 'react'
import Button from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'
import ViewProblems from './ViewProblems'
import LevelSelector from './LevelSelector'
import ProblemSearch from './ProblemSearch'
import TempSelected from './TempSelected'
import useStudy from '@/hooks/useStudy'
import fetch from '@/lib/fetch.ts'
import { useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal.ts'
import useSidebar from '@/hooks/useSidebar.ts'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { IProblemInfo } from '@/features/search/searchSlice'
import { useWebSocket } from '@/hooks/useWebSocket.ts'

interface Page {
  pageId: number
  title: string
  docs: boolean
  children: Page[]
}

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

  const [chosenProblem, setChosenProblem] = useState<IProblemInfo>()

  const navigate = useNavigate()
  const { handleCloseModal } = useModal()
  const { sendUpdateMessage } = useWebSocket()
  const { setPages } = useSidebar()
  const pPageId = useSelector((state: RootState) => state.sidebar.pageId)
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)

  const handleAddProblem = async () => {
    const dataToCreate = {
      teamId: groupId,
      pageId: pPageId,
      problemId: chosenProblem.problemId,
    }
  //  console.log(dataToCreate)
    const response = await fetch('/page/problem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToCreate),
    })
    const responseData = await response.json()
    const newPage = {
      pageId: responseData.pageId,
      title: responseData.title,
      docs: false,
      children: [],
    }

    const addSubPage = (
      pages: Page[],
      parentPageId: number,
      newPage: Page,
    ): Page[] =>
      pages.map((page) => {
        if (page.pageId === parentPageId) {
          return { ...page, children: [...page.children, newPage] }
        }

        return {
          ...page,
          children: addSubPage(page.children, parentPageId, newPage),
        }
      })

    if (pPageId === -1) {
      const updatedList = [...pageList, newPage]
      setPages(updatedList)
    } else {
      const updatedList = addSubPage(pageList, pPageId, newPage)
      setPages(updatedList)
  //    console.log(updatedList)
    }
    handleCloseModal()
    sendUpdateMessage(
      `/app/study/${groupId}`,
      `create page ${responseData.pageId}`,
    )
    toast.success('문제가 생성되었어요')
    navigate(`/${groupId}/editor/${responseData.pageId}`)
  }

  return (
    <div
      onClick={(e) => clickModal(e)}
      className="z-10 top-0 left-0 fixed bg-black/30 w-lvw h-lvh"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[60%] h-[92%] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-6 flex flex-col items-center "
      >
        {/* 위쪽 */}
        <h2 className="text-lg font-bold mb-4">문제 검색하기</h2>

        <div className="flex justify-around">
          {/* 왼쪽 */}
          <div className="w-[46%] h-[90%]">
            <div className="font-bold mb-2">제목으로 검색하기</div>
            <ProblemSearch />
            <div className="w-full">
              <div className="font-bold mb-2">난이도로 검색하기</div>
              <TempSelected />
              <div className={"overflow-y-scroll no-scrollbar"}>
              <LevelSelector />
              </div>
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="w-[46%] mt-10">
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
                handleAddCandidateProblems(groupId, chosenProblem.problemId)
              }}
            >
              추가하기
            </Button>
          ) : (
            <Button onClick={handleAddProblem}>생성하기</Button> // 페이지 생성 요청하기
          )}
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default AddProblemModal
