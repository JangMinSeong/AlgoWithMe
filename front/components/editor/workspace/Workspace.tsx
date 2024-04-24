'use client'

import '@/components/editor/workspace/styles.scss'

import React from 'react'
import { Editor, EditorContent } from '@tiptap/react'

import MenuBar from '@/components/editor/workspace/MenuBar'

interface WorkSpaceProps {
  editor: Editor
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ editor }) => (
  <div className="editor w-full">
    {editor && <MenuBar editor={editor} />}
    <EditorContent className="editor__content" editor={editor} />
  </div>
)

export default WorkSpace
