// BranchExplorer.tsx
import React, { useState } from 'react'
import fetch from '@/lib/fetch.ts'

interface BranchExplorerProps {
  branches: string[]
  repoName: string
  onBranchSelect: (branchName: string) => void
  setDirectories: (selected: string[]) => void
  setIsLoading: (arg: boolean) => void
  setParentActiveRepo
}

const BranchExplorer: React.FC<BranchExplorerProps> = ({
  branches,
  repoName,
  onBranchSelect,
  setDirectories,
  setIsLoading,
  setParentActiveRepo,
}) => {
  const [activeBranch, setActiveBranch] = useState<string | null>(null)

  const handleGoPrev = () => {
    // 레포지토리 선택하는 창으로 돌아가야함 === 아무것도 선택 안됨
    setParentActiveRepo(null)
  }

  if (branches.length === 0) {
    return (
      <div
        className="flex items-center py-2  px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
        onClick={handleGoPrev}
      >
        😶 Branch가 없어요. 다른 Repository를 선택하세요.
      </div>
    )
  }

  const handleBranchClick = async (event, branchName) => {
    event.stopPropagation()
    setIsLoading(true)
    onBranchSelect(branchName)
    setActiveBranch(activeBranch === branchName ? null : branchName)
    const dataToPost = {
      repo: repoName,
      branch: branchName,
      path: '',
    }
    const response = await fetch(`/github/directory`, {
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
    setDirectories(responseData.map((dir: string) => `${dir}/`))
    setIsLoading(false)
 //   console.log(responseData)
  }

  return (
    <div className="flex flex-col space-y-1 w-full overflow-y-auto h-full">
      <div
        className="flex items-center py-2  pl-4 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
        onClick={handleGoPrev}
      >
        ..{' '}
      </div>
      {branches.map((branch, index) => (
        <div
          key={index}
          className="flex items-center py-2  px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          onClick={(e) => handleBranchClick(e, branch)}
        >
          <span className="mr-2">
            <img src="/branch.png" alt="branch" width={20} height={20} />
          </span>
          <span>{branch}</span>
        </div>
      ))}
    </div>
  )
}

export default BranchExplorer
