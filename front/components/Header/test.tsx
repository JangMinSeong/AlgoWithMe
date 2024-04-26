import React, { useState, useEffect } from 'react'

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date()) // 현재 시간 상태 초기화

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date()) // 매 초마다 현재 시간 업데이트
    }, 1000) // 1000ms (1초) 간격으로 setInterval 실행

    return () => {
      clearInterval(timerID) // 컴포넌트가 언마운트될 때 인터벌 정리
    }
  }, []) // 빈 배열을 의존성 목록으로 제공하여 마운트 시에만 effect 실행

  return (
    <div>
      <h1>현재 시간</h1>
      <p>{currentTime.toLocaleTimeString()}</p>{' '}
      {/* 현재 시간을 로컬 시간 문자열로 표시 */}
    </div>
  )
}

export default Clock
