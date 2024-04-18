import PieChart from '@/components/mainpage/PieChart'
import EnterStudyRoom from '@/components/studypage/EnterStudyRoom'
import Problem from '@/components/studypage/Problem'
const StudyMainPage = () => {
	return (
		<div className='flex flex-col mx-10 py-10'>
			<div className='flex flex-wrap'>
				<div className='w-[50%] min-w-80 mb-10 '>
					<div className='font-bold mb-4'>오늘의 스터디룸</div>
					<div className=' h-full flex items-center justify-center'>
						<EnterStudyRoom />
					</div>
				</div>
				<div className='w-[50%] min-w-80 max-w-[520px] mb-10'>
					<div className='font-bold mb-4'>스터디에서 진행한 알고리즘 통계</div>
					<div className='flex items-center justify-center'>
						<PieChart />
					</div>
				</div>
			</div>
			<div className='flex flex-wrap'>
				<div className='w-[50%] min-w-80 mb-10'>
					<div className='font-bold mb-4 mt-4'>풀어 볼 문제</div>
					<Problem />
				</div>
				<div className='font-bold min-w-80 mb-10'>랭킹</div>
			</div>
		</div>
	)
}

export default StudyMainPage
