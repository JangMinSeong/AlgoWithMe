import AudioControl from '../Header/AudioControl'
import Image from 'next/image'
import Avatar from '../Header/Avatar'
import Timer from '../Header/Timer'
import TimerProvider from '@/context/TimerProvider'

const StudyHeader = () => {
  return (
    <TimerProvider>
      <div className="h-10 flex justify-between items-center">
        <Image src={'/logo/1x/AWM.png'} alt="로고" width={100} height={100} />
        <div className="flex">
          <Avatar />
          <AudioControl />
        </div>
        <div className="flex">
          <Timer />
          <Avatar />
        </div>
      </div>
    </TimerProvider>
  )
}

export default StudyHeader
