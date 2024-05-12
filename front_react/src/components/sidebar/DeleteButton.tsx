import { RiDeleteBin6Line } from 'react-icons/ri'
import { Tooltip } from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store.ts'
import { setPageList } from '@/features/sidebar/sidebarSlice.ts'
import fetch from '@/lib/fetch'

interface Page {
  pageId: number
  title: string
  docs: boolean
  children: Page[]
}

const DeleteButton = (props: { pageId: number }) => {
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)
  const dispatch = useDispatch()
  const handleDelete = async (e) => {
    e.stopPropagation()
    if (window.confirm('모든 스터디원에게서 사라져요. 삭제하시겠어요?')) {
      const pageDeleteRes = await fetch(`/page/${props.pageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (pageDeleteRes.ok) {
        const updatedPageList = removePageById(pageList, props.pageId)
        dispatch(setPageList(updatedPageList)) // 상태 업데이트
      }
    }
  }

  function removePageById(pages: Page[], pageId: number): Page[] {
    return pages
      .map((page) => {
        // 모든 자식 페이지를 재귀적으로 처리
        const updatedChildren =
          page.children.length > 0 ? removePageById(page.children, pageId) : []

        // 제거할 페이지가 아니면, 갱신된 자식 페이지를 포함하여 반환
        if (page.pageId !== pageId) {
          return {
            ...page,
            children: updatedChildren,
          }
        }

        // 제거할 페이지를 찾으면, 해당 페이지를 필터링에서 제외
        return null
      })
      .filter(Boolean) as Page[]
  }

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'

  return (
    <div>
      <a id="hoverDelete" className={anchorTagCSS}>
        <RiDeleteBin6Line
          className=" w-4 rounded-sm relative text-red-500"
          onClick={handleDelete}
        />
      </a>
      <Tooltip anchorSelect="hoverDelete" place="right">
        페이지 삭제하기
      </Tooltip>
    </div>
  )
}

export default DeleteButton
