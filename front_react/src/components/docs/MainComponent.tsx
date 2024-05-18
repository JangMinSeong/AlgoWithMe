import * as React from 'react'
import { useEffect, useState } from 'react'
import WorkSpace from '@/components/editor/workspace/Workspace'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { FontSize } from 'tiptap-extension-font-size'
import Details from '@tiptap-pro/extension-details'
import DetailsSummary from '@tiptap-pro/extension-details-summary'
import DetailsContent from '@tiptap-pro/extension-details-content'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import Header from '@/components/docs/Header'
import fetch from '@/lib/fetch'
import { Tooltip } from 'react-tooltip'

interface DocProp {
  room: string
  groupId: number
}

const colors = [
  '#958DF1',
  '#F98181',
  '#FBBC88',
  '#FAF594',
  '#70CFF8',
  '#94FADB',
  '#B9F18D',
]
const names = [
  'Lea Thompson',
  'Cyndi Lauper',
  'Tom Cruise',
  'Madonna',
  'Jerry Hall',
  'Joan Collins',
  'Winona Ryder',
  'Christina Applegate',
  'Alyssa Milano',
  'Molly Ringwald',
  'Ally Sheedy',
  'Debbie Harry',
  'Olivia Newton-John',
  'Elton John',
  'Michael J. Fox',
  'Axl Rose',
  'Emilio Estevez',
  'Ralph Macchio',
  'Rob Lowe',
  'Jennifer Grey',
  'Mickey Rourke',
  'John Cusack',
  'Matthew Broderick',
  'Justine Bateman',
  'Lisa Bonet',
]

const getRandomElement = <T,>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)]
const getRandomColor = (): string => getRandomElement(colors)
const getRandomName = (): string => getRandomElement(names)

interface User {
  name: string
  color: string
}

const getInitialUser = (nickname: string | null): User => ({
  name: nickname === null ? getRandomName() : nickname,
  color: getRandomColor(),
})

const appId = import.meta.env.VITE_TIPTAP_ID as string

const MainComponent: React.FC<DocProp> = ({ room, groupId }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [memoId, setMemoId] = useState<string | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState(getInitialUser(null))
  const [activeTab, setActiveTab] = useState<'개인 메모장' | '워크스페이스'>(
    '개인 메모장',
  )
  const [editorGroup, setEditorGroup] = useState<any>(null)

  const [ydocGroup, setYdocGroup] = useState(new Y.Doc())
  const [websocketProviderGroup, setWebsocketProviderGroup] =
    useState<TiptapCollabProvider | null>(null)

  const editorUser = useEditor({
    extensions: [
      StarterKit.configure({ history: true }),
      Highlight,
      TaskList,
      TaskItem,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Image,
      Color,
      TextStyle,
      FontSize,
      Details.configure({
        persist: true,
        HTMLAttributes: {
          class: 'details',
        },
      }),
      DetailsSummary,
      DetailsContent,
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === 'detailsSummary') {
            return '제목'
          }
          return null
        },
      }),
      CharacterCount.configure({ limit: 10000 }),
    ],
  })

  const renderContent = () => {
    switch (activeTab) {
      case '개인 메모장':
        return <WorkSpace editor={editorUser} pageId={room} />
      case '워크스페이스':
        return <WorkSpace editor={editorGroup} pageId={room} />
      default:
        return '개인 메모장'
    }
  }

  useEffect(() => {
    setCurrentUser(getInitialUser(user !== null ? user.nickname : null))
  }, [user])

  useEffect(() => {
    if (editorGroup) {
      editorGroup.chain().focus().updateUser(currentUser).run()
    }
  }, [editorGroup, currentUser])

  // 방이 바뀔 때마다 WebSocket을 재연결하기 위한 useEffect
  useEffect(() => {
    if (ydocGroup) ydocGroup.destroy()
    const newYdoc = new Y.Doc()
    const provider = new TiptapCollabProvider({
      appId,
      name: room,
      document: newYdoc,
    })
    setWebsocketProviderGroup(provider)
    setYdocGroup(newYdoc)
    return () => provider.destroy() // 이전 provider를 정리
  }, [room])

  // Collaboration 및 CollaborationCursor 확장 기능에 새로운 provider 설정
  useEffect(() => {
    if (websocketProviderGroup && ydocGroup) {
      const newEditorGroup = new Editor({
        extensions: [
          StarterKit.configure({ history: false }),
          Highlight,
          TaskList,
          TaskItem,
          Table.configure({ resizable: true }),
          TableRow,
          TableCell,
          TableHeader,
          Image,
          Color,
          TextStyle,
          FontSize,
          Details.configure({
            persist: true,
            HTMLAttributes: {
              class: 'details',
            },
          }),
          DetailsSummary,
          DetailsContent,
          Placeholder.configure({
            includeChildren: true,
            placeholder: ({ node }) => {
              if (node.type.name === 'detailsSummary') {
                return '제목'
              }
              return null
            },
          }),
          CharacterCount.configure({ limit: 10000 }),
          Collaboration.configure({ document: ydocGroup }),
          CollaborationCursor.configure({ provider: websocketProviderGroup }),
        ],
      })

      setEditorGroup(newEditorGroup)
    }
  }, [websocketProviderGroup, ydocGroup])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/page/memo/${room}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const responseData = await response.json()
        setMemoId(responseData.memoId)

        if (responseData.memo && editorUser) {
          const doc = JSON.parse(responseData.memo)
          editorUser.commands.setContent(doc, false) // 에디터에 저장된 내용을 로드
        } else {
          editorUser.commands.setContent('', false)
        }
      } catch (error) {
  //      console.error('Failed to fetch data:', error)
      }
    }

    if (editorUser) {
      fetchData()
    }
  }, [room, editorUser])

  const handleSave = async () => {
    if (editorUser) {
      const dataToSave = {
        userWorkspaceId: memoId,
        content: JSON.stringify(editorUser.getJSON()),
      }
      const response = await fetch(`/page/memo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    }
  }

  return (
    <div className="mt-0 m-3 flex flex-col">
      <div className="flex flex-row">
        <Header activeTab={activeTab} onSave={handleSave} room={Number(room)} />
      </div>
      <div className="flex">
        <div className="flex flex-col w-8 h-40">
          {['개인 메모장', '워크스페이스'].map((tab) => (
            <button
              key={tab}
              className={` h-8 flex-1 text-center whitespace-nowrap text-wrap hover:bg-primary/50 rounded-l-md text-white text-sm transition-colors ${
                activeTab === tab ? 'bg-primary' : 'bg-navy'
              }`}
              onClick={() => setActiveTab(tab as any)}
              data-tooltip-id="tabName"
              data-tooltip-content={tab}
            >
              {tab === '개인 메모장' ? '✍' : '👩🏻‍🤝‍🧑🏻'}
            </button>
          ))}
        </div>
        <div className="w-full border-t-[1px] border-blueishPurple" style={{ height: '72vh' }}>
          {renderContent()}
        </div>
      </div>
      <Tooltip id="tabName" place="left" />
    </div>
  )
}

export default MainComponent
