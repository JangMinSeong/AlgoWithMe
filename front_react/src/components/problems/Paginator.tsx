import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import useSearch from '@/hooks/useSearch'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import { useState } from 'react'

const Paginator = () => {
  const [begin, setBegin] = useState(0)
  const [end, setEnd] = useState(5)
  const [current, setCurrent] = useState(1)

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

  const handleDoubleArrow = (LorR: string) => {
    if (LorR === 'left') {
      handleFetchPage(1) // 맨 첫번째 페이지로 이동,
      setBegin(0)
      setEnd(Math.min(totalPageNum, 5)) // 5 또는 마지막 페이지
      setCurrent(1)
    } else {
      // 가장 마지막 페이지로 이동
      handleFetchPage(totalPageNum)
      setBegin(Math.max(totalPageNum - 4, 1))
      setEnd(totalPageNum)
      setCurrent(totalPageNum)
    }
  }

  const handleSingleArrow = (LorR: string) => {
    // 페이지네이터만 다섯페이지 이동
    if (LorR === 'left') {
      setBegin(Math.max(0, begin - 5))
      setEnd(Math.max(end - 5, 5))
    } else {
      setBegin(Math.min(begin + 5, totalPageNum))
      setEnd(Math.min(end + 5, totalPageNum))
      console.log('오른싱글 엔드', end)
    }
  }

  return (
    <div className="flex">
      <MdKeyboardDoubleArrowLeft onClick={() => handleDoubleArrow('left')} />
      <MdKeyboardArrowLeft onClick={() => handleSingleArrow('left')} />
      {pageArray.slice(begin, end).map((_, idx) => (
        <button
          onClick={() => handleFetchPage(begin + idx + 1)}
          className="mr-2"
        >
          {begin + idx + 1}
        </button>
      ))}
      <MdKeyboardArrowRight onClick={() => handleSingleArrow('right')} />
      <MdKeyboardDoubleArrowRight onClick={() => handleDoubleArrow('right')} />
    </div>
  )
}

export default Paginator
