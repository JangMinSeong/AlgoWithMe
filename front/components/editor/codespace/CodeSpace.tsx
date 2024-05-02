'use client'

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-code_lens'
import debounce from 'lodash.debounce'
import { useWebSocket } from '@/hooks/useWebSocket'

interface CodeExample {
  mode: string
  value: string
}

const languageOptions: Record<string, CodeExample> = {
  C: {
    mode: 'c_cpp',
    value: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  },
  CPP: {
    mode: 'c_cpp',
    value: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  },
  JAVA: {
    mode: 'java',
    value: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  PYTHON: {
    mode: 'python',
    value: `print("Hello, World!")`,
  },
}

const CodeEditor: React.FC = forwardRef((props, ref) => {
  const aceRef = useRef<any>(null)
  const [language, setLanguage] = useState<string>('C')
  const [code, setCode] = useState<string>(languageOptions.C.value)
  const [tabs, setTabs] = useState<
    { id: string; language: string; code: string }[]
  >([])
  const [activeTab, setActiveTab] = useState<string>('1')
  const [showMoreTabs, setShowMoreTabs] = useState(false)

  const { sendMessage } = useWebSocket()

  useEffect(() => {
    const storedTabs = localStorage.getItem('editorTabs')
    if (storedTabs) {
      const loadedTabs = JSON.parse(storedTabs)
      setTabs(loadedTabs)
      const initTab = loadedTabs[0].id
      setActiveTab(initTab)
      setLanguage(loadedTabs[0].language)
      setCode(loadedTabs[0].code)
    } else {
      // Set a default tab if none are stored
      const defaultTabs = [
        { id: '1', language: 'C', code: languageOptions.C.value },
      ]
      setTabs(defaultTabs)
      localStorage.setItem('editorTabs', JSON.stringify(defaultTabs)) // TODO:여기서 사용자 코드 리스트 가져오기
    }
  }, [])

  const addTab = () => {
    const newId = (tabs.length + 1).toString()
    const newTab = { id: newId, language: 'C', code: languageOptions.C.value }
    const newTabs = [...tabs, newTab]
    setTabs(newTabs)
    setActiveTab(newId)
    setLanguage('C')
    setCode(languageOptions.C.value)
    localStorage.setItem('editorTabs', JSON.stringify(newTabs)) // TODO : 여기서 코드 생성 api 요청
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    const selectedTab = tabs.find((tab) => tab.id === tabId)
    if (selectedTab) {
      setLanguage(selectedTab.language)
      setCode(selectedTab.code)
      setShowMoreTabs(false)
    }
  }

  const saveCode = () => {
    const currentCode = aceRef.current?.editor.getValue()
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === activeTab) {
        return { ...tab, code: currentCode, language }
      }
      return tab
    })
    setTabs(updatedTabs)
    setCode(currentCode)
    localStorage.setItem('editorTabs', JSON.stringify(updatedTabs)) // TODO:여기서 코드 저장 api
  }

  const deleteCode = () => {
    if (tabs.length <= 1) {
      return
    }

    const filteredTabs = tabs.filter((tab) => tab.id !== activeTab)
    const renumberedTabs = filteredTabs.map((tab, index) => ({
      ...tab,
      id: String(index + 1),
    }))

    setTabs(renumberedTabs)
    localStorage.setItem('editorTabs', JSON.stringify(renumberedTabs)) // TODO: 여기서 코드 저장 api

    if (renumberedTabs.length > 0) {
      setActiveTab(renumberedTabs[0].id)
      setLanguage(renumberedTabs[0].language)
      setCode(renumberedTabs[0].code)
    }
  }

  useImperativeHandle(ref, () => ({
    getCurrentTabInfo() {
      return { code, language }
    },
    saveCode,
  }))

  const handleCodeChange = debounce((newCode: string) => {
    console.log('Code changed:', newCode)
    sendMessage('/app/message', newCode)
    setCode(newCode)
    // client.publish({ destination: '/app/code', body: newCode }); // Send code to the server
  }, 500) // 500 ms debounce period

  return (
    <div className="w-full h-full flex flex-col p-3 pt-0">
      <div className="flex items-center justify-between relative mb-1">
        <div>
          {tabs.slice(0, 3).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 border border-gray-300
              ${tab.id === activeTab ? 'bg-primary' : 'bg-navy'}`}
            >
              {tab.id}
            </button>
          ))}
          {tabs.length > 3 && (
            <button
              onClick={() => setShowMoreTabs(!showMoreTabs)}
              className="bg-navy pt-1 h-8 text-white rounded-md p-2 hover:bg-secondary border border-gray-300"
            >
              ...
            </button>
          )}
          {showMoreTabs && (
            <div
              className="absolute top-10 left-10 bg-white shadow-lg"
              style={{ position: 'absolute', top: '100%', zIndex: 1000 }}
            >
              {tabs.slice(3).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 border border-gray-300
              ${tab.id === activeTab ? 'bg-primary' : 'bg-navy'}`}
                >
                  {tab.id}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={addTab}
            className="bg-navy pt-1 h-8 text-white rounded-md p-2 hover:bg-secondary border border-gray-300"
          >
            +
          </button>
        </div>
        <div>
          <button
            onClick={deleteCode}
            className="mr-1 bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          >
            삭제
          </button>
          <button
            onClick={saveCode}
            className="mr-1 bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          >
            저장
          </button>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value)
              setCode(languageOptions[e.target.value].value) // 변경된 언어의 기본 코드로 업데이트
            }}
            className="w-1/3"
          >
            {Object.keys(languageOptions).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="border border-gray-300 w-full h-full">
        <AceEditor
          ref={aceRef}
          mode={languageOptions[language].mode}
          name="UNIQUE_ID_OF_DIV"
          value={code}
          onChange={handleCodeChange}
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
    </div>
  )
})

export default CodeEditor
