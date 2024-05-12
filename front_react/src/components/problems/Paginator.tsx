import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import useSearch from '@/hooks/useSearch'

const Paginator = () => {
  const totalPageNum = useSelector(
    (state: RootState) => state.search.totalPages,
  )

  const isLevel = useSelector((state: RootState) => state.search.isLevel)
  const selected = useSelector((state: RootState) => state.levels.selected)
  const levels = selected.join(' ')
  const searchTitle = useSelector(
    (state: RootState) => state.search.searchTitle,
  )

  const { handleFetchResultByLevel, handleFetchResultByName } = useSearch()
  const pageArray = new Array(totalPageNum).fill(0)

  const handleFetchPage = (pageNum) => {
    if (isLevel) {
      handleFetchResultByLevel(levels, pageNum)
    } else {
      handleFetchResultByName(searchTitle, pageNum)
    }
  }

  return (
    <div className="flex">
      {pageArray.slice(1, 5).map((_, idx) => (
        <button onClick={() => handleFetchPage(idx + 1)}>{idx + 1}</button>
      ))}
    </div>
  )
}

export default Paginator
