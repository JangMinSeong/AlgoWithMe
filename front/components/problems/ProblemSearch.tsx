import { BiSearch } from 'react-icons/bi'

const ProblemSearch = () => (
  <div>
    <div className="flex items-center bg-slate-200 rounded-xl pl-2 mb-4 mr-4">
      <BiSearch className="mr-1" />
      <input
        className="text-sm p-2 flex-grow"
        type="text"
        placeholder="문제 번호나 이름을 입력하세요"
      />
      <button
        type="submit"
        form="timer"
        className="text-xs flex transition-colors w-10 items-center justify-center"
      >
        입력
      </button>
    </div>
  </div>
)

export default ProblemSearch
