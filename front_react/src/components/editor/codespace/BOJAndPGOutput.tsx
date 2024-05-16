import * as React from 'react'
import ErrorOutput from '@/components/editor/codespace/ErrorOutput'

interface Detail {
  status: number
  input: string
  expected: string
  got: string
  passed: boolean
  execution_time: number
}

interface OutputProps {
  status: number
  error: string
  results: Detail[]
}

const BOJAndPGOutput: React.FC<OutputProps> = ({ status, error, results }) => {
  const [selectedCase, setSelectedCase] = React.useState<Detail | null>(null)

  return (
    <div className="w-full h-full flex flex-col flex-grow overflow-auto">
      {status === 422 ? (
        <ErrorOutput status={status} output={error} />
      ) : (
        <div className="text-base text-black pr-4">
          {results.map((result, index) => {
            const caseLabel = `케이스 ${index + 1}:`
            let caseText = ''
            let caseColor = 'text-black'

            if (result.status === 200) {
              caseText = `${caseLabel} ${result.passed ? '통과' : '실패'} (${
                result.execution_time
              } ms)`
              caseColor = result.passed ? 'text-blue-500' : 'text-red-500'
            } else if (result.status === 400) {
              caseText = `${caseLabel} 런타임 에러`
              caseColor = 'text-red-500'
            } else if (result.status === 408) {
              caseText = `${caseLabel} 시간초과`
              caseColor = 'text-red-500'
            }

            return (
              <div key={index}>
                <div
                  className={`w-fit mb-0 px-1 rounded-md hover:bg-gray-300 ${caseColor}`}
                  onClick={() =>
                    setSelectedCase(selectedCase === result ? null : result)
                  }
                >
                  {caseText}
                </div>

                {selectedCase === result && (
                  <div className="h-full w-full pl-0 pr-0 mt-2 mb-2 flex border border-gray-300 bg-gray-200 rounded-md">
                    {selectedCase.status === 200 && (
                      <div className="w-1/2 p-2 border-r border-gray-300">
                        <strong>예상 결과:</strong> <br />{' '}
                        {selectedCase.expected}
                      </div>
                    )}
                    <div
                      className={`overflow-auto w-${
                        selectedCase.status === 200 ? '1/2' : 'full'
                      } p-2`}
                    >
                      <strong>출력 결과:</strong> <br /> {selectedCase.got}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BOJAndPGOutput
