import React, {useEffect, useRef, useState} from 'react'
import fetch from "@/lib/fetch.ts";
import {useNavigate} from "react-router-dom";
import {useWebSocket} from "@/hooks/useWebSocket.ts";

interface Study {
  id:number
  name:string
  imageUrl:string
}

interface Page {
  id:number
  studyId:number
  isDoc:boolean
  name:string
  imageUrl:string
}

const SearchDropdown: React.FC = () => {
  const navigate = useNavigate()
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const [searchValue,setSearchValue] = useState<string>(null)
  const [studyItems, setStudyItems] = useState<Study[]>([])
  const [pageItems, setPageItems] = useState<Page[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {connectToServer} =useWebSocket()

  useEffect(()=> {
    const fetchSearchList = async () => {
      const response = await fetch(`/user/search?word=${encodeURIComponent(searchValue)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json()
      setStudyItems(responseData.studies)
      setPageItems(responseData.pages)
    }
    fetchSearchList()
  },[searchValue])

  const handleStudyItemClick = (id: number) => {
    setDropdownVisible(false)
    navigate(`/${id}/study`)

  }

  const handlePageItemClick = (id: number, studyId: number, isDoc: boolean) => {
    connectToServer(studyId)
    setDropdownVisible(false)
    if(isDoc)
      navigate(`/${studyId}/docs/${id}`)
    else
      navigate(`/${studyId}/editor/${id}`)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative w-full mx-auto " ref={wrapperRef}>
      <input
        className="bg-lighterPurple w-full p-1 text-base border border-navy shadow-md"
        type="text"
        placeholder="스터디 검색"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      />
      {dropdownVisible && (
        <div className="absolute w-full max-h-64 overflow-auto bg-background border shadow ">
          <div>
            {studyItems.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-lighterPurple"
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
                    className="p-2 hover:bg-lighterPurple"
                    onClick={() => {
                      handlePageItemClick(item.id, item.studyId, item.isDoc)
                    }}
                >
                  {item.name.replace(/"/g, '').replace(/null/g,'빈 페이지')}
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchDropdown
