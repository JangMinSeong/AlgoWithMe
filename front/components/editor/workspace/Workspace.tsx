'use client'

import '@/components/editor/workspace/styles.scss'

import React from 'react'
import { Editor, EditorContent } from '@tiptap/react'

import MenuBar from '@/components/editor/workspace/MenuBar'

interface WorkSpaceProps {
  editor: Editor
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ editor }) => (
  <div className="editor">
    {editor && <MenuBar editor={editor} />}
    <EditorContent className="editor__content" editor={editor} />
    {/* <div className="editor__footer"> */}
    {/*  <div className={`editor__status editor__status--${status}`}> */}
    {/*    {status === 'connected' ? `Online` : 'Offline'} */}
    {/*  </div> */}
    {/* </div> */}
  </div>
)

export default WorkSpace
