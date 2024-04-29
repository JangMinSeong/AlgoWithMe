import * as React from 'react'
import { useEffect } from 'react'
import CodeEditor from '@/components/editor/codespace/CodeSpace'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

const RightComponent: React.FC = () => {
  const [inputText, setInputText] = React.useState('') // textarea 입력 값 관리
  const codeEditorRef = React.useRef<any>() // CodeEditor 접근을 위한 ref
  const [runCount, setRunCount] = React.useState(0)

  const [message, setMessage] = React.useState('')
  const onConnect = useSelector((state: RootState) => state.socket.connected)
  const { subscribeToTopic, unsubscribeFromTopic } = useWebSocket() // 소켓 연결 시점(변경가능)

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

  const handleRun = async () => {
    setRunCount((prevCount) => prevCount + 1)

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
    localStorage.setItem('execute', JSON.stringify(dataToSave))
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_DEV_URL}/code/run`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ dataToSave }),
    //   },
    // )
    // console.log(response)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div style={{ flex: 2 }}>
        <CodeEditor ref={codeEditorRef} />
      </div>
      <div style={{ flex: 1 }} className="flex flex-col">
        <div className="flex flex-row flex-1 border-gray-300 p-3 pt-0 pb-1">
          <div className="flex-1 border border-gray-300 bg-white">
            <textarea
              className="w-full h-full resize-none p-2"
              placeholder="Enter text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="flex-1 p-2 bg-white border border-gray-300">
            실행횟수 : {runCount}
          </div>
        </div>
        <div className="flex flex-row justify-end p-5 pt-0 pr-3">
          <button
            onClick={handleRun}
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
