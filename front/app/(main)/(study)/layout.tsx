import StudyHeader from '@/components/Header/StudyHeader'
import React from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div>
        <StudyHeader />
        <main className="bg-white bg-opacity-70 p-8 rounded-lg">
          {children}
        </main>
      </div>
    </>
  )
}
