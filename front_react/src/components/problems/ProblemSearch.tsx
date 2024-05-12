import { BiSearch } from 'react-icons/bi'
import useSearch from '@/hooks/useSearch'

const ProblemSearch = () => {
  const { handleFetchResultByName } = useSearch()

  const handleSearchByName = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const titleToSearch = formData.get('title')
    handleFetchResultByName(titleToSearch, 1)
  }
  return (
    <div className="flex items-center justify-between">
      <form
        action="submit"
        onSubmit={handleSearchByName}
        className="flex items-center flex-grow"
      >
        <div className="flex items-center bg-slate-200 rounded-xl pl-2 mb-4">
          <BiSearch className="mr-1" />

          <input
            name="title"
            className="text-sm p-2 rounded-r-xl w-full "
            type="text"
            placeholder="문제 제목을 입력하세요"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl border border-primary text-primary text-xs flex px-3 items-center justify-center h-6 mr-1 hover:bg-primary hover:text-white transition-colors mx-2 mb-4"
        >
          찾기
        </button>
      </form>
    </div>
  )
}

export default ProblemSearch
