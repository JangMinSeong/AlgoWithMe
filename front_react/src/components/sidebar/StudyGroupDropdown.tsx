import { BrowserRouter as Router, Link } from 'react-router-dom'
import { BiLayerPlus } from 'react-icons/bi'
import useStudy from '@/hooks/useStudy'
import { useNavigate } from 'react-router-dom'

const StudyGroupDropdown = () => {
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
        {dummyStudyGroups.map((el) => (
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

const dummyStudyGroups = [
  {
    id: '1',
    name: '오구오구스터디',
  },
  {
    id: '2',
    name: '알고리즘 스터디',
  },
  {
    id: '3',
    name: '자스알고리즘 모임',
  },
]
