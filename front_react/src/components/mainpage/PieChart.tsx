import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import React from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import './PieChart.css' // CSS 파일을 import

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

interface ChartData {
  tag: string
  count: number
}

interface ChartProp {
  chartList: ChartData[]
}

const tags: { [key: string]: string } = {
  DFS: 'DFS',
  BFS: 'BFS',
  BRUTEFORCE: '브루트포스',
  GREEDY: '그리디',
  DP: '다이나믹 프로그래밍',
  STRING: '문자열',
  BINARY_SEARCH: '이분 탐색',
  SIMULATION: '구현',
  SORTING: '정렬',
  BITMASK: '비트 마스킹',
  BACKTRACKING: '백트래킹',
  DATA_STRUCTURES: '자료구조',
  GRAPH: '그래프',
}

const PieChart: React.FC<ChartProp> = ({ chartList }) => {
  const backgroundColors = [
    'rgba(102, 153, 255, 0.6)', // Soft Blue
    'rgba(102, 255, 178, 0.6)', // Soft Green
    'rgba(255, 204, 153, 0.6)', // Soft Orange
    'rgba(255, 153, 204, 0.6)', // Soft Pink
    'rgba(204, 153, 255, 0.6)', // Soft Purple
    'rgba(153, 255, 255, 0.6)', // Soft Cyan
    'rgba(255, 255, 153, 0.6)', // Soft Yellow
    'rgba(153, 204, 255, 0.6)', // Soft Light Blue
    'rgba(204, 255, 153, 0.6)', // Soft Lime
    'rgba(255, 153, 153, 0.6)', // Soft Red
    'rgba(153, 153, 255, 0.6)', // Soft Indigo
    'rgba(255, 204, 204, 0.6)', // Soft Coral
    'rgba(204, 204, 255, 0.6)', // Soft Lavender
  ]
  const borderColors = backgroundColors.map((color) =>
    color.replace('0.6', '1'),
  )

  const emptyChartData = {
    labels: ['데이터가 없어요. 문제를 풀어보세요'],
    datasets: [
      {
        data: [0],
        backgroundColor: ['rgba(211, 211, 211, 0.6)'],
        borderColor: ['rgba(211, 211, 211, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const data = {
    labels:
      chartList?.map((item) => tags[item.tag] || item.tag) ||
      emptyChartData.labels,
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

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 10,
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || ''
            const value = tooltipItem.raw || 0
            const total = tooltipItem.dataset.data.reduce(
              (acc, curr) => acc + curr,
              0,
            )
            const percentage = ((value / total) * 100).toFixed(2)
            return `${value} 문제 (${percentage}%)`
          },
        },
      },
      datalabels: {
        clip: false,
        clamp: false,
        color: 'transparent',
        formatter: (value, context) =>
          context.chart.data.labels[context.dataIndex],
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="chart-container w-[90%] pt-4">
      <div className="chart">
        <Pie data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  )
}

export default PieChart
