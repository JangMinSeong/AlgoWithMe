import { useNavigate, useParams } from 'react-router-dom'
import { IMemberInfo } from '@/features/study/studyTypes'
import { Tooltip } from 'react-tooltip'
const InactiveProfileItem = ({ memberInfo }: { memberInfo: IMemberInfo }) => {
  const navigate = useNavigate()
  const { groupId } = useParams()

  return (
    <div className={`w-full flex rounded-lg mb-2 items-center`}>
      <div className="flex grow bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors">
        <a
          id="githubLink"
          target="_blank"
          href={`https://github.com/${memberInfo.nickname}`}
          rel="noreferrer"
          aria-label="깃허브"
        >
          {' '}
          <img
            src={memberInfo.imageUrl}
            alt="사진"
            width={40}
            height={40}
            className="rounded-full mr-4 "
          />{' '}
        </a>
        <Tooltip anchorSelect="#githubLink" place="bottom-start">
          깃허브 프로필 보기
        </Tooltip>
        <div className="w-[70%] font-semibold flex justify-center">
          {memberInfo.nickname}
        </div>
        <div className=" text-slate-500 text-xs"></div>
      </div>
    </div>
  )
}

export default InactiveProfileItem
