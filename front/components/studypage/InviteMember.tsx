import { BsPersonPlusFill } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'

const InviteMember = ({ teamId }: { teamId: number }) => {
  const handleGetInviLink = async () => {
    await fetch(`/study/invite/${teamId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => navigator.clipboard.writeText(res))
      .then(() => toast.success('초대 링크가 클립보드에 복사되었어요.'))
  }

  return (
    <div
      onClick={handleGetInviLink}
      className=" bg-white flex min-w-60 px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 items-center hover:bg-purple-200 hover:border-opacity-0 transition-colors"
    >
      <BsPersonPlusFill className="w-6 h-6 mx-2" />
      <div className=" w-full flex justify-center">멤버 초대하기</div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default InviteMember
