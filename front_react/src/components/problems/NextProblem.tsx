import { BiLinkExternal } from 'react-icons/bi'
import { IProblemInfo } from '@/features/study/studyTypes'

const NextProblem: React.FC = ({ problemInfo }: { problemInfo: IProblemInfo }) => {
	const isSelected = false // 오늘의 문제인지 아닌지
	let prov = 0

	if (problemInfo.provider === 'BOJ') {
		prov = 1
	} else if (problemInfo.provider === 'PROGRAMMERS') {
		prov = 2
	}

	const providerLogo = ['/swea.png', '/bojlogo.png', '/programmers.png']

	return (
		<div
			className={`w-full flex ${
				isSelected ? 'bg-gradient-to-br from-primary/50 via-secondary/50 to-blueishPurple/50' : 'bg-transparent'
			} rounded-lg`}
		>
			<div className='flex grow bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors justify-between'>
				<img src={providerLogo[prov]} alt='로고' width={20} height={20} className='rounded-full mr-4 ' />
				<div className='mr-2 w-[80%]'>
					{problemInfo.number}
					{problemInfo.name}
				</div>
				<a target='_blank' href={problemInfo.url} rel='noreferrer' aria-label='문제 링크'>
					<BiLinkExternal />
				</a>
			</div>
		</div>
	)
}

export default NextProblem
