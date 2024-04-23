'use client'

import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

function PieChart() {
  const data = {
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} />
}

export default PieChart
