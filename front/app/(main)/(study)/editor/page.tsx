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
    <div className="flex flex-row items-stretch w-full h-screen overflow-hidden">
      <div className="mt-5 flex-1 transition-all duration-500 ease-in-out">
        <LeftComponent />
      </div>
      <div
        className={`mt-5 transition-width duration-500 ease-in-out ${codeEditorVisible ? 'flex-1' : 'w-0 hidden'}`}
      >
        <RightComponent />
      </div>
      <Button
        className="absolute top-0 right-0 mt-12 mr-4 z-10"
        onClick={toggleCodeEditor}
      >
        {codeEditorVisible ? 'Hide Editor' : 'Show Editor'}
      </Button>
    </div>
  )
}

export default EditorPage
