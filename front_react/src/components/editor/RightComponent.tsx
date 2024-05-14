import * as React from 'react'
import {useEffect, useState} from 'react'
import CodeEditor from '@/components/editor/codespace/CodeSpace'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import fetch from '@/lib/fetch'
import ErrorOutput from '@/components/editor/codespace/ErrorOutput'
import ExecuteOutput from '@/components/editor/codespace/ExecuteOutput'
import BOJAndPGOutput from '@/components/editor/codespace/BOJAndPGOutput'
import SWEAOutput from '@/components/editor/codespace/SWEAOutput'
import useCode from "@/hooks/useCode.ts";
import GitHubExplorer from "@/components/github/GithubExplorer.tsx";
import {setCurUserId} from "@/features/code/codeSlice.ts";

interface BojAndPGDetail {
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

interface ProblemProp {
  provider: string
  number: number
  editCodes: { language: string; frameCode: string }[]
  pageId : number
  uid:string
}

interface PersonalCodeResponse {
  id:number
  language:string
  code:string
}

interface Repository {
  name:string
  fullname:string
  description:string
  isPrivate:boolean
}

const RightComponent: React.FC<ProblemProp> = ({
  provider,
  number,
  editCodes,
  pageId,
    uid
}) => {
  const [isGitHubExplorerOpen, setIsGitHubExplorerOpen] = React.useState(false)
  const [repositories, setRepositories] = React.useState<Repository[]>([])
  const [inputText, setInputText] = React.useState('') // textarea 입력 값 관리
  const codeEditorRef = React.useRef<any>() // CodeEditor 접근을 위한 ref
  const [output, setOutput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [resStatus, setResStatus] = React.useState(200)
  const [execTime, setExecTime] = React.useState(0)

  const [codeIds , setCodeIds] = React.useState<number[]>([])
  const [firstCode, setFirstCode] = React.useState<PersonalCodeResponse>()

  const [resultBojAndPGList, setResultBojAndPGList] = React.useState<
    BojAndPGDetail[]
  >([])
  const [resultSweaList, setResultSweaList] = React.useState<SWEADetail[]>([])

  const [saveInputText, setSaveInputText] = React.useState('')

  const curUser = useSelector((state: RootState) => state.code.curUserId)
  const myId = useSelector((state: RootState) => state.code.myId)
  const [option ,setOption] = useState(false)
  const [isInit, setIsInit] = useState(false)
  const {handleCurUserId} = useCode()
  const updateMessage = useSelector((state: RootState) => state.socket.messageUserTabUpdate)
  const {subscribeToTopic, unsubscribeFromTopic} = useWebSocket()
  const curTopic = useSelector((state:RootState) => state.socket.subscriptionUser)



  const fetchMyData = async () => {
    try {
      const response = await fetch(`/code/codeList?pageId=${pageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseData = await response.json()
      setIsInit(false)
      setCodeIds(responseData.codeIds)
      setFirstCode(responseData.code)

    } catch (error) {
      setCodeIds([])
      setFirstCode(null)
      setIsInit(true)
      console.error('Failed to fetch data:', error)
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/code/user?pageId=${pageId}&userId=${curUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseData = await response.json()
      setCodeIds(responseData.codeIds)
      setFirstCode(responseData.code)

    } catch (error) {
      setCodeIds([])
      setFirstCode(null)
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    setOption(myId !== curUser)

    if(curTopic !== '' || myId === curUser) {
      console.log(curTopic + " unsubscribe")
      unsubscribeFromTopic(curTopic,true)
      fetchMyData()
    }
    if(option || curUser !== myId) {
      console.log(curTopic + "  subscribe")
      subscribeToTopic(`/topic/codeTab/${curUser}`,true)
      fetchUserData()
    }
  },[curUser])

  useEffect(() => {
    if(option) {
      fetchUserData()
    }
  },[updateMessage])

  useEffect(()=> {
    handleCurUserId(myId)
    setOption(false)
    fetchMyData()
  },[pageId])

  const handleInputRun = async () => {
    setIsLoading(true)

    const { code, language } = codeEditorRef.current?.getCurrentTabInfo() || {
      code: '',
      language: '',
    }

    const dataToSave = {
      code,
      language,
      input: inputText,
    }

    if (provider === 'swea' && dataToSave.language === 'JAVA') {
      dataToSave.code = code.replace(
        /public class Solution/g,
        'public class Main',
      )
    }

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
    const { code, language } = codeEditorRef.current?.getCurrentTabInfo() || {
      code: '',
      language: '',
    }

    const dataToSave = {
      code,
      language,
      uid,
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

    if (provider === 'boj' || provider === 'programmers') {
      setResultBojAndPGList(responseData.results)
      if (responseData.error) setOutput(responseData.error)
    } else if (provider === 'swea') {
      setExecTime(responseData.execution_time)
      setResultSweaList(responseData.details)
      setOutput(responseData.got)
    }

    setIsLoading(false)
  }

  const handleSaveAndRun = () => {
    if(curUser === myId) {
      codeEditorRef.current?.saveCode()
      setSaveInputText(inputText)
    }
    if (inputText !== '') handleInputRun()
    else handleSampleRun()
  }

  const handleGithub = async () => {
    const response = await fetch(`/github/repository`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    setRepositories(responseData)
    console.log(responseData)

    setIsGitHubExplorerOpen(true)
  }

  const handleCloseGitHubExplorer = () => {
    setIsGitHubExplorerOpen(false);
  };


  return (
    <div className="flex flex-col w-full h-full" style={{ height: '84vh' }}>
      <div style={{ flex: 2 }}>
        <CodeEditor
            ref={codeEditorRef}
          provider={provider}
          editCodes={editCodes}
          idList={codeIds}
          firstCode={firstCode}
          pageId={pageId}
          option={option}
            isInit={isInit}
        />
      </div>
      <div style={{ flex: 1 }} className="flex flex-col">
        <div className="flex flex-row flex-1 border-gray-300 p-3 pt-0 pb-1">
          {provider !== 'programmers' ? (
            <div className="flex-1 border border-gray-300 bg-white">
              <textarea
                className="w-full h-full resize-none p-2 overflow-auto"
                placeholder="Enter text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          ) : null}
          <div className="flex-1 p-1 bg-white border border-gray-300 h-full w-32">
            {isLoading ? (
              <pre>실행 중...</pre>
            ) : resStatus !== 200 ? (
              <ErrorOutput status={resStatus} output={output} />
            ) : saveInputText !== '' ? (
              <ExecuteOutput time={execTime} output={output} />
            ) : provider === 'boj' || provider === 'programmers' ? (
              <BOJAndPGOutput
                status={resStatus}
                error={output}
                results={resultBojAndPGList}
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
          <button className="mr-1 bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2" onClick={handleGithub}>
            GIT 저장하기
          </button>
          {isGitHubExplorerOpen && (
              <GitHubExplorer
                  isOpen={isGitHubExplorerOpen}
                  isClose={handleCloseGitHubExplorer}
                  repositories={repositories}
                  content={codeEditorRef.current?.getCurrentTabInfo().code}
                  language={codeEditorRef.current?.getCurrentTabInfo().language}
              />
          )}
        </div>
      </div>
    </div>
  )
}

export default RightComponent
