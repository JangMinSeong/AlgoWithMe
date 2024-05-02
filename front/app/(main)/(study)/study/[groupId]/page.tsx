'use client'

import PieChart from '@/components/mainpage/PieChart'
import EnterStudyRoom from '@/components/studypage/EnterStudyRoom'
import NextProblem from '@/components/studypage/NextProblem'
import Member from '@/components/studypage/Member'
import InviteMember from '@/components/studypage/InviteMember'
import AddProblem from '@/components/studypage/AddProblem'
import PrevProblem from '@/components/studypage/PrevProblem'
import RankingProfileItem from '@/components/studypage/RankingProfileItem'

const StudyMainPage = ({ params }: { params: { groupId: number } }) => {
  return (
    <div className="flex flex-col">
      <div className=" flex flex-wrap">
        {/* 왼쪽 위 */}
        <div className="mb-10 flex grow">
          {/* n일째 */}
          <div className=" w-[26%] mr-4 relative h-full font-bold flex flex-col justify-between items-center mx-auto">
            <div className="flex flex-col items-center justify-center w-48 h-64">
              <div className="text-3xl mb-4">{'오구오구스터디'}</div>
              <div>와 함께한 지</div>
              <div className="text-3xl mt-4">
                <span className="text-purple-400">{'123'}</span>일째
              </div>
            </div>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png"
              alt="Bubbles"
              width="80"
              height="80"
              className="absolute bottom-20"
            />
            <InviteMember groupId={params.groupId} />
          </div>

          <div className="w-[26%] pb-2 mr-4 flex flex-col r mx-auto justify-between">
            <div className="font-bold">오늘의 스터디룸</div>
            <div className="flex">
              <EnterStudyRoom groupId={params.groupId} />
            </div>
          </div>

          {/* 파이차트 */}
          <div className="w-[48%] mb-10 flex flex-col mx-auto">
            <div className="font-bold mb-4">
              스터디에서 진행한 알고리즘 통계
            </div>
            <div className="flex items-center justify-center h-80 ">
              <PieChart />
            </div>
          </div>
        </div>
      </div>

      {/* 아래 */}
      <div className="flex flex-wrap">
        <div className="mb-10 flex grow">
          <div className="w-[33%] grow mb-10 flex flex-col">
            <div className="font-bold mb-4 mt-4">지난 스터디 복습하기</div>
            <div className="pr-10">
              {problems.map((el) => (
                <PrevProblem key={el.id} />
              ))}
            </div>
          </div>

          <div className="w-[33%] grow mb-10 flex flex-col">
            <div className="font-bold mb-4 mt-4">함께 풀어 볼 문제</div>
            <div className="pr-10">
              <AddProblem groupId={params.groupId} />
              <NextProblem />
            </div>
          </div>

          <div className="w-[34%] grow mb-10 flex flex-col">
            <div className="font-bold mb-4 mt-4">멤버 랭킹</div>
            <div className="flex ">
              <Member />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
