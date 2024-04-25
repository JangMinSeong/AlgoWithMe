import Link from 'next/link'
import Image from 'next/image'
import AudioControl from './AudioControl'
import Avatar from './Avatar'
import Timer from './Timer'

const StudyHeader = () => (
  <div className="h-12 flex justify-between items-center">
    <Link href="/main">
      <Image src="/logo/1x/AWM.png" alt="로고" width={100} height={0} />
    </Link>
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
