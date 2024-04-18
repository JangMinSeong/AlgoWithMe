import React from 'react'
import Button from '@/components/Button'

interface CardProps {
  imageSrc?: string
  date?: string
  studyName?: string
  onClick?: () => void
}
const StudyCard: React.FC<CardProps> = (cardProps: CardProps) => (
  <Button
    className="px-0 py-0 border-0 bg-lighterPurple shadow-lg cursor-pointer hover:bg-lighterPurple hover:scale-110 transition transform duration-150 ease-in-out"
    onClick={cardProps.onClick}
  >
    <div className="w-60 h-56 overflow-hidden bg-lighterPurple">
      {cardProps.imageSrc ? (
        <img
          src={cardProps.imageSrc}
          alt="Study"
          className="h-full w-full object-contain"
        />
      ) : (
        <img
          src="/vercel.svg"
          alt="no image"
          className="h-full w-full object-contain"
        />
      )}
    </div>
    <div className="text-left bg-background w-full">
      <div className="m-2 pt-2 mb-0 text-black">{cardProps.studyName}</div>
      {cardProps.date && (
        <p className="ml-2 pb-2 text-sm text-navy">{cardProps.date}</p>
      )}
    </div>
  </Button>
)

export default StudyCard
