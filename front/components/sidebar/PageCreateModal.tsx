import { IoDocument } from 'react-icons/io5'
import { PiMathOperationsFill } from 'react-icons/pi'
import useModal from '@/hooks/useModal'
import AddProblemModal from '../problems/AddProblemModal'
import { useState } from 'react'

const PageCreateModal = () => {
  const { handleCloseModal } = useModal()
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(true)
  }
  const clickModal = (e: MouseEvent) => {
    e.stopPropagation()
    setShowModal(false)
  }

  const groupId = 1 // dummy

  return (
    <div
      onClick={() => handleCloseModal()}
      className="top-0 left-0 fixed z-20 bg-black/30 w-lvw h-lvh"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[40%] h-[50%] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  flex"
      >
        <div className="w-[40%] min-w-[200px] bg-background rounded-lg flex items-center hover:bg-gray-300/90 transition-colors justify-center">
          <div className=" flex flex-col items-center ">
            <IoDocument className="w-12 h-12 text-primary/80" />
            <div className="mt-4">빈 페이지 만들기</div>
          </div>
        </div>
        <div
          className="w-[20%] min-w-10"
          onClick={() => handleCloseModal()}
        ></div>
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
          <AddProblemModal clickModal={clickModal} groupId={groupId} />
        </div>
      )}
    </div>
  )
}

export default PageCreateModal
