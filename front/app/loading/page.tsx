'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'

export default function Loading() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')

  const loginWithCode = async () => {
    try {
      const response = await axios.post('/user/login', { code })

      if (response.status === 200 && response.data.success) {
        router.push('/main')
      } else {
        router.push('/')
      }
    } catch (error) {
      router.push('/')
    }
  }

  useEffect(() => {
    if (!code) {
      router.push('/')
      return
    }

    loginWithCode()
  }, [code, router])
}
