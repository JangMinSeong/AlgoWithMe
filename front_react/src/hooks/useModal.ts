import { useDispatch } from 'react-redux'
import { openModal, closeModal } from '@/features/modal/modalSlice'

const useModal = () => {
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(openModal())
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  return { handleOpenModal, handleCloseModal }
}

export default useModal
