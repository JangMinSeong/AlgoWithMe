import { RiDeleteBin6Line } from 'react-icons/ri'
import { Tooltip } from '@/components/ReactToolTip'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store.ts";
import {setPageList} from "@/features/sidebar/sidebarSlice.ts";
import fetch from '@/lib/fetch'

const DeleteButton = (props: { pageId: number }) => {
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)
  const dispatch = useDispatch();
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
        const updatedPageList = removePageById(pageList, props.pageId);
        dispatch(setPageList(updatedPageList)); // 상태 업데이트
      }
    }
  }

  function removePageById(pages, pageId) {
    return pages.filter((page) => {
      if (page.pageId === pageId) {
        return false; // 페이지 제거
      }
      if (page.children.length > 0) {
        page.children = removePageById(page.children, pageId); // 자식 페이지 재귀적 필터링
      }
      return true;
    });
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
