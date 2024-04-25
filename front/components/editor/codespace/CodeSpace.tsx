'use client'

import React, { useEffect, useRef, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-code_lens'
import Button from '@/components/Button'

interface CodeExample {
  mode: string
  value: string
}

const languageOptions: Record<string, CodeExample> = {
  C: {
    mode: 'c_cpp',
    value: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  },
  Cpp: {
    mode: 'c_cpp',
    value: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  },
  Java: {
    mode: 'java',
    value: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  Python: {
    mode: 'python',
    value: `print("Hello, World!")`,
  },
}

const CodeEditor: React.FC = () => {
  const aceRef = useRef<any>(null)
  const [language, setLanguage] = useState<string>('C')
  const [code, setCode] = useState<string>(languageOptions.C.value)

  useEffect(() => {
    const storedData = localStorage.getItem('editorData')
    if (storedData) {
      const data = JSON.parse(storedData)
      setLanguage(data.language)
      setCode(data.code)
    }
  }, [])

  const saveCode = () => {
    const currentCode = aceRef.current?.editor.getValue()
    const data = {
      language,
      code: currentCode,
    }
    localStorage.setItem('editorData', JSON.stringify(data))
  }

  return (
    <div className="w-full h-full flex flex-col p-3 pt-10">
      <div className="flex items-center justify-between">
        <Button
          onClick={saveCode}
          className="p-2 bg-blueishPurple text-white rounded hover:bg-navy"
        >
          저장
        </Button>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value)
            setCode(languageOptions[e.target.value].value) // 변경된 언어의 기본 코드로 업데이트
          }}
          className="w-1/12"
        >
          {Object.keys(languageOptions).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <AceEditor
        ref={aceRef}
        mode={languageOptions[language].mode}
        name="UNIQUE_ID_OF_DIV"
        value={code}
        onChange={setCode}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          showFoldWidgets: true,
        }}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default CodeEditor
