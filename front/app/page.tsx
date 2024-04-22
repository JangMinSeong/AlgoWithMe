import * as React from 'react'
import Button from '@/components/Button'
import LoginButton from '@/components/LoginButton'
import GithubButton from '@/components/GithubButton'
import Logo from '@/components/Logo'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Logo />
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
        랜딩 페이지
      </h1>
      <p className="text-xl text-center text-gray-600 mb-8">
        lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="flex gap-4">
        <Button>시작하기</Button>
        <LoginButton />
        <button className="px-6 py-3 bg-transparent text-blue-500 font-semibold rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
          깃 허브로 로그인
        </button>
        <GithubButton />
      </div>
    </div>
  )
}
