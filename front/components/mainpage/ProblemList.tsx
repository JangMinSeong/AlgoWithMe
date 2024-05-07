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
      style={containerStyle}
      className="bg-lighterPurple w-full p-4 rounded-lg shadow-xl text-left"
    >
      <div className="text-lg font-semibold mb-2">최근 학습한 목록</div>
      <hr className="border-t border-gray-200 my-2" />
      <ul className="list-none space-y-2">
        {problemList.length > 0 ? (
          problemList.map((problem, index) => (
            <li
              key={index}
              className="p-2 rounded cursor-pointer hover:bg-lightPurple transition-colors"
              onClick={() => handleItemClick(problem.url)}
            >
              <div>{`[${problem.provider}] ${problem.number}. ${problem.name}`}</div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No problems to display</li>
        )}
      </ul>
    </div>
  )
}

export default ProblemList
