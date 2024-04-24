import StudyHeader from '@/components/studypage/StudyHeader'
import React from 'react'
import TimerProvider from '@/context/TimerProvider'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <TimerProvider>
        <div className="flex">
          <div className="flex-grow">
            <StudyHeader />
            <main className="bg-background h-full bg-opacity-80">
              {children}
            </main>
          </div>
        </div>
      </TimerProvider>
    </>
  )
}
