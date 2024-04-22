'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Loading() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { code } = searchParams.get('code')

  useEffect(() => {
    if (!code) {
      router.push('/')
    }
  }, [])
}
