import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

interface ChartData {
  tag: string
  count: number
}

interface ChartProp {
  chartList: ChartData[]
}

const PieChart: React.FC<ChartProp> = ({ chartList }) => {
  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(199, 199, 199, 0.6)',
    'rgba(83, 102, 255, 0.6)',
    'rgba(40, 159, 64, 0.6)',
    'rgba(210, 99, 132, 0.6)',
    'rgba(20, 162, 235, 0.6)',
    'rgba(75, 206, 86, 0.6)',
    'rgba(153, 159, 64, 0.6)',
  ]
  const borderColors = backgroundColors.map((color) =>
    color.replace('0.6', '1'),
  )

  const emptyChartData = {
    labels: ['No Data'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['rgba(211, 211, 211, 0.6)'],
        borderColor: ['rgba(211, 211, 211, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const data = {
    labels: chartList?.map((item) => item.tag) || emptyChartData.labels,
    datasets: [
      {
        data:
          chartList && chartList.length > 0
            ? chartList.map((item) => item.count)
            : emptyChartData.datasets[0].data,
        backgroundColor:
          chartList && chartList.length > 0
            ? backgroundColors.slice(0, chartList.length)
            : emptyChartData.datasets[0].backgroundColor,
        borderColor:
          chartList && chartList.length > 0
            ? borderColors.slice(0, chartList.length)
            : emptyChartData.datasets[0].borderColor,
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} />
}

export default PieChart
