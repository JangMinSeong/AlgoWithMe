'use client'
import { useState } from 'react'

const ReadyButton = () => {
  const [isReady, setIsReady] = useState(false)
  const allMembersReady = false

  const handleReady = () => {
    setIsReady(!isReady)
  }
  return (
    <div>
      {allMembersReady ? (
        <div>스터디 시작하기</div>
      ) : (
        <div onClick={handleReady}>
          {isReady ? (
            <div className="mt-10 border w-80 h-12 rounded-xl flex items-center justify-center bg-lightPurple text-darkNavy hover:bg-darkNavy/80 hover:text-dimmedPurple shadow-foggyPurple duration-300">
              준비 완료했어요
            </div>
          ) : (
            <div className="mt-10 border w-80 h-12 rounded-xl flex items-center justify-center bg-darkNavy text-dimmedPurple hover:bg-opacity-80 shadow-foggyPurple duration-300">
              준비가 덜 됐어요
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ReadyButton
