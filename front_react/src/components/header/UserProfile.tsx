import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '@/lib/store.ts'
import { useSelector } from 'react-redux'
import { CiLogout } from 'react-icons/ci'
import useAuth from '@/hooks/useAuth.ts'

const UserProfile = ({ avatarUrl, onClose, avatarRef }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const nickname = user?.nickname
  const [modifiedNickname, setModifiedNickname] = useState<string>('')
  const { handleLogout } = useAuth()
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    if (nickname.length > 10) {
      setModifiedNickname(nickname.slice(0, 10) + '...')
    } else {
      setModifiedNickname(nickname)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={profileRef}
      className="absolute gap-5 bg-dimmedPurple py-6 w-80 mt-4 right-0 flex flex-col items-center rounded-2xl shadow-lg"
    >
      <img
        src={avatarUrl}
        alt="Profile"
        width={80}
        height={80}
        className="rounded-full ring-4 ring-offset-4 ring-offset-dimmedPurple ring-vividPurple"
      />
      <div className="break-keep text-balance text-2xl font-bold text-indigo-900 text-center">
        안녕하세요, {modifiedNickname}님.
      </div>
      <div className="w-[80%] h-0.5 bg-gray-400 rounded-full" />
      <div
        className="flex flex-row gap-2.5 items-center border border-navy px-3 py-1 rounded-full hover:cursor-pointer hover:opacity-60"
        onClick={() => handleLogout()}
      >
        <CiLogout className="text-xl" />
        <div className="text-md">로그아웃</div>
      </div>
    </div>
  )
}

export default UserProfile
