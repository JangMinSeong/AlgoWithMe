import { RiDeleteBin6Line } from 'react-icons/ri'
import { Tooltip } from '@/components/ReactToolTip'

const DeleteButton = () => {
  const pageId = '123'
  const handleDelete = async (e) => {
    e.stopPropagation()
    if (window.confirm('모든 스터디원에게서 사라져요. 삭제하시겠어요?')) {
      const pageDeleteRes = await fetch(`/page`, {
        method: 'DELETE',
        body: { page_id: pageId },
        credentials: 'include',
      })
    }
  }

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'

  return (
    <div>
      <a id="hover" className={anchorTagCSS}>
        <RiDeleteBin6Line
          className=" w-4 rounded-sm relative text-red-500"
          onClick={handleDelete}
        />
      </a>
      <Tooltip anchorSelect="hover" place="right">
        페이지 삭제하기
      </Tooltip>
    </div>
  )
}

export default DeleteButton
