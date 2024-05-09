import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { IProblem } from '@/features/problems/problemSlice'

const ViewProblems = ({ setParentChosenProblem }) => {
	const problemList = useSelector((state: RootState) => state.problems.problemList)
	const [chosenProblem, setChosenProblem] = useState<IProblem>()

	return (
		<div>
			<div className='font-bold'>현재 선택한 문제</div>
			{chosenProblem && (
				<div>
					{chosenProblem.number}
					{chosenProblem.name}
					{chosenProblem.level}
					<div
						onClick={() => {
							setChosenProblem(null)
							setParentChosenProblem(null)
						}}
					>
						x
					</div>
				</div>
			)}

			<div className='overflow-y-scroll'>
				{/* default는 전체 문제리스트 */}
				<div className='font-bold'>검색 결과 </div>
				{problemList &&
					problemList.map((el, idx) => (
						<div key={el.id}>
							{el.number}
							{el.level}
							{el.name}
							<div
								onClick={() => {
									setChosenProblem(el)
									setParentChosenProblem(el)
								}}
							>
								선택하기
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default ViewProblems
