'use client'

import Image from 'next/image'
import GithubLogo from '@/public/logo/github/github-mark.svg'

export default function GithubButton() {
  // const { handleLogin } = useAuth()

  return (
    <button
      type="button"
      className="px-4 py-2 border border-stone-900 bg-transparent rounded-xl flex items-center space-x-2 hover:opacity-60"
      onClick={() => {
        window.location.assign(
          `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}`,
        )
      }}
    >
      <Image
        src={GithubLogo}
        alt="Github Logo"
        className="object-contain w-5"
      />
      <span className="font-medium text-sm text-stone-900">
        깃허브로 로그인
      </span>
    </button>
  )
}
