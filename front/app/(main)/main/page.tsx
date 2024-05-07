'use client'

import * as React from 'react'
import MainHeader from '@/components/header/Header'
import StudyList from '@/components/mainpage/StudyListComponent'
import ChartProblem from '@/components/mainpage/ChartProblemComponent'
import fetch from '@/lib/fetch'
import { useRouter } from 'next/navigation'

const MainPage: React.FC = async () => {
  const router = useRouter()

  const newStudy = {
    name: '이름없는 스터디',
    description: '',
    category: '',
  }
  const handleButtonClick = async () => {
    try {
      const response = await fetch('/study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudy),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('스터디 생성 성공:', data)
        router.push(`/${data.teamId}/study`)
      } else {
        console.error('스터디 생성 실패')
      }
    } catch (error) {
      console.error('네트워크 오류:', error)
    }
  }

  return (
    <div>
      <MainHeader />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex w-full flex-col items-center justify-center text-center mt-0.5 pb-10">
          <ChartProblem />
          <StudyList />
        </main>

        <button
          className="fixed bottom-4 right-4 w-12 h-12 bg-darkPurple text-background rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center text-2xl"
          onClick={handleButtonClick}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default MainPage
