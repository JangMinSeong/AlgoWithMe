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
      className="w-full h-full overflow-auto p-2"
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
            section {
              display: block;
            }
            .headline {
            display: block;
    margin: 10px 0 25px 0;
    border-bottom: 1px dotted #e4e9f0;
            }
            .problem-section {
            color: #333;
    font-size: 13px;
    line-height: 1.6;
            }
            .headline h2, .headline h3, .headline h4 {
            border-bottom: 2px solid #0076C0;
            margin: 0 0 -2px 0;
    padding-bottom: 5px;
    display: inline-block;
            }
            .headline h2 {
            font-size: 22px;
            }
            h1, h2, h3, h4, h5, h6 {
    color: #585f69;
    margin-top: 5px;
    text-shadow: none;
    font-weight: normal;
    font-family: 'Open Sans', sans-serif;
}
h2 {
    font-size: 24px;
    line-height: 33px;
}
.problem-text {
    font-size: medium;
    line-height: 30px;
}
p, li, li a {
    color: #555;
}
p {
    margin: 0 0 10px;
}
.problem-text {
    font-size: medium;
    line-height: 30px;
}
img {
    vertical-align: middle;
    border: 0;
}
.col-md-12 {
        width: 100%;
                float: left;
                position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    }
          </style>
        `,
      }}
    />
  )
}

export default Problem
