import React, { useEffect, useRef, useState } from 'react'
import fetch from '@/lib/fetch.ts'
import { useNavigate } from 'react-router-dom'
import { useWebSocket } from '@/hooks/useWebSocket.ts'

interface Study {
  id: number
  name: string
  imageUrl: string
}

interface Page {
  id: number
  studyId: number
  isDoc: boolean
  name: string
  imageUrl: string
}

const SearchDropdown: React.FC = () => {
  const navigate = useNavigate()
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [studyItems, setStudyItems] = useState<Study[]>([])
  const [pageItems, setPageItems] = useState<Page[]>([])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const { connectToServer } = useWebSocket()

  useEffect(() => {
    const fetchSearchList = async () => {
      const response = await fetch(
        `/user/search?word=${encodeURIComponent(searchValue)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData = await response.json()
      setStudyItems(responseData.studies)
      setPageItems(responseData.pages)
    }
    fetchSearchList()
  }, [searchValue])

  const handleStudyItemClick = (id: number) => {
    setDropdownVisible(false)
    navigate(`/${id}/study`)
  }

  const handlePageItemClick = (id: number, studyId: number, isDoc: boolean) => {
    connectToServer(studyId)
    setDropdownVisible(false)
    if (isDoc) navigate(`/${studyId}/docs/${id}`)
    else navigate(`/${studyId}/editor/${id}`)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <div
      className={`relative w-full ${dropdownVisible ? '' : ''}`}
      ref={wrapperRef}
    >
      <input
        className={`w-full p-2 text-base border border-navy hover:bg-dimmedPurple  ${
          dropdownVisible
            ? `rounded-b-none bg-dimmedPurple border-b-0 ring-0 outline-none`
            : `bg-transparent`
        } hover:shadow-searchShadow focus:outline-none transition-colors `}
        type="text"
        placeholder="내 스터디그룹 또는 학습한 페이지를 검색해보세요"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      />
      {dropdownVisible && (
        <div className=" absolute w-full max-h-64 overflow-auto bg-dimmedPurple border border-navy border-t-0 shadow-[0_10px_10px_1px_rgba(0,0,0,0.1)]">
          <div>
            {studyItems.map((item, index) => (
              <div
                key={index}
                className="p-2  hover:bg-lightPurple transition-colors truncate"
                onClick={() => {
                  handleStudyItemClick(item.id)
                }}
              >
                {item.name.replace(/"/g, '')}
              </div>
            ))}
            {pageItems.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-lightPurple transition-colors truncate"
                onClick={() => {
                  handlePageItemClick(item.id, item.studyId, item.isDoc)
                }}
              >
                {item.name.replace(/"/g, '').replace(/null/g, '빈 페이지')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchDropdown
