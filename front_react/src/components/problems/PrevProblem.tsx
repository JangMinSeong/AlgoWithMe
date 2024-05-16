import { IProblemPage } from '@/features/study/studyTypes'
import { Tooltip } from 'react-tooltip'
import { useNavigate, useParams } from 'react-router-dom'

const PrevProblem = ({
  problemPageInfo,
}: {
  problemPageInfo: IProblemPage
}) => {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const handleGoPrevStudy = () => {
    navigate(`/${groupId}/editor/${problemPageInfo.pageId}`)
  }

  return (
    <div
      onClick={handleGoPrevStudy}
      className={`w-full flex rounded-lg mb-2 items-center`}
    >
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
            src={`/${problemPageInfo.provider}.png`}
            alt="로고"
            width={20}
            height={20}
            className="rounded-full mr-4 "
          />{' '}
        </a>
        <Tooltip anchorSelect="#problemLink" place="bottom">
          문제 보러 가기
        </Tooltip>
        <div
          className="w-[70%]"
          data-tooltip-id="titleTooltip"
          data-tooltip-content={problemPageInfo.name}
        >
          {problemPageInfo.number}.{' '}
          {problemPageInfo.name.length >= 11
            ? `${problemPageInfo.name.slice(0, 11)} ...`
            : problemPageInfo.name}
        </div>
        <div className=" text-slate-500 text-xs">
          {problemPageInfo.createdAt.slice(0, 10)}
        </div>
      </div>
      <Tooltip id="titleTooltip" place="bottom" />
    </div>
  )
}

export default PrevProblem
