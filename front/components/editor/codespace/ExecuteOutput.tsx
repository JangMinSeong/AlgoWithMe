import * as React from 'react'

interface ExecOutputProps {
  time: number
  output: string
}

const ExecuteOutput: React.FC<ExecOutputProps> = ({ time, output }) => (
  <div className="w-full h-full relative">
    <div className="w-full h-full flex flex-col border border-gray-300 rounded-md p-4 pr-0 bg-white overflow-auto">
      <pre className="text-black text-base pr-4">{output}</pre>
    </div>
    <div className="text-black text-sm absolute bottom-1 right-6">
      실행시간: {time}ms
    </div>
  </div>
)

export default ExecuteOutput
