import { useDispatch } from 'react-redux'
import { setUserId, setUserNickname } from '@/features/user/userSlice'

const useUser = () => {
  const dispatch = useDispatch()

  const handleSetUserId = (id: number) => {
    dispatch(setUserId(id))
  }

  const handleSetUserNickname = (nickname: string) => {
    dispatch(setUserNickname(nickname))
  }

  return { handleSetUserId, handleSetUserNickname }
}

export default useUser
