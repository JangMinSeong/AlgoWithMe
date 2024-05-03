import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

const ViewProblems = () => {
  const problemList = useSelector((state: RootState) => state.problems)

  return (
    <div>
      문제 리스트 조회
      {problemList &&
        problemList.map((el, idx) => (
          <div key={el.id}>
            {el.id}
            {el.level}
            {el.name}
          </div>
        ))}
    </div>
  )
}

export default ViewProblems
