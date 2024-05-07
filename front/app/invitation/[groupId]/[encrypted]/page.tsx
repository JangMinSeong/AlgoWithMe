'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import useStudy from '@/hooks/useStudy'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import Button from '@/components/Button'
import { redirect } from 'next/navigation'
import fetch from '@/lib/fetch'

const InvitationPage = ({
  params,
}: {
  params: { teamId: number; encrypted: string }
}) => {
  const handleJoinGroup = async () => {
    await fetch(`/study/member?${params.encrypted}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(() => redirect(`/study/${params.teamId}`))
      .catch((err) => console.error(err))
  }

  const { handleViewStudyInfo } = useStudy(params.teamId)

  useEffect(() => {
    handleViewStudyInfo()
  })

  const studyInfo = useSelector((state: RootState) => state.study)

  return (
    <div>
      {studyInfo.name}그룹에 초대받았어요! 수락하시겠어요?
      <Link href="/main">아니요</Link>
      <Button onClick={handleJoinGroup}>네</Button>
    </div>
  )
}

export default InvitationPage
