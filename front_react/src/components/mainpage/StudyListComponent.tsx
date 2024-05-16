import StudyCard from '@/components/mainpage/StudyCard'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import useSidebar from '@/hooks/useSidebar'
import useStudy from '@/hooks/useStudy'

interface Study {
  id: number
  name: string
  imageUrl: string
  visitedAt: string
}

interface StudyProp {
  studyList: Study[]
}

const StudyList: React.FC<StudyProp> = ({ studyList = [] }) => {
  const navigate = useNavigate()
  const { setGId } = useSidebar()
  const { handleFetchStudyInfo } = useStudy()


  const handleCardClick = (id: number) => {
    setGId(id)
    handleFetchStudyInfo(id)
    navigate(`/${id}/study`)
  }

  return (
      <div className="w-full min-h-screen">
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-2 px-7"
            style={{minHeight: '250px'}}
        >
          {studyList.map((study) => (
              <StudyCard
                  key={study.id}
                  imageSrc={study.imageUrl}
                  date={new Date(study.visitedAt).toLocaleDateString('ko-KR')}
                  studyName={study.name.replace(/"/g, '')}
                  onClick={() => handleCardClick(study.id)}
                  style={{width: '100%'}}
              />
          ))}
        </div>
      </div>
  )
}

export default StudyList
