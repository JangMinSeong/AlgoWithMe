import AudioControl from '../groupcall/AudioControl'
import Image from 'next/image'
import CallAvatar from '../groupcall/CallAvatar'
const StudyHeader = () => {
  return (
    <div className="h-10 flex justify-between items-center">
      <Image src={'/logo/1x/AWM.png'} alt="로고" width={100} height={100} />
      <div className="flex">
        <CallAvatar />
        <AudioControl />
      </div>
      <div className="flex">
        <div>시간똑딱</div>
        <div>내프로필사진</div>
      </div>
    </div>
  )
}

export default StudyHeader
