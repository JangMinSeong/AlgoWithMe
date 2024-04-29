'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import LeftComponent from '@/components/editor/LeftComponent'
import RightComponent from '@/components/editor/RightComponent'
import { useWebSocket } from '@/hooks/useWebSocket'

const EditorPage: React.FC = () => {
  const [codeEditorVisible, setCodeEditorVisible] = useState(true)

  const { connectToServer } = useWebSocket()

  useEffect(() => {
    console.log('in page')
    connectToServer()
  }, [connectToServer])

  const toggleCodeEditor = () => {
    setCodeEditorVisible(!codeEditorVisible)
  }

  return (
    <div className="flex flex-row items-stretch w-full h-full overflow-hidden pt-0">
      <div className="mt-0 flex-1 transition-all duration-500 ease-in-out">
        <LeftComponent />
      </div>
      <div
        className={`mt-1 transition-width duration-500 ease-in-out ${codeEditorVisible ? 'flex-1' : 'w-0 hidden'}`}
      >
        <RightComponent />
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

export default EditorPage
