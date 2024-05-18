import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import CodeEditor from '@/components/editor/codespace/CodeSpace'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import fetch from '@/lib/fetch'
import ErrorOutput from '@/components/editor/codespace/ErrorOutput'
import ExecuteOutput from '@/components/editor/codespace/ExecuteOutput'
import BOJAndPGOutput from '@/components/editor/codespace/BOJAndPGOutput'
import SWEAOutput from '@/components/editor/codespace/SWEAOutput'
import useCode from '@/hooks/useCode.ts'
import GitHubExplorer from '@/components/github/GithubExplorer.tsx'
import { FaGripLines } from 'react-icons/fa'

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
  pageId: number
  uid: string
}

interface PersonalCodeResponse {
  id: number
  language: string
  code: string
}

interface Repository {
  name: string
  fullname: string
  description: string
  isPrivate: boolean
}

const RightComponent: React.FC<ProblemProp> = ({
  provider,
  number,
  editCodes,
  pageId,
  uid,
}) => {
  const [isGitHubExplorerOpen, setIsGitHubExplorerOpen] = React.useState(false)
  const [repositories, setRepositories] = React.useState<Repository[]>([])
  const [inputText, setInputText] = React.useState('') // textarea 입력 값 관리
  const codeEditorRef = React.useRef<any>() // CodeEditor 접근을 위한 ref
  const [output, setOutput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [resStatus, setResStatus] = React.useState(200)
  const [execTime, setExecTime] = React.useState(0)

  const [codeIds, setCodeIds] = React.useState<number[]>([])
  const [firstCode, setFirstCode] = React.useState<PersonalCodeResponse>()

  const [resultBojAndPGList, setResultBojAndPGList] = React.useState<
    BojAndPGDetail[]
  >([])
  const [resultSweaList, setResultSweaList] = React.useState<SWEADetail[]>([])

  const [saveInputText, setSaveInputText] = React.useState('')

  const curUser = useSelector((state: RootState) => state.code.curUserId)
  const myId = useSelector((state: RootState) => state.code.myId)
  const [option, setOption] = useState(false)
  const [isInit, setIsInit] = useState(false)
  const { handleCurUserId } = useCode()
  const updateMessage = useSelector(
    (state: RootState) => state.socket.messageUserTabUpdate,
  )
  const { subscribeToTopic, unsubscribeFromTopic } = useWebSocket()
  const curTopic = useSelector(
    (state: RootState) => state.socket.subscriptionUser,
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const [topHeight, setTopHeight] = useState('50%')
  const [bottomHeight, setBottomHeight] = useState('50%')
  const HEADER_HEIGHT = 71

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
      //    console.error('Failed to fetch data:', error)
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `/code/user?pageId=${pageId}&userId=${curUser}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseData = await response.json()
      setCodeIds(responseData.codeIds)
      setFirstCode(responseData.code)
    } catch (error) {
      setCodeIds([])
      setFirstCode(null)
      //    console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    setOption(myId !== curUser)

    if (curTopic !== '' || myId === curUser) {
      //     console.log(curTopic + ' unsubscribe')
      unsubscribeFromTopic(curTopic, true)
      fetchMyData()
    }
    if (option || curUser !== myId) {
      //     console.log(curTopic + '  subscribe')
      subscribeToTopic(`/topic/codeTab/${curUser}`, true)
      fetchUserData()
    }
  }, [curUser])

  useEffect(() => {
    if (option) {
      fetchUserData()
    }
  }, [updateMessage])

  useEffect(() => {
    handleCurUserId(myId)
    setOption(false)
    fetchMyData()
  }, [pageId])

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

  const codeSolve = async () => {
    await fetch(`/problem/${pageId}/solution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const handleSaveAndRun = () => {
    if (curUser === myId) {
      codeEditorRef.current?.saveCode()
      codeSolve()
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
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const responseData = await response.json()
    setRepositories(responseData)
    //   console.log(responseData)

    setIsGitHubExplorerOpen(true)
  }

  const handleCloseGitHubExplorer = () => {
    setIsGitHubExplorerOpen(false)
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e) => {
    e.preventDefault()
    if (containerRef.current) {
      //    console.log(containerRef.current.offsetHeight)
      const containerHeight = containerRef.current.offsetHeight
      const newTopHeight = ((e.clientY - HEADER_HEIGHT) / containerHeight) * 100
      const modifiedLeftWidth =
        newTopHeight < 4
          ? 0
          : newTopHeight > 96
          ? 100
          : newTopHeight > 49 && newTopHeight < 51
          ? 50
          : newTopHeight
      setTopHeight(`${modifiedLeftWidth}%`)
      setBottomHeight(`${100 - modifiedLeftWidth}%`)
    }
  }

  const handleMouseUp = (e) => {
    e.preventDefault()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'default'
  }

  return (
    <div ref={containerRef} className="flex flex-col w-full h-full">
      <div style={{ height: topHeight }} className={'h-full overflow-hidden'}>
        <CodeEditor
          ref={codeEditorRef}
          containerRef={containerRef}
          provider={provider}
          editCodes={editCodes}
          idList={codeIds}
          firstCode={firstCode}
          pageId={pageId}
          option={option}
          isInit={isInit}
        />
      </div>
      <div
        className="flex border-y-[1px] border-blueishPurple w-full bg-gray-500/10 hover:bg-gray-500/20 justify-center"
        onMouseDown={(event) => {
          handleMouseDown(event)
        }}
        onMouseEnter={(event) => {
          event.preventDefault()
          document.body.style.cursor = 'grab'
        }}
        onMouseLeave={(event) => {
          event.preventDefault()
          document.body.style.cursor = 'default'
        }}
      >
        <FaGripLines className="text-sm text-gray-500" />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-row flex-1 border-gray-300 h-full">
          {provider !== 'programmers' ? (
            <>
              <div className="flex-1">
                <textarea
                  className="w-full resize-none p-2 h-full overflow-auto bg-transparent outline-none"
                  placeholder="테스트 케이스를 입력하세요"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <div className="w-px bg-blueishPurple" />
            </>
          ) : null}
          <div className="flex-1 h-full" style={{ overflow: 'auto' }}>
            {isLoading ? (
              <pre style={{ fontFamily: 'pretendard' }} className="ml-2 mt-2">
                실행 중...
              </pre>
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
        <div className="flex flex-row justify-end border-t-[1px] border-blueishPurple pt-2">
          <button
            onClick={handleSaveAndRun}
            className="bg-primary hover:bg-primary/70 text-white text-xs px-3 h-7  transition-colors mr-1 "
          >
            실행하기
          </button>
          <button
            className="bg-black hover:bg-black/70 text-white  text-xs px-2 h-7 transition-colors flex items-center"
            onClick={handleGithub}
          >
            <img
              src="/logo/github/github-mark-white.png"
              alt="icon"
              className="h-4 w-4 mr-2 text-white"
            />
            GitHub에 저장
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
