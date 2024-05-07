import StudyCard from '@/components/mainpage/StudyCard'
import * as React from 'react'

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
  const [index, setIndex] = React.useState(0)

  // 슬라이드에 보여질 스터디 수
  const maxVisibleStudies = 4

  const handleCardClick = (studyName: string) => {
    console.log(`${studyName} 클릭됨!`)
  }

  const handlePrevClick = () => {
    setIndex(Math.max(0, index - 1))
  }

  const handleNextClick = () => {
    setIndex(Math.min(studyList.length - maxVisibleStudies, index + 1))
  }

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mt-6 text-lg pl-5 pr-5">
        <div className="text-darkNavy">최근 스터디</div>
        {studyList.length > maxVisibleStudies && (
          <div>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-lightPurple transition-colors"
              onClick={handlePrevClick}
            >
              &lt;
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-lightPurple transition-colors"
              onClick={handleNextClick}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <div
        className="flex justify-around mt-2 space-x-10"
        style={{ minHeight: '250px' }}
      >
        {studyList.slice(index, index + maxVisibleStudies).map((study) => (
          <StudyCard
            key={study.id}
            imageSrc={study.imageUrl}
            date={new Date(study.visitedAt).toLocaleDateString('ko-KR')}
            studyName={study.name}
            onClick={() => handleCardClick(study.name)}
          />
        ))}
      </div>
    </div>
  )
}

export default StudyList
