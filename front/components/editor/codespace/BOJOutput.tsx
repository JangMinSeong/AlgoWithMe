import * as React from 'react'
import ErrorOutput from '@/components/editor/codespace/ErrorOutput'

interface BojDetail {
  status: number
  input: string
  expected: string
  got: string
  passed: boolean
  execution_time: number
}

interface BojOutputProps {
  status: number
  error: string
  results: BojDetail[]
}

const BOJOutput: React.FC<BojOutputProps> = ({ status, error, results }) => {
  const [selectedCase, setSelectedCase] = React.useState<BojDetail | null>(null)

  return (
    <div className="w-full h-full">
      {status === 422 ? (
        <ErrorOutput status={status} output={error} />
      ) : (
        <div className="text-base text-black pr-4">
          {results.map((result, index) => {
            const caseLabel = `케이스 ${index + 1}:`
            let caseText = ''
            let caseColor = 'text-black'

            if (result.status === 200) {
              caseText = `${caseLabel} ${result.passed ? '통과' : '실패'} (${result.execution_time} ms)`
              caseColor = result.passed ? 'text-blue-500' : 'text-red-500'
            } else if (result.status === 400) {
              caseText = `${caseLabel} 런타임 에러`
              caseColor = 'text-red-500'
            } else if (result.status === 408) {
              caseText = `${caseLabel} 시간초과`
              caseColor = 'text-red-500'
            }

            return (
              <div
                key={index}
                className={`mb-2 ${caseColor}`}
                onClick={() => setSelectedCase(result)}
              >
                {caseText}
              </div>
            )
          })}
        </div>
      )}

      {selectedCase && (
        <div className="w-full mt-4 flex">
          <div className="w-1/2 p-2 border-r border-black">
            <strong>Expected:</strong> {selectedCase.expected}
          </div>
          <div className="w-1/2 p-2">
            <strong>Got:</strong> {selectedCase.got}
          </div>
        </div>
      )}
    </div>
  )
}

export default BOJOutput
