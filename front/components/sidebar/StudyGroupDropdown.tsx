import Link from 'next/link'
import { BiLayerPlus } from 'react-icons/bi'

const StudyGroupDropdown = () => {
  const dropdownItemCSS =
    'px-4 h-8 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center'

  return (
    <div className="flex flex-col top-7 absolute left-2 z-20 bg-white w-48 shadow-lg text-xs  ">
      <div>
        {dummyStudyGroups.map((el) => (
          <Link href={`/study/${el.id}`} className={dropdownItemCSS}>
            {el.name}
          </Link>
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
