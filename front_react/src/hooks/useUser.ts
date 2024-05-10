import { useDispatch } from 'react-redux'
import { setUserId } from '@/features/user/userSlice'

const useUser = () => {
  const dispatch = useDispatch()

  const handleSetUserId = (id: number) => {
    dispatch(setUserId(id))
  }

  return { handleSetUserId }
}

export default useUser
