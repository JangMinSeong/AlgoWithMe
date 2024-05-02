import * as React from 'react'

interface ErrorOutputProps {
  status: number
  output: string
}

const ErrorOutput: React.FC<ErrorOutputProps> = ({ status, output }) => {
  let errorMessage = ''

  switch (status) {
    case 400:
      errorMessage = `런타임 에러`
      break
    case 422:
      errorMessage = `컴파일 에러`
      break
    case 408:
      errorMessage = `시간 초과`
      break
    default:
      errorMessage = output
      break
  }

  return (
    <div className="w-full h-full flex flex-col border border-red-500 bg-red-100 p-4 rounded-md">
      <div className="text-red-500 font-bold text-lg mb-2">{errorMessage}</div>
      <div className="text-base text-black">{output}</div>
    </div>
  )
}

export default ErrorOutput
