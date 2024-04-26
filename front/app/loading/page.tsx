'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'

function Login() {
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
          router.push('/main')
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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-3xl">Loading...</div>
    </div>
  )
}

export default function Loading() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  )
}
