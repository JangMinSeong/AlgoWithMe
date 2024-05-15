import {useEffect, useState} from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import StudyGroupDropdown from './StudyGroupDropdown'
import PageCreateButton from './PageCreateButton'

interface Study {
  id: number
  name: string
  imageUrl: string
}
const StudyGroupNavigator = (props: {
  groupId: number
  studyList: Study[]
}) => {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const [curStudyList, setCurStudyList] = useState<Study[]>([])
  const currentStudyInfo = useSelector((state: RootState) => state.study)
  const [currentGroupName, setCurGroupName] = useState<string> (
    props.studyList.find((group) => group.id === props.groupId)?.name ||
    '오구오구스터디')
  const [currentGroupImg,setCurGroupImg] = useState<string>(
      props.studyList.find((group) => group.id === props.groupId)?.imageUrl ||
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png')


    useEffect ( () => {
        setCurStudyList(props.studyList)
        setCurGroupName(props.studyList.find((group) => group.id === props.groupId)?.name ||
            '오구오구스터디')
        setCurGroupImg(props.studyList.find((group) => group.id === props.groupId)?.imageUrl ||
            'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png')
    },[props.studyList])


  const handleNavigatorOpen = () => {
    setIsNavigatorOpen(!isNavigatorOpen)
  }

  return (
    <div>
      <div
        onClick={handleNavigatorOpen}
        className="pl-2 h-10 hover:bg-navy hover:bg-opacity-30 transition-colors text-sm flex items-center justify-between border-b-2 font-bold"
      >
        <img
          src={currentStudyInfo.imageUrl ||
              'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png' }
          alt=""
          width={20}
          height={20}
          className="rounded-full"
        />
        {currentStudyInfo.name.replace(/"/gi, '')}
        <div className="flex items-center mr-2 ">
          <PageCreateButton groupId={props.groupId} pageId={-1} />
          {isNavigatorOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      {/* 이걸 누르면 아래의 드랍다운이 펼쳐진다 */}
      {isNavigatorOpen ? <StudyGroupDropdown studyList={curStudyList}/> : null}
    </div>
  )
}

export default StudyGroupNavigator
