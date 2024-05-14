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
  <div className="flex-grow flex flex-row w-full justify-center items-center">
    <div className="flex justify-center m-10 h-96 w-96" style={{ flexGrow: 1 }}>
      <PieChart chartList={chartList} />
    </div>
    <div
      className="flex justify-center m-10 h-fit pr-10"
      style={{ flexGrow: 1 }}
    >
      <ProblemList problemList={problemList} />
    </div>
  </div>
)

export default ChartProblem
