import { useState } from 'react'
import fetch from '@/lib/fetch.ts'

interface uploadProp {
  activeRepo: string,
  activeBranch: string,
  path: string,
  content: string
  language: string
  setActiveUpload: (arg: boolean) => void;
}

const GithubUpload: React.FC<uploadProp> = ({ content, language, setActiveUpload, activeRepo, activeBranch, path}) => {
  const [commitMessage, setCommitMessage] = useState('')
  const [filename, setFilename] = useState('')

  const handleSaveButton = async () => {  //TODO: 깃 저장 호출
    const dataToSave = {
      repo : activeRepo,
      branch :activeBranch,
      path : `${path}`,
      fileName : filename,
      language,
      content,
      commitMessage:commitMessage
    }
    if(filename && commitMessage) {
      await fetch(`/github/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave)
      });
      setActiveUpload(false)
    }
    else alert("파일명과 커밋 메시지를 작성해주세요")
  }

  return (
    <div className={'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50'}>
      <div className={'flex flex-col justify-end border-t border-gray-200 mx-3 bg-white rounded-xl'}>
        <div className={'mr-5'}>
            <textarea
              className={'border border-gray-300 py-2 mt-3 w-full pl-5 ml-2 resize-none overflow-auto'}
              placeholder={'커밋 메시지를 입력해주세요'}
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
            ></textarea>
        </div>
        <div className={`mb-3 w-full h-9 flex justify-end`}>
          <>
            <input
              className="w-full pl-5 border border-gray-300 ml-2"
              placeholder="파일명을 입력해주세요"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <div className={'text-sm text-gray-500 w-4 pr-10 pt-5 pl-2'}>.{language}</div>
            <div className="text-right pr-2">
              <button onClick={handleSaveButton}
                      className="py-2 px-4 bg-fuchsia-300 text-white rounded hover:bg-navy">
                저장
              </button>
            </div>
            <div className="text-right pr-2">
              <button onClick={() => setActiveUpload(false)}
                      className="py-2 px-4 bg-fuchsia-300 text-white rounded hover:bg-navy">
                취소
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default GithubUpload