import { BsPersonPlusFill } from 'react-icons/bs'

const InviteMember = () => {
  return (
    <div className=" bg-white flex min-w-60 px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 items-center">
      <BsPersonPlusFill className="w-6 h-6 mx-2" />
      <div className=" w-full flex justify-center">멤버 초대하기</div>
    </div>
  )
}

export default InviteMember
