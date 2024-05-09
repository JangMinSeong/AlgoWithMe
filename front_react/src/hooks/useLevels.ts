import { useDispatch } from 'react-redux'
import {
  addSelected,
  emptySelected,
  removeSelected,
} from '@/features/levels/levelSlice'

const useLevels = () => {
  const dispatch = useDispatch()

  const handleAddSelected = (prop: string) => {
    dispatch(addSelected(prop))
  }

  const handleDeleteSelected = (prop: string) => {
    dispatch(removeSelected(prop))
  }

  const handleEmptySelected = () => {
    dispatch(emptySelected())
  }

  return { handleAddSelected, handleDeleteSelected, handleEmptySelected }
}

export default useLevels
