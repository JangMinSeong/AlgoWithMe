import Image from 'next/image'
import { BiLinkExternal } from 'react-icons/bi'

const NextProblem: React.FC = () => {
  const isSelected = true // 오늘의 문제인지 아닌지
  return (
    <div>
      <div
        className={`p-[2px] w-fit ${isSelected ? 'bg-gradient-to-br  from-primary/50 via-secondary/50 to-blueishPurple/50' : 'bg-transparent'} rounded-lg`}
      >
        <div className="flex bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-80 hover:border-opacity-0 transition-colors">
          <Image
            src="/bojlogo.png"
            alt="백준로고"
            width={20}
            height={20}
            className="rounded-full mr-4 "
          />
          <div className="mr-2 w-80">
            {'5534.'}
            {'민숭의 생일파티'}
          </div>
          <a target="_blank" href={'https://www.acmicpc.net/problem/1000'}>
            <BiLinkExternal />
          </a>
        </div>
      </div>
    </div>
  )
}

export default NextProblem
