import { useDispatch } from 'react-redux'
import {
  closeSidebar,
  openSidebar,
  setGroupId,
  setPageId,
  setPageList,
  setStudyList,
} from '@/features/sidebar/sidebarSlice'
import {
  setCurUserId,
  setMyId,
  setUserList,
} from '@/features/code/codeSlice.ts'

interface User {
  id: number
  nickname: string
  imageUrl: string
}

const useCode = () => {
  const dispatch = useDispatch()

  const handleCurUserId = (id: number) => {
    dispatch(setCurUserId(id))
  }

  const handleMyId = (id: number) => {
    dispatch(setMyId(id))
  }

  const handleUserList = (list: User[]) => {
    dispatch(setUserList(list))
  }

  return {
    handleCurUserId,
    handleMyId,
    handleUserList,
  }
}

export default useCode
