import NextProblem from '@/components/studypage/NextProblem'
import AddProblem from '@/components/studypage/AddProblem'
import ActiveProfileItem from '@/components/studypage/studyroom/ActiveProfileItem'
import CopyRoomLink from '@/components/studypage/studyroom/CopyRoomLink'
import InactiveProfileItem from '@/components/studypage/studyroom/InactiveProfileItem'
import SetTimer from '@/components/studypage/studyroom/SetTimer'

const StudyRoomPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{'오구오구스터디'}의 대기방</h1>

      <div>
        {/* 상단 */}
        <div>
          <div className="font-bold mb-4 mt-4">접속 중인 멤버</div>
          <div className="flex">
            {/* 전체 멤버 중 접속 멤버 */}
            {dummy.map((el) => (
              <ActiveProfileItem key={el.name} />
            ))}
            {/* 비접속 멤버 */}
            {dummy.map((el) => (
              <InactiveProfileItem key={el.name} />
            ))}

            <CopyRoomLink />
          </div>
        </div>

        {/* 하단 */}
        <div className="flex ">
          <div className="w-[50%]">
            <div>
              <div className="font-bold mb-4 mt-4">오늘 풀 문제</div>
              <NextProblem />
            </div>
            <div>
              <div className="font-bold mb-4 mt-4">풀어 볼 문제</div>
              <AddProblem />
              <NextProblem />
            </div>
          </div>
          <div className="w-[50%]">
            <div className="font-bold mb-4 mt-4">문제 풀이 시간</div>
            <SetTimer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyRoomPage

const dummy = [{ name: '김지연' }, { name: '안녕' }, { name: '최재성' }]
