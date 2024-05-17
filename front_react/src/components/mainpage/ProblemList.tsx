import * as React from 'react'

interface ProblemData {
  provider: string
  number: number
  name: string
  url: string
}

interface ProblemProp {
  problemList: ProblemData[]
}

const ProblemList: React.FC<ProblemProp> = ({ problemList }) => {
  const handleItemClick = (url: string) => {
    window.open(url, '_blank')
  }

  // Set a minimum height for the container to maintain the size even if it's empty
  const containerStyle = {
    minHeight: '250px', // Adjust according to your design requirements
  }

  return (
    <div
      // style={containerStyle}
      className="w-[36vw] h-full p-4 rounded-lg text-left"
    >
      {' '}
      <ul className="list-none space-y-2">
        {problemList.length > 0 ? (
          problemList.map((problem, index) => (
            <li
              key={index}
              className="pl-6 py-2 rounded cursor-pointer hover:bg-opacity-60 transition-colors flex items-center h-16 w-[90%] bg-white shadow-foggyBlue"
              onClick={() => handleItemClick(problem.url)}
            >
              {problem.provider === 'BOJ' && (
                <img
                  src={`/baekjoon.png`}
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              {problem.provider === 'SWEA' && (
                <img src={`/swea.png`} className="w-8 h-8 rounded-full mr-3" />
              )}
              {problem.provider === 'PROGRAMMERS' && (
                <img
                  src={`/programmers.png`}
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              <div className="">{`${problem.number}. ${problem.name}`}</div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">
            스터디에 참여해 문제풀이를 시작하세요
          </li>
        )}
      </ul>
    </div>
  )
}

export default ProblemList
