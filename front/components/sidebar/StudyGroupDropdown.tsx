import Link from 'next/link'
import { BiLayerPlus } from 'react-icons/bi'
import fetch from '@/lib/fetch'
import { useRouter } from 'next/navigation'

const StudyGroupDropdown = () => {
  const dropdownItemCSS =
    'px-4 h-8 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center hover:shadow-inner'

  const router = useRouter()

  const handleCreateStudyGroup = async () => {
    await fetch('/study', {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      // .then((res) => router.push(`/${res.teamId}/study`))
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  return (
    <div className="flex flex-col w-48 text-sm border-b-2 ">
      <div>
        {dummyStudyGroups.map((el) => (
          <Link href={`/${el.id}/study`} className={dropdownItemCSS}>
            {el.name}
          </Link>
        ))}
      </div>
      <div className={dropdownItemCSS} onClick={handleCreateStudyGroup}>
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
