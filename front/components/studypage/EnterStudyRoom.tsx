import { BsPlusSquareDotted } from 'react-icons/bs'
const EnterStudyRoom = () => {
	return (
		<div className='w-48 h-64 bg-white border-[2.4px] border-opacity-20 border-darkNavy shadow-foggyBlue rounded-md flex flex-col justify-center items-center'>
			<BsPlusSquareDotted />
			<div className='mt-4'>대기방 생성하기</div>
		</div>
	)
}

export default EnterStudyRoom
