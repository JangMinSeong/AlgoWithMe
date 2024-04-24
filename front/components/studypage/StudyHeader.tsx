import Image from 'next/image'
import AudioControl from '../Header/AudioControl'
import Avatar from '../Header/Avatar'
import Timer from '../Header/Timer'

const StudyHeader = () => (
  <div className="h-10 flex justify-between items-center">
    <Image src="/logo/1x/AWM.png" alt="로고" width={100} height={100} />
    <div className="flex">
      <Avatar />
      <AudioControl />
    </div>
    <div className="flex">
      <Timer />
      <Avatar />
    </div>
  </div>
)

export default StudyHeader
