import * as React from 'react'

interface ProblemProp {
  content: string
}

const Problem: React.FC<ProblemProp> = ({ content }) => (
  <div className="bg-white w-full h-full">{content}</div>
)

export default Problem
