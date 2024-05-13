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

const MainPage: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)
  const [chartData, setChartData] = React.useState([])
  const [problemData, setProblemData] = React.useState([])
  const [studyData, setStudyData] = React.useState([])

  const { setStudys } = useSidebar()

  useEffect(() => {
    if (user) {
      console.log(user)

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
          console.error('Error fetching data: ', error)
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
        navigate(`/${data.teamId}/study`)
      } else {
        console.error('스터디 생성 실패')
      }
    } catch (error) {
      console.error('네트워크 오류:', error)
    }
  }

  return (
    <div>
      <MainHeader />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex w-full flex-col items-center justify-center text-center mt-0.5 pb-10">
          <ChartProblem chartList={chartData} problemList={problemData} />
          <StudyList studyList={studyData} />
        </main>

        <button
          className="fixed bottom-4 right-4 w-12 h-12 bg-darkPurple text-background rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center text-2xl"
          onClick={handleButtonClick}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default MainPage
