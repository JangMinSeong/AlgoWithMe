import PieChart from '@/components/mainpage/PieChart'
import EnterStudyRoom from '@/components/studypage/EnterStudyRoom'
import Problem from '@/components/studypage/Problem'
import Member from '@/components/studypage/Member'
import InviteMember from '@/components/studypage/InviteMember'
const StudyMainPage = () => {
  return (
    <div className="flex flex-col mx-10 py-10">
      <div className="flex flex-wrap">
        {/* 왼쪽 위 */}
        <div className="w-[50%] mb-10 flex">
          <div className="w-[50%] min-w-48 mr-4 ">
            <div className="h-full font-bold flex flex-col justify-between items-center ">
              <div className="flex flex-col items-center justify-center w-48 h-64 ">
                <div className="text-3xl mb-4">{'오구오구스터디'}</div>
                <div>와 함께한 지</div>
                <div className="text-3xl mt-4">
                  <span className="text-purple-500">{'123'}</span>일째
                </div>
              </div>
              <InviteMember />
            </div>
          </div>

          <div className="w-[50%] min-w-48 mr-4 flex flex-col items-center ">
            <div className="font-bold mb-4">오늘의 스터디룸📝</div>
            <div className="flex items-center justify-center mt-4">
              <EnterStudyRoom />
            </div>
          </div>
        </div>

        {/* 오른쪽 위 */}
        <div className="w-[50%] min-w-80 max-w-[560px] mb-10 flex flex-col items-center">
          <div className="font-bold mb-4">스터디에서 진행한 알고리즘 통계</div>
          <div className="flex items-center justify-center h-80">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {/* 왼쪽 아래 */}
        <div className="w-[50%] min-w-80 mb-10">
          <div className="font-bold mb-4 mt-4">함께 풀어 볼 문제</div>
          <Problem />
        </div>
        {/* 오른쪽 아래 */}
        <div className="font-bold min-w-80 mb-10">랭킹</div>
      </div>
    </div>
  )
}

export default StudyMainPage
