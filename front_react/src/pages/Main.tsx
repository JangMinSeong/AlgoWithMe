import * as React from 'react'
import { useEffect } from 'react'
import MainHeader from '@/components/header/Header'
import StudyList from '@/components/mainpage/StudyListComponent'
import ChartProblem from '@/components/mainpage/ChartProblemComponent'
import fetch from '@/lib/fetch'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import useSidebar from '@/hooks/useSidebar'
import toast, { Toast } from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'

const MainPage: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)
  const [chartData, setChartData] = React.useState([])
  const [problemData, setProblemData] = React.useState([])
  const [studyData, setStudyData] = React.useState([])

  const { setStudys } = useSidebar()

  useEffect(() => {
    if (user) {
  //    console.log(user)

      const fetchData = async () => {
        try {
          const response = await fetch('/user/info', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            setChartData(data.chart)
            setProblemData(data.problems)
            setStudyData(data.teams)
            setStudys(data.teams)
          } else {
            throw new Error('Network response was not ok.')
          }
        } catch (error) {
   //       console.error('Error fetching data: ', error)
        }
      }
      fetchData()
    }
  }, [user])

  const handleButtonClick = async () => {
    try {
      const response = await fetch('/study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('새로운 스터디가 생성 됐어요')
        navigate(`/${data.teamId}/study`)
      } else {
   //     console.error('스터디 생성 실패')
      }
    } catch (error) {
   //   console.error('네트워크 오류:', error)
    }
  }

  return (
    <div>
      <MainHeader />
      <div className="2xl:container 2xl:mx-auto px-16 mt-16">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-semibold self-start mt-4">
            환영합니다! {user.nickname} 님
          </h1>

          <main className="flex h-auto flex-col items-center justify-center text-center mt-2 pb-10">
            {/* 위부분 */}
            <div className="flex flex-col">
              <ChartProblem chartList={chartData} problemList={problemData} />
            </div>

            {/* 아래부분 */}
            <div className="w-full text-darkNavy text-lg text-left pl-5 sticky top-0 font-bold mb-4">
              최근 진행한 스터디 목록
            </div>
            <StudyList studyList={studyData} />
          </main>

          <button
            className="fixed bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-darkPurple transition duration-300 ease-in-out flex items-center justify-center text-2xl"
            onClick={handleButtonClick}
            data-tooltip-id={'createG'}
            data-tooltip-content={'새로운 스터디그룹 생성하기'}
          >
            +
          </button>
        </div>
      </div>
      <Tooltip id="createG" place="left" />
    </div>
  )
}

export default MainPage
