import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

const ViewProblems = () => {
  const problemList = useSelector(
    (state: RootState) => state.problems.problemList,
  )

  return (
    <div>
      {/* default는 전체 문제리스트 */}
      <div className="font-bold">검색 결과 </div>
      {/* {problemList &&
        problemList.map((el, idx) => (
          <div key={el.id} className="overflow-y-scroll">
            {el.id}
            {el.level}
            {el.name}
          </div>
        ))} */}
    </div>
  )
}

export default ViewProblems
