import * as React from 'react'
import { useEffect, useState } from 'react'
import fetch from '@/lib/fetch'
import LeftComponent from '@/components/editor/LeftComponent'
import RightComponent from '@/components/editor/RightComponent'
import { useWebSocket } from '@/hooks/useWebSocket'
import { RootState } from '@/lib/store.ts'
import { useSelector } from 'react-redux'
import { FaGripLinesVertical } from 'react-icons/fa'

interface editorProp {
  groupId: number
  pageId: number
}
const MainComponent: React.FC<editorProp> = ({ groupId, pageId }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [codeEditorVisible, setCodeEditorVisible] = useState(true)
  const [number, setNumber] = useState(0)
  const [uid, setUid] = useState()
  const [provider, setProvider] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const [testCases, setTestCases] = useState([])
  const [editCodes, setEditCodes] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        console.log(pageId + ' ' + groupId)
        const response = await fetch(`/problem/${pageId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const responseData = await response.json()
        switch (responseData.site) {
          case 'baekjoon':
            setProvider('boj')
            break
          case 'programmers':
            setProvider('programmers')
            break
          case 'swea':
            setProvider('swea')
            break
          default:
            setProvider('boj')
        }
        setUrl(responseData.url)
        setContent(responseData.content)
        if (provider === 'boj' || provider === 'swea')
          setTestCases(responseData.exampleList || [])
        else setTestCases(null)
        if (provider === 'programmers')
          setEditCodes(responseData.editCodesList || [])
        else setEditCodes(null)
        setNumber(responseData.number)
        setUid(responseData.id)
        setTags(responseData.tagList)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchProblemData()
  }, [number, pageId])

  const toggleCodeEditor = () => {
    setCodeEditorVisible(!codeEditorVisible)
  }

  const handleCenterDivider = () => {
    // Todo: 좌우로 이동할 수 있게 변경해야함
    setCodeEditorVisible(!codeEditorVisible)
  }

  return (
    <div className="flex items-stretch w-full h-full overflow-hidden pt-0">
      <div className="bg-white mt-0 flex-1 transition-all duration-500 ease-in-out w-10">
        <LeftComponent
          url={url}
          content={content}
          room={`${pageId}`}
          testCases={testCases}
          nickname={user.nickname}
          tags={tags}
        />
      </div>
      <div className="flex border-x-2 border-gray-300 h-full w-4 bg-white hover:bg-gray-100 hover:cursor-pointer items-center" onClick={() => handleCenterDivider()}>
        <FaGripLinesVertical className="text-sm text-gray-500" />
      </div>
      <div
        className={`transition-width duration-500 ease-in-out ${
          codeEditorVisible ? 'flex-1' : 'w-0 hidden'
        }`}
      >
        <RightComponent
          provider={provider}
          number={number}
          editCodes={editCodes}
          pageId={pageId}
          uid={uid}
        />
      </div>
      <button
        className="bg-none hover:bg-navy absolute top-1/2 right-0 mr-5 z-10 rounded-full"
        onClick={toggleCodeEditor}
      >
        {codeEditorVisible ? '>' : '<'}
      </button>
    </div>
  )
}

export default MainComponent
