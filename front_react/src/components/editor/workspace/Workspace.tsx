
import '@/components/editor/workspace/styles.scss'

import React from 'react'
import { Editor, EditorContent } from '@tiptap/react'

import MenuBar from '@/components/editor/workspace/MenuBar'

interface WorkSpaceProps {
  editor: Editor
    pageId: string
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ editor,pageId }) => (
  <div className="editor w-full">
    {editor && <MenuBar editor={editor} pageId={pageId}/>}
    <EditorContent className="editor__content" editor={editor} />
  </div>
)

export default WorkSpace
