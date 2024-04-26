import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
import SideBarItem from './SideBarItem'
const SideBar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)

  const dummy = [
    {
      groupName: '오구오구스터디',
    },
    {
      groupName: '알고 스터디',
    },
    {
      groupName: '모르고 스터디',
    },
  ]

  return (
    <div>
      {isOpen ? (
        <div
          className={`pt-2 w-40 min-w-40 h-screen fixed left-2 top-16 bg-white bg-opacity-50 rounded-lg transition-all duration-500`}
        >
          {dummy.map((el) => (
            <SideBarItem groupName={el.groupName} key={el.groupName} />
          ))}
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  )
}

export default SideBar
