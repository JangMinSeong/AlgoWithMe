import { BsPlusSquareDotted } from 'react-icons/bs'
const EnterStudyRoom = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-4">
        아직 생성된 방이 없어요.
      </div>
      <div className="w-48 h-64 bg-white shadow-foggyBlue rounded-md flex flex-col justify-center items-center">
        <BsPlusSquareDotted />
        <div className="mt-4">스터디룸 생성하기</div>
      </div>
    </div>
  )
}

export default EnterStudyRoom
