import { useDispatch } from 'react-redux'
import { openModal, closeModal } from '@/features/modal/modalSlice'

const useModal = () => {
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    document.body.style.overflow = 'hidden'
    dispatch(openModal())
  }

  const handleCloseModal = () => {
    document.body.style.overflow = 'unset'
    dispatch(closeModal())
  }

  return { handleOpenModal, handleCloseModal }
}

export default useModal
