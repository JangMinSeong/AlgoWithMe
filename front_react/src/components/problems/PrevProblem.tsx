import { BiLinkExternal } from 'react-icons/bi'
import { IProblemPage } from '@/features/study/studyTypes'

const PrevProblem = ({
  problemPageInfo,
}: {
  problemPageInfo: IProblemPage
}) => {
  // 누르면 문제페이지로 이동해야함

  return (
<<<<<<< Updated upstream
    <div className="flex w-full bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 hover:bg-dimmedPurple hover:bg-opacity-80 hover:border-opacity-0 transition-colors">
      <img
        src={`/${problemPageInfo.provider}.png`}
        alt="로고"
        width={20}
        height={20}
        className="rounded-full mr-4 "
      />
      <div className="mr-2 w-[80%]">
        {problemPageInfo.number}
        {problemPageInfo.name}
=======
    <div onClick={handleGoPrevStudy} className={`w-full flex rounded-lg mb-2`}>
      <div className="flex grow bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors">
        <a
          id="problemLink"
          target="_blank"
          href={problemPageInfo.url}
          rel="noreferrer"
          aria-label="문제 링크"
        >
          {' '}
          <img
            src={import.meta.env.PUBLIC_URL`/${problemPageInfo.provider}.png`}
            alt="로고"
            width={20}
            height={20}
            className="rounded-full mr-4 "
          />{' '}
        </a>
        <Tooltip anchorSelect="#problemLink" place="bottom">
          문제 보러 가기
        </Tooltip>
        <div>
          {problemPageInfo.number}. {problemPageInfo.name}
        </div>

        {/* <div className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1  hover:bg-primary hover:text-white transition-colors">
          이부분 수정하기
        </div> */}
>>>>>>> Stashed changes
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
