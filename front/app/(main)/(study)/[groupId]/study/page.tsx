'use client'

import PieChart from '@/components/mainpage/PieChart'
import NextProblem from '@/components/problems/NextProblem'
import InviteMember from '@/components/studypage/InviteMember'
import AddProblem from '@/components/problems/AddProblem'
import PrevProblem from '@/components/problems/PrevProblem'
import RankingProfileItem from '@/components/studypage/RankingProfileItem'
import ActiveProfileItem from '@/components/studyroom/ActiveProfileItem'
import SetTimer from '@/components/studyroom/SetTimer'

const StudyMainPage = ({ params }: { params: { teamId: number } }) => (
  <div className="flex flex-col">
    {/* 위 */}
    <div className=" flex flex-wrap">
      {/* 왼쪽 위 */}
      <div className=" w-[50%] mb-10 flex flex-col ">
        {/* 스터디 소개 */}
        <div className="mr-4 relative font-bold flex justify-between items-center h-[28%] mb-4 rounded-2xl p-2 ">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png"
            alt="Bubbles"
            width="80"
            height="80"
            className="mr-2"
          />
          <div className="text-2xl mb-2 mr-2">
            {'오구오구스터디'}와 함께한 지
            <span className="text-purple-400 ml-2">{'123'}</span>일
          </div>
          <InviteMember teamId={params.teamId} />
        </div>

        {/* 멤버랭킹 */}
        <div className="mr-4 flex flex-col h-[72%]">
          <div className="font-bold mb-4 ">멤버 랭킹</div>
          <ActiveProfileItem />
        </div>
      </div>

      {/* 오른쪽 위 파이차트 */}
      <div className="w-[50%] mb-10 flex flex-col mx-auto">
        <div className="font-bold mb-4">스터디에서 진행한 알고리즘 통계</div>
        <div className="flex items-center justify-center h-80 ">
          <PieChart />
        </div>
      </div>
    </div>

    {/* 아래 */}
    <div className="flex flex-wrap">
      <div className="mb-10 flex grow">
        <div className="w-[34%] grow mb-10 flex flex-col">
          <div className="font-bold mb-4 mt-4">오늘의 스터디</div>
          <div className="flex ">
            <SetTimer />
          </div>
        </div>

        <div className="w-[33%] grow mb-10 flex flex-col">
          <div className="font-bold mb-4 mt-4">함께 풀어 볼 문제</div>
          <div className="pr-10">
            <AddProblem groupId={params.teamId} />
            <NextProblem />
          </div>
        </div>

        <div className="w-[33%] grow mb-10 flex flex-col">
          <div className="font-bold mb-4 mt-4">지난 스터디 복습하기</div>
          <div className="pr-10">
            {problems.map((el) => (
              <PrevProblem key={el.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default StudyMainPage

const problems = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
]
