import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '@/features/auth/authSlice'
import { User } from '@/features/auth/authTypes'
import fetch from '@/lib/fetch'

const useAuth = () => {
  const dispatch = useDispatch()

  const handleLogin = async (user: User) => {
    dispatch(loginSuccess(user))
  }

  const handleLogout = async () => {
    await fetch('/user/logout', {
      method: 'GET',
      credentials: 'include',
    })
    dispatch(logout())
  }

  return { handleLogin, handleLogout }
}

export default useAuth
