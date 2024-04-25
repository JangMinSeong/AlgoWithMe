'use client'
import Button from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'

const AddProblemModal = ({
  clickModal,
}: {
  clickModal: (e: MouseEvent) => void
}) => {
  const notify = () => toast.success('문제가 추가되었어요')
  const duplicated = () => toast.error('이미 추가된 문제예요')

  return (
    <div
      onClick={(e) => clickModal(e)}
      className="top-0 left-0 fixed z-10 bg-black/30 w-lvw h-lvh"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[50%] z-20 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg"
      >
        <div>문제 추가하기</div>
        <div>검색창</div>
        <div>태그 모음집</div>
        <div>검색 결과</div>
        <Button onClick={(e) => clickModal(e)} variant="secondary">
          취소하기
        </Button>
        <Button onClick={duplicated}>추가하기</Button>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default AddProblemModal
