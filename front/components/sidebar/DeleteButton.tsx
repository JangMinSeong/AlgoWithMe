'use client'
import { RiDeleteBin6Line } from 'react-icons/ri'

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_URL

const DeleteButton = () => {
  const pageId = '123'
  const handleDelete = async (e) => {
    e.stopPropagation()
    if (window.confirm('모든 스터디원에게서 같이 사라져요. 삭제하시겠어요?')) {
      const pageDeleteRes = await fetch(`${API_URL}/page`, {
        method: 'DELETE',
        body: { page_id: pageId },
        credentials: 'include',
      })
    }
  }
  return (
    <div
      onClick={handleDelete}
      className="text-red-500 bg-white/50 flex items-center justify-evenly rounded-lg w-20 h-8 hover:bg-white transition-opacity"
    >
      <RiDeleteBin6Line />
      삭제하기
    </div>
  )
}

export default DeleteButton
