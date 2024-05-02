'use client'

import SideBar from '@/components/sidebar/SideBar'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import useInterceptor from '@/hooks/useInterceptor'
import useAuth from '@/hooks/useAuth'
import { User } from '@/features/auth/authTypes'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const user = useSelector((state: RootState) => state.auth.user)
  const { handleLogout, handleLogin } = useAuth()
  const hasOngoingRequest = useRef(false)

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_DEV_URL
      : process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const refreshTask = async () => {
      if (hasOngoingRequest.current) {
        return
      }
      hasOngoingRequest.current = true

      if (user === null) {
        const response = await fetch(`${baseUrl}/user/refresh`, {
          method: 'POST',
          credentials: 'include',
        })
        if (response.ok) {
          console.log(response)
          const data = await response.json()
          const updatedAccessToken =
            response.headers.get('Authorization')?.split(' ')[1] || ''
          const updatedUser: User = {
            nickname: data.nickname,
            imageUrl: data.imageUrl,
            accessToken: updatedAccessToken,
          }
          handleLogin(updatedUser)
        } else {
          handleLogout()
        }
      }
    }
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
      if (response.stateus === 401 && user) {
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
          }
        } else {
          handleLogout()
        }
      }
    },
    onSuccess: (response) => response,
  })

  return (
    <div className="flex">
      <SideBar />
      <main
        className={`${isSidebarOpen ? 'ml-52 mr-2' : 'mr-2'} ml-2 w-dvw max-w-dvw mt-16 transition-all duration-700`}
      >
        {children}
      </main>
    </div>
  )
}
