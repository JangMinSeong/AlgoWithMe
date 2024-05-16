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
import {useWebSocket} from '@/hooks/useWebSocket'
import fetch from "@/lib/fetch.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store.ts";
import Avatar from "@/components/editor/codespace/Avatar.tsx";
import useCode from "@/hooks/useCode.ts";
import 'ace-builds/src-noconflict/theme-tomorrow';
import { CiSettings } from 'react-icons/ci'

interface CodeExample {
    mode: string
    value: string
}

interface EditCode {
    language: string
    frameCode: string
}

interface PersonalCodeResponse {
    id: number
    language: string
    code: string
}

const CodeEditor: React.FC<{
    provider: string
    editCodes: EditCode[]
    firstCode: PersonalCodeResponse
    idList: number[]
    pageId: number
    option: boolean
    isInit: boolean
}> = forwardRef(
    ({provider, editCodes, firstCode, idList, pageId, option, isInit}, ref) => {
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
        const [tabs, setTabs] = useState<number[]>([])
        const [activeTab, setActiveTab] = useState<number>(1)
        const [showMoreTabs, setShowMoreTabs] = useState(false)

        const curTopic = useSelector(
            (state: RootState) => state.socket.subscription,
        )
        const {subscribeToTopic, unsubscribeFromTopic} = useWebSocket()
        const socketMessage = useSelector(
            (state: RootState) => state.socket.message,
        )
        const myId = useSelector((state: RootState) => state.code.myId)

        const userList = useSelector((state: RootState) => state.study.memberList)
        const curUser = useSelector((state: RootState) => state.code.curUserId)
        const [showAvatar, setShowAvatar] = useState(false)
        const {handleCurUserId} = useCode()

        useEffect(() => {
            if (curTopic) unsubscribeFromTopic(curTopic)
            if (option) subscribeToTopic(`/topic/${activeTab}`)
        }, [activeTab])

        const {sendMessage, sendUpdateMessage} = useWebSocket()

        useEffect(() => {
            if (idList.length !== 0) {
                console.log(idList)
                setTabs(idList)
                setActiveTab(firstCode.id)
                setLanguage(firstCode.language)
                if (firstCode.code) setCode(firstCode.code)
                else setCode(languageOptions[firstCode.language].value)
            } else if (!option && isInit && tabs.length !== 0) {
                addTab()
            } else {
                setTabs([])
            }
        }, [pageId, idList])

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
            if (idList.length === 0) newTabs = [newId]
            else newTabs = [...tabs, newId]
            setTabs(newTabs)
            setActiveTab(newId)
            setLanguage('C')
            setCode(languageOptions.C.value)
            if (!option)
                sendUpdateMessage(`/app/codeTab/${myId}`, `add ${myId} ${activeTab}`)
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
            if (responseData.code) setCode(responseData.code)
            else setCode(languageOptions[responseData.language].value)

            setShowMoreTabs(false)
        }

        const saveCode = async () => {
            const currentCode = aceRef.current?.editor.getValue()
            setCode(currentCode)
            const dataToSave = {
                codeId: activeTab,
                code,
                language,
            }
            const response = await fetch(`/code/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
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
                const filteredTabs = tabs.filter((tab) => tab !== activeTab)
                setTabs(filteredTabs)
                handleTabChange(filteredTabs[0])
            }
            if (!option)
                sendUpdateMessage(
                    `/app/codeTab/${myId}`,
                    `delete  ${myId} ${activeTab}`,
                )
        }
        useEffect(() => {
            if (option) {
                if (socketMessage.code !== '') {
                    setCode(socketMessage.code)
                    setLanguage(socketMessage.language)
                }
            }
        }, [socketMessage])

        useImperativeHandle(ref, () => ({
            getCurrentTabInfo() {
                return {code, language}
            },
            saveCode,
        }))

        const saveCache = async (code: string) => {
            const dataToCache = {
                codeId: activeTab,
                language: language,
                code: code
            }
            console.log(dataToCache.codeId)
            await fetch(`/code/cache`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToCache)
            })
        }

        const handleCodeChange = debounce((newCode: string) => {
            console.log('Code changed:', newCode)
            const newMessage = {
                language: language,
                code: newCode
            }
            if (!option) {
                sendMessage(`/app/code/${activeTab}`, newMessage)
                saveCache(newCode)
            }
            setCode(newCode)
            // client.publish({ destination: '/app/code', body: newCode }); // Send code to the server
        }, 500) // 500 ms debounce period


        const handleShowAvatar = () => {
            setShowAvatar(!showAvatar)
            setShowMoreTabs(false)
        }

        const handleAvatarList = (id: number) => {
            setShowAvatar(false)
            handleCurUserId(id)
        }

        return (
            <div className="w-full h-full">
                <div className="border-b-[1px] border-blueishPurple flex items-center justify-between h-12">
                    <div className="flex-1 relative">
                        <div className="flex flex-row">
                            <div className="flex flex-row items-start ml-2">
                                {userList.map((user) => (
                                    user.id === curUser && (
                                        <Avatar key={user.id} userInfo={user} click={handleShowAvatar}/>
                                    )
                                ))}
                                {showAvatar && (
                                    <div
                                        className="absolute flex flex-col space-y-2 top-10 left-2 bg-transparent shadow-lg z-30 slideDown">
                                        {userList.map((user) => (
                                            user.id !== curUser && (
                                                <Avatar key={user.id} userInfo={user} click={null}
                                                        clickList={() => handleAvatarList(user.id)}/>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>

                            {tabs.slice(0, 3).map((tab, index) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 border border-gray-300 w-9 ${tab === activeTab ? 'bg-primary' : 'bg-navy'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            {tabs.length > 3 && (
                                <button
                                    onClick={() => {
                                        setShowMoreTabs(!showMoreTabs)
                                        setShowAvatar(false)
                                    }}
                                    className="bg-navy pt-1 h-8 text-white rounded-md p-2 hover:bg-secondary border border-gray-300 w-9"
                                >
                                    ...
                                </button>
                            )}
                            {showMoreTabs && (
                                <div className="absolute top-10 left-28 bg-transparent shadow-lg slideDown"
                                     style={{zIndex: 1000}}>
                                    {tabs.slice(3).map((tab, index) => (
                                        <button
                                            key={tab}
                                            onClick={() => handleTabChange(tab)}
                                            className={`hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 border border-gray-300 w-9 ${tab === activeTab ? 'bg-primary' : 'bg-navy'}`}
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
                                    className="bg-navy pt-1 h-8 text-white rounded-md p-2 hover:bg-secondary border border-gray-300 w-9"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        {!option && (
                            <>
                                <button
                                    onClick={saveCode}
                                    className="mr-1 bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
                                >
                                    저장
                                </button>
                                <button
                                    onClick={deleteCode}
                                    className="mr-1 bg-navy hover:bg-secondary pt-1 h-8 text-white rounded-md p-2 mr-3"
                                >
                                    삭제
                                </button>
                                <select
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value)
                                        setCode(languageOptions[e.target.value].value)
                                    }}
                                    className="mb-1 rounded-md"
                                >
                                    {Object.keys(languageOptions).map((lang) => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                                <CiSettings
                                    className="hover:cursor-pointer"
                                    fontSize={30}
                                    onClick={() => {
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>

                <style>
                    {`
      #algo_editor .ace_gutter {
        background: linear-gradient(0deg, rgba(226,145,214,0.2) 0%, rgba(189,144,228,0.2) 52%, rgba(136,180,218,0.2) 100%);
      }
      #algo_editor .ace_active-line {
        background: linear-gradient(270deg, rgba(226,145,214,0.2) 0%, rgba(189,144,228,0.2) 52%, rgba(136,180,218,0.2) 100%);
      }
      #algo_editor .ace_gutter-active-line {
        background: rgba(0,0,0,0.1);
      }
      #algo_editor #UNIQUE_ID_OF_DIV .ace_editor {
        font-size: 21px;
      }
    `}
                    {`
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .slideDown {
        animation: slideDown 0.3s ease-out;
      }
    `}
                </style>

                <div id="algo_editor" className="w-full h-full pb-12">
                    <AceEditor
                        ref={aceRef}
                        mode={languageOptions[language].mode}
                        name="UNIQUE_ID_OF_DIV"
                        value={
                            !option || socketMessage.code === '' ? code : socketMessage.code
                        }
                        readOnly={option}
                        theme="tomorrow"
                        lineHeight={20}
                        onChange={handleCodeChange}
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            showFoldWidgets: true,
                            showGutter: true,
                            fontSize: 18,
                        }}
                        width="100%"
                        height="100%"
                        style={{backgroundColor: '#ffffff00'}}
                    />
                </div>
            </div>
        )
    },
)

export default CodeEditor
