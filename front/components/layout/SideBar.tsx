'use client'
import SideBarItem from './SideBarItem'
import useSidebar from '@/hooks/useSidebar'
import Button from '@/components/Button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/sidebarStore'

const SideBar = () => {
	const { handleCloseSidebar } = useSidebar()

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
		<div className={`w-40 h-[100%] fixed top-0 left-0 bg-background ${isOpen ? null : 'invisible'}  bg-opacity-30`}>
			<Button onClick={handleCloseSidebar}>x</Button>
			{dummy.map((el) => (
				<SideBarItem groupName={el.groupName} key={el.groupName} />
			))}
		</div>
	)
}

export default SideBar
