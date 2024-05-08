import { BiLayerPlus } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useRouter } from 'next/navigation'

const StudyGroupDropdown = () => {
  const router = useRouter()
  const studyGroups = useSelector((state: RootState) => state.sidebar.studyList)

  const dropdownItemCSS =
    'px-4 h-8 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center hover:shadow-inner'

  const moveStudy = (id: number) => {
    router.push(`/${id}/study`)
  }

  return (
    <div className="flex flex-col w-48 text-sm border-b-2 ">
      <div>
        {studyGroups.map((el) => (
          <div onClick={() => moveStudy(el.id)} className={dropdownItemCSS}>
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
