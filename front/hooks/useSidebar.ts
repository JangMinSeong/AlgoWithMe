import { useDispatch } from 'react-redux'
import {
  closeSidebar,
  openSidebar,
  setGroupId,
  setPageId,
} from '@/features/sidebar/sidebarSlice'

const useSidebar = () => {
  const dispatch = useDispatch()

  const handleOpenSidebar = () => {
    dispatch(openSidebar())
  }

  const handleCloseSidebar = () => {
    dispatch(closeSidebar())
  }

  const setGId = (id: number) => {
    console.log(id)
    dispatch(setGroupId(id))
  }
  const setPId = (id: number) => {
    console.log(id)
    dispatch(setPageId(id))
  }

  return { handleOpenSidebar, handleCloseSidebar, setGId, setPId }
}

export default useSidebar
