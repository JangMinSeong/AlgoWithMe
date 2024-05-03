'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import fetch from '@/lib/fetch'
import LeftComponent from '@/components/editor/LeftComponent'
import RightComponent from '@/components/editor/RightComponent'
import { useWebSocket } from '@/hooks/useWebSocket'

const MainComponent: React.FC = () => {
  const [codeEditorVisible, setCodeEditorVisible] = useState(true)
  const [number, setNumber] = useState(92295)
  const [provider, setProvider] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const { connectToServer } = useWebSocket()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/problem/${number}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const responseData = await response.json()
        setProvider(responseData.site)
        setUrl(responseData.url)
        setContent(responseData.content)
      } catch (error) {
        console.error('Failed to fetch data:', error)
        // 에러 처리 로직을 여기에 추가할 수 있습니다.
      }
    }

    fetchData()
  }, [number])

  useEffect(() => {
    connectToServer()
  }, [connectToServer])

  const toggleCodeEditor = () => {
    setCodeEditorVisible(!codeEditorVisible)
  }

  return (
    <div className="flex flex-row items-stretch w-full h-full overflow-hidden pt-0">
      <div className="mt-0 flex-1 transition-all duration-500 ease-in-out">
        <LeftComponent url={url} content={content} room="test2" />
      </div>
      <div
        className={`mt-1 transition-width duration-500 ease-in-out ${codeEditorVisible ? 'flex-1' : 'w-0 hidden'}`}
      >
        <RightComponent provider={provider} number={number} />
      </div>
      <button
        className="bg-none hover:bg-navy absolute top-1/2 right-0 mr-5 z-10 rounded-full"
        onClick={toggleCodeEditor}
      >
        {codeEditorVisible ? '>' : '<'}
      </button>
    </div>
  )
}

export default MainComponent
