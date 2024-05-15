import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import useInterceptor from '@/hooks/useInterceptor'
import useAuth from '@/hooks/useAuth'
import { User } from '@/features/auth/authTypes'
import generateSVGPath from '@/lib/computeControlPoints'
import ScrollToTop from '@/components/ScrollToTop'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Layout() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { handleLogout, handleLogin } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const hasOngoingRequest = useRef(false)
  const hasOngoingRefreshRequest = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()
  const failedRequestQueue = useRef<
    Array<{ url: string; options: RequestInit }>
  >([])

  // 예제 점 배열
  const points = [
    { x: 10, y: 80 },
    { x: 100, y: 100 },
    { x: 200, y: 30 },
    { x: 300, y: 150 },
    { x: 400, y: 60 },
  ]
  const svgOutput = generateSVGPath(points)
  console.log(svgOutput)

  const baseUrl =
    import.meta.env.MODE === 'development'
      ? import.meta.env.VITE_API_DEV_URL
      : import.meta.env.VITE_API_URL

  useEffect(() => {
    const refreshTask = async () => {
      if (hasOngoingRequest.current) {
        return
      }
      hasOngoingRequest.current = true

      if (user === null) {
        await (async () => {
          const response = await fetch(`${baseUrl}/user/refresh`, {
            method: 'POST',
            credentials: 'include',
          })
          if (response.ok) {
            const data = await response.json()
            const updatedAccessToken =
              response.headers.get('Authorization')?.split(' ')[1] || ''
            const updatedUser: User = {
              nickname: data.nickname,
              imageUrl: data.imageUrl,
              accessToken: updatedAccessToken,
            }
            handleLogin(updatedUser)
            if (location.pathname === '/') {
              navigate('/main')
            }
          } else {
            handleLogout()
            navigate('/welcome')
          }
          setIsLoading(false)
          console.log(isLoading)
        })()
      } else {
        if (location.pathname === '/') {
          navigate('/main')
        }
        setIsLoading(false)
      }
    }
    hasOngoingRequest.current = false
    refreshTask()
  }, [user])

  useInterceptor({
    configs: {
      baseUrl: baseUrl || '',
      accessToken: user?.accessToken || '',
    },
    onRequest: (url, options, configs) => ({
      url: `${configs?.baseUrl}${url}`,
      options: {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${configs?.accessToken}`,
        },
        credentials: 'include',
      },
    }),
    onError: async (response) => {
      if (response.status === 401 && user) {
        if (hasOngoingRefreshRequest.current) {
          return
        }
        hasOngoingRefreshRequest.current = true

        try {
          const refreshResponse = await fetch(`${baseUrl}/user/refresh`, {
            method: 'POST',
            credentials: 'include',
          })

          if (refreshResponse.ok) {
            const newAccessToken = refreshResponse.headers
              .get('Authorization')
              ?.split(' ')[1]

            if (newAccessToken) {
              const updatedUser = { ...user, accessToken: newAccessToken }
              handleLogin(updatedUser)
            } else {
              handleLogout()
              navigate('/welcome')
            }
          } else {
            handleLogout()
            navigate('/welcome')
          }
        } catch (error) {
          console.error('Error refreshing token:', error)
          handleLogout()
          navigate('/welcome')
        } finally {
          hasOngoingRefreshRequest.current = false
        }
      }
    },
    onSuccess: (response) => response,
  })

  return (
    <div>
      <ScrollToTop />
      <main className="w-dvw h-full transition-all duration-700 overflow-hidden">
        {!isLoading ?
          <div className="h-full">
            <Outlet />
          </div>
          : <div className="fixed h-dvh w-dvw" />}
      </main>
    </div>
  )
}
