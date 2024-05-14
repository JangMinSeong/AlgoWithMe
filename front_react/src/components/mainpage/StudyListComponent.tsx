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
  const [index, setIndex] = React.useState(0)
  const { setGId } = useSidebar()
  const { handleFetchStudyInfo } = useStudy()

  // 슬라이드에 보여질 스터디 수
  const maxVisibleStudies = 4

  const handleCardClick = (id: number) => {
    setGId(id)
    handleFetchStudyInfo(id)
    navigate(`/${id}/study`)
  }

  const handlePrevClick = () => {
    setIndex(Math.max(0, index - 1))
  }

  const handleNextClick = () => {
    setIndex(Math.min(studyList.length - maxVisibleStudies, index + 1))
  }

  const visibleStudies = studyList.slice(index, index + maxVisibleStudies)
  const emptyCardCount = maxVisibleStudies - visibleStudies.length
  const emptyCards = Array.from({ length: emptyCardCount }, (_, i) => (
    <div
      key={`empty-${i}`}
      className="min-w-[calc(25%-40px)] h-full bg-gray-200"
    />
  ))

  return (
    <div className="w-full relative min-h-screen">
      <div className="flex flex-row justify-between items-center w-full mt-6 text-lg pl-5 pr-5">
        {studyList.length > maxVisibleStudies && (
          <>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-lightPurple transition-colors z-10"
              onClick={handlePrevClick}
            >
              &lt;
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-lightPurple transition-colors z-10"
              onClick={handleNextClick}
            >
              &gt;
            </button>
          </>
        )}
      </div>
      <div
        className="flex justify-between mt-2 space-x-10 pl-7 pr-7"
        style={{ minHeight: '250px' }}
      >
        {visibleStudies.map((study) => (
          <StudyCard
            key={study.id}
            imageSrc={study.imageUrl}
            date={new Date(study.visitedAt).toLocaleDateString('ko-KR')}
            studyName={study.name.replace(/"/g, '')}
            onClick={() => handleCardClick(study.id)}
            style={{ minWidth: 'calc(25% - 40px)' }} // 40px accounts for space-x-10 spacing
          />
        ))}
        {emptyCards}
      </div>
    </div>
  )
}

export default StudyList
