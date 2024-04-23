import ReadyProfileItem from '@/components/studypage/ReadyProfileItem'

const StudyRoomPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{'오구오구스터디'}의 대기방</h1>

      <div>
        <div className="font-bold mb-4 mt-4">접속 중인 멤버</div>
        <div className="flex">
          {dummy.map((el, idx) => (
            <ReadyProfileItem idx={idx} key={el.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudyRoomPage

const dummy = [{ name: '김지연' }, { name: '안녕' }, { name: '최재성' }]
