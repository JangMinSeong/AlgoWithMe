import * as React from 'react'
import { useEffect } from 'react'
import CodeEditor from '@/components/editor/codespace/CodeSpace'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import fetch from '@/lib/fetch'
import ErrorOutput from '@/components/editor/codespace/ErrorOutput'
import ExecuteOutput from '@/components/editor/codespace/ExecuteOutput'
import BOJOutput from '@/components/editor/codespace/BOJOutput'
import SWEAOutput from '@/components/editor/codespace/SWEAOutput'

interface BojDetail {
  status: number
  input: string
  expected: string
  got: string
  passed: boolean
  execution_time: number
}
interface SWEADetail {
  expected: string
  got: string
  match: boolean
}

const RightComponent: React.FC = () => {
  const [inputText, setInputText] = React.useState('') // textarea 입력 값 관리
  const codeEditorRef = React.useRef<any>() // CodeEditor 접근을 위한 ref
  const [output, setOutput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [resStatus, setResStatus] = React.useState(200)
  const [execTime, setExecTime] = React.useState(0)

  const [message, setMessage] = React.useState('')
  const onConnect = useSelector((state: RootState) => state.socket.connected)
  const { subscribeToTopic, unsubscribeFromTopic } = useWebSocket() // 소켓 연결 시점(변경가능)

  const [resultBojList, setResultBojList] = React.useState<BojDetail[]>([])
  const [resultSweaList, setResultSweaList] = React.useState<SWEADetail[]>([])

  const [provider, setProvider] = React.useState('')

  const [saveInputText, setSaveInputText] = React.useState('')

  const socketMessage: string = useSelector(
    (state: RootState) => state.socket?.message || '',
  )

  useEffect(() => {
    // TODO : 코드 에디터 id에 따라 구독 진행
    if (onConnect) {
      subscribeToTopic('/topic/message')
      return () => unsubscribeFromTopic('/topic/message')
    }
  }, [onConnect])

  useEffect(() => {
    setMessage(socketMessage)
  }, [socketMessage])

  const handleInputRun = async () => {
    setIsLoading(true)

    const { code, language } = codeEditorRef.current?.getCurrentTabInfo() || {
      code: '',
      language: '',
    }

    // 가져온 코드, 언어, 입력 값을 로컬 스토리지에 저장합니다
    const dataToSave = {
      code,
      language,
      input: inputText,
    }

    if (provider === 'swea' && dataToSave.language === 'JAVA') {
      dataToSave.code = code.replace(
        /public class Solution/g, // "public class Main"을 찾아서
        'public class Main', // "public class Solution"으로 교체
      )
    }

    // localStorage.setItem('execute', JSON.stringify(dataToSave))
    const response = await fetch(`/code/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })

    // 응답 파싱 및 output 추출
    const responseData = await response.json()
    setResStatus(responseData.status)
    setExecTime(responseData.execution_time)
    setOutput(responseData.output)

    setIsLoading(false)
  }

  const handleSampleRun = async () => {
    setIsLoading(true)
    const number = 3678
    setProvider('boj')
    const { code, language } = codeEditorRef.current?.getCurrentTabInfo() || {
      code: '',
      language: '',
    }

    // 가져온 코드, 언어, 입력 값을 로컬 스토리지에 저장합니다
    const dataToSave = {
      code,
      language,
      number,
    }

    const response = await fetch(`/code/${provider}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })
    const responseData = await response.json()

    setResStatus(responseData.status)

    if (provider === 'boj') {
      setResultBojList(responseData.results)
      if (responseData.error) setOutput(responseData.error)
    } else if (provider === 'swea') {
      setExecTime(responseData.execution_time)
      setResultSweaList(responseData.details)
      setOutput(responseData.got)
    }

    setIsLoading(false)
  }

  const handleSaveAndRun = () => {
    codeEditorRef.current?.saveCode()
    setSaveInputText(inputText)
    if (inputText !== '') handleInputRun()
    else handleSampleRun()
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div style={{ flex: 2 }}>
        <CodeEditor ref={codeEditorRef} provider={provider} />
      </div>
      <div style={{ flex: 1 }} className="flex flex-col">
        <div className="flex flex-row flex-1 border-gray-300 p-3 pt-0 pb-1">
          <div className="flex-1 border border-gray-300 bg-white">
            <textarea
              className="w-full h-full resize-none p-2 overflow-auto"
              placeholder="Enter text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="flex-1 p-1 bg-white border border-gray-300 h-48 w-32">
            {isLoading ? (
              <pre>실행 중...</pre>
            ) : resStatus !== 200 ? (
              <ErrorOutput status={resStatus} output={output} />
            ) : saveInputText !== '' ? (
              <ExecuteOutput time={execTime} output={output} />
            ) : provider === 'boj' ? (
              <BOJOutput
                status={resStatus}
                error={output}
                results={resultBojList}
              />
            ) : provider === 'swea' ? (
              <SWEAOutput
                status={resStatus}
                got={output}
                execution_time={execTime}
                details={resultSweaList}
              />
            ) : (
              <div>출력 창</div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-end p-5 pt-0 pr-3">
          <button
            onClick={handleSaveAndRun}
            className="mr-1 bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          >
            실행하기
          </button>
          <button className="mr-1 bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2">
            GIT 저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightComponent
