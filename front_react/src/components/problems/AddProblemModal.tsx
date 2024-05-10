import { useState } from 'react'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import Button from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'
import ViewProblems from './ViewProblems'
import LevelSelector from './LevelSelector'
import ProblemSearch from './ProblemSearch'
import TempSelected from './TempSelected'
import { IProblem } from '@/features/problems/problemSlice'
import useStudy from '@/hooks/useStudy'
import fetch from "@/lib/fetch.ts";
import {useNavigate} from "react-router-dom";
import useModal from "@/hooks/useModal.ts";
import useSidebar from "@/hooks/useSidebar.ts";

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

  const [chosenProblem, setChosenProblem] = useState<IProblem>()

  const navigate = useNavigate()
  const { handleCloseModal } = useModal()
  const { setPages } = useSidebar()
  const pPageId = useSelector((state: RootState) => state.sidebar.pageId)
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)


  const existingCandidateProblems = useSelector(
    (state: RootState) => state.study.candidateProblems,
  )
  const handleAddCandidate = async () => {
    const duplicated = () => {
      // 후보 리스트 전부 돌면서 동일한 아이디가 있으면
      existingCandidateProblems.map((el) => {
        if (el.problemId === chosenProblem.id) return true
        return false
      })
    }

    if (duplicated()) {
      toast.error('이미 추가된 문제예요')
    } else {
      toast.success('문제가 추가되었어요')
      console.log(chosenProblem.id)
      handleAddCandidateProblems(groupId, chosenProblem.id)
    }
  }

  const handleAddProblem = async () => {
    const dataToCreate = {
      teamId: groupId,
      pageId: pPageId,
      problemId: chosenProblem.id,
    }
    console.log(dataToCreate)
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
      console.log(updatedList)
    }
    handleCloseModal()
    navigate(`/${groupId}/editor/${responseData.pageId}`)
  }
  // 여기서 문제를 선택하면, 선택한 문제의 Id를 가져온다.

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
            <Button onClick={handleAddCandidate}>추가하기</Button>
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
