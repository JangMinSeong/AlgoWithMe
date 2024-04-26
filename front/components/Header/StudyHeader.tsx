'use client'
import Link from 'next/link'
import Image from 'next/image'
import AudioControl from './AudioControl'
import Avatar from './Avatar'
import Timer from './Timer'
import SideBarButton from '../layout/SideBarButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/studyroomStore'
import { useEffect } from 'react'

const StudyHeader = () => {
  const isSolving = useSelector((state: RootState) => state.solving.isSolving)

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
