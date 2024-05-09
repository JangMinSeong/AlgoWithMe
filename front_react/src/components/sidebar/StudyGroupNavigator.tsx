import { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import StudyGroupDropdown from './StudyGroupDropdown'
import PageCreateButton from './PageCreateButton'

const StudyGroupNavigator = (props: { groupId: number }) => {
    const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
    const studyGroups = useSelector((state: RootState) => state.sidebar.studyList)

    const currentGroupName =
        studyGroups.find((group) => group.id === props.groupId)?.name ||
        '오구오구스터디'

    const handleNavigatorOpen = () => {
        setIsNavigatorOpen(!isNavigatorOpen)
    }
    return (
        <div className="rounded-t-lg ">
            <div
                onClick={handleNavigatorOpen}
                className="pl-2 h-10 hover:bg-navy hover:bg-opacity-30 rounded-t-lg transition-colors text-sm flex items-center justify-between border-b-2"
            >
                {currentGroupName}
                <div className="flex items-center mr-2 ">
                    <PageCreateButton groupId={props.groupId} pageId={-1} />
                    {isNavigatorOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
            </div>
            {/* 이걸 누르면 아래의 드랍다운이 펼쳐진다 */}
            {isNavigatorOpen ? <StudyGroupDropdown /> : null}
        </div>
    )
}

export default StudyGroupNavigator
