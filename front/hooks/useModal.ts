import { useDispatch } from 'react-redux'
import { closeModal, openModal } from '@/features/modal/modalSlice'

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
