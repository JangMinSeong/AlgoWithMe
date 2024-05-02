import * as React from 'react'
import ErrorOutput from '@/components/editor/codespace/ErrorOutput'

interface SWEADetail {
  expected: string
  got: string
  match: boolean
}

interface SWEAOutputProps {
  status: number
  got: string
  execution_time: number
  details: SWEADetail[]
}

const SWEAOutput: React.FC<SWEAOutputProps> = ({
  status,
  got,
  execution_time,
  details,
}) => {
  const [selectedCase, setSelectedCase] = React.useState<SWEADetail | null>(
    null,
  )

  if (status !== 200) {
    return <ErrorOutput status={status} output={got} />
  }

  return (
    <div className="w-full h-full relative flex flex-col flex-grow border border-gray-300 rounded-md p-1 bg-white">
      <div className="text-base text-black pr-4 overflow-auto">
        {details.map((detail, index) => {
          const caseLabel = `케이스 ${index + 1}:`
          const caseText = `${caseLabel} ${detail.match ? '통과' : '실패'}`
          const caseColor = detail.match ? 'text-blue-500' : 'text-red-500'

          return (
            <div key={index}>
              <div
                className={`w-fit mb-0 px-1 rounded-md hover:bg-gray-300 ${caseColor}`}
                onClick={() =>
                  setSelectedCase(selectedCase === detail ? null : detail)
                }
              >
                {caseText}
              </div>

              {selectedCase === detail && (
                <div className="h-full w-full pl-0 pr-0 mt-2 mb-2 flex border border-gray-300 bg-gray-200 rounded-md">
                  <div className="w-1/2 p-2 border-r border-gray-300 overflow-auto">
                    <strong>예상 결과:</strong> <br /> {selectedCase.expected}
                  </div>
                  <div className="w-1/2 p-2 overflow-auto">
                    <strong>출력 결과:</strong> <br /> {selectedCase.got}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="absolute text-black text-sm top-1 right-6">
        실행 시간: {execution_time} ms
      </div>
    </div>
  )
}

export default SWEAOutput
