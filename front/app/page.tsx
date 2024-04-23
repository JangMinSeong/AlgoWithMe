import * as React from 'react'
import LandingHeader from '@/components/Header/LandingHeader'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />

      <div className="2xl:container 2xl:mx-auto pt-24 px-16">
        <div className="flex flex-col">
          <h1 className="break-keep text-balance text-8xl font-bold text-darkNavy mb-6">
            알고리즘 스터디 여기서 함께
          </h1>
          <p className="break-keep text-3xl mb-8 text-navy">
            실시간 온라인 알고리즘 스터디 플랫폼
          </p>
        </div>
      </div>
    </div>
  )
}
