'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Loading() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')

  useEffect(() => {
    const loginWithCode = async () => {
      if (!code) {
        router.push('/')
        return
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DEV_URL}/user/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          },
        )

        const data = await response.json()

        if (response.ok && data.success) {
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
