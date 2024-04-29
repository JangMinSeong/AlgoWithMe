import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '@/features/auth/authSlice'
import { User } from '@/features/auth/authTypes'

const useAuth = () => {
  const dispatch = useDispatch()

  const handleLogin = async (user: User) => {
    dispatch(loginSuccess(user))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return { handleLogin, handleLogout }
}

export default useAuth
