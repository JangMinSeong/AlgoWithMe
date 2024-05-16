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
import fetch from "@/lib/fetch.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store.ts";

interface CodeExample {
  mode: string
  value: string
}
interface EditCode {
  language: string
  frameCode: string
}

interface PersonalCodeResponse {
    id:number
    language:string
    code:string
}

const CodeEditor: React.FC<{ provider: string; editCodes: EditCode[] ; firstCode:PersonalCodeResponse; idList:number[]; pageId:number; option:boolean ; isInit:boolean}> =
  forwardRef(({ provider, editCodes,firstCode, idList, pageId,option, isInit }, ref) => {
    const aceRef = useRef<any>(null)
    const [language, setLanguage] = useState<string>('C')

    const initialJavaCode = (() => {
      if (provider === 'swea') {
        return `public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
      }
      if (provider === 'programmers' && editCodes) {
        const javaCode = editCodes.find(
          (code) => code.language.toUpperCase() === 'JAVA',
        )
        return javaCode
          ? javaCode.frameCode
          : `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
      }
      return `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
    })()

    const initialCCode = (() => {
      if (provider === 'programmers' && editCodes) {
        const cCode = editCodes.find(
          (code) => code.language.toUpperCase() === 'C',
        )
        return cCode
          ? cCode.frameCode
          : `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`
      }
      return `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`
    })()

    const initialCppCode = (() => {
      if (provider === 'programmers' && editCodes) {
        const cppCode = editCodes.find(
          (code) => code.language.toUpperCase() === 'CPP',
        )
        return cppCode
          ? cppCode.frameCode
          : `#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`
      }
      return `#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`
    })()

    const initialPythonCode = (() => {
      if (provider === 'programmers' && editCodes) {
        const pythonCode = editCodes.find(
          (code) =>
            code.language.toUpperCase() === 'PYTHON' ||
            code.language.toUpperCase() === 'PYTHON3',
        )
        return pythonCode ? pythonCode.frameCode : `print("Hello, World!")`
      }
      return `print("Hello, World!")`
    })()

    const languageOptions: Record<string, CodeExample> = {
      C: {
        mode: 'c_cpp',
        value: initialCCode,
      },
      CPP: {
        mode: 'c_cpp',
        value: initialCppCode,
      },
      JAVA: {
        mode: 'java',
        value: initialJavaCode,
      },
      PYTHON: {
        mode: 'python',
        value: initialPythonCode,
      },
    }

    const [code, setCode] = useState<string>(languageOptions.C.value)
    const [tabs, setTabs] = useState<
       number[]
    >([])
    const [activeTab, setActiveTab] = useState<number>(1)
    const [showMoreTabs, setShowMoreTabs] = useState(false)

    const curTopic = useSelector((state: RootState) => state.socket.subscription)
    const {subscribeToTopic, unsubscribeFromTopic} = useWebSocket()
    const socketMessage = useSelector((state: RootState) => state.socket.message)
      const myId = useSelector((state:RootState) => state.code.myId)

    useEffect(() => {
        if(curTopic)
            unsubscribeFromTopic(curTopic)
        if(option)
            subscribeToTopic(`/topic/${activeTab}`)
    },[activeTab])

    const { sendMessage, sendUpdateMessage } = useWebSocket()

    useEffect(() => {
      if (idList.length !== 0) {
          console.log(idList)
        setTabs(idList)
        setActiveTab(firstCode.id)
        setLanguage(firstCode.language)
          if(firstCode.code)
              setCode(firstCode.code)
          else
              setCode(languageOptions[firstCode.language].value)
      } else if(!option && isInit && tabs.length !== 0) {
          addTab()
      } else {
          setTabs([])
      }
    }, [pageId,idList])


    const addTab = async () => {
      const response = await fetch(`/code/${pageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const responseData = await response.json()
      const newId = responseData
        let newTabs = []
        if(idList.length === 0)
            newTabs = [newId]
        else
            newTabs = [...tabs, newId]
      setTabs(newTabs)
      setActiveTab(newId)
      setLanguage('C')
      setCode(languageOptions.C.value)
        if(!option) sendUpdateMessage(`/app/codeTab/${myId}`, `add ${myId} ${activeTab}`)
    }

    const handleTabChange = async (tabId: number) => {
      setActiveTab(tabId)
        const response = await fetch(`/code/${tabId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const responseData = await response.json()
        setLanguage(responseData.language)
        if(responseData.code)
            setCode(responseData.code)
        else
            setCode(languageOptions[responseData.language].value)

        setShowMoreTabs(false)
    }

    const saveCode = async () => {
      const currentCode = aceRef.current?.editor.getValue()
      setCode(currentCode)
        const dataToSave = {
            codeId:activeTab,
            code,
            language,
        }
        const response = await fetch(`/code/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(dataToSave)
        })
    }

    const deleteCode = async () => {
      if (tabs.length <= 1) {
        return
      }
        const response = await fetch(`/code/${activeTab}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

      if (tabs.length > 0) {
          const filteredTabs = tabs.filter((tab) => tab !== activeTab);
          setTabs(filteredTabs);
          handleTabChange(filteredTabs[0])
      }
        if(!option) sendUpdateMessage(`/app/codeTab/${myId}`, `delete  ${myId} ${activeTab}`)
    }
    useEffect(() => {
        if(option) {
            if(socketMessage.code !== '') {
                setCode(socketMessage.code)
                setLanguage(socketMessage.language)
            }
        }
    },[socketMessage])

    useImperativeHandle(ref, () => ({
      getCurrentTabInfo() {
        return { code, language }
      },
      saveCode,
    }))

      const saveCache = async (code:string) => {
          const dataToCache = {
              codeId : activeTab,
              language:language,
              code : code
          }
          console.log(dataToCache.codeId)
          await fetch(`/code/cache`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body : JSON.stringify(dataToCache)
          })
      }

    const handleCodeChange =  debounce((newCode: string) => {
      console.log('Code changed:', newCode)
        const newMessage = {
          language:language,
            code:newCode
        }
        if(!option) {
            sendMessage(`/app/code/${activeTab}`, newMessage)
            saveCache(newCode)
        }
      setCode(newCode)
      // client.publish({ destination: '/app/code', body: newCode }); // Send code to the server
    }, 500) // 500 ms debounce period

    return (
      <div className="w-full h-full">
        <div className="bg-white flex items-center justify-between relative h-12">
            <div>
                {tabs.slice(0, 3).map((tab, index) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 border border-gray-300
              ${tab === activeTab ? 'bg-primary' : 'bg-navy'}`}
                    >
                        {index + 1}
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
                        style={{position: 'absolute', top: '100%', zIndex: 1000}}
                    >
                        {tabs.slice(3).map((tab, index) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 border border-gray-300
              ${tab === activeTab ? 'bg-primary' : 'bg-navy'}`}
                            >
                                {index + 4}
                            </button>
                        ))}
                    </div>
                )}
                {tabs.length === 0 && (
                    <div className="border border-transparent opacity-0">
                        {/* Invisible space */}
                    </div>
                )}
                {!option && (
                    <button
                        onClick={addTab}
                        className="bg-navy pt-1 h-8 text-white rounded-md p-2 hover:bg-secondary border border-gray-300"
                    >
                        +
                    </button>
                )}
            </div>
            <div>
                {!option && (
                    <>
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
            </>
            )}
          </div>
        </div>
        <div className="w-full h-full pb-12">
          <AceEditor
            ref={aceRef}
            mode={languageOptions[language].mode}
            name="UNIQUE_ID_OF_DIV"
            value={!option || socketMessage.code === '' ? code : socketMessage.code}
            readOnly={option}
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
