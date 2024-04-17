import * as React from 'react'
import MainHeader from '@/components/Header'
import StudyList from '@/components/mainpage/StudyListComponent'
import ChartProblem from '@/components/mainpage/ChartProblemComponent'

const MainPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<MainHeader />
			<main className='flex w-full flex-col items-center justify-center text-center mt-0.5 pb-10'>
				<ChartProblem />
				<StudyList />
			</main>

			<button className='fixed bottom-4 right-4 w-12 h-12 bg-darkPurple text-background rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center text-2xl'>
				+
			</button>
		</div>
	)
}

export default MainPage
