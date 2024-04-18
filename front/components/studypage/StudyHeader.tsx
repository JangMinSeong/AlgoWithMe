import AudioControl from '../groupcall/AudioControl'
const StudyHeader = () => {
  return (
    <div className="h-10 flex justify-between items-center">
      <div>logo</div>
      <div className="flex">
        <div>사람들 아이콘 자리</div>
        <AudioControl />
      </div>
      <div className="flex">
        <div>시간똑딱</div>
        <div>내프로필사진</div>
      </div>
    </div>
  )
}

export default StudyHeader
