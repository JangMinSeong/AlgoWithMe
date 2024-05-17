import * as React from 'react'
import ProblemList from '@/components/mainpage/ProblemList'
import PieChart from '@/components/mainpage/PieChart'

interface Props {
  chartList: ChartData[]
  problemList: ProblemData[]
}

interface ChartData {
  tag: string
  count: number
}

interface ProblemData {
  provider: string
  number: number
  name: string
  url: string
}

const ChartProblem: React.FC<Props> = ({ chartList, problemList }) => (
  <div className="flex-grow flex items-center w-full ">
    {/* 왼쪽 */}
    <div className="flex justify-center h-96  flex-col" style={{ flexGrow: 1 }}>
      <div className="text-darkNavy text-lg  pl-5  text-left font-bold ">
        나의 알고리즘 통계
      </div>

      <PieChart chartList={chartList} />
    </div>

    {/* 오른쪽 */}
    <div
      className="flex justify-center m-10 h-96 pr-10  flex-col"
      style={{ flexGrow: 1 }}
    >
      <div className="text-darkNavy text-lg  pl-5  text-left font-bold ">
        최근 학습한 문제 목록
      </div>

      <ProblemList problemList={problemList} />
    </div>
  </div>
)

export default ChartProblem
