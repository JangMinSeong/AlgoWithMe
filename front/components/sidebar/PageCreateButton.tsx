import { FaPlus } from 'react-icons/fa6'
import { Tooltip } from '@/components/ReactToolTip'
import useModal from '@/hooks/useModal'

const PageCreateButton = () => {
  const { handleOpenModal } = useModal()

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  return (
    <div>
      <a id="hover" className={anchorTagCSS}>
        <FaPlus
          className="relative"
          onClick={(e) => {
            e.stopPropagation()
            handleOpenModal()
          }}
        />
      </a>
      <Tooltip anchorSelect="hover" place="right">
        하위 페이지 생성하기
      </Tooltip>
    </div>
  )
}

export default PageCreateButton
