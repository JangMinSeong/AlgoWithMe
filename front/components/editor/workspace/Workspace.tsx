'use client'

import '@/components/editor/workspace/styles.scss'

import React, { useCallback, useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Color } from '@tiptap/extension-color'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Placeholder from '@tiptap/extension-placeholder'
import Details from '@tiptap-pro/extension-details'
import DetailsSummary from '@tiptap-pro/extension-details-summary'
import DetailsContent from '@tiptap-pro/extension-details-content'
import Image from '@tiptap/extension-image'
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'

import MenuBar from '@/components/editor/workspace/MenuBar'
import Button from '@/components/Button'

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

const appId = process.env.NEXT_PUBLIC_TIPTAP_ID as string
const token = process.env.NEXT_PUBLIC_TIPTAP_TOKEN as string

const ydoc = new Y.Doc()
const websocketProvider = new TiptapCollabProvider({
  appId,
  name: 'test2', // 이름으로 문서 분류 함
  document: ydoc,
  token,
})

interface User {
  name: string
  color: string
}

const getInitialUser = (): User => ({
  name: getRandomName(),
  color: getRandomColor(),
})

const WorkSpace: React.FC = () => {
  const [status, setStatus] = useState('connecting')
  const [currentUser, setCurrentUser] = useState(getInitialUser)

  const editor = useEditor({
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
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({ provider: websocketProvider }),
    ],
  })

  useEffect(() => {
    websocketProvider.on('status', (event) => {
      setStatus(event.status)
    })
  }, [websocketProvider])

  useEffect(() => {
    if (editor) {
      editor.chain().focus().updateUser(currentUser).run()
    }
  }, [editor, currentUser])

  const setName = useCallback(() => {
    const name = (window.prompt('Name') || '').trim().substring(0, 32)
    if (name) {
      setCurrentUser({ ...currentUser, name })
    }
  }, [currentUser])

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
      <div className="editor__footer">
        <div className={`editor__status editor__status--${status}`}>
          {status === 'connected' ? `Online` : 'Offline'}
        </div>
        <div className="editor__name">
          <Button onClick={setName}>{currentUser.name}</Button>
        </div>
      </div>
    </div>
  )
}

export default WorkSpace
