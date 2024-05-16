import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '@/features/auth/authSlice'
import { User } from '@/features/auth/authTypes'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const baseUrl =
    import.meta.env.MODE === 'development'
      ? 'https://localhost:8080/api'
      : 'https://k10d205.p.ssafy.io/api'
  const handleLogin = async (user: User) => {
    dispatch(loginSuccess(user))
  }

  const handleLogout = async () => {
    await fetch(`${baseUrl}/user/logout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(() => {
        dispatch(logout())
      })
      .then(() => navigate('/welcome'))
  }

  return { handleLogin, handleLogout }
}

export default useAuth
