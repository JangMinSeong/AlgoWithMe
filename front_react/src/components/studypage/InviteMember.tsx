import { BsPersonPlusFill } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'
import fetch from '@/lib/fetch'

const InviteMember = ({ groupId }: { groupId: string }) => {
  const BASE_URL =
    import.meta.env.MODE === 'development'
      ? 'https://localhost:3001'
      : 'https://k10d205.p.ssafy.io'

  const handleGetInviLink = async () => {
    await fetch(`/study/invite/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        navigator.clipboard.writeText(
          `${BASE_URL}/invitation/${groupId}?code=${json.url}`,
        )
        toast.success('초대 링크가 클립보드에 복사되었어요.')
      })
      .catch((err) => console.error(err))
  }

  return (
    <div
      onClick={handleGetInviLink}
      className=" flex min-w-32 pr-2 py-2 rounded-xl border text-sm shadow-foggyBlue border-opacity-30 mb-2 items-center hover:bg-purple-200 hover:border-opacity-0 transition-colors"
    >
      <BsPersonPlusFill className="w-6 h-6 mx-2" />
      <div className="w-full flex justify-center">멤버 초대하기</div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default InviteMember
