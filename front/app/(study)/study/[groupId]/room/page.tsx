import ReadyProfileItem from '@/components/studypage/ReadyProfileItem'

const StudyRoomPage = () => {
  return (
    <div>
      <h1>{'오구오구스터디'}의 대기방</h1>
      <div>
        <div className="font-bold mb-4 mt-4">지난 스터디 복습하기</div>
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
