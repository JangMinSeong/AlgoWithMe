import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import useSearch from '@/hooks/useSearch'
import { useState } from 'react'
import Pagination from 'react-js-pagination'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import { Tooltip } from 'react-tooltip'

const Paginator = () => {
  const isLevel = useSelector((state: RootState) => state.search.isLevel)
  const selected = useSelector((state: RootState) => state.levels.selected)
  const levels = selected.join(' ')
  const searchTitle = useSelector(
    (state: RootState) => state.search.searchTitle,
  )
  const totalResult = useSelector(
    (state: RootState) => state.search.resultCount,
  )

  const { handleFetchResultByLevel, handleFetchResultByName } = useSearch()
  const [currentPage, setCurrentPage] = useState()

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    if (isLevel) {
      handleFetchResultByLevel(levels, pageNumber)
    } else {
      handleFetchResultByName(searchTitle, pageNumber)
    }
  }

  return (
    <div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={totalResult}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        innerClass="flex justify-between items-center mt-4"
        prevPageText={<MdKeyboardArrowLeft />}
        firstPageText={<MdKeyboardDoubleArrowLeft />}
        lastPageText={<MdKeyboardDoubleArrowRight />}
        nextPageText={<MdKeyboardArrowRight />}
        activeClass="rounded-full bg-primary text-white px-2 flex items-center justify-center"
        itemClass="text-sm hover:bg-slate-300/50 hover:text-black rounded-full px-2 flex items-center justify-center"
        itemClassFirst="py-2"
        itemClassLast="py-2"
        itemClassNext="py-2"
        itemClassPrev="py-2"
        linkClassFirst="goFirst"
        linkClassLast="goLast"
        linkClassPrev="goPrev"
        linkClassNext="goNext"
      />
      <Tooltip anchorSelect=".goFirst" place="top">
        첫 페이지
      </Tooltip>
      <Tooltip anchorSelect=".goLast" place="top">
        마지막 페이지
      </Tooltip>
      <Tooltip anchorSelect=".goPrev" place="top">
        이전 페이지
      </Tooltip>
      <Tooltip anchorSelect=".goNext" place="top">
        다음 페이지
      </Tooltip>
    </div>
  )
}

export default Paginator
