import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import StudyGroupNavigator from './StudyGroupNavigator'
import InStudyPageItem from './InStudyPageItem'
import useSidebar from '@/hooks/useSidebar.ts'
import { useEffect } from 'react'
import useStudy from '@/hooks/useStudy'
import { useNavigate } from 'react-router-dom'

const SideBar = ({ groupId }: { groupId: number }) => {
  const navigate = useNavigate()
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)
  const menuItemWrapper =
    'px-2 h-10 hover:bg-navy hover:bg-opacity-30 transition-colors  flex items-center text-sm'

  const { setGId, setPages } = useSidebar()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/page/team/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setPages(data.pageInfoList)
        } else {
          throw new Error('Network response was not ok.')
        }
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
    fetchData()
    setGId(groupId)
  }, [groupId])

  const { handleFetchStudyInfo } = useStudy()

  const handleGoStudyMain = () => {
    handleFetchStudyInfo(groupId)
    navigate(`/${groupId}/study`)
  }

  return (
    <div>
      {isOpen && (
        <div
          className={` w-48 min-w-48 h-screen fixed left-2 top-16 bg-white bg-opacity-50 rounded-lg transition-all duration-500`}
        >
          <StudyGroupNavigator groupId={groupId} />
          <div onClick={handleGoStudyMain} className={menuItemWrapper}>
            스터디 메인 페이지
          </div>
          {pageList.map((el) => (
            <div>
              <InStudyPageItem
                groupId={groupId}
                page={el}
                key={el.pageId}
                depth={0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SideBar
