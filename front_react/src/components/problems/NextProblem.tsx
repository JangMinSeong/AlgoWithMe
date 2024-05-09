import { IProblemInfo } from '@/features/study/studyTypes'
import { Tooltip } from 'react-tooltip'
import useStudy from '@/hooks/useStudy'

const NextProblem: React.FC = ({
  problemInfo,
}: {
  problemInfo: IProblemInfo
}) => {
  const { handleDeleteCandidateProblem } = useStudy()

  let prov = 0

  if (problemInfo.provider === 'BOJ') {
    prov = 1
  } else if (problemInfo.provider === 'PROGRAMMERS') {
    prov = 2
  }

  const providerLogo = ['/swea.png', '/bojlogo.png', '/programmers.png']

  return (
    <div className={`w-full flex  rounded-lg mb-2`}>
      <div className="flex grow bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors justify-between">
        <a
          id="problemLink"
          target="_blank"
          href={problemInfo.url}
          rel="noreferrer"
          aria-label="문제 링크"
        >
          {' '}
          <img
            src={providerLogo[prov]}
            alt="로고"
            width={20}
            height={20}
            className="rounded-full mr-4 "
          />{' '}
        </a>
        <Tooltip anchorSelect="#problemLink" place="bottom">
          문제 보러 가기
        </Tooltip>
        <div className="w-[56%]">
          {problemInfo.number}. {problemInfo.name}
        </div>

        <div className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1  hover:bg-primary hover:text-white transition-colors">
          문제풀기
        </div>
        <div
          onClick={() => handleDeleteCandidateProblem(problemInfo.candidateId)}
          className="rounded-xl border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center h-6 mr-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          삭제
        </div>
      </div>
    </div>
  )
}

export default NextProblem
