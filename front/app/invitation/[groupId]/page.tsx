'use client'
import { useEffect } from 'react'
import Link from 'next/link'
const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_DEV_URL
    : process.env.NEXT_PUBLIC_API_URL

const InvitationPage = ({ params }: { params: { groupId: number } }) => {
  useEffect(() => {
    const studyInfoRes = fetch(`${API_URL}/study/${params.groupId}`, {
      method: 'GET',
      credentials: 'include',
    })

    // const groupName = studyInfoRes.data.group_name
  }, [])

  const handleJoinGroup = async () => {
    const joinGroupRes = await fetch(`${API_URL}/study/member`, {
      method: 'POST',
      body: { user_id: userId, group_id: params.groupId },
      credentials: 'include',
    })
  }

  return (
    <div>
      {'groupName'}그룹에 초대받았어요! 수락하시겠어요?
      <Link href="/main">아니요</Link>
      <button onClick={handleJoinGroup}>네</button>
    </div>
  )
}

export default InvitationPage
