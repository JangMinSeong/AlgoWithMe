import React, { useState, useEffect } from 'react'
import fetch from '@/lib/fetch.ts'
import BranchExplorer from '@/components/github/BranchExplorer.tsx'
import DirectoryExplorer from '@/components/github/DirectoryExplorer.tsx'
import GithubUpload from '@/components/github/GithubUpload.tsx'
import './loader.css'

interface Repository {
  name: string
  fullname: string
  description: string
  isPrivate: boolean
}

const GitHubExplorer = ({
  isOpen,
  isClose,
  repositories,
  content,
  language,
}) => {
  const [branches, setBranches] = useState<string[]>([])
  const [activeRepo, setActiveRepo] = useState<string | null>(null)
  const [activeBranch, setActiveBranch] = useState(null)
  const [naviText, setNaviText] = useState('Repository를 선택하세요')
  const [path, setPath] = useState('')
  const [directories, setDirectories] = useState<string[]>([])
  const [activeUpload, setActiveUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleBranchSelect = (branch: string) => {
    setActiveBranch(branch)
  }

  const handleRepoClick = async (repo: Repository) => {
    setActiveRepo(activeRepo === repo.name ? null : repo.name)
    setActiveBranch(null)
    setIsLoading(true)
    const dataToPost = {
      repo: repo.name,
    }
    const response = await fetch(`/github/branch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const responseData = await response.json()
    setBranches(responseData)
    setIsLoading(false)
    console.log(responseData)
  }

  if (!isOpen) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (activeRepo === null && activeBranch === null)
      setNaviText('Repository를 선택하세요')
    else if (activeRepo && activeBranch === null)
      setNaviText('Branch를 선택하세요')
    else if (activeRepo && activeBranch) setNaviText('Directory를 선택하세요')
  }, [activeRepo, activeBranch])

  const handleSaveBtn = () => {
    setActiveUpload(true)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 ">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden h-[500px]">
        <div className="p-6 relative h-full w-full">
          <h2
            className="text-xl font-bold mb-2 border-b-2 pb-2"
            style={{ fontFamily: 'pretendard' }}
          >
            {naviText}
          </h2>
          <div className=" mb-4 flex items-center">
            <div className="font-semibold mr-2">현재 경로: </div>
            {activeRepo && (
              <span
                className={'text-sm'}
                onClick={() => {
                  setActiveRepo(null)
                  setActiveBranch(null)
                  setPath('')
                }}
              >
                {activeRepo + '/'}
              </span>
            )}
            {activeBranch && (
              <span
                className={'text-sm'}
                onClick={() => {
                  setActiveBranch(null)
                  setPath('')
                }}
              >
                {activeBranch + '/'}
              </span>
            )}
            <span className={'text-sm'}>{path}</span>
          </div>
          <div className="border-2 border-gray-300  overflow-y-auto h-80 p-2 no-scrollbar rounded-xl">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="loader" />
              </div>
            ) : (
              <>
                {activeRepo === null && (
                  <ul className="space-y-2">
                    {repositories.map((repo) => (
                      <li
                        key={repo.name}
                        className="flex items-center py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleRepoClick(repo)}
                      >
                        <span className="flex items-center">
                          {repo.name}
                          {repo.private && (
                            <img
                              src="/private.png"
                              alt="private"
                              width={20}
                              height={20}
                              className="ml-2"
                            />
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeRepo ? (
                  activeBranch ? (
                    <DirectoryExplorer
                      branch={activeBranch}
                      repoName={activeRepo}
                      directories={directories}
                      setDirectories={setDirectories}
                      path={path}
                      setPath={setPath}
                      setIsLoading={setIsLoading}
                      setParentActiveBranch={setActiveBranch}
                    />
                  ) : (
                    <BranchExplorer
                      branches={branches}
                      repoName={activeRepo}
                      onBranchSelect={handleBranchSelect}
                      setDirectories={setDirectories}
                      setIsLoading={setIsLoading}
                      setParentActiveRepo={setActiveRepo}
                    />
                  )
                ) : null}
              </>
            )}
          </div>
          <div className="absolute bottom-0 mb-4 right-7">
            <button
              className="border border-red-500 hover:bg-red-500/70 hover:text-white text-red-500 text-sm px-3 h-7 mr-2  rounded-xl transition-colors "
              onClick={() => isClose()}
            >
              취소
            </button>
            {activeBranch && (
              <button
                className="bg-primary hover:bg-primary/50 text-white text-sm px-3 h-7  rounded-xl transition-colors "
                onClick={handleSaveBtn}
              >
                현재 경로 선택하기
              </button>
            )}
            {activeUpload && (
              <GithubUpload
                content={content}
                language={language}
                setActiveUpload={setActiveUpload}
                activeRepo={activeRepo}
                activeBranch={activeBranch}
                path={path}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubExplorer
