import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import fetch from '@/lib/fetch'
import LeftComponent from '@/components/editor/LeftComponent'
import RightComponent from '@/components/editor/RightComponent'
import { RootState } from '@/lib/store.ts'
import { useSelector } from 'react-redux'
import { FaGripLinesVertical } from 'react-icons/fa'

interface editorProp {
  groupId: number
  pageId: number
}
const MainComponent: React.FC<editorProp> = ({ groupId, pageId }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [number, setNumber] = useState(0)
  const [uid, setUid] = useState()
  const [provider, setProvider] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const [testCases, setTestCases] = useState([])
  const [editCodes, setEditCodes] = useState([])
  const [tags, setTags] = useState([])

  const [problemTitle, setProblemTitle] = useState<string>()
  const [problemLevel, setProblemLevel] = useState<string>()

  const containerRef = useRef<HTMLDivElement>(null)
  const [leftWidth, setLeftWidth] = useState('50%')
  const [rightWidth, setRightWidth] = useState('50%')
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const SIDEBAR_WIDTH = isSidebarOpen ? 201 : 7

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

        setProblemTitle(responseData.title)
        setProblemLevel(responseData.level)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchProblemData()
  }, [number, pageId])

  const handleMouseDown = (e) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e) => {
    e.preventDefault()
    if (containerRef.current) {
      console.log(containerRef.current.offsetWidth)
      const containerWidth = containerRef.current.offsetWidth
      const newLeftWidth = ((e.clientX - SIDEBAR_WIDTH) / containerWidth) * 100
      const modifiedLeftWidth =
        (newLeftWidth < 2 ? 0 : newLeftWidth) &&
        (newLeftWidth > 97 ? 100 : newLeftWidth)
      setLeftWidth(`${modifiedLeftWidth}%`)
      setRightWidth(`${100 - modifiedLeftWidth}%`)
    }
  }

  const handleMouseUp = (e) => {
    e.preventDefault()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'default'
  }

  return (
    // Note: 패딩 삽입 금지
    <div ref={containerRef} className="flex w-full h-full overflow-hidden">
      <div style={{ width: leftWidth }} className={`mt-0 overflow-hidden`}>
        <LeftComponent
          title={problemTitle}
          level={problemLevel}
          number={number}
          provider={provider}
          url={url}
          content={content}
          room={`${pageId}`}
          testCases={testCases}
          nickname={user.nickname}
          tags={tags}
        />
      </div>
      <div
        className="flex border-x-[1px] border-blueishPurple h-full w-4 hover:bg-gray-500/10 items-center"
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
        <FaGripLinesVertical className="text-sm text-gray-500" />
      </div>
      <div
        className={`transition-width duration-500 ease-in-out overflow-hidden w-auto flex-1`}
      >
        <RightComponent
          provider={provider}
          number={number}
          editCodes={editCodes}
          pageId={pageId}
          uid={uid}
        />
      </div>
    </div>
  )
}

export default MainComponent
