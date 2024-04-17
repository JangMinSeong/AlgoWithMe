import SideBarItem from './SideBarItem'
const SideBar = () => {
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
		<div className='w-40 h-[100%] fixed top-0 left-0 bg-background bg-opacity-30'>
			{dummy.map((el) => (
				<SideBarItem groupName={el.groupName} key={el.groupName} />
			))}
		</div>
	)
}

export default SideBar
