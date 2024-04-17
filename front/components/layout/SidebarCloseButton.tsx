'use client'
import useSidebar from '@/hooks/useSidebar'
import Button from '@/components/Button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/sidebarStore'

const SidebarCloseButton = () => {
	const { handleCloseSidebar } = useSidebar()

	const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)

	return <Button onClick={handleCloseSidebar}>x</Button>
}

export default SidebarCloseButton
