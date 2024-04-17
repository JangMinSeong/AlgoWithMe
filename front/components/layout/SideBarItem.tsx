const SideBarItem = ({ groupName }: { groupName: string }) => {
	return (
		<div className='h-10 flex items-center ml-4'>
			<div>{groupName}</div>
		</div>
	)
}

export default SideBarItem
