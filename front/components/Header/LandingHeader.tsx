import GithubButton from '@/components/GithubButton'
import Image from 'next/image'
import Logo from '@/public/logo/Logo@0.1x.png'

export default function LandingHeader() {
  return (
    <nav className="relative items-center">
      <div className="flex h-16 items-center justify-center">
        <Image
          src={Logo}
          alt="Logo"
          className="transition ease-in-out hover:cursor-pointer hover:drop-shadow-lg hover:duration-300 hover:scale-105"
        />
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <GithubButton />
      </div>
    </nav>
    // <nav className="bg-transparent px-4 py-2 flex items-center">
    //   <div className="flex-1" />
    //   <div className="flex-1 relative">
    //     <Image
    //       src={Logo}
    //       alt="Logo"
    //       className="h-6 object-contain"
    //       objectPosition="left"
    //     />
    //   </div>
    //   <GithubButton />
    // </nav>
  )
}
