import useSidebar from '@/hooks/useSidebar'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { CiMenuBurger } from 'react-icons/ci'
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'

const SideBarButton = () => {
  const { handleCloseSidebar, handleOpenSidebar } = useSidebar()
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)

  return (
    <div className="cursor-pointer">
      {isOpen ? (
        <div className="h-8 flex items-center hover:bg-navy rounded-lg hover:bg-opacity-30">
          <a
            id="willCloseSidebar"
            onClick={handleCloseSidebar}
            className=" text-navy"
          >
            <HiOutlineChevronDoubleLeft className="w-8 " />
          </a>
          <Tooltip anchorSelect="#willCloseSidebar" place="bottom">
            사이드바 접기
          </Tooltip>
        </div>
      ) : (
        <div className="h-8 flex items-center hover:bg-navy rounded-lg hover:bg-opacity-30">
          <a
            id="willOpenSidebar"
            onClick={handleOpenSidebar}
            className=" w-8 text-darkNavy"
          >
            <CiMenuBurger className="w-8" />
          </a>

          <Tooltip anchorSelect="#willOpenSidebar" place="left">
            사이드바 열기
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default SideBarButton
