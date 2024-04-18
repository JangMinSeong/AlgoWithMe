'use client'
import SideBarItem from './SideBarItem'
import useSidebar from '@/hooks/useSidebar'
import Button from '@/components/Button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/sidebarStore'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md'

const SideBar = () => {
	const { handleCloseSidebar, handleOpenSidebar } = useSidebar()

	const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)

	const dummy = [
		{
			groupName: '오구오구스터디',
		},
		{
			groupName: '알고 스터디',
		},
		{
			groupName: '모르고 스터디',
		},
	]

	return (
		<div>
			{isOpen ? (
				<div className='w-40 min-w-40 h-screen'>
					<Button onClick={handleCloseSidebar}>
						<MdOutlineKeyboardDoubleArrowLeft />
					</Button>
					{dummy.map((el) => (
						<SideBarItem groupName={el.groupName} key={el.groupName} />
					))}
				</div>
			) : (
				<Button onClick={handleOpenSidebar}>
					<MdOutlineKeyboardDoubleArrowRight />
				</Button>
			)}
		</div>
	)
}

export default SideBar
