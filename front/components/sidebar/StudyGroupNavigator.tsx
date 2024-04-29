import Link from 'next/link'
import { useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import StudyGroupDropdown from './StudyGroupDropdown'

const StudyGroupNavigator = () => {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)

  const handleNavigatorOpen = () => {
    setIsNavigatorOpen(!isNavigatorOpen)
  }
  return (
    <div className="bg-navy rounded-t-lg ">
      <div
        onClick={handleNavigatorOpen}
        className="h-8 hover:bg-navy hover:bg-opacity-30 rounded-lg transition-colors text-sm flex items-center justify-between relative"
      >
        {'오구오구스터디'}
        {isNavigatorOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </div>
      {/* 이걸 누르면 아래의 드랍다운이 펼쳐진다 */}
      {isNavigatorOpen ? <StudyGroupDropdown /> : null}
    </div>
  )
}

export default StudyGroupNavigator
