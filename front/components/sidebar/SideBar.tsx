import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
import SideBarItem from './SideBarItem'
import StudyGroupNavigator from './StudyGroupNavigator'
import InStudyPageItem from './InStudyPageItem'
import Link from 'next/link'

const SideBar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const menuItemWrapper =
    'px-2 h-10 hover:bg-navy hover:bg-opacity-30 transition-colors  flex items-center text-xs'
  return (
    <div>
      {isOpen ? (
        <div
          className={` w-48 min-w-48 h-screen fixed left-2 top-16 bg-white bg-opacity-50 rounded-lg transition-all duration-500`}
        >
          <StudyGroupNavigator />
          <Link
            href={`/study/${'현재 스터디 고유번호'}`}
            className={menuItemWrapper}
          >
            스터디 메인 페이지
          </Link>
          {dummyInStudyPages.map((el) => (
            <div>
              <InStudyPageItem page={el} key={el.id} depth={0} />
            </div>
          ))}
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  )
}

export default SideBar

const dummyInStudyPages = [
  {
    id: 123,
    desc: '[백준] 12123. 민숭의 생일파티',
    type: 'W',
    subPages: undefined,
  },
  {
    id: 2323223,
    desc: 'DFS 모음집',
    type: 'D',
    subPages: [
      {
        id: 12341324,
        desc: '[프로그래머스] 123. 재숭의 생일파티',
        type: 'W',
        subPages: undefined,
      },
      {
        id: 98989,
        desc: '[SWEA] 1. 집가고싶다',
        type: 'W',
        subPages: undefined,
      },
      {
        id: 23423454,
        desc: '재귀',
        type: 'D',
        subPages: [
          {
            id: 12423,
            desc: '[백준] 2494. 냥냥펀치',
            type: 'W',
            subPages: undefined,
          },
          {
            id: 3535,
            desc: '[SWEA] 23394. 냥냥펀치',
            type: 'W',
            subPages: undefined,
          },
          {
            id: 767,
            desc: '[SWEA] 2494. 냥냥냥냥냥펀치',
            type: 'W',
            subPages: undefined,
          },
        ],
      },
    ],
  },
  {
    id: 5858,
    desc: '[SWEA] 194. 배고프다',
    type: 'W',
    subPages: undefined,
  },
]
