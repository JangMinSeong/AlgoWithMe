import Image from 'next/image'
import { BiLinkExternal } from 'react-icons/bi'

const Problem = () => {
	return (
		<div className='p-[2px] bg-gradient-to-br w-fit from-primary via-secondary to-blueishPurple rounded-lg '>
			<div className='flex bg-background w-fit items-center px-4 py-4 rounded-lg'>
				<Image src='/bojlogo.png' alt='백준로고' width={40} height={40} className='rounded-full mr-2 ' />
				<div className='mr-2 w-60'>
					{'5534.'}
					{'민숭의 생일파티'}
				</div>
				<a target='_blank' href={'https://www.acmicpc.net/problem/1000'}>
					<BiLinkExternal />
				</a>
			</div>
		</div>
	)
}

export default Problem
