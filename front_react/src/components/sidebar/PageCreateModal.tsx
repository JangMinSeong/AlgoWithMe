import { IoDocument } from 'react-icons/io5'
import { PiMathOperationsFill } from 'react-icons/pi'
import useModal from '@/hooks/useModal'
import { useState } from 'react'
import fetch from '@/lib/fetch'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import useSidebar from '@/hooks/useSidebar'
import AddProblemModal from '../problems/AddProblemModal'
import { useWebSocket } from '@/hooks/useWebSocket.ts'
import toast, { Toaster } from 'react-hot-toast'

interface Page {
  pageId: number
  title: string
  docs: boolean
  children: Page[]
}

const PageCreateModal = () => {
  const navigate = useNavigate()
  const { handleCloseModal } = useModal()
  const [showModal, setShowModal] = useState(false)
  const groupId = useSelector((state: RootState) => state.sidebar.groupId)
  const pPageId = useSelector((state: RootState) => state.sidebar.pageId)
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)
  const { setPages } = useSidebar()
  const { sendUpdateMessage } = useWebSocket()

  const handleModal = () => {
    setShowModal(true)
  }
  const clickModal = (e: MouseEvent) => {
    e.stopPropagation()
    setShowModal(false)
  }

  const createDocPage = async () => {
    const dataToCreate = {
      teamId: groupId,
      pageId: pPageId,
    }
    console.log(dataToCreate)
    const response = await fetch('/page/docs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToCreate),
    })
    const responseData = await response.json()
    const newPage = {
      pageId: responseData.pageId,
      title: '빈 페이지',
      docs: true,
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
    sendUpdateMessage(
      `/app/study/${groupId}`,
      `create page ${responseData.pageId}`,
    )
    toast.success('폴더가 생성되었어요')
    navigate(`/${groupId}/docs/${responseData.pageId}`)
  }

  return (
    <div
      onClick={() => handleCloseModal()}
      className="top-0 left-0 fixed z-20 bg-black/30 w-lvw h-lvh"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[40%] h-[50%] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  flex"
      >
        <div
          className="w-[40%] min-w-[200px] bg-background rounded-lg flex items-center hover:bg-gray-300/90 transition-colors justify-center"
          onClick={() => createDocPage()}
        >
          <div className=" flex flex-col items-center ">
            <IoDocument className="w-12 h-12 text-primary/80" />
            <div className="mt-4">빈 페이지 만들기</div>
          </div>
        </div>
        <div className="w-[20%] min-w-10" onClick={() => handleCloseModal()} />
        <div
          onClick={handleModal}
          className="w-[40%] min-w-[200px] bg-background rounded-lg flex items-center hover:bg-gray-300/90 transition-colors justify-center"
        >
          <div className=" flex flex-col items-center ">
            <PiMathOperationsFill className="w-12 h-12 text-primary/80" />
            <div className="mt-4">문제 풀이 페이지 만들기</div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="relative z-10">
          <AddProblemModal
            clickModal={clickModal}
            groupId={groupId}
            type="createPage"
          />
        </div>
      )}
      <Toaster position={'bottom-center'} />
    </div>
  )
}

export default PageCreateModal
