'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Loading() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const hasOngoingRequest = useRef(false)

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
        console.log(code)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DEV_URL}/user/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
            credentials: 'include',
          },
        )

        const data = await response.json()

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
}
