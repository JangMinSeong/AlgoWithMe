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
    value: `#include <stdio.h>\n\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}`,
  },
  Cpp: {
    mode: 'c_cpp',
    value: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`,
  },
  Java: {
    mode: 'java',
    value: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
  },
  Python: {
    mode: 'python',
    value: `print("Hello, World!")`,
  },
}

const CodeEditor: React.FC = () => {
  const aceRef = useRef<any>(null)
  const [language, setLanguage] = useState<string>('C')

  useEffect(() => {
    const aceEditor = aceRef.current?.editor
    if (aceEditor) {
      const updateButtons = () => {
        const lines = document.querySelectorAll('.ace_line')
        lines.forEach((line, index) => {
          let button = line.querySelector('button')
          if (!button) {
            button = document.createElement('button')
            button.textContent = 'Run'
            button.style.position = 'absolute'
            button.style.right = '0px'
            button.style.top = '0px'
            button.onclick = () => alert(`Running line ${index + 1}`)
            line.appendChild(button)
          }
        })
      }

      aceEditor.on('change', updateButtons)
      updateButtons() // Initial button setup
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col p-10">
      <div className="flex items-center justify-between">
        <Button className="p-2 bg-blueishPurple text-white rounded hover:bg-navy">
          저장
        </Button>
        <select
          onChange={(e) => setLanguage(e.target.value)}
          className="w-1/12"
        >
          <option value="C">C</option>
          <option value="Cpp">C++</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <AceEditor
        ref={aceRef}
        mode={languageOptions[language].mode}
        name="UNIQUE_ID_OF_DIV"
        value={languageOptions[language].value}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          showFoldWidgets: true, // Code folding
        }}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default CodeEditor
