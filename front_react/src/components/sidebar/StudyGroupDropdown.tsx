import { BrowserRouter as Router, Link } from 'react-router-dom'
import { BiLayerPlus } from 'react-icons/bi'
import useStudy from '@/hooks/useStudy'
import { useNavigate } from 'react-router-dom'

interface Study {
  id: number
  name: string
  imageUrl: string
}

const StudyGroupDropdown = (props: { studyList : Study[] }) => {
  const navigate = useNavigate()
  const { handleFetchStudyInfo } = useStudy()
  const dropdownItemCSS =
    'px-4 h-8 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center hover:shadow-inner'

  const handleGoStudyMain = (id: number) => {
    handleFetchStudyInfo(id)
    navigate(`/${id}/study`)
  }
  return (
    <div className="flex flex-col w-48 text-sm border-b-2 ">
      <div>
        {props.studyList.map((el) => (
          <div
            onClick={() => handleGoStudyMain(el.id)}
            className={dropdownItemCSS}
          >
            {el.name}
          </div>
        ))}
      </div>
      <div className={dropdownItemCSS}>
        <BiLayerPlus className="mr-2" />새 스터디그룹 만들기
      </div>
    </div>
  )
}

export default StudyGroupDropdown