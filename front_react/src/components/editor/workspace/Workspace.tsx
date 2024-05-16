import '@/components/editor/workspace/styles.scss'

import React, {useEffect, useState} from 'react'
import { Editor, EditorContent } from '@tiptap/react'

import MenuBar from '@/components/editor/workspace/MenuBar'
import editor from "@/pages/Editor.tsx";

interface WorkSpaceProps {
  editor: Editor
  pageId: string
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ editor, pageId }) => {
    const [curEditor, setCurEditor] = useState<Editor|null>(null)
    useEffect ( () => {
        setCurEditor(editor)
    },[editor])
    return (
  <div className="editor w-full h-full">
    {curEditor && <MenuBar editor={curEditor} pageId={pageId} />}
    <EditorContent className="editor__content" editor={curEditor} />
  </div>
    )
}

export default WorkSpace
