'use client'

import { useRouter, useSearchParams } from 'next/navigation'
<<<<<<< Updated upstream
import { useEffect } from 'react'
=======
import { useEffect, useRef } from 'react'
import { loginSuccess } from '@/features/auth/authSlice'
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
        if (response.ok && data.success) {
=======
        console.log(data)

        if (response.ok) {
          loginSuccess(data)
>>>>>>> Stashed changes
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
