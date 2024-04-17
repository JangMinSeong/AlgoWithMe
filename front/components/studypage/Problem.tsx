import Image from 'next/image'
import Link from 'next/link'
const Problem = () => {
	return (
		<div>
			<Image src='/bojlogo.png' alt='백준로고' width={40} height={40} className='rounded-full' />
			<div>
				{'5534.'}
				{'민숭의 생일파티'}
			</div>
			<a target='_blank' href={'https://www.acmicpc.net/problem/1000'}></a>
		</div>
	)
}

export default Problem
