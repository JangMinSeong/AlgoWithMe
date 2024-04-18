'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoadingPage: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const finalizeLogin = async () => {
      if (session && session.user) {
        // 사용자 ID를 이용하여 백엔드 서버에 로그인 요청 보내기
        try {
          const response = await fetch(
            'https://your-custom-server.com/api/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // HttpOnly 쿠키를 사용하기 위해 필요
              body: JSON.stringify({
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
              }),
            },
          )
          if (response.ok) {
            // 로그인 성공 시 메인 페이지로 리디렉션
            router.push('/main')
          } else {
            // 서버 응답이 정상이 아닐 경우 랜딩 페이지로 리디렉션
            router.push('/')
          }
        } catch (error) {
          router.push('/') // 에러 발생 시 랜딩 페이지로 리디렉션
        }
      } else {
        router.push('/')
      }
    }

    finalizeLogin()
  }, [router, session])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-2 border-blue-500 rounded-full animate-spin" />
    </div>
  )
}

export default LoadingPage
