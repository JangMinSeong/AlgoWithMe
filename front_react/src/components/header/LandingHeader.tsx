import GithubButton from '../GithubButton'
import Logo from '@/components/Logo.tsx'

export default function LandingHeader() {
  return (
    <nav className="relative items-center">
      <div className="flex h-16 items-center justify-center">
        <Logo width={100} />
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <GithubButton />
      </div>
    </nav>
  )
}
