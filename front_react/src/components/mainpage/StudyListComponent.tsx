'use client'

import StudyCard from '@/components/mainpage/StudyCard'
import * as React from 'react'

const StudyList: React.FC = () => {
  const items = [
    {
      id: 1,
      date: '2024.2.5',
      imageSrc: '/next.svg',
      studyName: '오구오구 스터디',
    },
    { id: 2, date: '2024.4.17', studyName: '스터디2' },
    { id: 3, date: '2024.4.15', studyName: '스터디3' },
    { id: 4, date: '2024.4.15', studyName: '스터디4' },
  ]

  const handleCardClick = (studyName: string) => {
    console.log(`${studyName} 클릭됨!`)
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full mt-6 text-lg pl-5 pr-5">
        <div className="text-darkNavy">최근 스터디</div>
        <button className="cursor-pointer hover:bg-lightPurple transition-colors">
          ...
        </button>
      </div>
      <div className="flex justify-around mt-2 space-x-10">
        {items.map((item) => (
          <StudyCard
            key={item.id}
            imageSrc={item.imageSrc}
            date={item.date}
            studyName={item.studyName}
            onClick={() => handleCardClick(item.studyName)}
          />
        ))}
      </div>
    </div>
  )
}

export default StudyList
