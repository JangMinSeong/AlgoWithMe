import { BiSearch } from 'react-icons/bi'

const ProblemSearch = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center bg-slate-200 rounded-xl pl-2 mb-4 flex-grow">
        <BiSearch className="mr-1" />
        <input
          className="text-sm p-2 rounded-r-xl w-full "
          type="text"
          placeholder="문제 번호나 이름을 입력하세요"
        />
      </div>
      <div className="rounded-xl border border-primary text-primary text-xs flex px-3 items-center justify-center h-6 mr-1 mb-1 hover:bg-primary hover:text-white transition-colors mx-2 mb-4">
        찾기
      </div>
    </div>
  )
}

export default ProblemSearch
