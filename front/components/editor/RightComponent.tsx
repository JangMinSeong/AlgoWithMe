import * as React from 'react'
import CodeEditor from '@/components/editor/codespace/CodeSpace'
import Button from '@/components/Button'

const RightComponent: React.FC = () => (
  <div className="flex flex-col w-full h-full">
    <div style={{ flex: 2 }}>
      <CodeEditor />
    </div>
    <div style={{ flex: 1 }} className="flex flex-col">
      <div className="flex flex-row flex-1 border-gray-300 p-3 pt-0">
        <div className="flex-1 border-r border-gray-300 bg-white">
          <textarea
            className="w-full h-full resize-none p-2"
            placeholder="Enter text here..."
          />
        </div>
        <div className="flex-1 p-2 bg-white">출력칸</div>
      </div>
      <div className="flex flex-row justify-end">
        <Button>실행하기</Button>
        <Button>GIT 저장하기</Button>
      </div>
    </div>
  </div>
)

export default RightComponent
