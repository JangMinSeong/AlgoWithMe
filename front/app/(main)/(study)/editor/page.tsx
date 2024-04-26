'use client'

import * as React from 'react'
import { useState } from 'react'
import LeftComponent from '@/components/editor/LeftComponent'
import Button from '@/components/Button'
import RightComponent from '@/components/editor/RightComponent'

const EditorPage: React.FC = () => {
  const [codeEditorVisible, setCodeEditorVisible] = useState(true)

  const toggleCodeEditor = () => {
    setCodeEditorVisible(!codeEditorVisible)
  }

  return (
    <div className="flex flex-row items-stretch w-full h-100 overflow-hidden">
      <div className="mt-0 flex-1 transition-all duration-500 ease-in-out">
        <LeftComponent />
      </div>
      <div
        className={`mt-2 transition-width duration-500 ease-in-out ${codeEditorVisible ? 'flex-1' : 'w-0 hidden'}`}
      >
        <RightComponent />
      </div>
      <Button
        className="absolute top-1/2 right-0 mr-1 z-10"
        onClick={toggleCodeEditor}
      >
        {codeEditorVisible ? '>' : '<'}
      </Button>
    </div>
  )
}

export default EditorPage
