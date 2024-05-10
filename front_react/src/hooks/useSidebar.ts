import { useDispatch } from 'react-redux'
import {
  closeSidebar,
  openSidebar,
  setGroupId,
  setPageId,
  setPageList,
  setStudyList,
} from '@/features/sidebar/sidebarSlice'

interface Study {
  id: number
  name: string
  imageUrl: string
  visitedAt: string
}

interface Page {
  pageId: number
  title: string
  docs: boolean
  children: Page[]
}

const useSidebar = () => {
  const dispatch = useDispatch()

  const handleOpenSidebar = () => {
    dispatch(openSidebar())
  }

  const handleCloseSidebar = () => {
    dispatch(closeSidebar())
  }

  const setGId = (id: number) => {
    dispatch(setGroupId(id))
  }
  const setPId = (id: number) => {
    dispatch(setPageId(id))
  }

  const setStudys = (list: Study[]) => {
    dispatch(setStudyList(list))
  }

  const setPages = (list: Page[]) => {
    dispatch(setPageList(list))
  }

  return {
    handleOpenSidebar,
    handleCloseSidebar,
    setGId,
    setPId,
    setStudys,
    setPages,
  }
}

export default useSidebar
