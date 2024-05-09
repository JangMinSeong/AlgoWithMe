import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa'
import useSolving from '@/hooks/useSolving'

const Timer = () => {
	const timer = useSelector((state: RootState) => state.timer)

	const studyDurationInSec = timer.hour * 3600 + timer.min * 60 // 스터디 진행시간 in S

	const [remainHour, setRemainHour] = useState(timer.hour)
	const [remainMin, setRemainMin] = useState(timer.min)
	const [remainSec, setRemainSec] = useState(0)

	const isSolving = useSelector((state: RootState) => state.solving)
	const { handleStartSolving, handleEndSolving } = useSolving()

	const handleStart = () => {
		const solvingStartTime = new Date().getTime()
		localStorage.setItem('startedAt', String(solvingStartTime))
		handleStartSolving()
	}
	const handleEnd = () => {
		if (confirm('풀이를 종료하시겠어요?')) {
			handleEndSolving()
			localStorage.removeItem('startedAt')
		}
	}
	useEffect(() => {
		if (isSolving) {
			const startTime = Number(localStorage.getItem('startedAt'))
			const timerID = setInterval(() => {
				const localTime = new Date().getTime()
				// 매 초마다 현재 로컬 시간 업데이트

				const totalPassedSec = Math.floor((localTime - startTime) / 1000) // 전체 경과 in S

				// 총 남은 초
				const totalRemainSec = studyDurationInSec - totalPassedSec

				if (totalRemainSec <= 0) {
					toast('풀이 시간이 종료되었어요', { icon: '⏱' })
					clearInterval(timerID)
				}

				// 남은 초를 시간 분 초 단위로 변경
				const newRemainSec = totalRemainSec % 60 // 나머지 == 초
				const newRemainMin = Math.floor((totalRemainSec / 60) % 60)
				const newRemainHour = Math.floor(totalRemainSec / 3600)

				setRemainHour(Math.max(0, newRemainHour))
				setRemainMin(Math.max(0, newRemainMin))
				setRemainSec(Math.max(0, newRemainSec))
			}, 1000) // 1초 간격으로 setInterval 실행
		} else {
			setRemainHour(Math.max(0, timer.hour))
			setRemainMin(Math.max(0, timer.min))
			setRemainSec(0)
		}
	}, [timer.hour, timer.min, remainHour, remainMin, remainSec])

	return (
		<div className='flex items-center'>
			<div
				className={`bg-white bg-opacity-20 border border-accent border-opacity-50 flex p-2 w-fit rounded-3xl shadow-foggyPurple items-center mr-2`}
			>
				<span className='text-xs text-navy mr-2 '>남은 시간</span>
				{remainHour}
				<span className='text-xs text-navy mr-2 ml-1'>시간</span>
				{remainMin}
				<span className='text-xs text-navy mr-2 ml-1'>분</span>
				{remainSec}
				<span className='text-xs text-navy ml-1 mr-2'>초</span>

				<div className='flex'>
					{isSolving ? (
						<FaRegStopCircle onClick={handleEnd} />
					) : (
						<FaRegPlayCircle className='text-red-500 mr-1' onClick={handleStart} />
					)}
				</div>
			</div>

			<Toaster position='bottom-center' reverseOrder={false} />
		</div>
	)
}

export default Timer
