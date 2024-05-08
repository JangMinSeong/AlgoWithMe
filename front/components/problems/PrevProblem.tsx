import Image from 'next/image'
import { BiLinkExternal } from 'react-icons/bi'
import { IProblemPage } from '@/features/study/studyTypes'

const PrevProblem = ({
  problemPageInfo,
}: {
  problemPageInfo: IProblemPage
}) => {
  // 누르면 문제페이지로 이동해야함
  let prov = 0

  if (problemPageInfo.provider === 'BOJ') {
    prov = 1
  } else if (problemPageInfo.provider === 'PROGRAMMERS') {
    prov = 2
  }

  const providerLogo = ['/swea.png', '/bojlogo.png', '/programmers.png']
  return (
    <div className="flex w-full bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 hover:bg-dimmedPurple hover:bg-opacity-80 hover:border-opacity-0 transition-colors">
      <Image
        src={providerLogo[prov]}
        alt="로고"
        width={20}
        height={20}
        className="rounded-full mr-4 "
      />
      <div className="mr-2 w-[80%]">
        {problemPageInfo.number}
        {problemPageInfo.name}
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={problemPageInfo.url}
        aria-label="문제링크"
      >
        <BiLinkExternal />
      </a>
    </div>
  )
}

export default PrevProblem
