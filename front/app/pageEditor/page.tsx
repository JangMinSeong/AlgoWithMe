'use client'

import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

function App() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'my-class',
      },
    },
  })

  // Yjs 문서 생성
  const ydoc = new Y.Doc()

  // WebRTC를 사용하여 실시간 편집 세션 설정
  const provider = new WebrtcProvider('yjs-room', ydoc, {
    signaling: ['wss://signaling.yjs.dev'], // 시그널링 서버 설정
    password: 'algowithme', // 옵션: 방 비밀번호 설정 (필요한 경우)
    awareness: editor?.collaboration?.awareness, // Tiptap의 awareness를 사용
  })

  // Yjs와 Tiptap의 에디터 바인딩
  const ytext = ydoc.getText('tiptap')

  // 에디터가 초기화된 후에 Yjs 동기화 설정
  React.useEffect(() => {
    if (editor) {
      // Yjs와 에디터의 컨텐츠를 바인딩
      editor.commands.setContent(ytext.toString())

      // Yjs 문서 변경 감지
      ytext.observe((event) => {
        editor.commands.setContent(ytext.toString())
      })

      // 에디터 변경 감지
      editor.on('update', () => {
        ytext.delete(0, ytext.length)
        ytext.insert(0, editor.getHTML())
      })
    }

    return () => {
      provider.destroy() // 컴포넌트 언마운트 시 리소스 정리
    }
  }, [editor])

  return <EditorContent editor={editor} />
}

export default App
