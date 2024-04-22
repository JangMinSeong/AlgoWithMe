import Image from 'next/image'
import GithubLogo from '@/public/logo/github/github-mark.svg'
import Button from '@/components/Button'

export default function GithubButton() {
  return (
    <Button variant="primary" className="flex items-center">
      <Image
        src={GithubLogo}
        alt="Github Logo"
        className="object-contain w-12"
      />
      <span className="text-2xl">Sign in with Github</span>
    </Button>
  )
}
