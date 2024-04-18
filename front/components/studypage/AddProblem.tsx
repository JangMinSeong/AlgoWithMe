import Image from 'next/image'
import { BiLinkExternal } from 'react-icons/bi'
import { MdAddCircleOutline } from 'react-icons/md'

const AddProblem = () => {
  return (
    <div>
      {/* <div className='p-[2px] bg-gradient-to-br w-fit from-primary via-secondary to-blueishPurple rounded-lg '> </div> */}
      <div className="flex bg-background w-[346px] h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 hover:bg-purple-200 hover:border-opacity-0 transition-colors">
        <MdAddCircleOutline className="w-6 h-6 mx-2" />
        <div className="w-48 font-bold flex justify-center">문제 추가하기</div>
        <Image
          src="/swea.png"
          alt="swea logo"
          width={20}
          height={20}
          className="rounded-full mr-2"
        />
        <Image
          src="/bojlogo.png"
          alt="boj logo"
          width={20}
          height={20}
          className="rounded-full mr-2"
        />
        <Image
          src="/programmers.png"
          alt="programmers logo"
          width={20}
          height={20}
          className="rounded-full"
        />
      </div>
    </div>
  )
}

export default AddProblem
