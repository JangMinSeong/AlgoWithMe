'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'
import useAuth from '@/hooks/useAuth'

function Login() {
  const { handleLogin } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const hasOngoingRequest = useRef(false)
  const API_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_DEV_URL
      : process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const loginWithCode = async () => {
      if (!code) {
        router.push('/')
        return
      }

      if (hasOngoingRequest.current) {
        return
      }

      hasOngoingRequest.current = true

      try {
        const response = await fetch(`${API_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
          credentials: 'include',
        })

        if (response.ok) {
          const { nickname, imageUrl } = await response.json()
          const accessToken = response.headers
            .get('Authorization')
            ?.split(' ')[1]

          if (accessToken) {
            const user = { nickname, imageUrl, accessToken }
            await handleLogin(user)
            router.push('/main')
          }
        } else {
          router.push('/')
        }
      } catch (error) {
        router.push('/')
      }
    }
    loginWithCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const letters = 'LOADING'.split('').map((letter, idx) => (
    <span
      key={letter}
      className={`animate-bounce text-3xl delay-[${idx * 100}ms]`}
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      {letter}
    </span>
  ))

  return (
    <div className="flex justify-center items-center h-screen">{letters}</div>
  )
}

export default function Loading() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  )
}
