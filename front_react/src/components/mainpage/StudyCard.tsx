import React from 'react'

interface CardProps {
  imageSrc?: string
  date?: string
  studyName?: string
  onClick?: () => void
}
const StudyCard: React.FC<CardProps> = (cardProps: CardProps) => {
  const [hover, setHover] = React.useState(false)
  return (
  <button
    className="flex flex-col rounded-sm border-navy border-[1px] shadow-lg cursor-pointer hover:border-darkNavy hover:scale-105 transition transform duration-150 ease-in-out"
    onClick={cardProps.onClick}
    onMouseEnter={() => {
      setHover(true)
    }}
    onMouseLeave={() => {
      setHover(false)
    }}
  >
    <div className="p-4 h-56 w-full overflow-hidden flex justify-center items-center">
      {cardProps.imageSrc ? (
        <img
          src={cardProps.imageSrc}
          alt="Study"
          className="h-full w-full object-contain"
        />
      ) : (
        <img
          src="/logo.svg"
          alt="no image"
          className="h-full w-full object-contain"
        />
      )}
    </div>
    <div
      className={`${hover ? 'bg-gradient-to-br from-accent/50 to-blueishPurple/50' : ''} text-left bg-dimmedPurple hover:bg-gradient-to-br hover:from-accent/50 hover:to-blueishPurple/50 w-full transition-colors delay-300 duration-300 ease-in-out`}>
      <div className="m-2 pt-2 mb-0 text-black">{cardProps.studyName}</div>
      {cardProps.date && (
        <p className="ml-2 pb-2 text-sm text-navy">{cardProps.date}</p>
      )}
    </div>
  </button>
  )
}

export default StudyCard
