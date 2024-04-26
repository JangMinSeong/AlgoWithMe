'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import WorkSpace from '@/components/editor/workspace/Workspace'
import LeftHeader from '@/components/editor/LeftHeader'
import Button from '@/components/Button'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { useEditor } from '@tiptap/react'
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
import Problem from '@/components/editor/Problem'

const appId = process.env.NEXT_PUBLIC_TIPTAP_ID as string

const ydocGroup = new Y.Doc()
const websocketProviderGroup = new TiptapCollabProvider({
  appId,
  name: 'test2', // 이름으로 문서 분류 함
  document: ydocGroup,
})

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

const getInitialUser = (): User => ({
  name: getRandomName(),
  color: getRandomColor(),
})

const LeftComponent: React.FC = () => {
  const [currentUser] = useState(getInitialUser)
  const [activeTab, setActiveTab] = useState<
    '문제보기' | '개인 메모장' | '워크스페이스'
  >('문제보기')

  const editorUser = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Highlight,
      TaskList,
      TaskItem,
      Table.configure({
        resizable: true,
      }),
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

  const editorGroup = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Highlight,
      TaskList,
      TaskItem,
      Table.configure({
        resizable: true,
      }),
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

  const renderContent = () => {
    switch (activeTab) {
      case '문제보기':
        return <Problem />
      case '개인 메모장':
        return <WorkSpace editor={editorUser} />
      case '워크스페이스':
        return <WorkSpace editor={editorGroup} />
      default:
        return '문제'
    }
  }

  useEffect(() => {
    if (editorGroup) {
      editorGroup.chain().focus().updateUser(currentUser).run()
    }
  }, [editorGroup, currentUser])

  useEffect(() => {
    const savedContent = localStorage.getItem('userMemo')
    if (savedContent && editorUser) {
      const doc = JSON.parse(savedContent)
      editorUser.commands.setContent(doc, false) // 에디터에 저장된 내용을 로드
    }
  }, [editorUser])

  const handleSave = () => {
    if (editorUser) {
      const content = editorUser.getJSON() // 에디터 내용을 JSON 형식으로 추출
      console.log(JSON.stringify(content))
      localStorage.setItem('userMemo', JSON.stringify(content)) // 로컬 스토리지에 저장
    }
  }

  return (
    <div className="mt-0 m-3 flex flex-col">
      <div className="flex flex-row">
        <LeftHeader activeTab={activeTab} onSave={handleSave} />
      </div>
      <div className="w-full" style={{ height: '72vh' }}>
        {renderContent()}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex border-b-2 w-10">
          {['문제보기', '개인 메모장', '워크스페이스'].map((tab) => (
            <Button
              key={tab}
              className={`flex-1 p-2 text-center whitespace-nowrap hover:bg-navy ${
                activeTab === tab ? 'bg-darkNavy' : 'bg-blueishPurple'
              } rounded-t-none`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div>
          <Button className="rounded-t-none">풀이 종료하기</Button>
        </div>
      </div>
    </div>
  )
}

export default LeftComponent
