'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
import { useEffect } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'
import AudioControl from './AudioControl'
import Avatar from './Avatar'
import Timer from './Timer'
import SideBarButton from '../sidebar/SideBarButton'

const StudyHeader = () => {
  const isSolving = useSelector((state: RootState) => state.solving.isSolving)
  const { connectToServer } = useWebSocket()

  useEffect(() => {
    connectToServer()
  }, [])

  return (
    <div className="fixed z-20 top-2 left-2 w-[98vw] h-12 flex justify-between items-center bg-white bg-opacity-50 rounded-xl px-5">
      <div className="flex items-center">
        <SideBarButton />
        <Link href="/main">
          <Image src="/logo/Logo@0.1x.png" alt="로고" width={56} height={0} />
        </Link>
      </div>
      <div className="flex items-center">
        <Avatar />
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
