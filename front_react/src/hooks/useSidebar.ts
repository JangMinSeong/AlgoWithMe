import { useDispatch } from 'react-redux'
import { openSidebar, closeSidebar } from '@/features/sidebar/sidebarSlice'

const useSidebar = () => {
	const dispatch = useDispatch()

	const handleOpenSidebar = () => {
		dispatch(openSidebar())
	}

	const handleCloseSidebar = () => {
		dispatch(closeSidebar())
	}

	return { handleOpenSidebar, handleCloseSidebar }
}

export default useSidebar
