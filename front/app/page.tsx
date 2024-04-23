import * as React from 'react'
import LandingHeader from '@/components/Header/LandingHeader'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
        랜딩 페이지
      </h1>
      <p className="text-xl text-center text-gray-600 mb-8">
        lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  )
}
