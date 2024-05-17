// BranchExplorer.tsx
import React, { useEffect, useState } from 'react'
import fetch from '@/lib/fetch.ts'

interface DirectoryProps {
  branch: string
  repoName: string
  directories: string[]
  setDirectories: (selected: string[]) => void
  path: string
  setPath: (selected: string) => void
  setIsLoading: (arg: boolean) => void
  setParentActiveBranch
}

const DirectoryExplorer: React.FC<DirectoryProps> = ({
  branch,
  repoName,
  directories,
  setDirectories,
  path,
  setPath,
  setIsLoading,
  setParentActiveBranch,
}) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchDirectories = async (directory) => {
    // setIsLoading(true);  // Start loading
    const fullPath = `${path}${directory}`
    const dataToPost = {
      repo: repoName,
      branch: branch,
      path: fullPath,
    }
    try {
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
      console.log(responseData)
    } catch (error) {
      console.error('Failed to fetch branches:', error)
    } finally {
      setIsLoading(false)
      // onDirectorySelect(fullPath)
    }
  }

  const handleDirectoryClick = (event, directory: string) => {
    setIsLoading(true)
    event.stopPropagation()
    fetchDirectories(directory)
    setPath(path + directory)
  }

  const handleGoPrev = () => {
    // 브랜치 선택하는 창으로 돌아가야함. === 레포는 선택됨, 브랜치는 선택안됨
    setParentActiveBranch(null)
    setPath('')
  }

  if (directories.length === 0) {
    return (
      <div>
        <div
          className="flex items-center py-2 mb-1 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          onClick={handleGoPrev}
        >
          ..
        </div>
        <div className="flex items-center py-2  px-2 bg-gray-100 rounded ">
          😶 하위 폴더가 없어요.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div
        className="flex items-center py-2  pl-4 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
        onClick={handleGoPrev}
      >
        ..{' '}
      </div>
      {directories.map((directory, index) => (
        <div
          key={index}
          className="flex items-center py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
          onClick={(e) => handleDirectoryClick(e, directory)}
        >
          <img
            src="/folder.png"
            alt="folder"
            width={20}
            height={20}
            className="mr-2"
          />
          <span>{directory}</span>
        </div>
      ))}
    </div>
  )
}

export default DirectoryExplorer
