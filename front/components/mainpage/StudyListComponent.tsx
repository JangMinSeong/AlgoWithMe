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
  const [visibleStudies, setVisibleStudies] = React.useState<Study[]>([])

  React.useEffect(() => {
    // 더미 데이터 생성
    const dummyStudies = Array.from(
      { length: Math.max(0, 4 - studyList.length) },
      (_, i) => ({
        id: -i - 1, // 음수 ID로 구분
        name: `더미 스터디 ${i + 1}`,
        imageUrl: 'https://via.placeholder.com/150', // 임시 이미지 URL
        visitedAt: '',
      }),
    )

    // 실제 데이터와 더미 데이터 결합
    setVisibleStudies([...studyList, ...dummyStudies])
  }, [studyList])

  const handleCardClick = (studyName: string) => {
    console.log(`${studyName} 클릭됨!`)
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full mt-6 text-lg pl-5 pr-5">
        <div className="text-darkNavy">최근 스터디</div>
        {studyList.length > 4 && (
          <button
            className="cursor-pointer hover:bg-lightPurple transition-colors"
            onClick={() => setVisibleStudies(studyList)}
          >
            ...
          </button>
        )}
      </div>
      <div className="flex justify-around mt-2 space-x-10">
        {visibleStudies.map((study) => (
          <StudyCard
            key={study.id}
            imageSrc=""
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
