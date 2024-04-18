import { TiDocumentAdd } from 'react-icons/ti'
import { PiChatsCircle } from 'react-icons/pi'
import Link from 'next/link'

const EnterStudyRoom = () => {
  return (
    <div>
      {/* <div className="flex flex-col justify-center items-center mb-4 text-neutral-500">
        아직 생성된 방이 없어요
      </div>
      <div className="w-48 h-64 bg-white shadow-foggyBlue rounded-md flex flex-col justify-center items-center hover:bg-purple-200 hover:border-opacity-0 transition-colors">
        <TiDocumentAdd className="w-6 h-6" />
        <div className="mt-4 font-semibold">스터디룸 생성하기</div>
      </div> */}
      <div className="flex flex-col justify-center items-center mb-4 text-neutral-500">
        이미 생성된 방이 있어요
      </div>
      <Link
        href={`/study/${'방번호'}/room`}
        className="w-48 h-64 bg-white shadow-foggyBlue rounded-md flex flex-col justify-center items-center hover:bg-purple-200 hover:border-opacity-0 transition-colors "
      >
        <PiChatsCircle className="w-6 h-6" />
        <div className="mt-4 font-semibold">스터디룸 입장하기</div>
      </Link>
    </div>
  )
}

export default EnterStudyRoom
