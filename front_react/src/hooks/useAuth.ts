import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '@/features/auth/authSlice'
import { User } from '@/features/auth/authTypes'
import fetch from '@/lib/fetch'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (user: User) => {
    dispatch(loginSuccess(user))
  }

  const handleLogout = async () => {
    await fetch('/user/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then(() => dispatch(logout()))
      .then(() => navigate('/welcome'))
  }

  return { handleLogin, handleLogout }
}

export default useAuth
