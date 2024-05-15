import { BrowserRouter as Router, Link } from 'react-router-dom'
import { BiLayerPlus } from 'react-icons/bi'
import useStudy from '@/hooks/useStudy'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import {useWebSocket} from "@/hooks/useWebSocket.ts";
import fetch from "@/lib/fetch.ts";

interface Study {
  id: number
  name: string
  imageUrl: string
}

const StudyGroupDropdown = (props: { studyList : Study[] }) => {
  const navigate = useNavigate()
  const { handleFetchStudyInfo } = useStudy()
    const {subscribeStudy} = useWebSocket()
  const studyGroupList = useSelector(
    (state: RootState) => state.sidebar.studyList,
  )

  const dropdownItemCSS =
    'px-4 h-8 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center hover:shadow-inner'

  const handleGoStudyMain = (id: number) => {
    handleFetchStudyInfo(id)
    subscribeStudy(`topic/study/${id}`)
    navigate(`/${id}/study`)
  }

  const handleCreateStudy = async () => {
    try {
      const response = await fetch('/study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        subscribeStudy(`topic/study/${data.teamId}`)
        navigate(`/${data.teamId}/study`)
      } else {
        console.error('스터디 생성 실패')
      }
    } catch (error) {
      console.error('네트워크 오류:', error)
    }
  }

  return (
    <div className="flex flex-col w-48 h-28 text-sm border-b-2 overflow-auto">
      <div>
        {studyGroupList.map((el) => (
          <div
            onClick={() => handleGoStudyMain(el.id)}
            className={dropdownItemCSS}
          >
            {el.imageUrl ? (
              <img
                src={el.imageUrl}
                alt=""
                width={20}
                height={20}
                className="rounded-full mr-2"
              />
            ) : (
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png"
                alt="Bubbles"
                width={20}
                height={20}
                className="rounded-full mr-2"
              />
            )}
            {el.name.replace(/"/gi, '')}
          </div>
        ))}
      </div>
      <div className={`${dropdownItemCSS} font-bold`} onClick={handleCreateStudy} >
        <BiLayerPlus className="mr-2"/>새 스터디그룹 만들기
      </div>
    </div>
  )
}

export default StudyGroupDropdown