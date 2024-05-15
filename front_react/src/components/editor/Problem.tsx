import * as React from 'react'

interface ProblemProp {
  content: string
  testCases: { problem: string; answer: string }[]
}

const Problem: React.FC<ProblemProp> = ({ content, testCases }) => {
  const renderTable = () => {
    // testCases가 배열이 아니라면 빈 테이블을 반환
    if (!Array.isArray(testCases) || testCases.length === 0) {
      return ''
    }

    let tableHtml =
      '<table><thead><tr><th>Input</th><th>Output</th></tr></thead><tbody>'
    testCases.forEach((testCase, index) => {
      const formattedProblem = testCase.problem.replace(/\n/g, '<br>') // \n을 <br>로 변환
      const formattedAnswer = testCase.answer.replace(/\n/g, '<br>') // \n을 <br>로 변환
      tableHtml += `<tr><td>${formattedProblem}</td><td>${formattedAnswer}</td></tr>`
    })
    tableHtml += '</tbody></table>'
    return tableHtml
  }

  return (
    <div
      className="bg-white w-full h-full overflow-auto p-2"
      dangerouslySetInnerHTML={{
        __html: `
          ${content}
          ${renderTable()}
          <style>
            .table-container {
              width: 100%; /* 컨테이너의 너비를 전체로 설정 */
              overflow-x: auto; /* 가로 스크롤바 활성화 */
            }
            table {
              width: 100%; /* 테이블의 너비를 컨테이너의 너비에 맞춤 */
              border-collapse: collapse; /* 테이블 셀 간격 없앰 */
              margin-top: 20px; /* 테이블 상단 여백 */
            }
            th, td {
              border: 1px solid #ccc; /* 테이블 셀 테두리 스타일 */
              padding: 8px; /* 테이블 셀 내부 여백 */
              text-align: left; /* 텍스트 정렬 */
            }
          </style>
        `,
      }}
    />
  )
}

export default Problem
