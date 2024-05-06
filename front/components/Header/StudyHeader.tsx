'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Logo from '@/public/logo.svg'
import { RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'
import AudioControl from './AudioControl'
import Avatar from './Avatar'
import Timer from './Timer'
import SideBarButton from '../sidebar/SideBarButton'
import GroupCall from '../groupcall/GroupCall'

const StudyHeader = () => {
  const isSolving = useSelector((state: RootState) => state.solving.isSolving)
  const { connectToServer } = useWebSocket()

  useEffect(() => {
    connectToServer()
  }, [])

  return (
    <div className="fixed z-10 top-2 left-2 w-[98vw] h-12 flex justify-between items-center bg-white bg-opacity-50 rounded-xl px-5">
      <div className="flex items-center w-1/4">
        <SideBarButton />
        <Link href="/main">
          <Image src={Logo} alt="로고" width={80} height={0} />
        </Link>
      </div>
      <div className="flex items-center">
        <Avatar />
        <GroupCall />
        <AudioControl />
      </div>
      <div className="flex items-center">
        {isSolving && <Timer />}
        <Avatar />
      </div>
    </div>
  )
}

export default StudyHeader
