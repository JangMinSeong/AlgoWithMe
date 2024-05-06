'use client'

import { BsPersonPlusFill } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'

const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_URL

const InviteMember = ({ groupId }: { groupId: number }) => {
  const handleGetInviLink = async () => {
    console.log(groupId)
    const invitationLinkRes = await fetch(`${API_URL}/study/invite`, {
      method: 'POST',
      body: { group_id: groupId },
      credentials: 'include',
    })

    navigator.clipboard.writeText(invitationLinkRes.data)
    toast.success('초대 링크가 클립보드에 복사되었어요.')
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
