import NextProblem from '@/components/studypage/NextProblem'
import AddProblem from '@/components/studypage/AddProblem'
import ActiveProfileItem from '@/components/studyroom/ActiveProfileItem'
import CopyRoomLink from '@/components/studyroom/CopyRoomLink'
import InactiveProfileItem from '@/components/studyroom/InactiveProfileItem'
import SetTimer from '@/components/studyroom/SetTimer'
import GoEditorButton from '@/components/studyroom/GoEditorButton'

const StudyRoomPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{'오구오구스터디'}의 대기방</h1>

      <div>
        {/* 상단 */}
        <div className="mb-10">
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
          <div className="w-[50%] grow pr-60">
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
          <div className="w-[50%] grow">
            <div className="font-bold mb-4 mt-4">문제 풀이 시간</div>
            <div className="flex flex-col items-center ">
              <SetTimer />
              <GoEditorButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyRoomPage

const dummy = [{ name: '김지연' }, { name: '안녕' }, { name: '최재성' }]
