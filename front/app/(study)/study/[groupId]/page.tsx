import PieChart from '@/components/mainpage/PieChart'
import EnterStudyRoom from '@/components/studypage/EnterStudyRoom'
import Problem from '@/components/studypage/Problem'
const StudyMainPage = () => {
  return (
    <div className="flex flex-col mx-10 py-10">
      <div className="flex flex-wrap">
        {/* 왼쪽 위 */}
        <div className="w-[50%] mb-10 flex">
          <div>
            <div className="font-bold mb-4">오늘의 스터디룸</div>
            <div className="flex items-center justify-center">
              <EnterStudyRoom />
            </div>
          </div>

          <div>
            <div className="font-bold mb-4">멤버 목록</div>
            <div>김지연</div>
          </div>
        </div>

        {/* 오른쪽 위 */}
        <div className="w-[50%] min-w-80 max-w-[560px] mb-10">
          <div className="font-bold mb-4">스터디에서 진행한 알고리즘 통계</div>
          <div className="flex items-center justify-center">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {/* 왼쪽 아래 */}
        <div className="w-[50%] min-w-80 mb-10">
          <div className="font-bold mb-4 mt-4">풀어 볼 문제</div>
          <Problem />
        </div>
        {/* 오른쪽 아래 */}
        <div className="font-bold min-w-80 mb-10">랭킹</div>
      </div>
    </div>
  )
}

export default StudyMainPage
